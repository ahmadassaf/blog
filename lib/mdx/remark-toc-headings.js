import { toString } from 'mdast-util-to-string';
import { remark } from 'remark';
import { visit } from 'unist-util-visit';

export function remarkTocHeadings(exclude = '', fromHeading = 1, toHeading = 6) {

  const re = Array.isArray(exclude) ? new RegExp(`^(${exclude.join('|')})$`, 'i') : new RegExp(`^(${exclude})$`, 'i');

  return (tree, file) => {
    const toc = [];

    visit(tree, 'heading', (node) => {
      const textContent = toString(node);
      const normalizedTextContent = textContent.replace(/ /g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();

      toc.push({
        'depth': node.depth,
        'id': normalizedTextContent,
        'url': `#${normalizedTextContent}`,
        'value': textContent
      });
    });

    const buildNestedToc = (tableOfContents) => {
      const nestedToc = [];
      const stack = [];

      tableOfContents.forEach((heading) => {
        if (heading.depth < fromHeading || heading.depth > toHeading || re.test(heading.value)) return;

        const item = { ...heading, 'children': [] };

        while (stack.length > 0 && stack[stack.length - 1].depth >= heading.depth) stack.pop();

        if (stack.length === 0) nestedToc.push(item);
        else stack[stack.length - 1].children.push(item);

        stack.push(item);
      });

      return nestedToc;
    };

    file.data.toc = buildNestedToc(toc);
  };
}

export async function extractTocHeadings(markdown) {
  const vfile = await remark().use(remarkTocHeadings).process(markdown);

  return vfile.data.toc;
}
