import { Icon, Link, TableOfContents } from '@gaudi/design-system';

import formatDate from '@/lib/utils/formatDate';

import HandbookChapterNav from './HandbookChapterNav';
import PostComments from './PostComments';

import 'katex/dist/katex.css';
import styles from './HandbookLayout.module.css';

/** Chapter reading layout for the living handbook, retaining the authored MDX and its anchor links. */
export default function HandbookLayout({ children, content, next, prev, toc = [] }) {
  const handbook = content.handbookContext;
  const updated = content.updated || content.date;
  const hasChanges = content.changes?.length > 0;
  const previousIsOverview = prev?.slug === handbook.indexSlug;

  return (
    <div className={ styles.layout }>
      <HandbookChapterNav handbook={ handbook } currentSlug={ content.slug } />
      <article id='top' className={ styles.article }>
        <header className={ styles.header }>
          <h1 className={ styles.title }>{content.title}</h1>
          {content.subtitle && <p className={ styles.subtitle }>{content.subtitle}</p>}
          <div className={ styles.metadata }>
            <span>{handbook.chapterNumber === null ? 'About the handbook' : `Chapter ${handbook.chapterNumber} of ${handbook.chapterCount}`}</span>
            <span>Updated <time dateTime={ updated }>{formatDate(updated)}</time></span>
            {hasChanges && <Link href='#changelog' variant='bare' className={ styles.changesLink }>View changes <Icon name='ArrowDown' decorative size='xs' /></Link>}
          </div>
          {toc.length > 0 && (
            <details className={ styles.contents } open={ content.tableOfContents === true }>
              <summary className={ styles.contentsToggle }>
                <Icon name='List' decorative size='sm' />
                On this page
                <Icon name='ChevronDown' decorative size='xs' className={ styles.menuIcon } />
              </summary>
              <div className={ styles.contentsBody }>
                <TableOfContents toc={ toc } indexVisuals={ false } aria-label='Chapter contents' />
              </div>
            </details>
          )}
        </header>
        <div className={ `prose dark:prose-invert post-reading ${styles.body}` }>
          {children}
        </div>
        <nav aria-label='Adjacent handbook chapters' className={ styles.adjacent }>
          {prev ? (
            <Link href={ previousIsOverview ? handbook.href : `/blog/${prev.slug}#top` } variant='bare' className={ styles.previous }>
              <span className={ styles.adjacentDirection }><Icon name='ArrowLeft' decorative size='sm' />{previousIsOverview ? 'Overview' : 'Previous chapter'}</span>
              <span className={ styles.adjacentTitle }>{previousIsOverview ? handbook.title : prev.title}</span>
            </Link>
          ) : <Link href={ handbook.href } variant='bare' className={ styles.previous }><span className={ styles.adjacentDirection }><Icon name='ArrowLeft' decorative size='sm' />Handbook overview</span></Link>}
          {next ? (
            <Link href={ `/blog/${next.slug}#top` } variant='bare' className={ styles.next }>
              <span className={ styles.adjacentDirection }>Next chapter<Icon name='ArrowRight' decorative size='sm' /></span>
              <span className={ styles.adjacentTitle }>{next.title}</span>
            </Link>
          ) : <Link href={ handbook.updatesHref } variant='bare' className={ styles.next }><span className={ styles.adjacentDirection }>All updates<Icon name='ArrowRight' decorative size='sm' /></span></Link>}
        </nav>
        <div className={ styles.comments }><PostComments /></div>
      </article>
    </div>
  );
}
