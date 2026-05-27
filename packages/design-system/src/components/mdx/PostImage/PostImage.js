/**
 * PostImage Component
 *
 * @description Specialized image component for blog posts that supports theme-aware image switching.
 * Automatically handles light/dark mode variants and includes optional caption support.
 * Images are loaded from the /static/images/posts/ directory with SVG format.
 * Clicking on images opens them in a full-screen modal.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

import { useState } from 'react';
import NextImage from 'next/image';

import ImageModal from '@/components/content/ImageModal';
import Button from '@/components/core/Button';

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
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ currentImageSrc, setCurrentImageSrc ] = useState('');

  const imageProps = {
    'alt': title,
    'className': 'mx-auto cursor-pointer hover:opacity-90 transition-opacity duration-200',
    'height': height,
    'loading': 'lazy',
    'sizes': '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px',
    'width': width
  };

  const handleImageClick = (src) => {
    setCurrentImageSrc(src);
    setIsModalOpen(true);
  };

  if (dark) return (
    <div>
      <Button variant='ghost' tone='gray' size='sm' className='block w-full p-0 hover:bg-transparent dark:hidden dark:hover:bg-transparent' onClick={ () => handleImageClick(`/static/images/posts/${title}.svg`) } aria-label={ `Open image: ${title}` }>
        <NextImage
          { ...imageProps }
          className='mx-auto cursor-pointer hover:opacity-90 transition-opacity duration-200'
          src={ `/static/images/posts/${title}.svg` }
        />
      </Button>
      <Button variant='ghost' tone='gray' size='sm' className='hidden w-full p-0 hover:bg-transparent dark:block dark:hover:bg-transparent' onClick={ () => handleImageClick(`/static/images/posts/${title}-dark.svg`) } aria-label={ `Open image: ${title}` }>
        <NextImage
          { ...imageProps }
          className='mx-auto cursor-pointer hover:opacity-90 transition-opacity duration-200'
          src={ `/static/images/posts/${title}-dark.svg` }
        />
      </Button>
      { caption && <p className='text-center text-sm text-gray-500 dark:text-gray-400'>{ caption }</p> }

      <ImageModal
        isOpen={ isModalOpen }
        onClose={ () => setIsModalOpen(false) }
        src={ currentImageSrc }
        alt={ title }
        caption={ caption }
      />
    </div>
  );

  return (
    <div>
      <Button variant='ghost' tone='gray' size='sm' className='block w-full p-0 hover:bg-transparent dark:hover:bg-transparent' onClick={ () => handleImageClick(`/static/images/posts/${title}.svg`) } aria-label={ `Open image: ${title}` }>
        <NextImage
          { ...imageProps }
          src={ `/static/images/posts/${title}.svg` }
        />
      </Button>
      { caption && <p className='text-center text-sm text-gray-500 dark:text-gray-400'>{ caption }</p> }

      <ImageModal
        isOpen={ isModalOpen }
        onClose={ () => setIsModalOpen(false) }
        src={ `/static/images/posts/${title}.svg` }
        alt={ title }
        caption={ caption }
      />
    </div>
  );
};

export default PostImage;
