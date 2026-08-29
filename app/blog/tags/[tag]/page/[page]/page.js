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

import { POSTS_PER_PAGE } from '@gaudi/design-system';
import { allPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';

import tags from '@/app/content/tags';
import ListLayout from '@/layouts/ListLayout';
import { getPublishedPosts, paginate, paginationPageNumbers, published } from '@/lib/utils/contentlayer';
import { safeDecodeURI, slugify, titleFromSlug } from '@/lib/utils/slugs.mjs';

export const dynamicParams = false;

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
  const { 'page': pageParam, 'tag': tagParam } = await params;
  const tag = safeDecodeURI(tagParam);

  if (tag === null) return { 'title': 'Tag not found' };

  const pageNumber = Number(pageParam);

  return {
    'alternates': { 'canonical': `/blog/tags/${tag}/page/${pageNumber}` },
    'title': `Tag: ${titleFromSlug(tag)} | Page ${pageNumber}`
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
 * // [{ tag: 'javascript', page: '2' }, { tag: 'javascript', page: '3' }]
 */
export const generateStaticParams = async() => {

  // Normalize each post's tags once instead of once per tag in the loop below
  const postTagSlugs = published(allPosts).map((post) => post.tags.map(slugify));
  const paths = tags.map((tag) => {
    const tagPostCount = postTagSlugs.filter((slugs) => slugs.includes(tag.slug)).length;
    const tagPaths = paginationPageNumbers(tagPostCount, POSTS_PER_PAGE).map((page) => {
      return { 'page': page.toString(), 'tag': tag.slug };
    });

    return tagPaths;
  });

  return paths.flat();
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
export default async function Page({ params }) {
  const { 'page': pageParam, 'tag': tagParam } = await params;
  const tag = safeDecodeURI(tagParam);

  if (tag === null) notFound();

  const title = titleFromSlug(tag);
  const posts = getPublishedPosts(allPosts).filter((post) => post.tags.map(slugify).includes(tag));
  const page = paginate(posts, pageParam, POSTS_PER_PAGE);

  if (!page) notFound();

  return (
    <>
      <ListLayout posts={ page.pagePosts } listTitle={ `${title} Posts` } currentPage={ page.currentPage } totalPages={ page.totalPages } paginationURL={ `blog/tags/${tag}/page` } baseURL={ `blog/tags/${tag}` }/>
    </>
  );
}
