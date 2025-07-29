/**
 * Remark Code Titles Plugin
 *
 * @description Remark plugin that extracts code block titles from language strings
 * and creates title elements above code blocks. Supports syntax like ```js:filename.js
 * to display "filename.js" as a title above the code block.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

// External libraries
import { visit } from 'unist-util-visit';

/**
 * Creates a remark plugin that adds titles to code blocks
 *
 * @description Processes code blocks with language strings containing colons (e.g., "js:filename.js")
 * and extracts the title part to create a div element with the title above the code block.
 * The title is removed from the language string, leaving just the language identifier.
 *
 * @returns {Function} Remark transformer function
 *
 * @example
 * // In remark configuration
 * .use(remarkCodeTitles)
 *
 * @example
 * // Input markdown:
 * // ```js:example.js
 * // console.log('hello');
 * // ```
 * //
 * // Results in:
 * // <div className="remark-code-title">example.js</div>
 * // <pre><code className="language-js">console.log('hello');</code></pre>
 */
export function remarkCodeTitles() {
  return (tree) => visit(tree, 'code', (node, index, parent) => {
    const nodeLang = node.lang || '';
    let language = '';
    let title = '';

    // Extract title from language string (format: language:title)
    if (nodeLang.includes(':')) {
      language = nodeLang.slice(0, nodeLang.search(':'));
      title = nodeLang.slice(nodeLang.search(':') + 1, nodeLang.length);
    }

    // Skip if no title found
    if (!title) return;

    const className = 'remark-code-title';

    // Create title node as MDX JSX element
    const titleNode = {
      'attributes': [{ 'name': 'className', 'type': 'mdxJsxAttribute', 'value': className }],
      'children': [{ 'type': 'text', 'value': title }],
      'data': { '_xdmExplicitJsx': true },
      'name': 'div',
      'type': 'mdxJsxFlowElement'
    };

    // Insert title node before code block
    parent.children.splice(index, 0, titleNode);

    // Update language to remove title part
    node.lang = language;
  });
}
