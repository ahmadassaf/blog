/**
 * Contentlayer Utilities
 *
 * @description Utility functions for working with Contentlayer data.
 * Provides sorting, filtering, and data manipulation functions for
 * blog posts and content objects.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

/**
 * Internal date sorting function for descending order
 *
 * @param {string|Date} a - First date to compare
 * @param {string|Date} b - Second date to compare
 * @returns {number} Sort comparison result (-1, 0, 1)
 */
export function _dateSortDesc(a, b) {
  if (a > b) return -1;
  if (a < b) return 1;

  return 0;
}

/**
 * Sorts posts by date in descending order (newest first)
 *
 * @param {Array<Object>} posts - Array of post objects with date or updated fields
 * @returns {Array<Object>} Sorted posts array
 *
 * @example
 * const sortedPosts = sortPosts(allPosts);
 */
export function sortPosts(posts) {
  return posts.sort((a, b) => _dateSortDesc(a.updated || a.date, b.updated || b.date));
}

/**
 * Creates a new object with only specified keys from source object
 *
 * @param {Object} obj - Source object
 * @param {Array<string>} keys - Keys to pick from the object
 * @returns {Object} New object with only picked keys
 *
 * @example
 * const picked = pick(post, ['title', 'date', 'slug']);
 */
export const pick = (obj, keys) => keys.reduce((acc, key) => {
  acc[key] = obj[key] ?? null;

  return acc;
}, {});

/**
 * Creates a new object excluding specified keys from source object
 *
 * @param {Object} obj - Source object
 * @param {Array<string>} keys - Keys to omit from the object
 * @returns {Object} New object without omitted keys
 *
 * @example
 * const filtered = omit(post, ['body', '_raw']);
 */
export const omit = (obj, keys) => {
  const result = { ...obj };

  keys.forEach((key) => {
    delete result[key];
  });

  return result;
};

/**
 * Extracts core content fields from Contentlayer objects, removing heavy fields
 *
 * @param {Object|Array<Object>} content - Content object(s) from Contentlayer
 * @returns {Object|Array<Object>} Content with core fields only
 *
 * @example
 * const corePost = coreContent(post); // Removes body, _raw, _id, toc, structuredData
 * const corePosts = coreContent(allPosts);
 */
export function coreContent(content) {

  const _core = (item) => omit(item, [ 'body', '_raw', '_id', 'toc', 'structuredData' ]);

  return Array.isArray(content) ? content.map((item) => _core(item)) : _core(content);
}
