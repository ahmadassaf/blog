'use client';

import Borealis from '@gaudi/design-system/animations/Borealis';
import { usePrefersReducedMotion } from '@gaudi/design-system/hooks/a11y/use-prefers-reduced-motion';
import { usePathname } from 'next/navigation';

import useBackdropMotion from './useBackdropMotion';

import styles from './BackdropMotion.module.css';

// The blog's own aurora palette (app/responsive.css): soft blues and indigo that change with the theme.
const auroraColors = [ 'var(--blog-aurora-1)', 'var(--blog-aurora-2)', 'var(--blog-aurora-3)' ];

// Faint behind the text column on the left, out at the right edge, and in and out at top and bottom.
const auroraMask = 'linear-gradient(to right, rgb(0 0 0 / 18%), rgb(0 0 0 / 28%) 45%, black 75%, black 90%, transparent), linear-gradient(to bottom, transparent, black 14%, black 70%, transparent)';

function SiteAurora({ settle }) {
  const reduced = usePrefersReducedMotion(true);
  const animate = useBackdropMotion(settle);
  const aurora = <Borealis height={ 560 } intensity={ 1 } colors={ auroraColors } transparent mask={ auroraMask } />;

  if (!settle && !reduced) return aurora;

  return (
    <div aria-hidden='true' className={ `relative ${styles.site}` }>
      {animate && <div className={ styles.motion }>{aurora}</div>}
    </div>
  );
}

export default function SiteBackdrop() {
  const pathname = usePathname();

  if (pathname === '/about') return null;

  const settle = pathname === '/' || /^\/blog\/handbook(?:\/|$)/.test(pathname) || /^\/blog\/category\/management\/cto-handbook(?:-|$)/.test(pathname);

  return <SiteAurora key={ settle ? pathname : 'site' } settle={ settle } />;
}
