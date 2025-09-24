/**
 * Remark Table of Contents Plugin
 *
 * @description Remark plugin that generates hierarchical table of contents from headings.
 * Supports heading level filtering, exclusion patterns, and creates nested structures
 * with proper IDs and URLs for navigation.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { toString } from 'mdast-util-to-string';
import { remark } from 'remark';
import { visit } from 'unist-util-visit';

/**
 * Creates a remark plugin that extracts table of contents from headings
 *
 * @description Processes heading nodes to create a hierarchical table of contents structure.
 * Supports filtering by heading levels and excluding specific headings by pattern matching.
 * Generates normalized IDs and URLs for each heading.
 *
 * @param {string|Array<string>} [exclude=''] - Pattern(s) to exclude from TOC
 * @param {number} [fromHeading=1] - Minimum heading level to include (1-6)
 * @param {number} [toHeading=6] - Maximum heading level to include (1-6)
 * @returns {Function} Remark transformer function
 *
 * @example
 * // In remark configuration
 * .use(remarkTocHeadings)
 *
 * @example
 * // With custom options
 * .use(remarkTocHeadings, ['Table of Contents', 'References'], 2, 4)
 *
 * @example
 * // Input markdown:
 * // # Introduction
 * // ## Getting Started
 * // ### Installation
 * // ## Configuration
 * //
 * // Results in nested TOC structure with IDs and URLs
 */
export function remarkTocHeadings(exclude = '', fromHeading = 1, toHeading = 6) {
  const re = Array.isArray(exclude) ? new RegExp(`^(${exclude.join('|')})$`, 'i') : new RegExp(`^(${exclude})$`, 'i');

  return (tree, file) => {
    const toc = [];

    // Extract all headings and create flat TOC structure
    visit(tree, 'heading', (node) => {
      const textContent = toString(node);
      const normalizedTextContent = textContent.replace(/ /g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();

      toc.push({
        'depth': node.depth,
        'id': normalizedTextContent,
        'url': `#${normalizedTextContent}`,
        'value': textContent
      });
    });

    /**
     * Builds nested TOC structure from flat heading list
     *
     * @description Converts flat array of headings into hierarchical structure
     * using a stack-based algorithm to properly nest child headings.
     *
     * @param {Array<Object>} tableOfContents - Flat array of heading objects
     * @returns {Array<Object>} Nested TOC structure with children arrays
     */
    const buildNestedToc = (tableOfContents) => {
      const nestedToc = [];
      const stack = [];

      tableOfContents.forEach((heading) => {

        // Skip headings outside the specified range or matching exclude pattern
        if (heading.depth < fromHeading || heading.depth > toHeading || re.test(heading.value)) return;

        const item = { ...heading, 'children': [] };

        // Pop stack items that are at same or deeper level
        while (stack.length > 0 && stack[stack.length - 1].depth >= heading.depth) stack.pop();

        // Add to root level or as child of last stack item
        if (stack.length === 0) nestedToc.push(item);
        else stack[stack.length - 1].children.push(item);

        stack.push(item);
      });

      return nestedToc;
    };

    file.data.toc = buildNestedToc(toc);
  };
}

/**
 * Extracts table of contents from markdown string
 *
 * @description Utility function that processes markdown content with the TOC plugin
 * and returns the generated table of contents structure. Useful for standalone
 * TOC extraction without full MDX processing.
 *
 * @param {string} markdown - Raw markdown content
 * @returns {Promise<Array<Object>>} Promise resolving to nested TOC structure
 *
 * @example
 * const markdown = '# Title\n## Subtitle\n### Section';
 * const toc = await extractTocHeadings(markdown);
 * // Returns hierarchical TOC with proper nesting
 */
export async function extractTocHeadings(markdown) {
  const vfile = await remark().use(remarkTocHeadings).process(markdown);

  return vfile.data.toc;
}
