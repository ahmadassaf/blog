'use client';

import PixelBlast from '@gaudi/design-system/animations/PixelBlast';
import { cn } from '@gaudi/design-system/utilities/cn';

/*
 * Gaudi's PixelBlast behind the top of a page, stretched to the full window width as a decorative
 * layer that starts where the page content starts. Wrapping a header sizes the layer to it (About);
 * without children it takes the About header's height from app/responsive.css (every other page).
 */
export default function PageBackdrop({ children, className, intensity = 0.6 }) {
  return (
    <div className={ cn('relative', className) }>
      <div
        aria-hidden='true'
        className={ cn('page-backdrop-layer absolute left-1/2 -z-10 w-screen -translate-x-1/2', children ? 'inset-y-0' : 'top-0 h-(--page-backdrop-height)') }
      >
        <PixelBlast height='100%' intensity={ intensity } className='page-backdrop rounded-none' />
      </div>
      {children}
    </div>
  );
}
