import { visit } from 'unist-util-visit';

/** Normalize legacy `js:filename.js` fences before Gaudi's remarkCode runs. */
export function remarkCodeTitles() {
  return (tree) => visit(tree, 'code', (node) => {
    const separator = node.lang?.indexOf(':') ?? -1;

    if (separator < 0) return;

    const title = node.lang.slice(separator + 1);

    if (!title) return;

    node.lang = node.lang.slice(0, separator);
    node.data = {
      ...node.data,
      'hProperties': { ...node.data?.hProperties, 'data-title': title }
    };
  });
}
