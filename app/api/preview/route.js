import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
import { parse } from 'node-html-parser';

const isYouTubeURL = (url) => url.includes('youtube.com') || url.includes('youtu.be');

const extractYouTubeVideoId = (url) => {
  // eslint-disable-next-line prefer-named-capture-group
  const videoIdRegex = /(?:\/embed\/|\/watch\?v=|\/(?:embed\/|v\/|watch\?.*v=|youtu\.be\/|embed\/|v=))([^&?#]+)/;
  const match = url.match(videoIdRegex);

  return match ? match[1] : '';
};

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
