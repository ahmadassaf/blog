/**
 * Remark Footnote Data Plugin
 *
 * @description A remark plugin that extracts footnote definitions from markdown
 * and stores them as data for later use by rehype plugins. This runs at the
 * markdown AST level before any HTML transformation.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { visit } from 'unist-util-visit';

/**
 * Extract text content from markdown nodes
 */
function extractMarkdownText(node) {
  if (node.type === 'text') return node.value;

  if (node.type === 'link') {
    const linkText = node.children?.map(extractMarkdownText).join('') || '';

    return `<a href="${node.url}" target="_blank" rel="noopener">${linkText}</a>`;
  }
  if (node.type === 'strong') {
    const text = node.children?.map(extractMarkdownText).join('') || '';

    return `<strong>${text}</strong>`;
  }
  if (node.type === 'emphasis') {
    const text = node.children?.map(extractMarkdownText).join('') || '';

    return `<em>${text}</em>`;
  }
  if (node.type === 'inlineCode') return `<code>${node.value}</code>`;

  if (node.children) return node.children.map(extractMarkdownText).join('');

  return '';
}

/**
 * Remark plugin to extract and store footnote data
 */
export default function remarkFootnoteData() {
  return (tree, file) => {
    const footnotes = {};

    // Find footnote definitions
    visit(tree, 'footnoteDefinition', (node) => {
      const id = node.identifier;

      /*
       * Extract the content from the footnote definition
       * Footnote definitions contain children which are block-level nodes
       */
      const content = node.children
        .map((child) => {
          if (child.type === 'paragraph')

            // Extract inline content from paragraph
            return child.children.map(extractMarkdownText).join('');

          return extractMarkdownText(child);
        })
        .join(' ')
        .trim();

      footnotes[id] = content;
    });

    // Store footnotes in file data for the rehype popover plugin
    file.data.footnotes = footnotes;
  };
}
