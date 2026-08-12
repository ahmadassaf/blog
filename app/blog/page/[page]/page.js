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
import { notFound } from 'next/navigation';

import { metadataGenertaor } from '@/data/meta/generator/blog';
import ListLayout from '@/layouts/ListLayout';
import { coreContent, paginate, published, sortPosts } from '@/lib/utils/contentlayer';

/**
 * Generates metadata for the blog pagination page
 *
 * @description Creates page metadata with a page-numbered title and a
 * canonical URL pointing at the paginated route.
 *
 * @param {Object} props - Component props
 * @param {Object} props.params - Route parameters
 * @param {string} props.params.page - Page number as string
 *
 * @returns {Promise<Object>} Metadata object with title and canonical URL
 *
 * @example
 * // For page '2'
 * // Returns metadata titled 'Blog – Page 2' with canonical '/blog/page/2'
 */
export async function generateMetadata({ params }) {
  const { page } = await params;
  const pageNumber = Number(page);

  return metadataGenertaor({ 'path': `/blog/page/${pageNumber}`, 'title': `Blog – Page ${pageNumber}` });
}

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
  const totalPages = Math.ceil(published(allPosts).length / POSTS_PER_PAGE);
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
export default async function Page({ params }) {
  const { page } = await params;
  const posts = coreContent(sortPosts(published(allPosts)));
  const paginatedPage = paginate(posts, page, POSTS_PER_PAGE);

  if (!paginatedPage) notFound();

  return (
    <ListLayout
      posts={ paginatedPage.pagePosts }
      searchPosts={ posts }
      totalCount={ posts.length }
      pageTitle='Blog'
      listTitle='Latest writing'
      titleAs='h2'
      currentPage={ paginatedPage.currentPage }
      totalPages={ paginatedPage.totalPages }
      paginationURL='blog/page'
      baseURL='blog'
    />
  );
}
