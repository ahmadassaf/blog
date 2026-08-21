/**
 * Preview API Route
 *
 * @description API endpoint for generating URL previews with optional caching.
 * Extracts metadata (title, description, image, favicon) from URLs
 * and provides special handling for various platforms.
 *
 * @author Ahmad Assaf
 * @version 1.2.0
 */

import { allPosts, allProjects } from 'contentlayer/generated';
import { NextResponse } from 'next/server';
import { lookup } from 'node:dns/promises';
import { BlockList, isIP } from 'node:net';
import { TextDecoder } from 'node:util';
import { parse } from 'node-html-parser';

/*
 * Optional: Uncomment if you have Vercel KV set up
 * import { kv } from '@vercel/kv';
 */

// Simple in-memory cache for development
const memoryCache = new Map();

// 1 hour for successful lookups
const CACHE_TTL = 3600000;

// 5 minutes for error results, so transient failures are retried soon
const ERROR_CACHE_TTL = 300000;

const REQUEST_TIMEOUT = 15000;

// Maximum number of redirects followed manually by safeFetch
const MAX_REDIRECTS = 3;

// 1 MB hard cap on downloaded response bodies
const MAX_RESPONSE_BYTES = 1048576;

/**
 * Simple cache implementation
 */
const cache = {
  async get(key) {

    /*
     * Try Vercel KV if available (uncomment if you have it set up)
     * try {
     *   const cached = await kv.get(key);
     *   if (cached) return cached;
     * } catch (e) {
     *   console.log('KV not available, using memory cache');
     * }
     */

    // Fallback to memory cache
    const cached = memoryCache.get(key);

    if (cached && Date.now() < cached.expiresAt) return cached.data;

    return null;
  },

  async set(key, value, ttl = CACHE_TTL) {

    /*
     * Try Vercel KV if available (uncomment if you have it set up)
     * try {
     *   await kv.set(key, value, { ex: 3600 }); // 1 hour expiry
     * } catch (e) {
     *   console.log('KV not available, using memory cache');
     * }
     */

    // Fallback to memory cache
    memoryCache.set(key, {
      'data': value,
      'expiresAt': Date.now() + ttl
    });

    // Limit memory cache size
    if (memoryCache.size > 100) {
      const firstKey = memoryCache.keys().next().value;

      memoryCache.delete(firstKey);
    }
  }
};

