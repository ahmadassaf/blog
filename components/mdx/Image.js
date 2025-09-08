/**
 * Image Component
 *
 * @description Simple wrapper around Next.js Image component for use in MDX content.
 * Provides optimized image loading with Next.js built-in performance features
 * while maintaining a clean interface for markdown content.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import NextImage from 'next/image';

/**
 * Renders an optimized image using Next.js Image component
 *
 * @param {Object} props - All Next.js Image component props
 * @param {string} [props.alt='post-image'] - Alt text for the image
 * @param {...Object} props.rest - All standard Next.js Image props (src, width, height, etc.)
 * @returns {JSX.Element} A Next.js Image component with optimized loading
 *
 * @example
 * // In MDX content:
 * <Image src="/static/images/example.jpg" width={500} height={300} />
 */
const Image = ({ alt = 'post-image', ...rest }) => (
  <NextImage
    { ...rest }
    alt={ alt }
    blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
    loading='lazy'
    placeholder='blur'
    priority={ false }
    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  />
);

export default Image;
