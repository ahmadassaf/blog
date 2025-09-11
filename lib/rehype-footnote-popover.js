/**
 * Rehype Footnote Popover Plugin
 *
 * @description A rehype plugin that enhances footnote links with popover functionality.
 * Extracts footnote content and adds it as data attributes to footnote reference links.
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
 * Extract HTML content from a node
 */
function extractHtml(node) {

  // For footnotes, we want to preserve links and formatting
  let html = '';

  function processNode(n) {
    if (n.type === 'text') html += n.value;
    else if (n.type === 'element') if (n.tagName === 'a' && !n.properties?.['data-footnote-backref']) {

      // Preserve links (but not the back reference link)
      const href = n.properties?.href || '#';
      const text = extractText(n);

      html += `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;
    } else if (n.tagName === 'strong' || n.tagName === 'em' || n.tagName === 'code') {

      // Preserve formatting
      const text = extractText(n);

      html += `<${n.tagName}>${text}</${n.tagName}>`;
    } else if (n.children) {
      n.children.forEach(processNode);
    }

  }

  if (node.children) node.children.forEach(processNode);

  return html.trim();
}

/**
 * Rehype plugin to add popover data to footnote links
 */
export default function rehypeFootnotePopover() {
  return (tree, file) => {
    const footnotes = {};
    let footnoteRefsFound = 0;

    // First pass: collect all footnote content
    visit(tree, 'element', (node) => {

      // Find footnote list items
      if (node.tagName === 'li' && node.properties?.id?.startsWith('user-content-fn-')) {
        const id = node.properties.id.replace('user-content-fn-', '');

        // Extract the footnote content (excluding the back reference)
        let footnoteHtml = '';

        // Process all children to extract the actual footnote content
        if (node.children) node.children.forEach((child) => {
          if (child.type === 'element' && child.tagName === 'p') {

            // Extract HTML but skip the back reference link and loading icons
            const tempHtml = [];

            if (child.children) child.children.forEach((grandchild, index) => {

              // Skip back reference links
              if (grandchild.type === 'element' &&
                      grandchild.tagName === 'a' &&
                      grandchild.properties?.['data-footnote-backref'] !== undefined) return;

              // Handle spans - check if they contain loading icons or actual content
              if (grandchild.type === 'element' && grandchild.tagName === 'span') {

                // Check if this is a loading icon span
                const hasLoadingIcon = grandchild.children?.some((c) => c.type === 'element' && c.tagName === 'img' &&
                      (c.properties?.className === 'loading-icon' ||
                       c.properties?.src?.includes('loading')));

                if (hasLoadingIcon) {

                  // This is a preview component placeholder - look for the next sibling which should be the actual link
                  const nextSibling = child.children[index + 1];

                  if (nextSibling && nextSibling.type === 'element' && nextSibling.tagName === 'a')

                  // Use the next sibling instead
                    return;

                } else {

                  // Regular span content
                  tempHtml.push(extractText(grandchild));
                }

                return;
              }

              // Extract text or HTML from other elements
              if (grandchild.type === 'text') tempHtml.push(grandchild.value);
              else if (grandchild.type === 'element') if (grandchild.tagName === 'a' && !grandchild.properties?.['data-footnote-backref']) {
                const href = grandchild.properties?.href || '#';
                const text = extractText(grandchild);

                if (text && text !== '↩') tempHtml.push(`<a href="${href}" target="_blank" rel="noopener">${text}</a>`);

              } else if (grandchild.tagName === 'strong' || grandchild.tagName === 'em' || grandchild.tagName === 'code') {
                const text = extractText(grandchild);

                tempHtml.push(`<${grandchild.tagName}>${text}</${grandchild.tagName}>`);
              } else if (grandchild.tagName !== 'a') {
                const text = extractText(grandchild);

                if (text) tempHtml.push(text);

              }

            });

            footnoteHtml = tempHtml.join('').trim();
          }
        });

        if (footnoteHtml) footnotes[id] = footnoteHtml;

      }
    });

    // Second pass: enhance footnote reference links with popover data
    visit(tree, 'element', (node) => {

      // Look for footnote reference links (they have data-footnote-ref="true")
      if (node.tagName === 'a' && (node.properties?.['data-footnote-ref'] === true || node.properties?.['data-footnote-ref'] === 'true' || node.properties?.dataFootnoteRef === true || node.properties?.dataFootnoteRef === 'true')) {
        footnoteRefsFound++;

        // Extract footnote number from the href
        const href = node.properties?.href || '';
        const match = href.match(/#user-content-fn-(\d+)/);

        if (match) {
          const footnoteId = match[1];
          const footnoteContent = footnotes[footnoteId];

          if (footnoteContent) {

            // Add data attributes for the popover
            node.properties['data-footnote-content'] = footnoteContent;
            node.properties['data-footnote-number'] = footnoteId;
            node.properties['data-footnote-popover'] = 'true';

            // Add class for styling
            const existingClass = node.properties.className || [];
            const classes = Array.isArray(existingClass) ? existingClass : [ existingClass ];

            classes.push('footnote-link');
            node.properties.className = classes;
          }
        }
      }
    });

    // Optional: Hide the footnotes section at the bottom since we're showing them in popovers
    visit(tree, 'element', (node) => {
      if (node.tagName === 'section' &&
          (node.properties?.['data-footnotes'] === true ||
           node.properties?.['data-footnotes'] === 'true' ||
           node.properties?.dataFootnotes === true)) {

        // Add a class to hide it via CSS
        const existingClass = node.properties.className || [];
        const classes = Array.isArray(existingClass) ? existingClass : [ existingClass ];

        classes.push('footnotes-section-hidden');
        node.properties.className = classes;
      }
    });
  };
}
