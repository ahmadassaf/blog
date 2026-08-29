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
import { notFound } from 'next/navigation';

import categories from '@/app/content/categories';
import ListLayout from '@/layouts/ListLayout';
import { coreContent, paginate, paginationPageNumbers, published, sortPosts } from '@/lib/utils/contentlayer';
import { safeDecodeURI, slugify, titleFromSlug } from '@/lib/utils/slugs.mjs';

export const dynamicParams = false;

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
  const category = safeDecodeURI(categoryParam);

  if (category === null) return { 'title': 'Category not found' };

  const pageNumber = Number(pageParam);

  return {
    'alternates': { 'canonical': `/blog/categories/${category}/page/${pageNumber}` },
    'title': `Category: ${titleFromSlug(category)} | Page ${pageNumber}`
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
 * // [{ category: 'technology', page: '2' }, { category: 'technology', page: '3' }]
 */
export const generateStaticParams = async() => {
  const posts = published(allPosts);
  const paths = categories.map((category) => {
    const categoryPosts = posts.filter(
      (post) => slugify(post.category) === category.slug
    );
    const categoryPaths = paginationPageNumbers(categoryPosts.length, POSTS_PER_PAGE).map((page) => {
      return { 'category': category.slug, 'page': page.toString() };
    });

    return categoryPaths;
  });

  return paths.flat();
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
  const category = safeDecodeURI(categoryParam);

  if (category === null) notFound();

  const title = titleFromSlug(category);
  const posts = coreContent(sortPosts(published(allPosts))).filter((post) => slugify(post.category) === category);
  const page = paginate(posts, pageParam, POSTS_PER_PAGE);

  if (!page) notFound();

  return (
    <>
      <ListLayout posts={ page.pagePosts } listTitle={ `${title} Posts` } currentPage={ page.currentPage } totalPages={ page.totalPages } paginationURL={ `blog/categories/${category}/page` } baseURL={ `blog/categories/${category}` }/>
    </>
  );
}
