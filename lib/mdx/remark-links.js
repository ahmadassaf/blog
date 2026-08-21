/**
 * Remark Links Preview Plugin
 *
 * @description Remark plugin that transforms external HTTP links into Preview components
 * for enhanced link presentation. Automatically converts links to rich preview cards
 * with URL and title information extracted from the link content.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { visit } from 'unist-util-visit';

const isExternalPreviewUrl = (value) => {
  try {
    const url = new URL(value);

    return [ 'http:', 'https:' ].includes(url.protocol) &&
      ![ 'localhost', '127.0.0.1', '::1' ].includes(url.hostname);
  } catch {
    return false;
  }
};

/**
 * Creates a remark plugin that converts external links to Preview components
 *
 * @description Processes markdown links that start with "http" and transforms them
 * into MDX Preview components. Extracts the URL and title (if available) and
 * creates the appropriate JSX attributes for the Preview component.
 *
 * @returns {Function} Remark transformer function
 *
 * @example
 * // In remark configuration
 * .use(remarkLinks)
 *
 * @example
 * // Input markdown:
 * // [Visit OpenAI](https://openai.com)
 * //
 * // Results in:
 * // <Preview url="https://openai.com" title="Visit OpenAI">Visit OpenAI</Preview>
 *
 * @example
 * // Internal links remain unchanged:
 * // [About](/about) -> remains as regular link
 */
export function remarkLinks() {
  return (tree) => {
    visit(
      tree, 'link', (node, index, parent) => {

        /*
         * Only process public external HTTP/HTTPS links. Loopback URLs are useful
         * In tutorials but cannot be fetched safely by the preview endpoint.
         */
        if (isExternalPreviewUrl(node.url)) {
          const previewNode = {
            'attributes': [
              {
                'name': 'url',
                'type': 'mdxJsxAttribute',
                'value': node.url
              }
            ],
            'children': node.children,
            'name': 'Preview',
            'type': 'mdxJsxTextElement'
          };

          // Add title attribute if link has text content
          if (node.children[0] && node.children[0].type === 'text') previewNode.attributes.push({
            'name': 'title',
            'type': 'mdxJsxAttribute',
            'value': node.children[0].value
          });

          // Replace the original link node with the Preview component
          if (parent) parent.children[index] = previewNode;
        }
      }
    );
  };
}
