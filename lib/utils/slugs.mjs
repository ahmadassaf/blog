/**
 * Slug Utilities
 *
 * @description Helpers for the taxonomy slug round-trip: decoding slugs from
 * route params, normalizing tag/category names into slugs, and deriving
 * display titles back from slugs. Shared by routes and content generators so
 * every surface applies the same transform.
 */

/**
 * Safely decodes a URI component.
 *
 * @param {string} value - The URI encoded value to decode
 * @returns {string|null} The decoded value, or null when decoding fails
 */
export function safeDecodeURI(value) {
  try {
    return decodeURI(value);
  } catch {
    return null;
  }
}

/**
 * Normalizes a tag or category name into its route slug.
 *
 * @param {string} value - Human-readable tag or category name
 * @returns {string} Kebab-cased, lowercased slug
 */
export const slugify = (value) => value.trim().toLowerCase().replace(/\s+/g, '-');

/**
 * Derives a title-cased display name from a kebab-case slug.
 *
 * @param {string} slug - Kebab-cased slug from a route param
 * @returns {string} Title-cased display name
 */
export const titleFromSlug = (slug) => slug
  .split('-')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');
