import SiteMark from '@/layouts/SiteMark';

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
      className='grid size-11 place-items-center rounded-[14px] bg-text text-surface transition-transform duration-300 ease-out [corner-shape:squircle] hover:scale-105 motion-reduce:transition-none'
    >
      <SiteMark className='block h-[26px] w-[30px] -translate-y-px' />
    </span>
  );
}
