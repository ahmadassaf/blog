'use client';

import Borealis from '@gaudi/design-system/animations/Borealis';

// The blog's own aurora palette (app/responsive.css): soft blues and indigo that change with the theme.
const auroraColors = [ 'var(--blog-aurora-1)', 'var(--blog-aurora-2)', 'var(--blog-aurora-3)' ];

/*
 * The site background: Gaudi's Borealis aurora as a band across the top of every page, in
 * LayoutContainer's background slot; the About page uses its own PixelBlast header instead.
 * app/responsive.css fades it behind the text and into the page.
 */
export default function SiteBackdrop() {

  // A band about as tall as a page header.
  return <Borealis height={ 560 } intensity={ 1 } colors={ auroraColors } className='site-backdrop' />;
}
