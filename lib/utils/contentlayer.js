/**
 * Contentlayer Utilities
 *
 * @description Content-collection helpers (sorting, core-field extraction).
 * The implementations live in the design system; this module re-exports them
 * so app code keeps a single import path (`@/lib/utils/contentlayer`).
 *
 * @author Ahmad Assaf
 * @version 2.0.0
 */

/*
 * Imported from the pure-data subpath (not the root barrel): this module is
 * also consumed by the contentlayer build pipeline, which must never pull in
 * React component code.
 */
import { coreContent, pick, sortPosts } from '@gaudi/design-system/utilities/content';

export { coreContent, pick, sortPosts };

/**
 * Filters out draft documents from a content collection
 *
 * @description Returns only the documents that are publishable (not marked as
 * drafts). Used by pages, static-params generators, and the sitemap so draft
 * content never leaks into built routes or SEO surfaces.
 *
 * @param {Array<Object>} [docs=[]] - Contentlayer documents to filter
 * @returns {Array<Object>} Documents that are not drafts
 *
 * @example
 * const posts = published(allPosts);
 */
export const published = (docs = []) => docs.filter((doc) => !doc.draft);

/**
 * The standard listing pipeline: published documents, sorted, stripped to core fields
 *
 * @description Every listing surface (homepage, blog index, category and tag pages)
 * renders the same shape; this keeps the pipeline in one place.
 *
 * @param {Array<Object>} [docs=[]] - Contentlayer documents
 * @returns {Array<Object>} Sorted, published core-content documents
 *
 * @example
 * const posts = getPublishedPosts(allPosts);
 */
export const getPublishedPosts = (docs = []) => coreContent(sortPosts(published(docs)));

/**
 * Validates a page param and slices the posts for that page
 *
 * @description Shared route guard for the paginated blog/category/tag pages.
 * Returns null when the page param is not an integer within range so callers
 * can respond with a 404.
 *
 * @param {Array<Object>} posts - Full, already-filtered post list
 * @param {string} pageParam - Raw page number from the route params
 * @param {number} perPage - Posts per page
 * @returns {{pagePosts: Array<Object>, currentPage: number, totalPages: number}|null} Page slice and pagination data, or null when the page is out of range
 *
 * @example
 * const page = paginate(posts, pageParam, POSTS_PER_PAGE);
 * if (!page) notFound();
 */
export const paginate = (posts, pageParam, perPage) => {
  const currentPage = Number(pageParam);
  const totalPages = Math.ceil(posts.length / perPage);

  if (!Number.isInteger(currentPage) || currentPage < 1 || currentPage > totalPages) return null;

  return {
    currentPage,
    'pagePosts': posts.slice(perPage * (currentPage - 1), perPage * currentPage),
    totalPages
  };
};

export const paginationPageNumbers = (itemCount, perPage) => {
  const totalPages = Math.ceil(itemCount / perPage);

  return Array.from({ 'length': Math.max(0, totalPages - 1) }, (_, index) => index + 2);
};
