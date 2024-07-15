import {NextResponse} from "next/server";

export async function GET (request, { params }){
    const paramGreeting = request.nextUrl.searchParams.get('greeting')
    const json = {
        paramGreeting
    };
    return NextResponse.json(json);
}