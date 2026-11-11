import { Icon, Link } from '@gaudi/design-system';

import siteMetadata from '@/data/meta/metadata';
import formatDate, { formatShortDate } from '@/lib/utils/formatDate';

import styles from './HandbookOverview.module.css';

/** Local navigation shared by the handbook's directory and update history. */
export const HandbookNavigation = ({ handbook, current }) => (
  <nav aria-label='Handbook' className={ styles.navigation }>
    <Link href='/blog' variant='muted' className={ styles.back }><Icon name='ArrowLeft' size='sm' decorative />Blog</Link>
    <div className={ styles.tabs }>
      <Link href={ handbook.href } aria-current={ current === 'overview' ? 'page' : undefined }>Overview</Link>
      <Link href={ handbook.updatesHref } aria-current={ current === 'updates' ? 'page' : undefined }>Updates</Link>
      <Link href={ `/blog/${handbook.index.slug}` }>About the handbook</Link>
    </div>
  </nav>
);

/** Public milestones come from the handbook index's curated changelog. */
export const HandbookUpdateList = ({ updates, compact = false }) => (
  <ol className={ compact ? styles.recentChanges : styles.updateList }>
    {updates.map((update, index) => (
      <li key={ `${update.slug}-${update.date}-${index}` }>
        <time dateTime={ update.date }>{formatShortDate(update.date)}</time>
        <div>
          <Link href={ `/blog/${update.slug}#changelog` } className={ styles.updateTitle }>{update.title}</Link>
          <p>{update.summary}</p>
        </div>
      </li>
    ))}
  </ol>
);

export default function HandbookOverview({ handbook }) {
  const firstChapter = handbook.chapters[0];

  return (
    <div className={ styles.handbook }>
      <HandbookNavigation handbook={ handbook } current='overview' />
      <header className={ styles.cover }>
        <div>
          <h1>{handbook.index.title}</h1>
          <p className={ styles.byline }>By {siteMetadata.author}<span aria-hidden='true'>·</span>{handbook.chapters.length} chapters</p>
        </div>
        <div className={ styles.introduction }>
          <p className={ styles.subtitle }>{handbook.index.subtitle}</p>
          <p className={ styles.readingNote }>{handbook.index.summary}</p>
          {firstChapter && (
            <Link href={ `/blog/${firstChapter.slug}` } variant='bare' className={ styles.start }>
              Start reading<Icon name='ArrowRight' size='sm' decorative />
            </Link>
          )}
          <p className={ styles.updated }>Last updated <time dateTime={ handbook.updated }>{formatDate(handbook.updated)}</time></p>
        </div>
      </header>

      <div className={ styles.directoryGrid }>
        <section aria-labelledby='handbook-chapters' className={ styles.directory }>
          <div className={ styles.sectionHeading }><h2 id='handbook-chapters'>The chapters</h2><span>Read in order, or dip in</span></div>
          <ol className={ styles.chapterList }>
            {handbook.chapters.map((chapter) => (
              <li key={ chapter.slug }>
                <Link href={ `/blog/${chapter.slug}` } variant='bare' className={ styles.chapterLink }>
                  <span className={ styles.chapterNumber } aria-label={ `Chapter ${chapter.series.order}` }>{String(chapter.series.order).padStart(2, '0')}</span>
                  <div className={ styles.chapterCopy }>
                    <h3>{chapter.title}</h3>
                    <p>{chapter.subtitle}</p>
                    <span className={ styles.chapterDate }>Updated <time dateTime={ chapter.updated || chapter.date }>{formatShortDate(chapter.updated || chapter.date)}</time></span>
                  </div>
                  <Icon name='ArrowUpRight' size='sm' decorative className={ styles.chapterArrow } />
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <aside className={ styles.latest } aria-labelledby='handbook-latest'>
          <div className={ styles.sectionHeading }><h2 id='handbook-latest'>Latest changes</h2><Icon name='History' size='sm' decorative /></div>
          <p className={ styles.latestIntro }>New chapters, substantial sections and changes in approach.</p>
          {handbook.updates.length ? <HandbookUpdateList updates={ handbook.updates.slice(0, 3) } compact /> : <p className={ styles.latestIntro }>No updates published yet.</p>}
          <Link href={ handbook.updatesHref } className={ styles.moreChanges }>All updates<Icon name='ArrowRight' size='sm' decorative /></Link>
          <div className={ styles.about }>
            <h3>Written in practice</h3>
            <p>Lessons from two startups, what I think we should do now, and the CTO’s part in each decision. The current chapters draw mainly on our work at Mav9.</p>
            <Link href={ `/blog/${handbook.index.slug}` }>How to read this handbook<Icon name='ArrowUpRight' size='sm' decorative /></Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function HandbookUpdates({ handbook }) {
  return (
    <div className={ styles.handbook }>
      <HandbookNavigation handbook={ handbook } current='updates' />
      <header className={ styles.updatesHeader }>
        <h1>What’s changed</h1>
        <p>Major additions to <Link href={ handbook.href }>{handbook.index.title}</Link>: new chapters, substantial sections and changes in methodology.</p>
      </header>
      <section aria-label='Handbook change history' className={ styles.history }>
        <div className={ styles.historyNote }><h2>Handbook milestones</h2><p>The substantial changes, newest first.</p></div>
        {handbook.updates.length ? <HandbookUpdateList updates={ handbook.updates } /> : <p>No updates published yet.</p>}
      </section>
    </div>
  );
}
