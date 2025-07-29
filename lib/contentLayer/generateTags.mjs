/**
 * Tags Generator
 *
 * @description Utility script for processing and generating tag data from blog posts.
 * Extracts unique tags from all posts, counts their usage, and creates a
 * JSON file with tag metadata for navigation, filtering, and tag clouds.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

// External libraries
import { writeFileSync } from 'fs';

/**
 * Generates tag data from all blog posts
 * 
 * @description Processes all blog posts to extract unique tags, counts their usage,
 * and creates tag objects with metadata including display names, URLs, and counts.
 * Writes the results to a JSON file for application consumption.
 *
 * @param {Array<Object>} allPosts - Array of all blog post objects
 * @param {Array<string>} [allPosts[].tags] - Array of tag strings for the post
 * 
 * @returns {void} Writes tags.json file to app/content/
 * 
 * @example
 * // Usage in build script
 * const posts = await getAllPosts();
 * getAllTags(posts);
 * // Creates ./app/content/tags.json with tag data
 * 
 * @example
 * // Generated tag structure:
 * // {
 * //   "javascript": {
 * //     "title": "JavaScript",
 * //     "count": 12,
 * //     "display": "JavaScript",
 * //     "href": "/blog/tags/javascript"
 * //   }
 * // }
 * 
 * @example
 * // Input post with tags:
 * // {
 * //   title: "My Post",
 * //   tags: ["JavaScript", "React", "Web Development"]
 * // }
 * // Results in separate tag entries for each tag
 */
function getAllTags(allPosts) {
  const tags = {};

  allPosts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        const formattedTag = tag.replace(' ', '-').toLowerCase().trim();

        // Increment count if tag already exists
        if (tags[formattedTag]) {
          tags[formattedTag].count++;
        } else {
          // Create new tag object with metadata
          tags[formattedTag] = {
            children: tag,
            count: 1,
            display: tag,
            href: `/blog/tags/${formattedTag}`,
            id: formattedTag,
            showType: false,
            slug: formattedTag,
            title: tag,
            type: 'tag'
          };
        }
      });
    }
  });

  // Write tags data to JSON file
  writeFileSync('./app/content/tags.json', JSON.stringify(Object.values(tags)));
}

export default getAllTags;
