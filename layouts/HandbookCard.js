import { CardRoot, CardTitle, Icon, Link } from '@gaudi/design-system';

import { formatShortDate } from '@/lib/utils/formatDate';

import styles from './HandbookCard.module.css';

/** Homepage entry into the handbook, using its published title and metadata. */
export default function HandbookCard({ handbook }) {
  return (
    <section aria-labelledby='home-handbook-title' className={ styles.section }>
      <CardRoot variant='outline' padding='none' className={ styles.card }>
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
      </CardRoot>
    </section>
  );
}
