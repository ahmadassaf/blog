'use client';

import PixelBlast from '@gaudi/design-system/animations/PixelBlast';

/*
 * The site background: Gaudi's PixelBlast as a band across the top of every page, in LayoutContainer's
 * background slot. It sits on the page surface, so it follows light and dark; app/responsive.css fades
 * it behind the text and into the page.
 */
export default function SiteBackdrop() {

  // A band about as tall as a page header, matching the About page's original background.
  return <PixelBlast height={ 560 } intensity={ 0.6 } className='site-backdrop rounded-none' />;
}
