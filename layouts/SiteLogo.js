/**
 * The site's own mark in the header home link (Gaudi's Menu shows its own brand unless given a logo):
 * a white mark on a dark tile in light mode, inverted in dark mode. Corners are squircle-smoothed
 * where the browser supports corner-shape and plainly rounded elsewhere. The viewBox is cropped to
 * the mark itself so its size inside the tile is exact.
 * Decorative: the home link supplies the accessible name.
 */
export default function SiteLogo() {
  return (
    <span
      aria-hidden='true'
      className='grid size-11 place-items-center rounded-[14px] bg-gray-950 text-white transition-transform duration-300 ease-out [corner-shape:squircle] hover:scale-105 motion-reduce:transition-none dark:bg-white dark:text-gray-950'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='30'
        height='26'
        viewBox='120 149 448 387'
        preserveAspectRatio='xMidYMid meet'
        className='block h-[26px] w-[30px] -translate-y-px'
        focusable='false'
      >
        <g transform='translate(0,688) scale(0.1,-0.1)' fill='currentColor' stroke='none'>
          <path d='M3175 4928 c-147 -255 -397 -686 -555 -958 -158 -272 -526 -907 -817 -1410 -292 -503 -546 -942 -566 -975 l-35 -60 236 -3 c181 -2 239 1 248 10 6 7 194 328 417 713 223 385 525 907 672 1160 147 253 357 616 468 807 110 191 202 347 203 345 1 -1 392 -679 869 -1507 477 -828 873 -1511 879 -1518 9 -9 67 -12 248 -10 l235 3 -1112 1928 c-612 1061 -1115 1930 -1117 1933 -3 2 -125 -204 -273 -458z' />
          <path d='M3320 3768 c-68 -117 -173 -301 -235 -408 -62 -107 -277 -481 -479 -831 -201 -350 -366 -642 -366 -648 0 -8 222 -11 800 -11 440 0 800 4 800 8 0 11 -211 384 -229 406 -12 14 -54 16 -332 16 -176 0 -319 2 -319 5 0 3 160 282 356 622 197 339 359 624 361 633 4 13 -200 384 -227 413 -4 5 -63 -87 -130 -205z' />
          <path d='M3645 2933 c-110 -190 -201 -350 -203 -355 -2 -4 73 -8 167 -8 l171 0 26 -42 c14 -24 149 -257 300 -518 152 -261 279 -478 283 -483 4 -4 114 -6 244 -5 l237 3 -311 535 c-171 294 -395 681 -499 860 -104 179 -195 333 -202 343 -11 15 -37 -24 -213 -330z' />
        </g>
      </svg>
    </span>
  );
}
