import { Icon, Link } from '@gaudi/design-system';

import styles from './HandbookLayout.module.css';

/** Reading-order navigation shared by the desktop rail and the mobile chapter menu. */
const ChapterLinks = ({ handbook, currentSlug }) => (
  <>
    <Link href={ handbook.href } variant='bare' className={ styles.overviewLink }>
      <Icon name='ArrowLeft' decorative size='sm' />
      Handbook overview
    </Link>
    <ol className={ styles.chapterList }>
      {handbook.chapters.map((chapter) => (
        <li key={ chapter.slug }>
          <Link
            href={ `/blog/${chapter.slug}#top` }
            variant='bare'
            aria-current={ chapter.slug === currentSlug ? 'page' : undefined }
            className={ styles.chapterLink }
          >
            <span aria-hidden='true' className={ styles.chapterNumber }>{String(chapter.order).padStart(2, '0')}</span>
            <span>{chapter.title}</span>
          </Link>
        </li>
      ))}
    </ol>
    <div className={ styles.railFooter }>
      <Link href={ handbook.updatesHref } variant='bare'>All updates</Link>
      <Link href={ `/blog/${handbook.indexSlug}#top` } variant='bare' aria-current={ currentSlug === handbook.indexSlug ? 'page' : undefined }>About this handbook</Link>
    </div>
  </>
);

/** The chapter rail becomes an explicit disclosure below the reading layout's desktop breakpoint. */
export default function HandbookChapterNav({ handbook, currentSlug }) {
  const chapterPosition = handbook.chapterNumber === null ? `${handbook.chapterCount} chapters` : `Chapter ${handbook.chapterNumber} of ${handbook.chapterCount}`;

  return (
    <aside className={ styles.rail } aria-label='Handbook navigation'>
      <div className={ styles.railInner }>
        <Link href={ handbook.href } variant='bare' className={ styles.bookTitle }>{handbook.title}</Link>
        <nav aria-label='Handbook chapters' className={ styles.desktopNav }>
          <ChapterLinks handbook={ handbook } currentSlug={ currentSlug } />
        </nav>
        <details className={ styles.mobileNav }>
          <summary className={ styles.menuToggle }>
            <span>Chapters</span>
            <span className={ styles.menuPosition }>{chapterPosition}</span>
            <Icon name='ChevronDown' decorative size='sm' className={ styles.menuIcon } />
          </summary>
          <nav aria-label='Handbook chapters'>
            <ChapterLinks handbook={ handbook } currentSlug={ currentSlug } />
          </nav>
        </details>
      </div>
    </aside>
  );
}
