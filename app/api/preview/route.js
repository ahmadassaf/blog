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
import { TextDecoder } from 'node:util';
import { parse } from 'node-html-parser';

import { safeFetch } from '@/lib/preview/safeFetch.mjs';

// Simple in-memory cache; entries survive for the lifetime of the server process
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
  get(key) {
    const cached = memoryCache.get(key);

    if (cached && Date.now() < cached.expiresAt) return cached.data;

    return null;
  },

  set(key, value, ttl = CACHE_TTL) {
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

  let cacheKey = `url:${url}`;

  try {
    let normalizedUrl;

    // Validate URL format
    try {
      normalizedUrl = new URL(url).href;
    } catch {
      return NextResponse.json(
        { 'error': 'Invalid URL format', 'status': 400 }, { 'status': 400 }
      );
    }

    cacheKey = `url:${normalizedUrl}`;

    /*
     * Serve cache hits before the SSRF validation: cached entries were
     * validated when stored, and answering from cache needs no outbound
     * request — this keeps hits from paying a blocking DNS lookup.
     */
    const cachedPreview = cache.get(cacheKey);

    if (cachedPreview) return NextResponse.json(cachedPreview, { 'status': 200 });

    // Fetch the URL with timeout, validating every redirect hop

    const controller = new AbortController();

    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    let response;

    try {
      response = await safeFetch(normalizedUrl, controller.signal, { 'maxRedirects': MAX_REDIRECTS });
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
      cache.set(cacheKey, errorData, ERROR_CACHE_TTL);

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

      cache.set(cacheKey, errorData, ERROR_CACHE_TTL);

      return NextResponse.json(errorData, { 'status': 200 });
    }

    const html = await readHtmlHeadWithCap(response);
    const doc = parse(html);

    const data = extractMetadata(doc, url, response.status);

    // Cache the result
    cache.set(cacheKey, data);

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
        cache.set(cacheKey, errorData, ERROR_CACHE_TTL);
      } catch (cacheError) {
        console.error('Failed to cache error response:', cacheError);
      }

    // Always return 200 with error data for consistent client-side handling
    return NextResponse.json(errorData, { 'status': 200 });
  }
}
