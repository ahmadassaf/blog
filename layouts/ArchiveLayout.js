/**
 * Archive Layout Component
 *
 * @description The blog index layout: a display-scale page header, optional curated
 * content (featured posts), and the full archive under a sticky title bar that pins
 * to the viewport while the post list scrolls past with the page.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { Typography } from '@gaudi/design-system';

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

  // The archive lists by publication date, so it re-sorts on `date` locally
  const archivePosts = [ ...posts ].sort((a, b) => (a.date > b.date ? -1 : 1));

  return (
    <div>
      <header className='pb-4'>
        <Typography variant='display-lg' as='h1' className='tracking-tight'>
          {title}
        </Typography>
        {description ? (
          <Typography variant='paragraph-md' className='mt-2 max-w-2xl text-lg leading-8 text-pretty'>
            {description}
          </Typography>
        ) : null}
      </header>

      {beforeList ? <div>{beforeList}</div> : null}

      <section aria-labelledby={ listTitleId }>
        <div className='sticky top-0 z-10 bg-background'>
          <div className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border-muted pb-4 pt-2 dark:border-border-dark'>
            <Typography id={ listTitleId } variant='heading-lg' as='h2' className='tracking-tight'>
              {listTitle}
            </Typography>
            <Typography as='span' variant='post-meta' className='shrink-0 font-medium'>
              {`${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`}
            </Typography>
          </div>
        </div>

        <ul aria-label={ `${listTitle} archive` } className='pt-2'>
          {!posts.length && (
            <li className='py-12 text-center'>
              <Typography variant='heading-sm' as='p' className='mb-2'>
                No posts found
              </Typography>
              <Typography variant='paragraph-sm'>
                There is nothing published here yet. New writing will land soon.
              </Typography>
            </li>
          )}
          {archivePosts.map((frontMatter) => (
            <PostPreview key={ frontMatter.slug } frontMatter={ frontMatter } titleAs='h3' />
          ))}
        </ul>
      </section>
    </div>
  );
}
