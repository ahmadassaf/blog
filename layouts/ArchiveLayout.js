/**
 * Archive Layout Component
 *
 * @description The blog index layout: a display-scale page header, optional curated
 * content (featured posts), and the full archive under a sticky title bar that pins
 * to the viewport while recent year groups and older writing scroll past.
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
   * Keep the last two years grouped by publication year, then collect older writing under one label.
   * The shared sort key is `updated || date`; use publication dates here so edits do not move old
   * posts out of the archive. Compare calendar dates in UTC, matching Contentlayer's date fields.
   */
  const archiveCutoff = new Date();

  archiveCutoff.setUTCFullYear(archiveCutoff.getUTCFullYear() - 2);
  archiveCutoff.setUTCHours(0, 0, 0, 0);

  const archiveRows = [];
  const sortedPosts = [ ...posts ].sort((a, b) => new Date(b.date) - new Date(a.date));
  let lastGroup = null;

  for (const frontMatter of sortedPosts) {
    const publicationDate = new Date(frontMatter.date);
    const label = publicationDate < archiveCutoff ? 'Long time ago' : publicationDate.getUTCFullYear();

    if (label !== lastGroup) {
      archiveRows.push({ label, 'type': 'group' });
      lastGroup = label;
    }

    archiveRows.push({ frontMatter, 'type': 'post' });
  }

  return (
    <div>
      <PageHeader title={ title } titleVariant='display-lg' description={ description } classNames={{ 'description': 'max-w-none text-lg leading-8' }} />

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
          {archiveRows.map((row) => (row.type === 'group' ? (
            <li key={ `group-${row.label}` } role='presentation' className='pb-2 pt-8 first:pt-2'>
              <span className='block text-3xl font-extrabold leading-none tracking-tighter tabular-nums text-text-subtle/60'>
                {row.label}
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
