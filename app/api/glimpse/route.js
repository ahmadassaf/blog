import {NextResponse} from "next/server";
import glimpse from 'react-glimpse/server';

export async function GET (request){
    const url = request.nextUrl.searchParams.get('url')
    if (!url) {
        return NextResponse.json({ status: 400, headers })
    }
    console.log(url);
    const headers = { 'content-type': 'application/json'};
    try {
        const data = await glimpse(url);
        console.log(data);
        return NextResponse.json(JSON.stringify(data), { status: 200, headers });
    } catch (err) {
        return NextResponse.json(JSON.stringify({}), { status: 500, headers });
    }
}