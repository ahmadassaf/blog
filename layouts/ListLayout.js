/**
 * List Layout Component
 *
 * @description Layout for displaying a titled list of blog posts with pagination.
 * Used by the category and tag listing pages. The blog index uses ArchiveLayout.
 *
 * @author Ahmad Assaf
 * @version 2.0.0
 */

import { PaginationBar,
  POSTS_PER_PAGE,
  Typography } from '@gaudi/design-system';

import PostPreview from '@/layouts/PostPreview';

/**
 * List layout component for displaying blog posts with pagination
 *
 * @description Renders a list of blog posts with pagination controls.
 * When `paginationURL` and `baseURL` are provided, pagination renders real links so every page is
 * crawlable (page 1 resolves to the base URL, subsequent pages to the pagination URL). When
 * `currentPage`/`totalPages` are provided the posts are treated as a pre-sliced page; otherwise the
 * component slices the first page itself.
 *
 * @param {Object} props - Component props
 * @param {string} props.listTitle - Page heading rendered above the list
 * @param {Array} props.posts - Array of post objects to display
 * @param {string} [props.baseURL] - Base URL for page 1 of the pagination links
 * @param {string} [props.paginationURL] - URL prefix for pagination links (pages 2+)
 * @param {number} [props.currentPage] - Current page number for pre-sliced posts
 * @param {number} [props.totalPages] - Total number of pages for pre-sliced posts
 *
 * @returns {JSX.Element} The rendered list layout component
 *
 * @example
 * <ListLayout
 *   posts={pagePosts}
 *   listTitle="Machine Learning Posts"
 *   baseURL="blog"
 *   paginationURL="blog/page"
 *   currentPage={1}
 *   totalPages={5}
 * />
 */
export default function ListLayout({ posts, listTitle, baseURL, paginationURL, currentPage = 1, totalPages }) {

  const listTitleId = 'article-list-title';

  const isPreSliced = totalPages !== undefined;
  const pageCount = totalPages ?? Math.ceil(posts.length / POSTS_PER_PAGE);
  const displayPosts = isPreSliced ? posts : posts.slice(0, POSTS_PER_PAGE);

  // Build crawlable pagination hrefs: page 1 maps to the base URL, later pages to the pagination URL
  const getPageHref = (page) => (page === 1 ? `/${baseURL}` : `/${paginationURL}/${page}`);

  return (
    <div>
      <header className='pb-4'>
        <Typography id={ listTitleId } variant='title-md' as='h1' className='leading-9 sm:leading-10'>
          {listTitle}
        </Typography>
      </header>

      <section aria-labelledby={ listTitleId }>
        <ul className='pt-2'>
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
          {displayPosts.map((frontMatter) => (
            <PostPreview key={ frontMatter.slug } frontMatter={ frontMatter } titleAs='h2' />
          ))}
        </ul>

        {pageCount > 1 && (
          <PaginationBar
            currentPage={ currentPage }
            totalPages={ pageCount }
            getHref={ getPageHref }
          />
        )}
      </section>
    </div>
  );
}
