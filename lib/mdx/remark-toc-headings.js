/**
 * Remark Table of Contents Plugin
 *
 * @description Remark plugin that generates hierarchical table of contents from headings.
 * Creates nested structures with proper IDs and URLs for navigation.
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
 * Generates normalized IDs and URLs for each heading.
 *
 * @returns {Function} Remark transformer function
 *
 * @example
 * // In remark configuration
 * .use(remarkTocHeadings)
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
function remarkTocHeadings() {
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

        // Skip headings with no text content
        if (!heading.value) return;

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
