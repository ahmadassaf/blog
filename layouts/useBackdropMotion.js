'use client';

import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@gaudi/design-system/hooks/a11y/use-prefers-reduced-motion';

export default function useBackdropMotion(ready) {
  const reduced = usePrefersReducedMotion(true);
  const [ started, setStarted ] = useState(false);
  const [ settled, setSettled ] = useState(false);

  useEffect(() => {
    if (ready && !reduced) setStarted(true);
  }, [ ready, reduced ]);

  useEffect(() => {
    if (!started) return undefined;

    const timeout = window.setTimeout(() => setSettled(true), 4600);

    return () => window.clearTimeout(timeout);
  }, [ started ]);

  return started && !settled && !reduced;
}
