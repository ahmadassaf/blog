import Link from '@/components/primitives/Link';
import { cn } from '@/components/utilities/cn';
import { createVariants } from '@/components/utilities/variants';

export const bannerVariants = createVariants({
  'base': 'relative isolate flex justify-center gap-x-6 overflow-hidden',
  'compoundVariants': [
    { 'className': 'bg-blue-600 text-white', 'tone': 'blue', 'variant': 'solid' },
    { 'className': 'bg-gray-700 text-white', 'tone': 'gray', 'variant': 'solid' },
    { 'className': 'bg-green-600 text-white', 'tone': 'green', 'variant': 'solid' },
    { 'className': 'bg-indigo-600 text-white', 'tone': 'indigo', 'variant': 'solid' },
    { 'className': 'bg-neutral-700 text-white', 'tone': 'neutral', 'variant': 'solid' },
    { 'className': 'bg-red-600 text-white', 'tone': 'red', 'variant': 'solid' },
    { 'className': 'bg-yellow-500 text-gray-950', 'tone': 'yellow', 'variant': 'solid' },
    { 'className': 'bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-200', 'tone': 'blue', 'variant': 'soft' },
    { 'className': 'bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100', 'tone': 'gray', 'variant': 'soft' },
    { 'className': 'bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-200', 'tone': 'green', 'variant': 'soft' },
    { 'className': 'bg-indigo-50 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-200', 'tone': 'indigo', 'variant': 'soft' },
    { 'className': 'bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100', 'tone': 'neutral', 'variant': 'soft' },
    { 'className': 'bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-200', 'tone': 'red', 'variant': 'soft' },
    { 'className': 'bg-yellow-50 text-yellow-950 dark:bg-yellow-950 dark:text-yellow-200', 'tone': 'yellow', 'variant': 'soft' },
    { 'className': 'border-blue-200 text-blue-900 dark:border-blue-800 dark:text-blue-200', 'tone': 'blue', 'variant': 'outline' },
    { 'className': 'border-gray-200 text-gray-900 dark:border-gray-800 dark:text-gray-100', 'tone': 'gray', 'variant': 'outline' },
    { 'className': 'border-green-200 text-green-900 dark:border-green-800 dark:text-green-200', 'tone': 'green', 'variant': 'outline' },
    { 'className': 'border-indigo-200 text-indigo-900 dark:border-indigo-800 dark:text-indigo-200', 'tone': 'indigo', 'variant': 'outline' },
    { 'className': 'border-neutral-200 text-neutral-900 dark:border-neutral-800 dark:text-neutral-100', 'tone': 'neutral', 'variant': 'outline' },
    { 'className': 'border-red-200 text-red-900 dark:border-red-800 dark:text-red-200', 'tone': 'red', 'variant': 'outline' },
    { 'className': 'border-yellow-200 text-yellow-950 dark:border-yellow-800 dark:text-yellow-200', 'tone': 'yellow', 'variant': 'outline' }
  ],
  'defaultVariants': {
    'size': 'md',
    'tone': 'gray',
    'variant': 'soft'
  },
  'variants': {
    'size': {
      'lg': 'px-6 py-3.5 sm:px-4',
      'md': 'px-6 py-2.5 sm:px-3.5',
      'sm': 'px-4 py-2',
      'xs': 'px-3 py-1.5'
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
      'outline': 'border',
      'soft': '',
      'solid': ''
    }
  }
});

const BannerContent = ({ children, showArrow, title }) => (
  <>
    {title ? <strong className='font-semibold'>{title}</strong> : null}
    {title && children ? (
      <svg viewBox='0 0 2 2' aria-hidden='true' className='mx-2 inline size-0.5 fill-current'>
        <circle r={ 1 } cx={ 1 } cy={ 1 } />
      </svg>
    ) : null}
    {children}{showArrow ? <span aria-hidden='true'>&nbsp;&rarr;</span> : null}
  </>
);

const Banner = ({ ariaLabel, children, className, classNames = {}, href, size, title, tone, variant }) => {
  const accessibleLabel = ariaLabel || [ title, children ].filter(Boolean).join(': ');
  const content = <BannerContent showArrow={ Boolean(href) } title={ title }>{children}</BannerContent>;

  return (
    <div className={ bannerVariants({ 'className': cn(className, classNames.root), size, tone, variant }) } role={ href ? undefined : 'status' }>
      <p className={ cn('text-sm leading-6', classNames.body) }>
        {href ? (
          <Link href={ href } aria-label={ accessibleLabel } className={ classNames.action }>
            {content}
          </Link>
        ) : (
          <span>{content}</span>
        )}
      </p>
    </div>
  );
};

export default Banner;
