/**
 * Rehype Plugin: Internal Links Transformer
 *
 * @description Automatically transforms internal blog post links into Preview components.
 * Detects links that point to internal blog posts and replaces them with interactive preview cards
 * that show post metadata, tags, excerpts, and other information on hover.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { visit } from 'unist-util-visit';

/**
 * Pattern to match internal blog post URLs
 * Matches: /blog/category/slug or /blog/category/subcategory/slug
 */
const INTERNAL_BLOG_PATTERN = /^\/blog\/(?<category>[^/]+)\/(?<slug>.+)$/;

/**
 * Recursively extract text content from a node and its children
 *
 * @param {Object} node - The HAST node to extract text from
 * @returns {string} The extracted text content
 */
function extractTextFromNode(node) {
  if (node.type === 'text')
    return node.value;

  if (node.type === 'element' && node.children)
    return node.children
      .map((child) => extractTextFromNode(child))
      .filter(Boolean)
      .join('');

  return '';
}

/**
 * Rehype plugin to transform internal blog links into Preview components
 *
 * @description Transforms markdown links like [title](/blog/engineering/gaudi-my-bash-framework)
 * into Preview JSX components that render internal links through the MDX preview API.
 *
 * @returns {Function} Transformer function for rehype
 *
 * @example
 * // In ContentLayer config
 * rehypePlugins: [
 *   // ... other plugins
 *   rehypeInternalLinks
 * ]
 *
 * @example
 * // Transforms this markdown:
 * [**gaudi**](/blog/engineering/gaudi-my-bash-framework)
 *
 * // Into this JSX:
 * <Preview internal url="/blog/engineering/gaudi-my-bash-framework" title="gaudi" />
 */
function rehypeInternalLinks() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {

      // Only process anchor tags with href attributes
      if (node.tagName !== 'a' || !node.properties?.href)
        return;

      const { href } = node.properties;
      const match = href.match(INTERNAL_BLOG_PATTERN);

      if (!match)
        return; // Not an internal blog link

      // Extract the text content from the link
      const linkText = extractTextFromNode(node);

      // Skip transformation if we can't extract meaningful text
      if (!linkText || linkText.trim() === '')
        return;

      // Create the Preview JSX element
      const internalPreviewNode = {
        'children': [],
        'properties': {
          'internal': true,
          'title': linkText.trim(),
          'url': href
        },
        'tagName': 'Preview',
        'type': 'element'
      };

      // Replace the original link with the Preview component
      if (parent && typeof index === 'number')
        parent.children[index] = internalPreviewNode;

    });
  };
}

export default rehypeInternalLinks;
