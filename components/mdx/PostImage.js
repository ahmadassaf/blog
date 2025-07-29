/**
 * PostImage Component
 *
 * @description Specialized image component for blog posts that supports theme-aware image switching.
 * Automatically handles light/dark mode variants and includes optional caption support.
 * Images are loaded from the /static/images/posts/ directory with SVG format.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import NextImage from 'next/image';

/**
 * Renders a blog post image with theme support and optional caption
 *
 * @param {Object} props - Component props
 * @param {boolean} [props.dark] - Whether to show dark mode variant of the image
 * @param {string} props.title - The image filename (without extension) used for alt text and src
 * @param {string} [props.caption] - Optional caption text displayed below the image
 * @param {number} [props.width=800] - Image width in pixels
 * @param {number} [props.height=800] - Image height in pixels
 * @param {...Object} props.rest - Additional props passed to the component
 * @returns {JSX.Element} A div containing the image and optional caption
 *
 * @example
 * // In MDX content - Light mode only:
 * <PostImage title="my-diagram" caption="Figure 1: System Architecture" />
 *
 * @example
 * // In MDX content - With dark mode support:
 * <PostImage dark title="my-diagram" caption="Figure 1: System Architecture" />
 */
const PostImage = ({ dark, title, caption, width = 800, height = 800, ...rest }) => {
  if (dark) return (
    <div>
      <NextImage alt={ title } className='dark:hidden mx-auto' width={ 800 } height={ 800 } src={ `/static/images/posts/${title}.svg` }/>
      <NextImage alt={ title } className='hidden dark:block mx-auto' width={ 800 } height={ 800 } src={ `/static/images/posts/${title}-dark.svg` }/>
      { caption && <p className='text-center text-sm text-gray-500 dark:text-gray-400'>{ caption }</p> }
    </div>
  );

  return (<div>
    <NextImage alt={ title } className='dark:hidden mx-auto' width={ 800 } height={ 800 } src={ `/static/images/posts/${title}.svg` }/>
    { caption && <p className='text-center text-sm text-gray-500 dark:text-gray-400'>{ caption }</p> }
  </div>);
};

export default PostImage;