function getHostname(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

function createErrorData(url, {
  errorMessage,
  status = 404
}) {
  return {
    'error': true,
    errorMessage,
    status,
    'title': getHostname(url),
    url
  };
}

/**
 * Resolve a local blog URL to the compact metadata used by the internal
 * Preview hover card. Keeping this lookup in the app avoids shipping every
 * compiled post body to the browser.
 */
function getInternalPreviewData(url) {
  const pathname = url.split(/[?#]/)[0];

  if (!pathname.startsWith('/blog/')) return null;

  let slug;

  if (pathname.startsWith('/blog/category/'))
    slug = pathname.slice('/blog/'.length);
  else if (pathname.startsWith('/blog/projects/'))
    slug = `category/projects/${pathname.slice('/blog/projects/'.length)}`;
  else
    slug = `category/${pathname.slice('/blog/'.length)}`;

  const post = [ ...allPosts, ...allProjects ].find((entry) => entry.slug === slug && entry.draft !== true);

  if (!post) return null;

  return {
    'category': post.category,
    'description': post.summary,
    'favicon': '/static/favicons/favicon-32x32.png',
    'publishedTime': post.date,
    'readingTime': post.readingTime?.text,
    'siteName': 'Internal',
    'summary': post.summary,
    'tags': post.tags,
    'title': post.title,
    'type': 'internal',
    'url': pathname
  };
}

function isAbortError(error) {
  return error?.name === 'AbortError' || error?.code === 20;
}

/**
 * Checks whether a hostname is an exact match or a subdomain of a domain
 */
const matchesHost = (hostname, domain) => hostname === domain || hostname.endsWith(`.${domain}`);

/**
 * Checks if a URL is a YouTube video URL
 */
const isYouTubeURL = (url) => {
  const hostname = getHostname(url).toLowerCase();

  return matchesHost(hostname, 'youtube.com') || matchesHost(hostname, 'youtu.be');
};

/**
 * Extracts YouTube video ID from various YouTube URL formats
 */
const extractYouTubeVideoId = (url) => {
  const videoIdRegex = /(?:\/embed\/|\/watch\?v=|\/(?:embed\/|v\/|watch\?.*v=|youtu\.be\/|embed\/|v=))(?<videoId>[^&?#]+)/;
  const match = url.match(videoIdRegex);

  return match ? match.groups.videoId : '';
};

/*
 * Deny-list of non-public address space (SSRF protection). BlockList also
 * matches IPv4 rules against IPv4-mapped IPv6 addresses (::ffff:a.b.c.d),
 * so the mapped forms need no separate handling.
 */
const PRIVATE_ADDRESSES = new BlockList();

// Unspecified, private, CGNAT, loopback, link-local, multicast + reserved
PRIVATE_ADDRESSES.addSubnet('0.0.0.0', 8, 'ipv4');
PRIVATE_ADDRESSES.addSubnet('10.0.0.0', 8, 'ipv4');
PRIVATE_ADDRESSES.addSubnet('100.64.0.0', 10, 'ipv4');
PRIVATE_ADDRESSES.addSubnet('127.0.0.0', 8, 'ipv4');
PRIVATE_ADDRESSES.addSubnet('169.254.0.0', 16, 'ipv4');
PRIVATE_ADDRESSES.addSubnet('172.16.0.0', 12, 'ipv4');
PRIVATE_ADDRESSES.addSubnet('192.168.0.0', 16, 'ipv4');
PRIVATE_ADDRESSES.addSubnet('224.0.0.0', 3, 'ipv4');

// Unspecified + loopback, NAT64, unique-local, link-local, multicast
PRIVATE_ADDRESSES.addSubnet('::', 127, 'ipv6');
PRIVATE_ADDRESSES.addSubnet('64:ff9b::', 96, 'ipv6');
PRIVATE_ADDRESSES.addSubnet('fc00::', 7, 'ipv6');
PRIVATE_ADDRESSES.addSubnet('fe80::', 10, 'ipv6');
PRIVATE_ADDRESSES.addSubnet('ff00::', 8, 'ipv6');

/**
 * Checks whether an IP address (IPv4 or IPv6) is publicly routable
 *
 * @description Unparseable addresses are treated as non-public. IPv6 zone IDs
 * (fe80::1%eth0) are stripped before validation since `isIP` rejects them.
 */
function isPublicAddress(ip) {
  const zoneIndex = ip.indexOf('%');
  const address = zoneIndex === -1 ? ip : ip.slice(0, zoneIndex);
  const family = isIP(address);

  if (family === 0) return false;

  return !PRIVATE_ADDRESSES.check(address, family === 6 ? 'ipv6' : 'ipv4');
}

/**
 * Creates an error flagged as a blocked-URL validation failure
 */
function blockedUrlError(message) {
  const error = new Error(message);

  error.code = 'ERR_URL_BLOCKED';

  return error;
}

/**
 * Validates that a URL is safe to fetch server-side (SSRF protection)
 *
 * @description Enforces HTTP(S), rejects well-known local hostnames, then
 * resolves the hostname via DNS and rejects the URL if any resolved address
 * is not publicly routable (loopback, private, link-local, unique-local,
 * unspecified, or IPv4-mapped equivalents).
 *
 * @throws {Error} Error with code ERR_URL_BLOCKED when the URL is not allowed
 */
async function assertPublicUrl(urlObj) {
  if (![ 'http:', 'https:' ].includes(urlObj.protocol)) throw blockedUrlError('Only HTTP(S) URLs are allowed');

  const hostname = urlObj.hostname.toLowerCase().replace(/^\[|\]$/g, '');

  // Fast path: reject well-known local hostnames without a DNS round-trip
  if (hostname === 'localhost' || hostname.endsWith('.localhost') || hostname.endsWith('.local') || hostname.endsWith('.internal')) throw blockedUrlError('Local URLs are not allowed');

  // IP literals can be validated directly
  if (/^[\d.]+$/.test(hostname) || hostname.includes(':')) {
    if (!isPublicAddress(hostname)) throw blockedUrlError('Local URLs are not allowed');

    return;
  }

  let addresses;

  try {
    addresses = await lookup(hostname, { 'all': true });
  } catch {
    throw blockedUrlError('Could not resolve hostname');
  }

  if (addresses.length === 0 || addresses.some(({ address }) => !isPublicAddress(address))) throw blockedUrlError('Local URLs are not allowed');
}

// Browser-like headers for the outbound metadata request
const FETCH_HEADERS = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'User-Agent': 'Mozilla/5.0 (compatible; PreviewBot/1.0)'
};

const REDIRECT_STATUSES = [ 301, 302, 303, 307, 308 ];

/**
 * Fetches a URL with SSRF protection, following at most MAX_REDIRECTS
 * redirects manually and re-validating every hop before requesting it
 */
async function safeFetch(initialUrl, abortSignal) {
  let currentUrl = initialUrl;

  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    await assertPublicUrl(new URL(currentUrl));

    const response = await fetch(currentUrl, {
      'headers': FETCH_HEADERS,
      'redirect': 'manual',
      'signal': abortSignal
    });

    if (!REDIRECT_STATUSES.includes(response.status)) return response;

    const location = response.headers.get('location');

    if (!location) return response;

    if (response.body) await response.body.cancel();

    currentUrl = new URL(location, currentUrl).href;
  }

  throw blockedUrlError('Too many redirects');
}

/**
 * Reads enough HTML to parse document metadata while enforcing a hard size cap
 *
 * Metadata lives in the document head, so stop downloading once its closing
 * tag arrives. This keeps large pages from failing preview generation merely
 * because their body pushes the full response over the safety limit.
 *
 * @throws {Error} If the body exceeds MAX_RESPONSE_BYTES
 */
async function readHtmlHeadWithCap(response) {
  if (!response.body) return '';

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let received = 0;
  let html = '';

  for (;;) {
    const { done, value } = await reader.read();

    if (done) {
      html += decoder.decode();

      break;
    }

    received += value.byteLength;

    if (received > MAX_RESPONSE_BYTES) {
      await reader.cancel();
      throw new Error(`Response body exceeded ${MAX_RESPONSE_BYTES} bytes`);
    }

    html += decoder.decode(value, { 'stream': true });

    const closingHead = /<\/head\s*>/i.exec(html);

    if (closingHead) {
      await reader.cancel();

      return html.slice(0, closingHead.index + closingHead[0].length);
    }
  }

  return html;
}

/**
 * Extract metadata from HTML document
 */
function extractMetadata(doc, url, status) {
  const data = { status };

  // Extract title with multiple fallbacks
  data.title =
    doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
    doc.querySelector('meta[name="twitter:title"]')?.getAttribute('content') ||
    doc.querySelector('title')?.textContent ||
    '';

  // Extract description
  data.description =
    doc.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
    doc.querySelector('meta[name="description"]')?.getAttribute('content') ||
    doc.querySelector('meta[name="twitter:description"]')?.getAttribute('content') ||
    '';

  // Extract image
  data.image =
    doc.querySelector('meta[property="og:image"]')?.getAttribute('content') ||
    doc.querySelector('meta[name="twitter:image"]')?.getAttribute('content') ||
    doc.querySelector('meta[property="og:image:url"]')?.getAttribute('content');

  // Use screenshot service as fallback for image
  if (!data.image) data.image = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;

  // Extract favicon with fallback
  let favicon =
    doc.querySelector('link[rel="icon"]')?.getAttribute('href') ||
    doc.querySelector('link[rel="shortcut icon"]')?.getAttribute('href') ||
    doc.querySelector('link[rel="apple-touch-icon"]')?.getAttribute('href');

  // Handle relative favicon URLs
  if (favicon && !favicon.startsWith('http')) try {
    const urlObj = new URL(url);

    favicon = new URL(favicon, urlObj.origin).href;
  } catch {
    favicon = null;
  }

  // Fallback to Google's favicon service
  data.favicon = favicon || `https://www.google.com/s2/favicons?domain=${url}&sz=32`;

  // Extract additional metadata
  data.siteName = doc.querySelector('meta[property="og:site_name"]')?.getAttribute('content');
  data.author = doc.querySelector('meta[name="author"]')?.getAttribute('content');
  data.publishedTime = doc.querySelector('meta[property="article:published_time"]')?.getAttribute('content');

  // Platform-specific handling
  const urlObj = new URL(url);
  const hostname = urlObj.hostname.toLowerCase();

  // YouTube special handling
  if (isYouTubeURL(url)) {
    const videoId = extractYouTubeVideoId(url);

    if (videoId) {
      data.image = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      data.type = 'video';
      data.videoId = videoId;
    }
  }

  // GitHub special handling
  if (matchesHost(hostname, 'github.com')) {
    data.type = 'repository';
    const pathParts = urlObj.pathname.split('/').filter(Boolean);

    if (pathParts.length >= 2) {
      const [ owner, repo ] = pathParts;

      // GitHub's OpenGraph image
      data.image = `https://opengraph.githubassets.com/1/${owner}/${repo}`;
    }
  }

  // Medium special handling
  if (matchesHost(hostname, 'medium.com')) {
    data.type = 'article';
    const readingTime = doc.querySelector('meta[name="twitter:data1"]')?.getAttribute('value');

    if (readingTime) data.readingTime = readingTime;

  }

  // Wikipedia special handling
  if (matchesHost(hostname, 'wikipedia.org')) {
    data.type = 'wikipedia';

    // Don't use screenshot for Wikipedia
    data.image = null;

    // Extract article name from URL
    const articleMatch = urlObj.pathname.match(/\/wiki\/(?<article>.+)$/);

    if (articleMatch) data.articleName = decodeURIComponent(articleMatch.groups.article.replace(/_/g, ' '));

    // Try to get the first paragraph as excerpt
    const firstParagraph = doc.querySelector('#mw-content-text p:not(.mw-empty-elt)');

    if (firstParagraph) data.excerpt = `${firstParagraph.textContent.trim().substring(0, 300)}...`;

  }

  return data;
}

/**
 * Fetch Wikipedia article data using Wikipedia API
 */
async function fetchWikipediaData(url) {
  try {
    const urlObj = new URL(url);
    const articleMatch = urlObj.pathname.match(/\/wiki\/(?<article>.+)$/);

    if (!articleMatch) return null;

    const articleName = articleMatch.groups.article;

    // Extract language code (en, fr, etc.)
    const lang = urlObj.hostname.split('.')[0];

    // Use Wikipedia API to get article extract and info
    const apiUrl = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(articleName)}`;

    const response = await fetch(apiUrl);

    if (!response.ok) return null;

    const wikiData = await response.json();

    return {
      'articleName': wikiData.title,
      'description': wikiData.description,
      'excerpt': wikiData.extract,
      'favicon': 'https://www.wikipedia.org/static/favicon/wikipedia.ico',
      'image': wikiData.thumbnail ? wikiData.thumbnail.source : null,
      'title': wikiData.title,
      'type': 'wikipedia'
    };
  } catch (error) {
    console.error('Wikipedia API error:', error);

    return null;
  }
}

/**
 * GET handler for preview API endpoint
 */
export async function GET(request) {

  /*
   * Light abuse protection: browsers automatically send `Sec-Fetch-Site`, so
   * cross-site browser requests can be rejected. Non-browser clients (curl,
   * scripts) omit the header entirely and are not blocked by this check —
   * it is a best-effort mitigation, not a substitute for rate limiting.
   */
  const secFetchSite = request.headers.get('sec-fetch-site');

  if (secFetchSite && ![ 'same-origin', 'same-site', 'none' ].includes(secFetchSite)) return NextResponse.json(
    { 'error': 'Forbidden', 'status': 403 }, { 'status': 403 }
  );

  const url = request.nextUrl.searchParams.get('url');

  if (!url) return NextResponse.json(
    { 'error': 'URL parameter is required', 'status': 400 }, { 'status': 400 }
  );

  if (url.startsWith('/')) {
    const internalPreview = getInternalPreviewData(url);

    if (internalPreview) return NextResponse.json(internalPreview, { 'status': 200 });

    return NextResponse.json(
      { 'error': 'Internal post not found', 'status': 404 }, { 'status': 404 }
    );
  }

  const cacheKey = `url:${url}`;

  try {

    // Validate URL format
    let urlObj;

    try {
      urlObj = new URL(url);
    } catch {
      return NextResponse.json(
        { 'error': 'Invalid URL format', 'status': 400 }, { 'status': 400 }
      );
    }

    /*
     * Serve cache hits before the SSRF validation: cached entries were
     * validated when stored, and answering from cache needs no outbound
     * request — this keeps hits from paying a blocking DNS lookup.
     */
    const cachedPreview = await cache.get(cacheKey);

    if (cachedPreview) return NextResponse.json(cachedPreview, { 'status': 200 });

    // Enforce protocol and public-address restrictions (SSRF protection)
    await assertPublicUrl(urlObj);

    // Special handling for Wikipedia
    if (matchesHost(urlObj.hostname.toLowerCase(), 'wikipedia.org')) {
      const wikiData = await fetchWikipediaData(url);

      if (wikiData) {
        wikiData.status = 200;
        await cache.set(cacheKey, wikiData);

        return NextResponse.json(wikiData, { 'status': 200 });
      }
    }

    // Fetch the URL with timeout, validating every redirect hop

    const controller = new AbortController();

    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    let response;

    try {
      response = await safeFetch(url, controller.signal);
    } finally {
      clearTimeout(timeoutId);
    }

    // Handle non-OK responses gracefully instead of throwing
    if (!response.ok) {
      const errorData = createErrorData(url, {
        'errorMessage': `HTTP ${response.status}: ${response.statusText || 'Not Found'}`,
        'status': response.status
      });

      // Cache the error result briefly to prevent repeated failed requests
      await cache.set(cacheKey, errorData, ERROR_CACHE_TTL);

      return NextResponse.json(errorData, { 'status': 200 });
    }

    // Only parse HTML documents
    const contentType = (response.headers.get('content-type') || '').toLowerCase();

    if (!contentType.startsWith('text/html')) {
      if (response.body) await response.body.cancel();

      const errorData = createErrorData(url, {
        'errorMessage': 'Unsupported content type',
        'status': 415
      });

      await cache.set(cacheKey, errorData, ERROR_CACHE_TTL);

      return NextResponse.json(errorData, { 'status': 200 });
    }

    const html = await readHtmlHeadWithCap(response);
    const doc = parse(html);

    const data = extractMetadata(doc, url, response.status);

    // Cache the result
    await cache.set(cacheKey, data);

    return NextResponse.json(data, { 'status': 200 });

  } catch (error) {

    // Blocked URLs are a client error, not an upstream failure
    if (error.code === 'ERR_URL_BLOCKED') return NextResponse.json(
      { 'error': error.message, 'status': 400 }, { 'status': 400 }
    );

    let errorData;

    // Handle different types of errors appropriately
    if (isAbortError(error)) {
      console.warn(`Preview API timeout after ${REQUEST_TIMEOUT}ms: ${url}`);
      errorData = createErrorData(url, {
        'errorMessage': 'Request timeout',
        'status': 504
      });
    } else {

      // Log the real error server-side; return a generic message to clients
      console.error('Preview API error:', error);
      errorData = createErrorData(url, {
        'errorMessage': 'Failed to fetch preview',
        'status': 502
      });
    }

    // Cache error responses briefly to prevent repeated failed requests
    if (!isAbortError(error))
      try {
        await cache.set(cacheKey, errorData, ERROR_CACHE_TTL);
      } catch (cacheError) {
        console.error('Failed to cache error response:', cacheError);
      }

    // Always return 200 with error data for consistent client-side handling
    return NextResponse.json(errorData, { 'status': 200 });
  }
}
