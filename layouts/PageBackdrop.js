'use client';

import PixelBlast from '@gaudi/design-system/animations/PixelBlast';
import { cn } from '@gaudi/design-system/utilities/cn';

/*
 * Gaudi's PixelBlast behind the top of a page, transparent and faded behind the text (mask='text'),
 * stretched to the full window width and sized to the About page header it wraps.
 */
export default function PageBackdrop({ children, className, intensity = 0.6 }) {
  return (
    <div className={ cn('relative', className) }>
      <div
        aria-hidden='true'
        className='page-backdrop-layer absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2'
      >
        <PixelBlast height='100%' intensity={ intensity } transparent mask='text' className='rounded-none' />
      </div>
      {children}
    </div>
  );
}
