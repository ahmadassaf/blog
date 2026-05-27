/**
 * Category Pagination Page Component
 *
 * @description Dynamic route component for paginated category-filtered blog posts.
 * Handles pagination for category views, displaying a specific page of posts
 * based on both category and page parameters.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { POSTS_PER_PAGE } from '@gaudi/design-system';
import { allPosts } from 'contentlayer/generated';

import categories from '@/app/content/categories';
import ListLayout from '@/layouts/ListLayout';
import { coreContent, sortPosts } from '@/lib/utils/contentlayer';

/**
 * Generates metadata for the category pagination page
 *
 * @description Creates page metadata including formatted category title and page number
 * for SEO and browser display. Converts kebab-case category slugs to proper title case.
 *
 * @param {Object} props - Component props
 * @param {Object} props.params - Route parameters
 * @param {string} props.params.category - Category slug from URL parameter
 * @param {string} props.params.page - Page number from URL parameter
 *
 * @returns {Promise<Object>} Metadata object with formatted title
 *
 * @example
 * // For category 'web-development' and page '2'
 * // Returns: { title: 'Category: Web Development | Page 2' }
 */
export async function generateMetadata({ params }) {
  const { 'category': categoryParam, 'page': pageParam } = await params;
  const category = decodeURI(categoryParam);
  const title = category.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const pageNumber = parseInt(pageParam);

  return {
    'title': `Category: ${title} | Page ${pageNumber}`
  };
}

/**
 * Generates static parameters for all category pagination pages
 *
 * @description Creates static paths for all category pagination combinations to enable
 * static generation at build time. Calculates total pages needed for each category
 * based on post count and posts per page configuration.
 *
 * @returns {Promise<Array<Object>>} Array of category and page parameter objects
 *
 * @example
 * // Returns array like:
 * // [{ category: 'technology', page: '1' }, { category: 'technology', page: '2' }]
 */
export const generateStaticParams = async() => {
  const paths = categories.map((category) => {
    const categoryPages = Math.ceil(allPosts.filter(
      (post) => post.category.replace(' ', '-').toLowerCase().trim() === category.slug
    ).length / POSTS_PER_PAGE);
    const categoryPaths =  Array.from({ 'length': categoryPages }, (_, index) => {
      return { 'category': category.slug, 'page': (index + 1).toString() };
    });

    return categoryPaths;
  });

  return paths;
};

/**
 * Category pagination page component
 *
 * @description Renders a specific page of blog posts filtered by category with pagination.
 * Calculates the correct slice of posts to display based on both category filter
 * and page number, providing pagination metadata to the ListLayout component.
 *
 * @param {Object} props - Component props
 * @param {Object} props.params - Route parameters
 * @param {string} props.params.category - Category slug to filter posts by
 * @param {string} props.params.page - Page number as string
 *
 * @returns {JSX.Element} Paginated category-filtered blog posts page
 *
 * @example
 * // Rendered at /blog/categories/technology/page/2
 * // Shows page 2 of posts in 'technology' category
 */
export default async function Page({ params }) {
  const { 'category': categoryParam, 'page': pageParam } = await params;
  const category = decodeURI(categoryParam);
  const title = category.replace('-', ' ');
  const posts = coreContent(sortPosts(allPosts)).filter((post) => post.category.replace(' ', '-').toLowerCase() === category);
  const pageNumber = parseInt(pageParam);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  let pagination;

  const filteredPosts = posts.slice(POSTS_PER_PAGE * (pageNumber - 1), POSTS_PER_PAGE * pageNumber);

  if (pageNumber <= totalPages) pagination = {
    'currentPage': pageNumber,
    totalPages
  };

  return (
    <>
      <ListLayout posts={ filteredPosts } listTitle={ `${title} Posts` } currentPage={ pagination && pagination.currentPage } totalPages={ pagination && pagination.totalPages } paginationURL={ `blog/categories/${category}/page` } baseURL={ `blog/categories/${category}` }/>
    </>
  );
}
