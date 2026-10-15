'use client';

import PixelBlast from '@gaudi/design-system/animations/PixelBlast';

/*
 * Gaudi's PixelBlast behind the About header, stretched to the full window width as a decorative
 * layer; the header keeps its column above it. It sits on the page surface, so it follows light and
 * dark, and app/responsive.css fades it into the page.
 */
export default function AboutBackdrop({ children }) {
  return (
    <div className='relative'>
      <div aria-hidden='true' className='about-backdrop-layer absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2'>
        <PixelBlast height='100%' intensity={ 0.6 } className='about-backdrop rounded-none' />
      </div>
      {children}
    </div>
  );
}
