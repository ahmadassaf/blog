/**
 * Remark Image to JSX Plugin
 *
 * @description Remark plugin that transforms markdown images into Next.js Image components
 * with automatic width and height detection. Only processes local images and adds proper
 * dimensions for optimized loading and layout stability.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import fs from 'fs';
import sizeOf from 'image-size';
import { visit } from 'unist-util-visit';

/**
 * Creates a remark plugin that converts markdown images to Next.js Image components
 *
 * @description Processes paragraph nodes containing images and transforms them into
 * MDX JSX Image elements with automatic dimension detection. Only processes local
 * images that exist in the public directory. Changes paragraph containers to div
 * elements to avoid invalid HTML nesting.
 *
 * @returns {Function} Remark transformer function
 *
 * @example
 * // In remark configuration
 * .use(remarkImgToJsx)
 *
 * @example
 * // Input markdown:
 * // ![Alt text](/images/photo.jpg)
 * //
 * // Results in:
 * // <div>
 * //   <Image alt="Alt text" src="/images/photo.jpg" width={800} height={600} />
 * // </div>
 *
 * @example
 * // External images remain as regular img tags:
 * // ![External](https://example.com/image.jpg) -> stays unchanged
 */
export function remarkImgToJsx() {
  return (tree) => {
    visit(
      tree, (node) => node.type === 'paragraph' && node.children.some((n) => n.type === 'image'), (node) => {
        const imageNode = node.children.find((n) => n.type === 'image');

        // Only process local files that exist in the public directory
        if (fs.existsSync(`${process.cwd()}/public${imageNode.url}`)) {
          const dimensions = sizeOf(`${process.cwd()}/public${imageNode.url}`);

          // Transform image node to Next.js Image component
          imageNode.type = 'mdxJsxFlowElement';
          imageNode.name = 'Image';
          imageNode.attributes = [
            { 'name': 'alt', 'type': 'mdxJsxAttribute', 'value': imageNode.alt },
            { 'name': 'src', 'type': 'mdxJsxAttribute', 'value': imageNode.url },
            { 'name': 'width', 'type': 'mdxJsxAttribute', 'value': dimensions.width },
            { 'name': 'height', 'type': 'mdxJsxAttribute', 'value': dimensions.height }
          ];

          // Change paragraph to div to avoid invalid p > div nesting
          node.type = 'div';
          node.children = [ imageNode ];
        }
      }
    );
  };
}
