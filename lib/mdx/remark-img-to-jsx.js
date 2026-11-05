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
// Reads a public image's size, or null when the file is missing or unreadable.
const publicImageSize = (url) => {
  const file = `${process.cwd()}/public${url}`;

  if (!fs.existsSync(file)) return null;
  try {

    // Pass a buffer: image-size v2 no longer accepts file paths
    return sizeOf(fs.readFileSync(file));
  } catch (error) {

    // Skip the transform for unreadable/corrupt images instead of failing the build
    console.warn(`Warning: Could not read image dimensions for ${url}: ${error.message}`);

    return null;
  }
};

// Turns one markdown image node into a sized Image element in place; false when it stays as is.
const toImageElement = (imageNode) => {
  const dimensions = publicImageSize(imageNode.url);

  if (!dimensions) return false;
  imageNode.type = 'mdxJsxFlowElement';
  imageNode.name = 'Image';
  imageNode.attributes = [
    { 'name': 'alt', 'type': 'mdxJsxAttribute', 'value': imageNode.alt },
    { 'name': 'src', 'type': 'mdxJsxAttribute', 'value': imageNode.url },
    { 'name': 'width', 'type': 'mdxJsxAttribute', 'value': dimensions.width },
    { 'name': 'height', 'type': 'mdxJsxAttribute', 'value': dimensions.height }
  ];

  return true;
};

export function remarkImgToJsx() {
  return (tree) => {
    visit(
      tree, (node) => node.type === 'paragraph' && node.children.some((n) => n.type === 'image'), (node) => {

        // Every local image in the paragraph converts; the rest of its content stays where it was
        const converted = node.children.filter((child) => child.type === 'image').map(toImageElement);

        // Image renders a block, so the paragraph becomes a div to avoid invalid p > div nesting
        if (converted.some(Boolean)) node.type = 'div';
      }
    );
  };
}
