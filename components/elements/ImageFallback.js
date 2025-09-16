/**
 * Image Fallback Component
 *
 * @description A wrapper around Next.js Image component that provides fallback functionality when images fail to load.
 * Automatically switches to a fallback image if the primary image source encounters an error, improving user experience
 * by preventing broken image displays.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { useEffect, useState } from 'react';
import Image from 'next/image';

/**
 * Image component with automatic fallback support
 *
 * @description Renders an image with automatic fallback to an alternative source if the primary image fails to load.
 * Resets the error state when the source changes, allowing for dynamic image switching.
 *
 * @param {Object} props - Component props
 * @param {string} props.fallback - The fallback image URL to use if the primary image fails
 * @param {string} props.alt - Alt text for the image (required for accessibility)
 * @param {string} props.src - The primary image source URL
 * @param {...Object} props.props - Additional props passed to the Next.js Image component
 *
 * @returns {JSX.Element} The rendered image component with fallback functionality
 *
 * @example
 * <ImageFallback
 *   src="/images/profile.jpg"
 *   fallback="/images/default-avatar.png"
 *   alt="User profile picture"
 *   width={200}
 *   height={200}
 * />
 */
const ImageFallback = ({
  fallback,
  alt,
  src,
  ...props
}) => {
  const [ error, setError ] = useState(null);

  useEffect(() => {
    setError(null);
  }, [ src ]);

  // Don't render if no valid src
  const currentSrc = error ? fallback : src;
  if (!currentSrc) return null;

  // Validate URL to prevent Next.js Image component errors
  if (!currentSrc.startsWith('/') && !currentSrc.startsWith('./') && !currentSrc.startsWith('../')) {
    try {
      // eslint-disable-next-line no-new
      new URL(currentSrc);
    } catch {
      return null;
    }
  }

  return (
    <Image
      alt={ alt }
      onError={ setError }
      src={ currentSrc }
      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      loading='lazy'
      { ...props }
    />
  );
};

export default ImageFallback;
