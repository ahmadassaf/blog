'use client';

import { useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@gaudi/design-system/hooks/a11y/use-prefers-reduced-motion';
import { usePageVisibility } from '@gaudi/design-system/hooks/environment/use-page-visibility';
import { useElementSize } from '@gaudi/design-system/hooks/layout/use-element-size';
import { useInView } from '@gaudi/design-system/hooks/layout/use-in-view';
import { useMergedRefs } from '@gaudi/design-system/hooks/state/use-merged-refs';
import { BorderBeam } from 'border-beam';
import { useTheme } from 'next-themes';

import styles from './HandbookCardGlow.module.css';

// Match the Mav9 DS ChatInput “Opt-in glow” and Card glow treatment.
const connectPalette = (node) => {
  if (node?.dataset.beam) node.style.setProperty('--surface-glow-angle', `var(--beam-angle-${node.dataset.beam})`);
};

export default function HandbookCardGlow({ paused }) {
  const root = useRef(null);
  const [ radius, setRadius ] = useState(null);
  const [ viewRef, inView ] = useInView();
  const [ sizeRef ] = useElementSize({
    'onResize': () => {
      if (root.current) setRadius(Number.parseFloat(window.getComputedStyle(root.current).borderTopLeftRadius) || 0);
    }
  });
  const ref = useMergedRefs(root, viewRef, sizeRef);
  const reduced = usePrefersReducedMotion();
  const visible = usePageVisibility();
  const { resolvedTheme } = useTheme();
  const running = !paused && !reduced && inView && visible && radius !== null && Boolean(resolvedTheme);
  const still = paused || reduced;
  const inactiveState = still ? 'still' : 'suspended';

  return (
    <div ref={ ref } aria-hidden='true' className={ styles.glow } data-theme={ radius === null ? undefined : resolvedTheme }
      data-state={ running ? 'animated' : inactiveState }>
      {running && (
        <BorderBeam ref={ connectPalette } active size='md' colorVariant='ocean' staticColors strength={ 0.8 }
          duration={ 3 } borderRadius={ radius } theme={ resolvedTheme === 'dark' ? 'dark' : 'light' }
          style={{ '--beam-stroke-opacity': 2, 'height': '100%', 'inset': 0, 'position': 'absolute', 'width': '100%' }}>
          {null}
        </BorderBeam>
      )}
    </div>
  );
}
