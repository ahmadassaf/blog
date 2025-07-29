/**
 * Remark Frontmatter Extraction Plugin
 *
 * @description Remark plugin that extracts YAML frontmatter from markdown files
 * and attaches it to the file's data object. Uses js-yaml to parse YAML content
 * and unist-util-visit to traverse the AST.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

// External libraries
import { load } from 'js-yaml';
import { visit } from 'unist-util-visit';

/**
 * Creates a remark plugin that extracts YAML frontmatter
 *
 * @description Processes the markdown AST to find YAML nodes and parse their content
 * into the file's data.frontmatter property. This makes frontmatter accessible
 * to other plugins and the final processing pipeline.
 *
 * @returns {Function} Remark transformer function
 *
 * @example
 * // In remark configuration
 * .use(remarkExtractFrontmatter)
 *
 * @example
 * // Input markdown with frontmatter:
 * // ---
 * // title: My Post
 * // date: 2024-01-01
 * // ---
 * // # Content
 * //
 * // Results in file.data.frontmatter = { title: 'My Post', date: '2024-01-01' }
 */
export function remarkExtractFrontmatter() {
  return (tree, file) => {
    visit(tree, 'yaml', (node, index, parent) => {
      file.data.frontmatter = load(node.value);
    });
  };
}
