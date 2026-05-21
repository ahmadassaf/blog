/**
 * Tag Pagination Page Component
 *
 * @description Dynamic route component for paginated tag-filtered blog posts.
 * Handles pagination for tag views, displaying a specific page of posts
 * based on both tag and page parameters.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { allPosts } from 'contentlayer/generated';

import tags from '@/app/content/tags';
import { POSTS_PER_PAGE } from '@/components/content/Pagination';
import ListLayout from '@/layouts/ListLayout';
import { coreContent, sortPosts } from '@/lib/utils/contentlayer';

/**
 * Generates metadata for the tag pagination page
 *
 * @description Creates page metadata including formatted tag title and page number
 * for SEO and browser display. Converts kebab-case tag slugs to proper title case.
 *
 * @param {Object} props - Component props
 * @param {Object} props.params - Route parameters
 * @param {string} props.params.tag - Tag slug from URL parameter
 * @param {string} props.params.page - Page number from URL parameter
 *
 * @returns {Promise<Object>} Metadata object with formatted title
 *
 * @example
 * // For tag 'machine-learning' and page '2'
 * // Returns: { title: 'Tag: Machine Learning | Page 2' }
 */
export async function generateMetadata({ params }) {
  const tag = decodeURI(params.tag);
  const title = tag.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const pageNumber = parseInt(params.page);

  return {
    'title': `Tag: ${title} | Page ${pageNumber}`
  };
}

/**
 * Generates static parameters for all tag pagination pages
 *
 * @description Creates static paths for all tag pagination combinations to enable
 * static generation at build time. Calculates total pages needed for each tag
 * based on post count and posts per page configuration.
 *
 * @returns {Promise<Array<Object>>} Array of tag and page parameter objects
 *
 * @example
 * // Returns array like:
 * // [{ tag: 'javascript', page: '1' }, { tag: 'javascript', page: '2' }]
 */
export const generateStaticParams = async() => {
  const paths = tags.map((tag) => {
    const tagPages = Math.ceil(allPosts.filter(
      (post) => post.tags.map((_tag) => _tag.replace(' ', '-').toLowerCase().trim()).includes(tag.slug)
    ).length / POSTS_PER_PAGE);
    const tagPaths =  Array.from({ 'length': tagPages }, (_, index) => {
      return { 'page': (index + 1).toString(), 'tag': tag.slug };
    });

    return tagPaths;
  });

  return paths;
};

/**
 * Tag pagination page component
 *
 * @description Renders a specific page of blog posts filtered by tag with pagination.
 * Calculates the correct slice of posts to display based on both tag filter
 * and page number, providing pagination metadata to the ListLayout component.
 *
 * @param {Object} props - Component props
 * @param {Object} props.params - Route parameters
 * @param {string} props.params.tag - Tag slug to filter posts by
 * @param {string} props.params.page - Page number as string
 *
 * @returns {JSX.Element} Paginated tag-filtered blog posts page
 *
 * @example
 * // Rendered at /blog/tags/javascript/page/2
 * // Shows page 2 of posts tagged with 'javascript'
 */
export default function Page({ params }) {
  const tag = decodeURI(params.tag);
  const title = tag.replace('-', ' ');
  const posts = coreContent(sortPosts(allPosts)).filter((post) => post.tags.map((_tag) => _tag.replace(' ', '-').toLowerCase()).includes(tag));
  const pageNumber = parseInt(params.page);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  let pagination;

  const filteredPosts = posts.slice(POSTS_PER_PAGE * (pageNumber - 1), POSTS_PER_PAGE * pageNumber);

  if (pageNumber <= totalPages) pagination = {
    'currentPage': pageNumber,
    totalPages
  };

  return (
    <>
      <ListLayout posts={ filteredPosts } listTitle={ `${title} Posts` } currentPage={ pagination && pagination.currentPage } totalPages={ pagination && pagination.totalPages } paginationURL={ `blog/tags/${tag}/page` } baseURL={ `blog/tags/${tag}` }/>
    </>
  );
}
