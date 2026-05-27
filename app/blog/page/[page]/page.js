/**
 * Blog Pagination Page Component
 *
 * @description Dynamic route component for paginated blog posts. Handles pagination
 * for the main blog listing, displaying a specific page of posts based on the
 * page parameter. Generates static paths for all possible page numbers.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { POSTS_PER_PAGE } from '@gaudi/design-system';
import { allPosts } from 'contentlayer/generated';

import ListLayout from '@/layouts/ListLayout';
import { coreContent, sortPosts } from '@/lib/utils/contentlayer';

/**
 * Generates static parameters for all blog pagination pages
 *
 * @description Creates static paths for all possible pagination pages based on
 * the total number of posts and posts per page configuration.
 *
 * @returns {Promise<Array<Object>>} Array of page parameter objects
 *
 * @example
 * // Generates paths like:
 * // [{ page: '1' }, { page: '2' }, { page: '3' }]
 */
export const generateStaticParams = async() => {
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const paths = Array.from({ 'length': totalPages }, (_, i) => {
    return { 'page': (i + 1).toString() };
  });

  return paths;
};

/**
 * Blog pagination page component
 *
 * @description Renders a specific page of blog posts with pagination controls.
 * Calculates the correct slice of posts to display based on the page number
 * and provides pagination metadata to the ListLayout component.
 *
 * @param {Object} props - Component props
 * @param {Object} props.params - Route parameters
 * @param {string} props.params.page - Page number as string
 *
 * @returns {JSX.Element} Paginated blog posts page
 *
 * @example
 * // Rendered at /blog/page/2
 * // Shows posts 11-20 (assuming 10 posts per page)
 */
export default function Page({ params }) {
  const posts = coreContent(sortPosts(allPosts));
  const pageNumber = parseInt(params.page);

  // Calculate posts for current page
  const pagePosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1), POSTS_PER_PAGE * pageNumber
  );

  // Create pagination metadata
  const pagination = {
    'currentPage': pageNumber,
    'totalPages': Math.ceil(posts.length / POSTS_PER_PAGE)
  };

  return (
    <ListLayout
      posts={ pagePosts }
      currentPage={ pagination.currentPage }
      totalPages={ pagination.totalPages }
      paginationURL='blog/page'
      baseURL='blog'
    />
  );
}
