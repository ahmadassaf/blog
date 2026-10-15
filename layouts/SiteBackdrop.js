'use client';

import Borealis from '@gaudi/design-system/animations/Borealis';

// The blog's own aurora palette (app/responsive.css): soft blues and indigo that change with the theme.
const auroraColors = [ 'var(--blog-aurora-1)', 'var(--blog-aurora-2)', 'var(--blog-aurora-3)' ];

// Faint behind the text column on the left, out at the right edge, and in and out at top and bottom.
const auroraMask = 'linear-gradient(to right, rgb(0 0 0 / 18%), rgb(0 0 0 / 28%) 45%, black 75%, black 90%, transparent), linear-gradient(to bottom, transparent, black 14%, black 70%, transparent)';

/*
 * The site background: Gaudi's Borealis aurora as a transparent band across the top of every page,
 * in LayoutContainer's background slot; the About page uses its own PixelBlast header instead.
 */
export default function SiteBackdrop() {

  // A band about as tall as a page header.
  return <Borealis height={ 560 } intensity={ 1 } colors={ auroraColors } transparent mask={ auroraMask } />;
}
