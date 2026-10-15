/**
 * Archive Layout Component
 *
 * @description The blog index layout: a display-scale page header, optional curated
 * content (featured posts), and the full archive under a sticky title bar that pins
 * to the viewport while the year-grouped post list scrolls past with the page.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { EmptyState, Typography } from '@gaudi/design-system';
import PageHeader from '@gaudi/design-system/layout/PageHeader';

import PostPreview from '@/layouts/PostPreview';

/**
 * Archive layout for the blog index
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.beforeList] - Curated content shown between the header and the archive
 * @param {string} [props.description] - Introductory copy under the page title
 * @param {string} props.listTitle - Title shown in the sticky archive bar
 * @param {Array} props.posts - Sorted, published core-content posts
 * @param {string} props.title - Page-level heading
 *
 * @returns {JSX.Element} The rendered archive layout
 *
 * @example
 * <ArchiveLayout posts={posts} title='Blog' listTitle='All Posts' description='...' />
 */
export default function ArchiveLayout({ beforeList, description, listTitle, posts, title }) {

  const listTitleId = 'article-list-title';

  /*
   * Year markers give the archive a typographic rhythm and make long lists scannable at a glance.
   * The shared sort key is `updated || date`, but the archive labels rows by publication date, so
   * it re-sorts on `date` locally to keep every post under the year marker its metadata shows.
   */
  const archiveRows = [];
  const archivePosts = [ ...posts ].sort((a, b) => (a.date > b.date ? -1 : 1));
  let lastYear = null;

  for (const frontMatter of archivePosts) {
    const year = new Date(frontMatter.date).getFullYear();

    if (year !== lastYear) {
      archiveRows.push({ 'type': 'year', year });
      lastYear = year;
    }

    archiveRows.push({ frontMatter, 'type': 'post' });
  }

  return (
    <div>
      <PageHeader title={ title } titleVariant='display-lg' description={ description } classNames={{ 'description': 'text-lg leading-8' }} />

      {beforeList ? <div>{beforeList}</div> : null}

      <section aria-labelledby={ listTitleId }>
        <PageHeader
          sticky
          titleAs='h2'
          titleVariant='heading-lg'
          titleId={ listTitleId }
          title={ listTitle }
          classNames={{ 'root': 'items-baseline border-border-muted' }}
          actions={ <Typography as='span' variant='post-meta' className='font-medium'>{`${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`}</Typography> }
        />

        {!posts.length && <EmptyState title='No posts found' description='There is nothing published here yet. New writing will land soon.' />}
        <ul aria-label={ `${listTitle} archive` } className='pt-2'>
          {archiveRows.map((row) => (row.type === 'year' ? (
            <li key={ `year-${row.year}` } role='presentation' className='pb-2 pt-8 first:pt-2'>
              <span className='block text-3xl font-extrabold leading-none tracking-tighter tabular-nums text-text-subtle/60'>
                {row.year}
              </span>
            </li>
          ) : (
            <PostPreview key={ row.frontMatter.slug } frontMatter={ row.frontMatter } titleAs='h3' />
          )))}
        </ul>
      </section>
    </div>
  );
}
