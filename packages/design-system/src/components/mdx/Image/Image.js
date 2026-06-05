/**
 * Image Component
 *
 * @description Wrapper around Next.js Image component for use in MDX content.
 * Supports captions, optional dark-mode image sources, and opens images in a
 * full-screen modal when clicked.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

import { useState } from 'react';
import NextImageModule from 'next/image';

import ImageModal from '@/components/content/ImageModal';
import Button from '@/components/core/Button';
import resolveNextImage from '@/components/utilities/resolveNextImage';

const NextImage = resolveNextImage(NextImageModule);

/**
 * Renders an optimized image using Next.js Image component with modal functionality
 *
 * @param {Object} props - All Next.js Image component props
 * @param {string} [props.alt='post-image'] - Alt text for the image
 * @param {string} [props.caption] - Optional image caption
 * @param {string} [props.darkSrc] - Optional dark-mode image source
 * @param {string} props.src - Image source URL
 * @param {...Object} props.rest - All standard Next.js Image props (width, height, etc.)
 * @returns {JSX.Element} A Next.js Image component with optimized loading and modal
 *
 * @example
 * // In MDX content:
 * <Image src="/static/images/example.jpg" width={500} height={300} />
 */
const Image = ({ alt = 'post-image', caption, darkSrc, src, ...rest }) => {
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ currentSrc, setCurrentSrc ] = useState(src);

  const handleImageClick = (imageSrc) => {
    setCurrentSrc(imageSrc);
    setIsModalOpen(true);
  };

  const createImageProps = (imageSrc, className) => {
    return {
      ...rest,
      alt,
      'blurDataURL': 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
      className,
      'loading': 'lazy',
      'placeholder': 'blur',
      'priority': false,
      'sizes': '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
      'src': imageSrc
    };
  };

  const renderImage = (imageSrc, className = '') => {
    const imageProps = createImageProps(imageSrc, `cursor-pointer hover:opacity-90 transition-opacity duration-200 ${className || rest.className || ''}`);
    const nativeImageProps = { ...imageProps };

    delete nativeImageProps.blurDataURL;
    delete nativeImageProps.placeholder;
    delete nativeImageProps.priority;

    return NextImage ? <NextImage { ...imageProps } /> : <img { ...nativeImageProps } />;
  };

  return (
    <figure>
      <Button variant='ghost' tone='gray' size='sm' className='block max-w-full p-0 hover:bg-transparent dark:hover:bg-transparent' onClick={ () => handleImageClick(src) } aria-label={ `Open image: ${alt}` }>
        {renderImage(src, darkSrc ? `${rest.className || ''} dark:hidden` : rest.className)}
      </Button>
      {darkSrc && (
        <Button variant='ghost' tone='gray' size='sm' className='hidden max-w-full p-0 hover:bg-transparent dark:block dark:hover:bg-transparent' onClick={ () => handleImageClick(darkSrc) } aria-label={ `Open image: ${alt}` }>
          {renderImage(darkSrc, rest.className)}
        </Button>
      )}
      {caption && <figcaption className='mt-3 text-center text-sm text-gray-500 dark:text-gray-400'>{caption}</figcaption>}

      <ImageModal
        isOpen={ isModalOpen }
        onClose={ () => setIsModalOpen(false) }
        src={ currentSrc }
        alt={ alt }
        caption={ caption }
      />
    </figure>
  );
};

export default Image;
