/**
 * Preview API Route
 *
 * @description API endpoint for generating URL previews with caching.
 * Extracts metadata (title, description, image, favicon) from URLs
 * and provides special handling for YouTube videos.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

// External imports
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
import { parse } from 'node-html-parser';

/**
 * Checks if a URL is a YouTube video URL
 *
 * @param {string} url - URL to check
 * @returns {boolean} True if URL is from YouTube
 *
 * @example
 * isYouTubeURL('https://youtube.com/watch?v=123'); // true
 * isYouTubeURL('https://example.com'); // false
 */
const isYouTubeURL = (url) => url.includes('youtube.com') || url.includes('youtu.be');

/**
 * Extracts YouTube video ID from various YouTube URL formats
 *
 * @param {string} url - YouTube URL
 * @returns {string} Video ID or empty string if not found
 *
 * @example
 * extractYouTubeVideoId('https://youtube.com/watch?v=dQw4w9WgXcQ'); // 'dQw4w9WgXcQ'
 */
const extractYouTubeVideoId = (url) => {
  // eslint-disable-next-line prefer-named-capture-group
  const videoIdRegex = /(?:\/embed\/|\/watch\?v=|\/(?:embed\/|v\/|watch\?.*v=|youtu\.be\/|embed\/|v=))([^&?#]+)/;
  const match = url.match(videoIdRegex);

  return match ? match[1] : '';
};

/**
 * GET handler for preview API endpoint
 *
 * @param {Request} request - Next.js API request object
 * @returns {Promise<NextResponse>} JSON response with preview data or error
 *
 * @example
 * // GET /api/preview?url=https://example.com
 * // Returns: { title, description, image, favicon, status }
 */
export async function GET(request) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) return NextResponse.json({ 'status': 404 });

  const cachedPreview = await kv.get(`url:${url}`);

  if (cachedPreview) return NextResponse.json(JSON.stringify(cachedPreview), { 'status': 200 });

  try {
    const data = {};
    const response = await fetch(url, { 'cache': 'force-cache' });
    const doc = parse(await response.text(), 'text/html');

    data.status = response.status;
    data.title = doc.querySelector('title')?.textContent || '';
    data.description = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    data.image = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || `https://api.microlink.io/?url=${url}&screenshot=true&meta=false&embed=screenshot.url&colorScheme=dark&viewport.isMobile=true&viewport.deviceScaleFactor=1&viewport.width=600&viewport.height=375`;
    data.favicon = `https://www.google.com/s2/favicons?domain=${url}&sz=${32}`;

    const isYouTubeVideo = isYouTubeURL(url);

    if (isYouTubeVideo) {
      const videoId = extractYouTubeVideoId(url);
      const videoThumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

      data.image = videoThumbnail;
    }

    await kv.set(`url:${url}`, data);

    return NextResponse.json(JSON.stringify(data), { 'status': 200 });
  } catch (error) {
    return NextResponse.json(JSON.stringify({ error }), { 'status': 404 });
  }

}
