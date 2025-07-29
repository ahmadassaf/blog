/**
 * Avatar Component
 *
 * @description A flexible avatar component that can display either an image or initials with customizable
 * size, color, and shape options. Provides fallback functionality when images fail to load and supports
 * various color schemes and sizes for different use cases.
 *
 * Supported sizes:
 * - small: h-4 w-4
 * - medium: h-8 w-8
 * - large: h-10 w-10
 * - xlarge: h-14 w-14
 *
 * The colors are any supported Tailwind CSS color of the 500 variant.
 * The avatar will render a placeholder icon if no valid image url is provided.
 * If no image parameter is passed then an Avatar with a label (Initials) will be rendered.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import Image from 'next/image';

const Avatar = ({ label, size = 'medium', color = 'gray', image, rounded }) => {

  // eslint-disable-next-line prefer-named-capture-group
  const pattern = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
  const sizes = {
    'large': 'h-10 w-10',
    'medium': 'h-8 w-8',
    'small': 'h-4 w-4',
    'xlarge': 'h-14 w-14'
  };

  if (image) return image.match(new RegExp(pattern)) ? (<Image alt='' src={ image } className={ `inline-block ${sizes[size] || 'h-8 w-8'} ${rounded ? 'rounded-full' : 'rounded-md'}` }/>) : (
    <span className={ `inline-block ${sizes[size]} overflow-hidden ${rounded ? 'rounded-full' : 'rounded-md'} bg-gray-100` }>
      <svg fill='currentColor' viewBox='0 0 24 24' className='h-full w-full text-gray-300'>
        <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
      </svg>
    </span>
  );

  return (
    <span className={ `inline-flex ${sizes[size]} items-center justify-center ${rounded ? 'rounded-full' : 'rounded-md'} bg-${color}-500 ` }>
      <span className='text-xs font-medium leading-none text-white'>{label}</span>
    </span>
  );
};

export default Avatar;

