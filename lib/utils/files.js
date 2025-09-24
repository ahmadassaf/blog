/**
 * File System Utilities
 *
 * @description Utility functions for recursive file system operations
 * using functional programming patterns. Provides efficient directory
 * traversal and file collection functionality.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import fs from 'fs';
import path from 'path';

/**
 * Functional pipe utility for composing functions
 *
 * @param {...Function} fns - Functions to compose
 * @returns {Function} Composed function
 */
const pipe =
  (...fns) => (x) => fns.reduce((v, f) => f(v), x);

/**
 * Flattens nested arrays into a single array
 *
 * @param {Array} input - Input array that may contain nested arrays
 * @returns {Array} Flattened array
 */
const flattenArray = (input) => input.reduce((acc, item) => [ ...acc, ...(Array.isArray(item) ? item : [ item ]) ], []);

/**
 * Higher-order function that maps a function over an array
 *
 * @param {Function} fn - Function to map over array
 * @returns {Function} Function that applies fn to input array
 */
const map = (fn) => (input) => input.map(fn);

/**
 * Creates a function that joins paths with a given prefix
 *
 * @param {string} prefix - Path prefix to join with
 * @returns {Function} Function that joins extraPath with prefix
 */
const pathJoinPrefix = (prefix) => (extraPath) => path.join(prefix, extraPath);

/**
 * Recursively gets all files in a directory tree
 *
 * @param {string} folder - Root directory to traverse
 * @returns {Array<string>} Array of all file paths found recursively
 *
 * @example
 * const files = getAllFilesRecursively('./content');
 * // Returns: ['./content/file1.md', './content/subdir/file2.md', ...]
 */
// eslint-disable-next-line no-use-before-define
const getAllFilesRecursively = (folder) => pipe(fs.readdirSync, map(pipe(pathJoinPrefix(folder), walkDir)), flattenArray)(folder);

/**
 * Determines if a path is a file or directory and processes accordingly
 *
 * @param {string} fullPath - Complete file or directory path
 * @returns {string|Array<string>} File path if file, or array of files if directory
 */
const walkDir = (fullPath) => (fs.statSync(fullPath).isFile() ? fullPath : getAllFilesRecursively(fullPath));

export default getAllFilesRecursively;
