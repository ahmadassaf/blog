/**
 * Archive Layout Component
 *
 * @description The blog/category/tag archive: a standard page header, optional curated
 * content (featured posts), and a year-grouped archive with expandable older posts.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { Collapsible, CollapsibleContent, CollapsibleTrigger, EmptyState, Icon, Link, Pill, Typography } from '@gaudi/design-system';
import PageHeader from '@gaudi/design-system/layout/PageHeader';

import { getArchiveYears } from '@/lib/utils/archiveYears';
import formatDate from '@/lib/utils/formatDate';
import { categoryTitleFromSlug, slugify } from '@/lib/utils/slugs.mjs';

import styles from './ArchiveLayout.module.css';

const olderPostsPreviewCount = 5;
const updatesPreviewCount = 3;

/** Nested installments retain dates and descriptions; the parent carries the category. */
const ArchiveRow = ({ post, date = post.date, disclosure, description, isUpdate = false, showCategory = true }) => (
  <article className={ styles.row }>
    <div className={ styles.titleCell }>
      <Typography as={ isUpdate ? 'h4' : 'h3' } variant='index-list-title' className={ styles.title }>
        <Link href={ post.handbook ? '/blog/handbook' : `/blog/${post.slug}` } tone='neutral'>{post.title}</Link>
        {post.handbook && !disclosure && <Pill tone='gray' variant='soft' size='xs' className={ styles.kind }>Handbook</Pill>}
      </Typography>
      {disclosure}
      {description && <p className={ styles.seriesDescription }>{description}</p>}
    </div>
    <Typography as='time' variant='post-meta' dateTime={ date } className={ styles.date }>
      {formatDate(date)}
    </Typography>
    {showCategory && post.category && (
      <Link href={ `/blog/categories/${slugify(post.category)}` } tone='blue' className={ styles.category }>
        {categoryTitleFromSlug(post.category)}
      </Link>
    )}
  </article>
);

/** A compact entry shared by the blog archive and complete category lists. */
const ArchiveEntry = ({ post }) => {
  if (!post.seriesPosts?.length) return <li><ArchiveRow post={ post } /></li>;

  const singular = post.seriesPosts.length === 1;
  const membersLabel = `${post.handbook ? 'chapter' : 'more post'}${singular ? '' : 's'}`;

  return (
    <Collapsible asChild>
      <li>
        <ArchiveRow post={ post } disclosure={ (
          <CollapsibleTrigger className={ styles.seriesToggle } aria-label={ `Toggle ${post.seriesPosts.length} ${membersLabel} in ${post.series.title}` }>
            <span>{post.seriesPosts.length} {membersLabel}</span>
            <Icon name='ChevronDown' decorative size='sm' className={ styles.expandIcon } />
          </CollapsibleTrigger>
        ) } />
        <CollapsibleContent>
          <ol aria-label={ `${post.handbook ? 'Chapters' : 'More posts'} in ${post.series.title}` } className={ styles.seriesList }>
            {post.seriesPosts.map((part) => <li key={ part.slug }><ArchiveRow post={ part } description={ part.subtitle || part.summary } showCategory={ false } /></li>)}
          </ol>
        </CollapsibleContent>
      </li>
    </Collapsible>
  );
};

const MoreEntries = ({ children, count, noun }) => (
  <details className={ styles.olderPosts }>
    <summary className={ styles.expandToggle }>
      <span className={ styles.expandLabel }>Show {count} more {noun}{count === 1 ? '' : 's'}</span>
      <span className={ styles.collapseLabel }>Show fewer {noun}s</span>
      <Icon name='ChevronDown' decorative size='sm' className={ styles.expandIcon } />
    </summary>
    <ul>{children}</ul>
  </details>
);

const ArchiveUpdates = ({ articles, older, year }) => {
  const rows = articles.map((post) => (
    <li key={ post.slug }>
      <ArchiveRow post={ post } date={ post.updatedAt } isUpdate />
    </li>
  ));
  const remaining = rows.length - updatesPreviewCount;

  return (
    <section aria-label={ `Updated in ${year}` } className={ styles.updates }>
      <h3 className={ styles.subheading }>
        <Pill tone='blue' variant='soft' size='xs' className='rounded-full'>{older ? `Updated in ${year}` : 'Updated'}</Pill>
      </h3>
      <ul>{rows.slice(0, updatesPreviewCount)}</ul>
      {remaining > 0 && <MoreEntries count={ remaining } noun='update'>{rows.slice(updatesPreviewCount)}</MoreEntries>}
    </section>
  );
};

/**
 * Archive layout for the blog index
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.beforeList] - Curated content shown between the header and the archive
 * @param {string} [props.categorySlug] - Category filter for revisions to individual members of grouped series
 * @param {string} [props.description] - Introductory copy under the page title
 * @param {Array} props.posts - Published listing rows, with explicitly collapsed series already grouped
 * @param {string} [props.tagSlug] - Tag filter for revisions to individual members of grouped series
 * @param {string} props.title - Page-level heading
 * @param {string} [props.titleClassName] - Page-specific heading typography
 *
 * @returns {JSX.Element} The rendered archive layout
 *
 * @example
 * <ArchiveLayout posts={posts} title='Blog' description='...' />
 */
export default function ArchiveLayout({ beforeList, categorySlug, description, posts, tagSlug, title, titleClassName }) {
  const groups = getArchiveYears(posts, { categorySlug, tagSlug });

  return (
    <div>
      <PageHeader title={ title } description={ description } classNames={{ 'description': 'max-w-none text-lg leading-8', 'title': titleClassName }} />

      {beforeList ? <div>{beforeList}</div> : null}

      <section aria-label={ `${title} archive` }>
        {!posts.length && <EmptyState title='No posts found' description='There is nothing published here yet. New writing will land soon.' />}
        <ul aria-label='Posts by year' className={ styles.list }>
          {groups.map(({ label, older, 'posts': publications, updates }) => (
            <li key={ label } className={ styles.year }>
              <h2 className={ `${styles.group} block text-3xl font-extrabold leading-none tracking-tighter tabular-nums text-text-subtle/60` }>
                {label}
              </h2>
              {publications.length > 0 && (
                <>
                  <ul aria-label={ `Posts published · ${label}` }>
                    {(older ? publications.slice(0, olderPostsPreviewCount) : publications).map((post) => <ArchiveEntry key={ post.slug } post={ post } />)}
                  </ul>
                  {older && publications.length > olderPostsPreviewCount && (
                    <MoreEntries count={ publications.length - olderPostsPreviewCount } noun='post'>
                      {publications.slice(olderPostsPreviewCount).map((post) => <ArchiveEntry key={ post.slug } post={ post } />)}
                    </MoreEntries>
                  )}
                </>
              )}
              {updates.map(({ articles, year }) => <ArchiveUpdates key={ year } articles={ articles } older={ older } year={ year } />)}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
