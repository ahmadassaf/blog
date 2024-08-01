/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from '@vercel/og';
import { allPosts } from 'contentlayer/generated';

import { coreContent } from '@/lib/utils/contentlayer';

async function getFonts() {

  /*
   * This is unfortunate but I can't figure out how to load local font files
   * when deployed to vercel.
   */
  const [ interRegular, interMedium, interSemiBold, interBold ] =
    await Promise.all([
      fetch(`https://fonts.cdnfonts.com/s/19795/Inter-Regular.woff`).then((res) => res.arrayBuffer()),
      fetch(`https://fonts.cdnfonts.com/s/19795/Inter-Medium.woff`).then((res) => res.arrayBuffer()),
      fetch(`https://fonts.cdnfonts.com/s/19795/Inter-SemiBold.woff`).then((res) => res.arrayBuffer()),
      fetch(`https://fonts.cdnfonts.com/s/19795/Inter-Bold.woff`).then((res) => res.arrayBuffer())
    ]);

  return [
    {
      'data': interRegular,
      'name': 'Inter',
      'style': 'normal',
      'weight': 400
    },
    {
      'data': interMedium,
      'name': 'Inter',
      'style': 'normal',
      'weight': 500
    },
    {
      'data': interSemiBold,
      'name': 'Inter',
      'style': 'normal',
      'weight': 600
    },
    {
      'data': interBold,
      'name': 'Inter',
      'style': 'normal',
      'weight': 700
    }
  ];
}

export async function GET(request) {
  try {

    const slug = request.nextUrl.searchParams.get('slug').replace('category/', '');
    const posts = coreContent(allPosts);
    const postIndex = posts.findIndex((_post) => _post.slug.replace('category/', '') === slug);
    const post = allPosts[postIndex];

    return new ImageResponse(
      (

        <div tw='flex flex-col h-[600px] w-[1200px] border-b-[20px] border-green-700 px-24'>
          <h1 tw='text-2xl leading-[60px] uppercase text-blue-700'>
            {coreContent(post).category}
          </h1>
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
                {coreContent(post).title}
              </h1>
            </div>
            <h1 tw='text-3xl tracking-normal text-gray-600 capitalize w-[90%] leading-[40px] font-normal'>
              {coreContent(post).subtitle}
            </h1>
            <h1 tw='text-sm tracking-widest text-gray-500 uppercase text-l font-extralight'>
              https://assaf.website
            </h1>
          </div>
        </div>
      // eslint-disable-next-line function-call-argument-newline
      ), {
        'fonts': await getFonts(),
        'height': 600,
        'width': 1200
      }
    );
  } catch (error) {
    console.log(`${error.message}`);

    return new Response(`Failed to generate the image`, {
      'status': 500
    });
  }
}
