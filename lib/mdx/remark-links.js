import { visit } from 'unist-util-visit';

export function remarkLinks() {
  return (tree) => {
    visit(
      tree,

      // eslint-disable-next-line function-call-argument-newline
      // Only visit p tags that contain an img element
      (node) => node.type === 'paragraph' && node.children.some((n) => n.type == 'link'), (node) => {
        // For each link node, create a new Preview component node
        node.children.forEach((linkNode, linkNodeIndex) => {
            if (linkNode.type === 'link' && linkNode.url.startsWith("http")) {
                const previewNode = {
                    type: 'mdxJsxTextElement', // Indicate this node represents a JSX element
                    name: 'Preview', // The component name
                    attributes: [
                      {
                        type: 'mdxJsxAttribute',
                        name: 'url',
                        value: linkNode.url, // Assuming the link URL is stored here
                      }
                    ],
                    children: linkNode.children, // Preserve the original link text or any children
                  };
                  
                  if (linkNode.children[0].type === 'text') {
                    previewNode.attributes.push({
                      type: 'mdxJsxAttribute',
                      name: 'title',
                      value: linkNode.children[0].value, // Assuming the link text is stored here
                    });
                  }
                  // Replace the original link node with the new Preview component node
                  node.children[linkNodeIndex] = previewNode;
            }
        });
      }
    );
  };
}
