/**
 * List Layout Component
 *
 * @description Layout for displaying a titled list of blog posts with pagination.
 * Used by the category and tag listing pages. The blog index uses ArchiveLayout.
 *
 * @author Ahmad Assaf
 * @version 2.0.0
 */

import { EmptyState,
  PaginationBar,
  POSTS_PER_PAGE } from '@gaudi/design-system';
import PageHeader from '@gaudi/design-system/layout/PageHeader';

import PostPreview from '@/layouts/PostPreview';

/**
 * List layout component for displaying blog posts with pagination
 *
 * @description Renders a list of blog posts with pagination controls.
 * When `paginationURL` and `baseURL` are provided, pagination renders real links so every page is
 * crawlable (page 1 resolves to the base URL, subsequent pages to the pagination URL); they go to
 * PaginationBar as strings because this server component cannot hand it a function. When
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

  return (
    <div>
      <PageHeader titleId={ listTitleId } title={ listTitle } />

      <section aria-labelledby={ listTitleId }>
        {!posts.length && <EmptyState title='No posts found' description='There is nothing published here yet. New writing will land soon.' />}
        <ul className='pt-2'>
          {displayPosts.map((frontMatter) => (
            <PostPreview key={ frontMatter.slug } frontMatter={ frontMatter } titleAs='h2' />
          ))}
        </ul>

        {pageCount > 1 && (
          <PaginationBar
            currentPage={ currentPage }
            totalPages={ pageCount }
            firstPageHref={ `/${baseURL}` }
            hrefTemplate={ `/${paginationURL}/{page}` }
          />
        )}
      </section>
    </div>
  );
}
