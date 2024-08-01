import { visit } from 'unist-util-visit';

export function remarkLinks() {
  return (tree) => {
    visit(
      tree, 'link', (node, index, parent) => {
        if (node.url.startsWith('http')) {

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

          if (node.children[0] && node.children[0].type === 'text') previewNode.attributes.push({
            'name': 'title',
            'type': 'mdxJsxAttribute',
            'value': node.children[0].value
          });

          // Replace the original link node with the new Preview component node
          if (parent) parent.children[index] = previewNode;

        }
      }
    );
  };
}
