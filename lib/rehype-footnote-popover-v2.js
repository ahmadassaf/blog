/**
 * Rehype Footnote Popover Plugin V2
 *
 * @description A rehype plugin that adds popover data attributes to footnote links.
 * Works in conjunction with remark-footnote-data to get the actual footnote content.
 *
 * @author Ahmad Assaf
 * @version 2.0.0
 */

import { visit } from 'unist-util-visit';

/**
 * Adds a class to a hast element, normalizing className to an array first
 */
function addClass(node, name) {
  const existingClass = node.properties.className || [];
  const classes = Array.isArray(existingClass) ? existingClass : [ existingClass ];

  if (!classes.includes(name)) classes.push(name);

  node.properties.className = classes;
}

/**
 * Rehype plugin to add popover data to footnote links
 */
export default function rehypeFootnotePopoverV2() {
  return (tree, file) => {

    // Get footnotes from file data (set by remark plugin)
    const footnotes = file.data.footnotes || {};

    if (Object.keys(footnotes).length === 0) return;
    let complete = true;

    // Find footnote reference links and add popover data
    visit(tree, 'element', (node) => {

      /*
       * Look for footnote reference links
       * These are <a> tags with href="#user-content-fn-X" and data-footnote-ref="true"
       */
      if (node.tagName === 'a' &&
          node.properties?.href?.startsWith('#user-content-fn-') &&
          node.properties?.dataFootnoteRef) {

        // Extract footnote ID from href
        const encodedId = node.properties.href.slice('#user-content-fn-'.length);
        let footnoteId;

        try {
          footnoteId = decodeURIComponent(encodedId);
        } catch {
          complete = false;

          return;
        }
        const footnoteContent = footnotes[footnoteId];

        if (!footnoteContent) {
          complete = false;

          return;
        }

        node.properties['data-footnote-content'] = footnoteContent;
        node.properties['data-footnote-number'] = node.children.find((child) => child.type === 'text')?.value || footnoteId;
        node.properties['data-footnote-popover'] = 'true';
        addClass(node, 'footnote-link');
      }
    });

    // Keep the original notes accessible when any reference could not get a popover.
    if (!complete) return;

    // Hide the footnotes section at the bottom
    visit(tree, 'element', (node) => {
      if (node.tagName === 'section' && node.properties?.dataFootnotes)

        // Add a class to hide it via CSS
        addClass(node, 'footnotes-section-hidden');

    });
  };
}
