/**
 * Categories Generator
 *
 * @description Utility script for processing and generating category data from blog posts.
 * Extracts unique categories from all posts, counts their usage, and creates a
 * JSON file with category metadata for navigation and filtering.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { writeFileSync } from 'fs';

import navigationMetadata from '../../data/meta/navigationMetadata.mjs';
import { slugify } from '../utils/slugs.mjs';

/**
 * Generates category data from all blog posts
 *
 * @description Processes all blog posts to extract unique categories, counts their usage,
 * and creates category objects with metadata including descriptions, URLs, and counts.
 * Writes the results to a JSON file for application consumption.
 *
 * @param {Array<Object>} allPosts - Array of all blog post objects
 * @param {string} allPosts[].category - Category name for the post
 *
 * @returns {void} Writes categories.json file to app/content/
 *
 * @example
 * // Usage in build script
 * const posts = await getAllPosts();
 * getAllCategories(posts);
 * // Creates ./app/content/categories.json with category data
 *
 * @example
 * // Generated category structure:
 * // {
 * //   "web-development": {
 * //     "title": "web-development",
 * //     "count": 5,
 * //     "description": "Posts about web development",
 * //     "href": "/blog/categories/web-development"
 * //   }
 * // }
 */
function getAllCategories(allPosts) {
  const categories = {};

  allPosts.forEach((post) => {
    if (post.category) {
      const formattedCategory = slugify(post.category);

      // Increment count if category already exists
      if (categories[formattedCategory])
        categories[formattedCategory].count++;
      else

        // Create new category object with metadata
        categories[formattedCategory] = {
          'children': post.category,
          'count': 1,
          'description': navigationMetadata.categoriesMetadata[post.category],
          'href': `/blog/categories/${formattedCategory}`,
          'id': formattedCategory,
          'showType': false,
          'slug': formattedCategory,
          'title': formattedCategory,
          'type': 'category'
        };

    }
  });

  // Write categories data to JSON file
  writeFileSync('./app/content/categories.json', JSON.stringify(Object.values(categories)));
}

export default getAllCategories;
