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
 * @returns {JSX.Element} A Next.js Image component with default alt text
 * @param {...Object} props.rest - All standard Next.js Image props (src, width, height, etc.)
 *
 * @example
 * // In MDX content:
 * <Image src="/static/images/example.jpg" width={500} height={300} />
 */
const Image = ({ ...rest }) => <NextImage { ...rest } alt='post-image' />;

export default Image;
