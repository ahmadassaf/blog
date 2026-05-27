import Link from 'next/link';

import { cn } from '@/components/utilities/cn';
import { createVariants } from '@/components/utilities/variants';

export const pillVariants = createVariants({
  'base': 'my-1 mr-1 inline-flex select-none items-center gap-1 whitespace-nowrap font-medium uppercase tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950',
  'compoundVariants': [
    { 'className': 'bg-blue-600 text-white hover:bg-blue-700', 'tone': 'blue', 'variant': 'solid' },
    { 'className': 'bg-gray-600 text-white hover:bg-gray-700', 'tone': 'gray', 'variant': 'solid' },
    { 'className': 'bg-green-600 text-white hover:bg-green-700', 'tone': 'green', 'variant': 'solid' },
    { 'className': 'bg-indigo-600 text-white hover:bg-indigo-700', 'tone': 'indigo', 'variant': 'solid' },
    { 'className': 'bg-neutral-600 text-white hover:bg-neutral-700', 'tone': 'neutral', 'variant': 'solid' },
    { 'className': 'bg-red-600 text-white hover:bg-red-700', 'tone': 'red', 'variant': 'solid' },
    { 'className': 'bg-yellow-600 text-white hover:bg-yellow-700', 'tone': 'yellow', 'variant': 'solid' },
    { 'className': 'bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900', 'tone': 'blue', 'variant': 'soft' },
    { 'className': 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700', 'tone': 'gray', 'variant': 'soft' },
    { 'className': 'bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-950 dark:text-green-300 dark:hover:bg-green-900', 'tone': 'green', 'variant': 'soft' },
    { 'className': 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300 dark:hover:bg-indigo-900', 'tone': 'indigo', 'variant': 'soft' },
    { 'className': 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700', 'tone': 'neutral', 'variant': 'soft' },
    { 'className': 'bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-900', 'tone': 'red', 'variant': 'soft' },
    { 'className': 'bg-yellow-50 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-950 dark:text-yellow-300 dark:hover:bg-yellow-900', 'tone': 'yellow', 'variant': 'soft' },
    { 'className': 'border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-950', 'tone': 'blue', 'variant': 'outline' },
    { 'className': 'border-gray-200 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800', 'tone': 'gray', 'variant': 'outline' },
    { 'className': 'border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-300 dark:hover:bg-green-950', 'tone': 'green', 'variant': 'outline' },
    { 'className': 'border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-300 dark:hover:bg-indigo-950', 'tone': 'indigo', 'variant': 'outline' },
    { 'className': 'border-neutral-200 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800', 'tone': 'neutral', 'variant': 'outline' },
    { 'className': 'border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950', 'tone': 'red', 'variant': 'outline' },
    { 'className': 'border-yellow-200 text-yellow-800 hover:bg-yellow-50 dark:border-yellow-800 dark:text-yellow-300 dark:hover:bg-yellow-950', 'tone': 'yellow', 'variant': 'outline' },
    { 'className': 'text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-950', 'tone': 'blue', 'variant': 'ghost' },
    { 'className': 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800', 'tone': 'gray', 'variant': 'ghost' },
    { 'className': 'text-green-700 hover:bg-green-50 dark:text-green-300 dark:hover:bg-green-950', 'tone': 'green', 'variant': 'ghost' },
    { 'className': 'text-indigo-700 hover:bg-indigo-50 dark:text-indigo-300 dark:hover:bg-indigo-950', 'tone': 'indigo', 'variant': 'ghost' },
    { 'className': 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800', 'tone': 'neutral', 'variant': 'ghost' },
    { 'className': 'text-red-700 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950', 'tone': 'red', 'variant': 'ghost' },
    { 'className': 'text-yellow-800 hover:bg-yellow-50 dark:text-yellow-300 dark:hover:bg-yellow-950', 'tone': 'yellow', 'variant': 'ghost' },
    { 'className': 'text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950', 'tone': 'blue', 'variant': 'subtle' },
    { 'className': 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800', 'tone': 'gray', 'variant': 'subtle' },
    { 'className': 'text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950', 'tone': 'green', 'variant': 'subtle' },
    { 'className': 'text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950', 'tone': 'indigo', 'variant': 'subtle' },
    { 'className': 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800', 'tone': 'neutral', 'variant': 'subtle' },
    { 'className': 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950', 'tone': 'red', 'variant': 'subtle' },
    { 'className': 'text-yellow-700 hover:bg-yellow-50 dark:text-yellow-400 dark:hover:bg-yellow-950', 'tone': 'yellow', 'variant': 'subtle' }
  ],
  'defaultVariants': {
    'radius': 'sm',
    'size': 'md',
    'tone': 'blue',
    'variant': 'solid'
  },
  'variants': {
    'radius': {
      'full': 'rounded-full',
      'md': 'rounded-md',
      'sm': 'rounded-sm'
    },
    'size': {
      'lg': 'px-3 py-1 text-sm leading-5',
      'md': 'px-2.5 py-0.5 text-xs leading-5 sm:text-sm',
      'sm': 'px-2 py-0.5 text-[11px] leading-4',
      'xs': 'px-1.5 py-px text-[10px] leading-4'
    },
    'tone': {
      'blue': '',
      'gray': '',
      'green': '',
      'indigo': '',
      'neutral': '',
      'red': '',
      'yellow': ''
    },
    'variant': {
      'ghost': '',
      'outline': 'border',
      'soft': '',
      'solid': '',
      'subtle': ''
    }
  }
});

export const pillTones = Object.keys(pillVariants.variants.tone);
export const pillSizes = Object.keys(pillVariants.variants.size);

const PulseDot = ({ tone }) => (
  <span className='relative flex size-1.5' aria-hidden='true'>
    <span className={ cn('absolute inline-flex size-full animate-ping rounded-full opacity-75', {
      'bg-blue-500': tone === 'blue',
      'bg-gray-500': tone === 'gray',
      'bg-green-500': tone === 'green',
      'bg-indigo-500': tone === 'indigo',
      'bg-neutral-500': tone === 'neutral',
      'bg-red-500': tone === 'red',
      'bg-yellow-500': tone === 'yellow'
    }) }
    />
    <span className={ cn('relative inline-flex size-1.5 rounded-full', {
      'bg-blue-500': tone === 'blue',
      'bg-gray-500': tone === 'gray',
      'bg-green-500': tone === 'green',
      'bg-indigo-500': tone === 'indigo',
      'bg-neutral-500': tone === 'neutral',
      'bg-red-500': tone === 'red',
      'bg-yellow-500': tone === 'yellow'
    }) }
    />
  </span>
);

const Pill = ({
  children,
  className,
  href,
  icon,
  pulse = false,
  radius,
  size,
  tone = 'blue',
  variant
}) => {
  const classes = pillVariants({ className, radius, size, tone, variant });
  const content = (
    <>
      {pulse ? <PulseDot tone={ tone } /> : null}
      {icon ? <span aria-hidden='true'>{icon}</span> : null}
      <span>{children}</span>
    </>
  );

  if (href) return (
    <Link href={ href } className={ classes }>
      {content}
    </Link>
  );

  return (
    <span className={ classes }>
      {content}
    </span>
  );
};

export default Pill;
