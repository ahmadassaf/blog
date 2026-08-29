/**
 * Taxonomy Generators
 *
 * @description Generates the tag and category JSON data files from blog posts.
 * Both taxonomies share the same count-and-emit shape (slug, counts, hrefs,
 * launcher metadata); only the source field and a couple of display fields differ.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { writeFileSync } from 'fs';

import navigationMetadata from '../../data/meta/navigationMetadata.mjs';
import { slugify } from '../utils/slugs.mjs';

/**
 * Counts taxonomy values across posts and writes them as a JSON file
 *
 * @param {Array<Object>} allPosts - Array of all blog post objects
 * @param {Object} options - Taxonomy configuration
 * @param {Function} options.entry - Maps (value, slug) to the taxonomy-specific fields (title, display, description, ...)
 * @param {Function} options.getValues - Extracts the taxonomy values from a post (array or single value)
 * @param {string} options.hrefBase - Base path for the taxonomy's listing pages
 * @param {string} options.outFile - JSON file to write
 * @param {string} options.type - Taxonomy type identifier (tag or category)
 * @returns {void} Writes the taxonomy JSON file
 */
function generateTaxonomy(allPosts, { entry, getValues, hrefBase, outFile, type }) {
  const entries = {};

  allPosts.forEach((post) => {
    for (const value of [ getValues(post) ].flat().filter(Boolean)) {
      const slug = slugify(value);

      // Increment count if the value was already seen, otherwise create its entry
      if (entries[slug]) entries[slug].count++;
      else entries[slug] = {
        'count': 1,
        ...entry(value, slug),
        'href': `${hrefBase}/${slug}`,
        'id': slug,
        'showType': false,
        slug,
        type
      };
    }
  });

  writeFileSync(outFile, JSON.stringify(Object.values(entries)));
}

/**
 * Generates tag data from all blog posts into app/content/tags.json
 *
 * @param {Array<Object>} allPosts - Array of all blog post objects
 * @returns {void} Writes tags.json file to app/content/
 */
export function getAllTags(allPosts) {
  generateTaxonomy(allPosts, {
    'entry': (tag) => {
      return { 'children': tag, 'display': tag, 'title': tag };
    },
    'getValues': (post) => post.tags,
    'hrefBase': '/blog/tags',
    'outFile': './app/content/tags.json',
    'type': 'tag'
  });
}

/**
 * Generates category data from all blog posts into app/content/categories.json
 *
 * @param {Array<Object>} allPosts - Array of all blog post objects
 * @returns {void} Writes categories.json file to app/content/
 */
export function getAllCategories(allPosts) {
  generateTaxonomy(allPosts, {
    'entry': (category, slug) => {
      return { 'children': category, 'description': navigationMetadata.categoriesMetadata[category], 'title': slug };
    },
    'getValues': (post) => post.category,
    'hrefBase': '/blog/categories',
    'outFile': './app/content/categories.json',
    'type': 'category'
  });
}
