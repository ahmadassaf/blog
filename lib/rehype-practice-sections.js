import { toString } from 'mdast-util-to-string';

const practiceHeadings = new Set([
  'how i do it now',
  'how i approached it at a startup',
  'what i am trying now',
  'as the company grows'
]);

/**
 * Group an authored handbook practice heading with its existing content.
 * The handbook layout styles these semantic sections; all prose, links and IDs stay intact.
 */
export default function rehypePracticeSections() {
  return (tree, file) => {
    const fileName = file?.data?.rawDocumentData?.sourceFileName || '';

    // Restrict the structural change to this handbook's content files; other articles keep their original prose wrappers.
    if (!/^cto-handbook(?:-[^.]+)?\.mdx$/.test(fileName)) return;

    const children = [];
    let practice = null;

    for (const node of tree.children) {
      const isHeading = node.type === 'element' && /^h[1-3]$/.test(node.tagName);

      if (isHeading) practice = null;

      if (node.type === 'element' && node.tagName === 'h3' && practiceHeadings.has(toString(node).trim().toLowerCase())) {
        practice = { 'children': [ node ], 'properties': { 'data-handbook-practice': '' }, 'tagName': 'section', 'type': 'element' };
        children.push(practice);
      } else if (practice) {
        practice.children.push(node);
      } else {
        children.push(node);
      }
    }

    tree.children = children;
  };
}
