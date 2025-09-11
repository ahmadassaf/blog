/**
 * Rehype Citation Popover Plugin
 *
 * @description A rehype plugin that enhances citation links with popover functionality.
 * Wraps citation links with data attributes containing the reference text for client-side popovers.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { visit } from 'unist-util-visit';

/**
 * Extract text content from a node
 */
function extractText(node) {
  let text = '';

  visit(node, 'text', (textNode) => {
    text += textNode.value;
  });

  return text.replace(/\s+/g, ' ').trim();
}

/**
 * Rehype plugin to add popover data to citation links
 */
export default function rehypeCitationPopover() {
  return (tree, file) => {
    const references = {};

    // First pass: collect all bibliography entries
    visit(tree, 'element', (node) => {
      if (node.properties?.id?.startsWith('bib-')) {
        const { id } = node.properties;

        // Find the reference text in csl-right-inline
        let referenceText = '';
        let citationNumber = '';

        visit(node, 'element', (child) => {
          if (child.properties?.className?.includes('csl-right-inline')) referenceText = extractText(child);

          if (child.properties?.className?.includes('csl-left-margin')) citationNumber = extractText(child).replace(/[[\]]/g, '');

        });

        if (referenceText) references[id] = {
          'number': citationNumber,
          'text': referenceText.trim()
        };

      }
    });

    // Second pass: enhance citation links with popover data
    visit(tree, 'element', (node) => {
      if (node.tagName === 'a' &&
          node.properties?.href?.startsWith('#bib-')) {

        // Remove # from href
        const refId = node.properties.href.substring(1);
        const reference = references[refId];

        if (reference) {

          // Add data attributes for the popover
          node.properties['data-citation-text'] = reference.text;
          node.properties['data-citation-number'] = reference.number;
          node.properties['data-citation-popover'] = 'true';

          // Add class for styling
          const existingClass = node.properties.className || [];
          const classes = Array.isArray(existingClass) ? existingClass : [ existingClass ];

          classes.push('citation-link');
          node.properties.className = classes;
        }
      }
    });
  };
}
