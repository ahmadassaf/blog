import Image from 'next/image';

import { cn } from '@/components/utilities/cn';
import { createVariants } from '@/components/utilities/variants';

export const avatarVariants = createVariants({
  'base': 'inline-flex shrink-0 items-center justify-center overflow-hidden font-semibold text-white',
  'defaultVariants': {
    'shape': 'square',
    'size': 'md',
    'tone': 'gray'
  },
  'variants': {
    'shape': {
      'circle': 'rounded-full',
      'square': 'rounded-md'
    },
    'size': {
      'lg': 'size-14 text-base',
      'md': 'size-10 text-sm',
      'sm': 'size-8 text-xs',
      'xs': 'size-5 text-[10px]'
    },
    'tone': {
      'blue': 'bg-blue-600',
      'gray': 'bg-gray-600',
      'green': 'bg-green-600',
      'indigo': 'bg-indigo-600',
      'neutral': 'bg-neutral-600',
      'red': 'bg-red-600',
      'yellow': 'bg-yellow-600'
    }
  }
});

const pixelSizes = {
  'lg': 56,
  'md': 40,
  'sm': 32,
  'xs': 20
};

const isRemoteUrl = (image) => {
  try {
    const url = new URL(image);

    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

const Avatar = ({
  alt,
  className,
  fallback,
  label,
  shape,
  size = 'md',
  src,
  tone
}) => {
  const classes = avatarVariants({ className, shape, size, tone });
  const pixelSize = pixelSizes[size] || pixelSizes.md;
  const accessibleLabel = alt || (label ? `${label} avatar` : undefined);

  if (src && isRemoteUrl(src)) return (
    <Image alt={ alt || label || '' } src={ src } width={ pixelSize } height={ pixelSize } className={ classes } />
  );

  if (src || fallback) return (
    <span className={ cn(classes, 'bg-gray-100 text-gray-300') } role={ accessibleLabel ? 'img' : undefined } aria-label={ accessibleLabel }>
      <svg fill='currentColor' viewBox='0 0 24 24' className='size-full' aria-hidden='true'>
        <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
      </svg>
    </span>
  );

  return (
    <span className={ classes } role={ accessibleLabel ? 'img' : undefined } aria-label={ accessibleLabel }>
      <span className='leading-none' aria-hidden={ accessibleLabel ? 'true' : undefined }>{label}</span>
    </span>
  );
};

export default Avatar;
