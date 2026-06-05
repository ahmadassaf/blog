/**
 * Preview API Route
 *
 * @description API endpoint for generating URL previews with optional caching.
 * Extracts metadata (title, description, image, favicon) from URLs
 * and provides special handling for various platforms.
 *
 * @author Ahmad Assaf
 * @version 1.1.0
 */

import { NextResponse } from 'next/server';
import { parse } from 'node-html-parser';

/*
 * Optional: Uncomment if you have Vercel KV set up
 * import { kv } from '@vercel/kv';
 */

// Simple in-memory cache for development
const memoryCache = new Map();

// 1 hour
const CACHE_TTL = 3600000;
const REQUEST_TIMEOUT = 15000;

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

    if (cached && Date.now() - cached.timestamp < CACHE_TTL) return cached.data;

    return null;
  },

  async set(key, value) {

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
      'timestamp': Date.now()
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

function isAbortError(error) {
  return error?.name === 'AbortError' || error?.code === 20;
}

/**
 * Checks if a URL is a YouTube video URL
 */
const isYouTubeURL = (url) => url.includes('youtube.com') || url.includes('youtu.be');

/**
 * Extracts YouTube video ID from various YouTube URL formats
 */
const extractYouTubeVideoId = (url) => {
  const videoIdRegex = /(?:\/embed\/|\/watch\?v=|\/(?:embed\/|v\/|watch\?.*v=|youtu\.be\/|embed\/|v=))(?<videoId>[^&?#]+)/;
  const match = url.match(videoIdRegex);

  return match ? match.groups.videoId : '';
};

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
  if (hostname.includes('github.com')) {
    data.type = 'repository';
    const pathParts = urlObj.pathname.split('/').filter(Boolean);

    if (pathParts.length >= 2) {
      const [ owner, repo ] = pathParts;

      // GitHub's OpenGraph image
      data.image = `https://opengraph.githubassets.com/1/${owner}/${repo}`;
    }
  }

  // Medium special handling
  if (hostname.includes('medium.com')) {
    data.type = 'article';
    const readingTime = doc.querySelector('meta[name="twitter:data1"]')?.getAttribute('value');

    if (readingTime) data.readingTime = readingTime;

  }

  // Wikipedia special handling
  if (hostname.includes('wikipedia.org')) {
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
  const url = request.nextUrl.searchParams.get('url');

  if (!url) return NextResponse.json(
    { 'error': 'URL parameter is required', 'status': 400 }, { 'status': 400 }
  );

  const cacheKey = `url:${url}`;

  try {

    // Validate URL
    let urlObj;

    try {
      urlObj = new URL(url);

      // Block potentially dangerous protocols
      if (![ 'http:', 'https:' ].includes(urlObj.protocol))
        return NextResponse.json(
          { 'error': 'Only HTTP(S) URLs are allowed', 'status': 400 }, { 'status': 400 }
        );

      // Block private/local IPs (basic security)
      const hostname = urlObj.hostname.toLowerCase();

      if (hostname === 'localhost' || hostname.startsWith('127.') || hostname.startsWith('10.') ||
          hostname.startsWith('192.168.') || hostname.startsWith('172.'))
        return NextResponse.json(
          { 'error': 'Local URLs are not allowed', 'status': 400 }, { 'status': 400 }
        );

    } catch {
      return NextResponse.json(
        { 'error': 'Invalid URL format', 'status': 400 }, { 'status': 400 }
      );
    }

    // Check cache
    const cachedPreview = await cache.get(cacheKey);

    if (cachedPreview) return NextResponse.json(cachedPreview, { 'status': 200 });

    // Special handling for Wikipedia
    if (urlObj.hostname.includes('wikipedia.org')) {
      const wikiData = await fetchWikipediaData(url);

      if (wikiData) {
        wikiData.status = 200;
        await cache.set(cacheKey, wikiData);

        return NextResponse.json(wikiData, { 'status': 200 });
      }
    }

    // Fetch the URL with timeout

    const controller = new AbortController();

    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    let response;

    try {
      response = await fetch(url, {
        'headers': {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'User-Agent': 'Mozilla/5.0 (compatible; PreviewBot/1.0)'
        },
        'signal': controller.signal
      });
    } finally {
      clearTimeout(timeoutId);
    }

    // Handle non-OK responses gracefully instead of throwing
    if (!response.ok) {
      const errorData = createErrorData(url, {
        'errorMessage': `HTTP ${response.status}: ${response.statusText || 'Not Found'}`,
        'status': response.status
      });

      // Cache the error result to prevent repeated failed requests
      await cache.set(cacheKey, errorData);

      return NextResponse.json(errorData, { 'status': 200 });
    }

    const html = await response.text();
    const doc = parse(html);

    const data = extractMetadata(doc, url, response.status);

    // Cache the result
    await cache.set(cacheKey, data);

    return NextResponse.json(data, { 'status': 200 });

  } catch (error) {
    let errorData;

    // Handle different types of errors appropriately
    if (isAbortError(error)) {
      console.warn(`Preview API timeout after ${REQUEST_TIMEOUT}ms: ${url}`);
      errorData = createErrorData(url, {
        'errorMessage': 'Request timeout',
        'status': 504
      });
    } else {
      console.error('Preview API error:', error);
      errorData = createErrorData(url, {
        'errorMessage': error.message || 'Failed to fetch preview',
        'status': error.status || 404
      });
    }

    // Cache error responses to prevent repeated failed requests
    if (!isAbortError(error))
      try {
        await cache.set(cacheKey, errorData);
      } catch (cacheError) {
        console.error('Failed to cache error response:', cacheError);
      }

    // Always return 200 with error data for consistent client-side handling
    return NextResponse.json(errorData, { 'status': 200 });
  }
}
