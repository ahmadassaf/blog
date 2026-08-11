/**
 * Slug Utilities
 *
 * @description Helpers for the taxonomy slug round-trip: decoding slugs from
 * route params, normalizing tag/category names into slugs, and deriving
 * display titles back from slugs. Shared by the category/tag routes, the
 * client explorers, and the post metadata generators so every surface spells
 * the slug transform the same way.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

/**
 * Safely decodes a URI component
 *
 * @description Wraps decodeURI so malformed URI sequences (e.g. a stray '%')
 * never crash rendering. Returns null when decoding fails so callers can
 * respond with a 404 or fall back gracefully.
 *
 * @param {string} value - The URI encoded value to decode
 * @returns {string|null} The decoded value, or null when decoding fails
 *
 * @example
 * const slug = safeDecodeURI(params.slug.join('/'));
 */
export function safeDecodeURI(value) {
  try {
    return decodeURI(value);
  } catch {
    return null;
  }
}

/**
 * Normalizes a tag or category name into its route slug
 *
 * @param {string} value - Human-readable tag or category name
 * @returns {string} Kebab-cased, lowercased slug
 *
 * @example
 * slugify('Machine Learning'); // 'machine-learning'
 */
export const slugify = (value) => value.replaceAll(' ', '-').toLowerCase().trim();

/**
 * Derives a title-cased display name from a kebab-case slug
 *
 * @param {string} slug - Kebab-cased slug from a route param
 * @returns {string} Title-cased display name
 *
 * @example
 * titleFromSlug('machine-learning'); // 'Machine Learning'
 */
export const titleFromSlug = (slug) => slug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
