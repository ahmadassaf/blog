/**
 * Archive Layout Component
 *
 * @description The blog/category archive: a standard page header, optional curated
 * content (featured posts), and a year-grouped archive with expandable older posts.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { EmptyState, Icon, Link, Typography } from '@gaudi/design-system';
import PageHeader from '@gaudi/design-system/layout/PageHeader';

import formatDate from '@/lib/utils/formatDate';
import { slugify, titleFromSlug } from '@/lib/utils/slugs.mjs';

import styles from './ArchiveLayout.module.css';

const olderPostsPreviewCount = 5;

/** A compact entry shared by the blog archive and complete category lists. */
const ArchiveEntry = ({ post }) => (
  <li>
    <article className={ styles.row }>
      <Typography as='h3' variant='index-list-title' className={ styles.title }>
        <Link href={ `/blog/${post.slug}` } tone='neutral'>{post.title}</Link>
      </Typography>
      <Typography as='time' variant='post-meta' dateTime={ post.date } className={ styles.date }>
        {formatDate(post.date)}
      </Typography>
      {post.category && (
        <Link href={ `/blog/categories/${slugify(post.category)}` } tone='blue' className={ styles.category }>
          {titleFromSlug(post.category)}
        </Link>
      )}
    </article>
  </li>
);

/**
 * Archive layout for the blog index
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.beforeList] - Curated content shown between the header and the archive
 * @param {string} [props.description] - Introductory copy under the page title
 * @param {Array} props.posts - Sorted, published core-content posts
 * @param {string} props.title - Page-level heading
 * @param {string} [props.titleClassName] - Page-specific heading typography
 *
 * @returns {JSX.Element} The rendered archive layout
 *
 * @example
 * <ArchiveLayout posts={posts} title='Blog' description='...' />
 */
export default function ArchiveLayout({ beforeList, description, posts, title, titleClassName }) {

  /*
   * Keep the last two years grouped by publication year, then collect older writing under one label.
   * The shared sort key is `updated || date`; use publication dates here so edits do not move old
   * posts out of the archive. Compare calendar dates in UTC, matching Contentlayer's date fields.
   */
  const archiveCutoff = new Date();

  archiveCutoff.setUTCFullYear(archiveCutoff.getUTCFullYear() - 2);
  archiveCutoff.setUTCHours(0, 0, 0, 0);

  const archiveRows = [];
  const collapsedPosts = [];
  const sortedPosts = [ ...posts ].sort((a, b) => new Date(b.date) - new Date(a.date));
  let lastGroup = null;
  let olderPostCount = 0;

  for (const frontMatter of sortedPosts) {
    const publicationDate = new Date(frontMatter.date);
    const isOlder = publicationDate < archiveCutoff;
    const label = isOlder ? 'Long time ago' : publicationDate.getUTCFullYear();

    if (label !== lastGroup) {
      archiveRows.push({ label, 'type': 'group' });
      lastGroup = label;
    }

    if (isOlder) olderPostCount += 1;

    if (isOlder && olderPostCount > olderPostsPreviewCount) collapsedPosts.push(frontMatter);
    else archiveRows.push({ frontMatter, 'type': 'post' });
  }

  return (
    <div>
      <PageHeader title={ title } description={ description } classNames={{ 'description': 'max-w-none text-lg leading-8', 'title': titleClassName }} />

      {beforeList ? <div>{beforeList}</div> : null}

      <section aria-label={ `${title} archive` }>
        {!posts.length && <EmptyState title='No posts found' description='There is nothing published here yet. New writing will land soon.' />}
        <ul aria-label='Posts by year' className={ styles.list }>
          {archiveRows.map((row) => (row.type === 'group' ? (
            <li key={ `group-${row.label}` } role='presentation' className={ styles.group }>
              <h2 className='block text-3xl font-extrabold leading-none tracking-tighter tabular-nums text-text-subtle/60'>
                {row.label}
              </h2>
            </li>
          ) : (
            <ArchiveEntry key={ row.frontMatter.slug } post={ row.frontMatter } />
          )))}
          {collapsedPosts.length > 0 && (
            <li>
              <details className={ styles.olderPosts }>
                <summary className={ styles.expandToggle }>
                  <span className={ styles.expandLabel }>Show {collapsedPosts.length} more {collapsedPosts.length === 1 ? 'post' : 'posts'}</span>
                  <span className={ styles.collapseLabel }>Show fewer posts</span>
                  <Icon name='ChevronDown' decorative size='sm' className={ styles.expandIcon } />
                </summary>
                <ul aria-label='More posts from long time ago'>
                  {collapsedPosts.map((post) => <ArchiveEntry key={ post.slug } post={ post } />)}
                </ul>
              </details>
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}
