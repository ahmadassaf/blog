'use client';

import PixelBlast from '@gaudi/design-system/animations/PixelBlast';
import { useInView } from '@gaudi/design-system/hooks/layout/use-in-view';
import { cn } from '@gaudi/design-system/utilities/cn';

import useBackdropMotion from './useBackdropMotion';

import styles from './BackdropMotion.module.css';

export default function PageBackdrop({ children, className, intensity = 0.6 }) {
  const [ ref, inView ] = useInView();
  const animate = useBackdropMotion(inView);

  return (
    <div ref={ ref } className={ cn('relative', className) }>
      <div aria-hidden='true' className={ styles.about }>
        {animate && (
          <div className={ styles.motion }>
            <PixelBlast height='100%' intensity={ intensity } transparent mask='text' className='rounded-none' />
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
