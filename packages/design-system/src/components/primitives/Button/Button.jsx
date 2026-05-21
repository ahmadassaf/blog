import Link from 'next/link';

import { cn } from '@/components/utilities/cn';
import { createVariants } from '@/components/utilities/variants';

export const buttonVariants = createVariants({
  'base': 'inline-flex items-center justify-center font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-offset-gray-950',
  'compoundVariants': [
    { 'className': 'bg-blue-600 text-white hover:bg-blue-700', 'tone': 'blue', 'variant': 'solid' },
    { 'className': 'bg-gray-700 text-white hover:bg-gray-800', 'tone': 'gray', 'variant': 'solid' },
    { 'className': 'bg-green-600 text-white hover:bg-green-700', 'tone': 'green', 'variant': 'solid' },
    { 'className': 'bg-indigo-600 text-white hover:bg-indigo-700', 'tone': 'indigo', 'variant': 'solid' },
    { 'className': 'bg-neutral-700 text-white hover:bg-neutral-800', 'tone': 'neutral', 'variant': 'solid' },
    { 'className': 'bg-red-600 text-white hover:bg-red-700', 'tone': 'red', 'variant': 'solid' },
    { 'className': 'bg-yellow-500 text-gray-950 hover:bg-yellow-600', 'tone': 'yellow', 'variant': 'solid' },
    { 'className': 'bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900', 'tone': 'blue', 'variant': 'soft' },
    { 'className': 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700', 'tone': 'gray', 'variant': 'soft' },
    { 'className': 'bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-950 dark:text-green-300 dark:hover:bg-green-900', 'tone': 'green', 'variant': 'soft' },
    { 'className': 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300 dark:hover:bg-indigo-900', 'tone': 'indigo', 'variant': 'soft' },
    { 'className': 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700', 'tone': 'neutral', 'variant': 'soft' },
    { 'className': 'bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-900', 'tone': 'red', 'variant': 'soft' },
    { 'className': 'bg-yellow-50 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-950 dark:text-yellow-300 dark:hover:bg-yellow-900', 'tone': 'yellow', 'variant': 'soft' },
    { 'className': 'border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-950', 'tone': 'blue', 'variant': 'outline' },
    { 'className': 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800', 'tone': 'gray', 'variant': 'outline' },
    { 'className': 'border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-300 dark:hover:bg-green-950', 'tone': 'green', 'variant': 'outline' },
    { 'className': 'border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-300 dark:hover:bg-indigo-950', 'tone': 'indigo', 'variant': 'outline' },
    { 'className': 'border-neutral-300 text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800', 'tone': 'neutral', 'variant': 'outline' },
    { 'className': 'border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950', 'tone': 'red', 'variant': 'outline' },
    { 'className': 'border-yellow-200 text-yellow-800 hover:bg-yellow-50 dark:border-yellow-800 dark:text-yellow-300 dark:hover:bg-yellow-950', 'tone': 'yellow', 'variant': 'outline' },
    { 'className': 'text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-950', 'tone': 'blue', 'variant': 'ghost' },
    { 'className': 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800', 'tone': 'gray', 'variant': 'ghost' },
    { 'className': 'text-green-700 hover:bg-green-50 dark:text-green-300 dark:hover:bg-green-950', 'tone': 'green', 'variant': 'ghost' },
    { 'className': 'text-indigo-700 hover:bg-indigo-50 dark:text-indigo-300 dark:hover:bg-indigo-950', 'tone': 'indigo', 'variant': 'ghost' },
    { 'className': 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800', 'tone': 'neutral', 'variant': 'ghost' },
    { 'className': 'text-red-700 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950', 'tone': 'red', 'variant': 'ghost' },
    { 'className': 'text-yellow-800 hover:bg-yellow-50 dark:text-yellow-300 dark:hover:bg-yellow-950', 'tone': 'yellow', 'variant': 'ghost' },
    { 'className': 'p-0 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300', 'tone': 'blue', 'variant': 'subtle' },
    { 'className': 'p-0 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300', 'tone': 'gray', 'variant': 'subtle' },
    { 'className': 'p-0 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300', 'tone': 'green', 'variant': 'subtle' },
    { 'className': 'p-0 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300', 'tone': 'indigo', 'variant': 'subtle' },
    { 'className': 'p-0 text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300', 'tone': 'neutral', 'variant': 'subtle' },
    { 'className': 'p-0 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300', 'tone': 'red', 'variant': 'subtle' },
    { 'className': 'p-0 text-yellow-700 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300', 'tone': 'yellow', 'variant': 'subtle' }
  ],
  'defaultVariants': {
    'radius': 'md',
    'size': 'md',
    'tone': 'blue',
    'variant': 'solid'
  },
  'variants': {
    'radius': {
      'full': 'rounded-full',
      'lg': 'rounded-lg',
      'md': 'rounded-md',
      'sm': 'rounded-sm'
    },
    'size': {
      'lg': 'gap-3 px-8 py-4 text-base',
      'md': 'gap-2 px-6 py-3 text-sm',
      'sm': 'gap-2 px-4 py-2 text-sm',
      'xs': 'gap-1.5 px-3 py-1.5 text-xs'
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

export const buttonSizes = Object.keys(buttonVariants.variants.size);
export const buttonTones = Object.keys(buttonVariants.variants.tone);

const isExternalHref = (href) => href?.startsWith('http') || href?.startsWith('mailto:');

const Button = ({
  as,
  children,
  className,
  disabled = false,
  href,
  radius,
  size,
  tone,
  variant,
  ...rest
}) => {
  const classes = buttonVariants({ className, radius, size, tone, variant });
  const disabledLinkProps = disabled ? {
    'aria-disabled': true,
    'onClick': (event) => {
      event.preventDefault();
      event.stopPropagation();
    },
    'tabIndex': -1
  } : {};

  if (href && !isExternalHref(href)) return (
    <Link href={ href } className={ classes } { ...rest } { ...disabledLinkProps }>
      {children}
    </Link>
  );

  if (href) return (
    <a href={ href } className={ classes } target='_blank' rel='noopener noreferrer' { ...rest } { ...disabledLinkProps }>
      {children}
    </a>
  );

  const Element = as || 'button';

  if (Element !== 'button') return <Element className={ classes } { ...rest }>{children}</Element>;

  return (
    <button className={ cn(classes, disabled && 'cursor-not-allowed') } disabled={ disabled } type={ rest.type || 'button' } { ...rest }>
      {children}
    </button>
  );
};

export { buttonVariants as variants };
export default Button;
