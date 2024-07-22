
import { allPosts } from 'contentlayer/generated';
import { coreContent } from '@/lib/utils/contentlayer';
import { ImageResponse } from '@vercel/og';

export async function GET(request) {
  try {

    const slug = request.nextUrl.searchParams.get('slug').replace('category/', '')
    const posts = coreContent(allPosts);
    const postIndex = posts.findIndex((_post) => _post.slug.replace('category/', '') === slug);
    const post = allPosts[postIndex];
    
    return new ImageResponse(
      (
        
        <div tw='flex flex-col w-[1200px] h-[500]'> 
            <img tw='absolute top-0 right-0' src="http://localhost:3000/static/images/og-card.jpg" alt="og-bg" height={2200} width={1200}/>
            <svg version='1.0' xmlns='http://www.w3.org/2000/svg' width='150px' height='150px' viewBox='0 0 688.000000 688.000000' preserveAspectRatio='xMidYMid meet'>
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
        <div tw='flex flex-col p-5'>
                <ul className='flex flex-wrap my-4'>
                    <li tw="flex bg-green-700 text-white p-2 text-[16px] rounded m-2 uppercase" key={ coreContent(post).category }>{coreContent(post).category}</li>
                </ul>
            <h1 tw='text-5xl font-extrabold'>
            {coreContent(post).title}
            </h1>
            <h3 tw='text-3xl tracking-tight text-gray-600 capitalize' style={{fontWeight: 'bold'}}>
            {coreContent(post).subtitle}
            </h3>
            {coreContent(post).tags && (
                <ul className='flex flex-wrap my-4'>
                    {coreContent(post).tags.map((tag) => (
                        <li tw="flex bg-blue-700 text-white p-2 text-[12px] rounded m-2" key={ tag }>{tag}</li>
                    ))}
                </ul>
            )}
        </div>  
      </div>
      ),
      {
        width: 1200,
        height: 630
      },
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}