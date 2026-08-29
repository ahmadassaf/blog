
/**
 * Open Graph Image Generation API
 *
 * @description API route that dynamically generates Open Graph images for blog posts and pages.
 * Creates custom social media preview images with post titles, categories, and branding elements.
 * Uses Vercel's @vercel/og package to generate images on-the-fly.
 *
 * @author Ahmad Assaf
 * @version 1.1.0
 */

import { ImageResponse } from '@vercel/og';
import { allPosts } from 'contentlayer/generated';
import { NextResponse } from 'next/server';

import siteMetadata from '@/data/meta/metadata';

// Module-scope cache so fonts are downloaded at most once per instance
let cachedFontsPromise = null;

/**
 * Fetches a single Inter font file and shapes it for image generation
 *
 * @param {string} url - CDN URL of the font file
 * @param {number} weight - Font weight the file represents
 * @returns {Promise<Object>} Font object
 * @throws {Error} When the font download fails
 */
async function fetchFont(url, weight) {
  const response = await fetch(url);

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const data = await response.arrayBuffer();

  return {
    'data': data,
    'name': 'Inter',
    'style': 'normal',
    'weight': weight
  };
}

/**
 * Fetches and prepares Inter font files for Open Graph image generation
 *
 * @description Downloads Inter font variants from CDN and formats them for use in image generation.
 * This is required because local font files cannot be easily loaded in Vercel's edge runtime.
 * Results are cached at module scope so repeat invocations reuse the downloaded buffers;
 * if any download fails the image renders with the default font and the cache is
 * invalidated so the next invocation retries.
 *
 * @returns {Promise<Array>} Array of font objects with data, name, style, and weight properties
 */
function getFonts() {

  /*
   * This is unfortunate but I can't figure out how to load local font files
   * when deployed to vercel.
   */
  if (!cachedFontsPromise) cachedFontsPromise = Promise.all([
    fetchFont('https://fonts.cdnfonts.com/s/19795/Inter-Regular.woff', 400),
    fetchFont('https://fonts.cdnfonts.com/s/19795/Inter-Medium.woff', 500),
    fetchFont('https://fonts.cdnfonts.com/s/19795/Inter-SemiBold.woff', 600),
    fetchFont('https://fonts.cdnfonts.com/s/19795/Inter-Bold.woff', 700)
  ]).catch((error) => {
    console.error('Failed to fetch Inter fonts:', error);

    // Retry on the next invocation
    cachedFontsPromise = null;

    return [];
  });

  return cachedFontsPromise;
}

/**
 * GET handler for Open Graph image generation
 *
 * @description Generates dynamic Open Graph images for blog posts based on the slug parameter.
 * If no matching post is found, falls back to default site metadata. The generated image
 * includes the post title, category, subtitle, and site branding elements.
 *
 * @param {Request} request - The incoming HTTP request with search parameters
 * @returns {Promise<ImageResponse|Response>} Generated image response or error response
 *
 * @example
 * // Generate OG image for a specific post
 * GET /api/og?slug=my-blog-post
 *
 * // Generate default OG image
 * GET /api/og?slug=default
 */
export async function GET(request) {
  const slugParam = request.nextUrl.searchParams.get('slug');

  if (!slugParam) return NextResponse.json(
    { 'error': 'Missing required "slug" parameter', 'status': 400 }, { 'status': 400 }
  );

  try {

    const slug = slugParam.replace('category/', '');
    let post = allPosts.find((_post) => _post.slug.replace('category/', '') === slug);

    // Never leak unpublished titles through OG images
    if (post?.draft) return NextResponse.json(
      { 'error': 'Post not found', 'status': 404 }, { 'status': 404 }
    );

    if (!post) post = {
      'category': slug,
      'subtitle': siteMetadata.description,
      'title': siteMetadata.title
    };

    // Render with the default font if the custom fonts could not be downloaded
    const fonts = await getFonts();
    const imageOptions = {
      'height': 600,
      'width': 1200
    };

    if (fonts.length > 0) imageOptions.fonts = fonts;

    return new ImageResponse(
      (

        <div tw='flex flex-col h-[600px] w-[1200px] border-b-[20px] border-blue-600 px-24'>
          {post.category && (
            <h1 tw='text-2xl leading-[60px] uppercase text-blue-700'>
              {post.category}
            </h1>
          )}
          <div tw='flex flex-col'>
            <div tw='flex flex-row justify-between flex-row-reverse'>
              <svg version='1.0' xmlns='http://www.w3.org/2000/svg' width='200px' height='200px' viewBox='0 0 688.000000 688.000000' preserveAspectRatio='xMidYMid meet'>
                <g transform='translate(0.000000,688.000000) scale(0.100000,-0.100000)' fill='currentColor' stroke='none' >
                  <path
                    d='M3175 4928 c-147 -255 -397 -686 -555 -958 -158 -272 -526 -907 -817
                            -1410 -292 -503 -546 -942 -566 -975 l-35 -60 236 -3 c181 -2 239 1 248 10 6
                            7 194 328 417 713 223 385 525 907 672 1160 147 253 357 616 468 807 110 191
                            202 347 203 345 1 -1 392 -679 869 -1507 477 -828 873 -1511 879 -1518 9 -9
                            67 -12 248 -10 l235 3 -1112 1928 c-612 1061 -1115 1930 -1117 1933 -3 2 -125
                            -204 -273 -458z'
                  />
                  <path
                    d='M3320 3768 c-68 -117 -173 -301 -235 -408 -62 -107 -277 -481 -479
                            -831 -201 -350 -366 -642 -366 -648 0 -8 222 -11 800 -11 440 0 800 4 800 8 0
                            11 -211 384 -229 406 -12 14 -54 16 -332 16 -176 0 -319 2 -319 5 0 3 160 282
                            356 622 197 339 359 624 361 633 4 13 -200 384 -227 413 -4 5 -63 -87 -130
                            -205z'
                  />
                  <path
                    d='M3645 2933 c-110 -190 -201 -350 -203 -355 -2 -4 73 -8 167 -8 l171
                            0 26 -42 c14 -24 149 -257 300 -518 152 -261 279 -478 283 -483 4 -4 114 -6
                            244 -5 l237 3 -311 535 c-171 294 -395 681 -499 860 -104 179 -195 333 -202
                            343 -11 15 -37 -24 -213 -330z'
                  />
                </g>
              </svg>
              <h1 tw='text-5xl w-[60%] leading-[60px]'>
                {post.title}
              </h1>
            </div>
            <h1 tw='text-3xl tracking-normal text-gray-600 capitalize w-[90%] leading-[40px] font-normal'>
              {post.subtitle}
            </h1>
            <h1 tw='text-sm tracking-widest text-gray-500 uppercase font-extralight'>
              {siteMetadata.siteUrl}
            </h1>
          </div>
        </div>

      // eslint-disable-next-line function-call-argument-newline
      ), imageOptions
    );
  } catch {
    return new Response(`Failed to generate the image`, {
      'status': 500
    });
  }
}
