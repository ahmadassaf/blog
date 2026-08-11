/**
 * Build Script
 *
 * @description Post-build script that generates various JSON data files and RSS feeds
 * for the blog application. Runs after ContentLayer processing to create navigation
 * data, taxonomy information, and syndication feeds from processed content.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { allPosts } from '../.contentlayer/generated/index.mjs';
import getAllCategories from '../lib/contentLayer/generateCategories.mjs';
import getAllPublications from '../lib/contentLayer/generatePublications.mjs';
import getAllTags from '../lib/contentLayer/generateTags.mjs';

import rss from './rss.mjs';

/**
 * Main post-build function that generates all required data files
 *
 * @description Orchestrates the generation of various JSON data files and RSS feeds
 * by calling individual generator functions. Processes blog posts to extract tags
 * and categories, generates publication data, and creates RSS feeds for syndication.
 *
 * @returns {Promise<void>} Promise that resolves when all generation tasks complete
 *
 * @example
 * // Run as part of build process
 * npm run build // calls this script automatically
 *
 * @example
 * // Run manually during development
 * node scripts/build.mjs
 *
 * @example
 * // Generated files:
 * // - ./app/content/tags.json - Tag taxonomy with counts
 * // - ./app/content/categories.json - Category taxonomy with metadata
 * // - ./app/content/publications.json - Publications data
 * // - ./public/feed.xml - RSS feed for blog posts
 */
async function postbuild() {

  // Generate tag taxonomy from all blog posts
  getAllTags(allPosts);

  // Generate category taxonomy with descriptions
  getAllCategories(allPosts);

  // Generate publications data file
  getAllPublications();

  // Generate RSS feed for blog syndication
  await rss();
}

// Execute the post-build process
postbuild().catch((error) => {
  console.error('❌ Post-build failed:', error);
  process.exit(1);
});
