/**
 * Image Component
 *
 * @description Simple wrapper around Next.js Image component for use in MDX content.
 * Provides optimized image loading with Next.js built-in performance features
 * while maintaining a clean interface for markdown content. Clicking on images
 * opens them in a full-screen modal.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

import { useState } from 'react';
import NextImage from 'next/image';

import ImageModal from '@/components/content/ImageModal';

/**
 * Renders an optimized image using Next.js Image component with modal functionality
 *
 * @param {Object} props - All Next.js Image component props
 * @param {string} [props.alt='post-image'] - Alt text for the image
 * @param {string} props.src - Image source URL
 * @param {...Object} props.rest - All standard Next.js Image props (width, height, etc.)
 * @returns {JSX.Element} A Next.js Image component with optimized loading and modal
 *
 * @example
 * // In MDX content:
 * <Image src="/static/images/example.jpg" width={500} height={300} />
 */
const Image = ({ alt = 'post-image', src, ...rest }) => {
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <button type='button' className='block max-w-full' onClick={ handleImageClick } aria-label={ `Open image: ${alt}` }>
        <NextImage
          { ...rest }
          alt={ alt }
          src={ src }
          className={ `cursor-pointer hover:opacity-90 transition-opacity duration-200 ${rest.className || ''}` }
          blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
          loading='lazy'
          placeholder='blur'
          priority={ false }
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </button>

      <ImageModal
        isOpen={ isModalOpen }
        onClose={ () => setIsModalOpen(false) }
        src={ src }
        alt={ alt }
      />
    </div>
  );
};

export default Image;
