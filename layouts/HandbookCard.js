'use client';

import { useState } from 'react';
import { Button, CardRoot, CardTitle, Icon, Link } from '@gaudi/design-system';
import Borealis from '@gaudi/design-system/animations/Borealis';

import { formatShortDate } from '@/lib/utils/formatDate';

import HandbookCardGlow from './HandbookCardGlow';

import styles from './HandbookCard.module.css';

const colors = [ 'var(--ds-color-accent)', 'var(--ds-color-chart-3)', 'var(--ds-color-chart-2)' ];

/** Homepage entry into the handbook, using its published title and metadata. */
export default function HandbookCard({ handbook }) {
  const [ paused, setPaused ] = useState(false);

  return (
    <section id='home-handbook' aria-labelledby='home-handbook-title' className={ styles.section }>
      <div className={ styles.frame }>
        <CardRoot variant='flat' padding='none' className={ styles.card }>
          <div className={ styles.background } aria-hidden='true'>
            <Borealis height='100%' variant='soft' amplitude={ 0.8 } blend={ 0.75 } speed={ 0.45 } fadeEdges={ false } colors={ colors } paused={ paused } />
          </div>
          <div className={ styles.content }>
            <CardTitle as='h2' id='home-handbook-title' className={ styles.title }>{handbook.index.title}</CardTitle>
            <p className={ styles.summary }>{handbook.index.summary}</p>
            <div className={ styles.footer }>
              <div className={ styles.details }>
                <p className={ styles.metadata }>
                  <span>{handbook.chapters.length} {handbook.chapters.length === 1 ? 'chapter' : 'chapters'}</span>
                  {handbook.updated && <span>Updated <time dateTime={ handbook.updated }>{formatShortDate(handbook.updated)}</time></span>}
                </p>
                <Button variant='ghost' tone='neutral' size='icon' className={ styles.pause }
                  aria-label={ paused ? 'Resume handbook animation' : 'Pause handbook animation' }
                  title={ paused ? 'Resume animation' : 'Pause animation' } onClick={ () => setPaused(!paused) }>
                  <Icon name={ paused ? 'Play' : 'Pause' } size='sm' decorative />
                </Button>
              </div>
              <Link href={ handbook.href } variant='bare' className={ styles.read }>
                Read the handbook<Icon name='ArrowRight' size='sm' decorative />
              </Link>
            </div>
          </div>
        </CardRoot>
        <HandbookCardGlow paused={ paused } />
      </div>
    </section>
  );
}
