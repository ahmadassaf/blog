'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { cn } from '@/components/utilities/cn';

const isValidImageSource = (src) => {
  if (!src) return false;

  if (src.startsWith('/') || src.startsWith('./') || src.startsWith('../')) return true;

  try {
    // eslint-disable-next-line no-new
    new URL(src);

    return true;
  } catch {
    return false;
  }
};

const radiusClasses = {
  'lg': 'rounded-lg',
  'md': 'rounded-md',
  'none': 'rounded-none',
  'sm': 'rounded-sm'
};

const ImageFallback = ({
  alt,
  className,
  fallback,
  loading = 'lazy',
  radius = 'none',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  src,
  ...props
}) => {
  const [ error, setError ] = useState(null);

  useEffect(() => {
    setError(null);
  }, [ src ]);

  const currentSrc = error ? fallback : src;

  if (!isValidImageSource(currentSrc)) return null;

  return (
    <Image
      alt={ alt }
      className={ cn(radiusClasses[radius], className) }
      onError={ setError }
      src={ currentSrc }
      sizes={ sizes }
      loading={ loading }
      { ...props }
    />
  );
};

export default ImageFallback;
