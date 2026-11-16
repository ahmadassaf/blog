'use client';

import { CardRoot, CardTitle, Icon, Link } from '@gaudi/design-system';
import Borealis from '@gaudi/design-system/animations/Borealis';
import { useInView } from '@gaudi/design-system/hooks/layout/use-in-view';

import { formatShortDate } from '@/lib/utils/formatDate';

import HandbookCardGlow from './HandbookCardGlow';
import useBackdropMotion from './useBackdropMotion';

import motionStyles from './BackdropMotion.module.css';
import styles from './HandbookCard.module.css';

const colors = [ 'var(--ds-color-accent)', 'var(--ds-color-chart-3)', 'var(--ds-color-chart-2)' ];

/** Homepage entry into the handbook, framed around the author’s CTO perspective. */
export default function HandbookCard({ handbook }) {
  const [ ref, inView ] = useInView();
  const animate = useBackdropMotion(inView);

  return (
    <section ref={ ref } id='home-handbook' aria-labelledby='home-handbook-title' className={ styles.section }>
      <div className={ styles.frame }>
        <CardRoot variant='flat' padding='none' className={ styles.card }>
          <div className={ styles.background } aria-hidden='true'>
            {animate && <div className={ motionStyles.motion }><Borealis height='100%' variant='soft' amplitude={ 1.25 } blend={ 0.65 } speed={ 1.25 } intensity={ 1.15 } fadeEdges={ false } colors={ colors } /></div>}
          </div>
          <div className={ styles.content }>
            <CardTitle as='h2' id='home-handbook-title' className={ styles.title }>{handbook.index.title}</CardTitle>
            <p className={ styles.summary }>{handbook.index.summary}</p>
            <div className={ styles.footer }>
              <p className={ styles.metadata }>
                <span>{handbook.chapters.length} {handbook.chapters.length === 1 ? 'chapter' : 'chapters'}</span>
                {handbook.updated && <span>Updated <time dateTime={ handbook.updated }>{formatShortDate(handbook.updated)}</time></span>}
              </p>
              <Link href={ handbook.href } variant='bare' className={ styles.read }>
                Read the handbook<Icon name='ArrowRight' size='sm' decorative />
              </Link>
            </div>
          </div>
        </CardRoot>
        <HandbookCardGlow animate={ animate } />
      </div>
    </section>
  );
}
