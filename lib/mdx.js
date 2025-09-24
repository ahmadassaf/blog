/**
 * MDX File Utilities
 *
 * @description Utility functions for working with MDX and Markdown files.
 * Provides file discovery, path manipulation, and slug formatting for
 * content processing in the blog system.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import path from 'path';

import getAllFilesRecursively from './utils/files';

const root = process.cwd();

/**
 * Gets all files of a specific type from the data directory
 *
 * @description Recursively finds all files in the specified data subdirectory
 * and returns their relative paths with normalized separators.
 *
 * @param {string} type - Directory name within the data folder (e.g., 'blog', 'projects')
 * @returns {Array<string>} Array of relative file paths
 *
 * @example
 * // Get all blog post files
 * const blogFiles = getFiles('blog');
 * // Returns: ['post-1.md', 'category/post-2.mdx', ...]
 *
 * @example
 * // Get all project files
 * const projectFiles = getFiles('projects');
 */
export function getFiles(type) {
  const prefixPaths = path.join(root, 'data', type);
  const files = getAllFilesRecursively(prefixPaths);

  return files.map((file) => file.slice(prefixPaths.length + 1).replace(/\\/g, '/'));
}

/**
 * Formats a file slug by removing the file extension
 *
 * @description Removes .md or .mdx extensions from file slugs to create clean URLs.
 * Uses a named capture group to match common markdown extensions.
 *
 * @param {string} slug - File slug with extension
 * @returns {string} Slug without file extension
 *
 * @example
 * formatSlug('my-post.md') // Returns: 'my-post'
 * formatSlug('another-post.mdx') // Returns: 'another-post'
 * formatSlug('no-extension') // Returns: 'no-extension'
 */
export function formatSlug(slug) {
  return slug.replace(/\.(?<mdx>mdx|md)/, '');
}
