import {NextResponse} from "next/server";
import { parse } from 'node-html-parser';

const isYouTubeURL = (url) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
};

const extractYouTubeVideoId = (url) => {
    const videoIdRegex = /(?:\/embed\/|\/watch\?v=|\/(?:embed\/|v\/|watch\?.*v=|youtu\.be\/|embed\/|v=))([^&?#]+)/;
    const match = url.match(videoIdRegex);
    return match ? match[1] : '';
};

export async function GET (request){
    const url = request.nextUrl.searchParams.get('url')
    if (!url) {
        return NextResponse.json({ status: 400 })
    }
    try {
        let data = {}
        const response = await fetch(url);
        const doc = parse(await response.text(), 'text/html');

        data.title = doc.querySelector('title')?.textContent || '';
        data.description = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
        data.image = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
        data.favicon = `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=32`
        
        const isYouTubeVideo = isYouTubeURL(url);
        if (isYouTubeVideo) {
            const videoId = extractYouTubeVideoId(url);
            const videoThumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            data.image = videoThumbnail;   
        }

        return NextResponse.json(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(JSON.stringify({error}), { status: 500 });
    }
}
