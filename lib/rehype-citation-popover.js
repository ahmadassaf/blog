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
 * Format citation text with title in bold
 */
function formatCitationText(text) {

  /*
   * Pattern 1: Author Year. Title. Journal/Conference
   * Pattern 2: Author et al. Year. Title.
   */

  // Try to find the title between year and the next period
  const patterns = [

    // Author(s) Year. Title. Rest
    /^(?<authyear>.+?\d{4}\.\s+)(?<title>[^.]+\.)(?<rest>.*)$/,

    // Author(s). Year. Title. Rest
    /^(?<authyear2>.+?\.\s+\d{4}\.\s+)(?<title2>[^.]+\.)(?<rest2>.*)$/
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);

    if (match) {
      const prefix = match.groups.authyear || match.groups.authyear2;
      const title = match.groups.title || match.groups.title2;
      const suffix = match.groups.rest || match.groups.rest2;

      return `${prefix}<strong>${title}</strong>${suffix}`;
    }
  }

  // If no pattern matches, return original text
  return text;
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

          // Add data attributes for the popover with formatted text
          node.properties['data-citation-text'] = formatCitationText(reference.text);
          node.properties['data-citation-number'] = reference.number;
          node.properties['data-citation-popover'] = 'true';

          // Clean the citation link text content by removing brackets
          if (node.children && node.children.length > 0)
            visit(node, 'text', (textNode) => {
              textNode.value = textNode.value.replace(/[[\]]/g, '');
            });

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
