import { cn } from '@/components/utilities/cn';
import { createVariants } from '@/components/utilities/variants';

export const cardVariants = createVariants({
  'base': 'h-full w-full overflow-hidden border transition-shadow duration-200',
  'defaultVariants': {
    'padding': 'md',
    'radius': 'md',
    'variant': 'elevated'
  },
  'variants': {
    'padding': {
      'lg': 'p-6',
      'md': 'p-4',
      'none': 'p-0',
      'sm': 'p-3'
    },
    'radius': {
      'lg': 'rounded-lg',
      'md': 'rounded-md',
      'none': 'rounded-none',
      'sm': 'rounded-sm'
    },
    'variant': {
      'elevated': 'border-gray-200 bg-white shadow-sm dark:border-white/[0.2] dark:bg-gray-900',
      'flat': 'border-transparent bg-transparent shadow-none',
      'outline': 'border-gray-200 bg-white shadow-none dark:border-gray-700 dark:bg-gray-950',
      'soft': 'border-gray-100 bg-gray-50 shadow-none dark:border-gray-800 dark:bg-gray-900'
    }
  }
});

const Card = ({
  children,
  className,
  classNames = {},
  interactive = false,
  padding,
  radius,
  subtitle,
  title,
  variant
}) => (
  <div
    className={ cardVariants({
      'className': cn(interactive && 'hover:shadow-md', className, classNames.root),
      padding,
      radius,
      variant
    }) }
  >
    <div className={ cn('relative z-10', classNames.body) }>
      {title ? (
        <h4 className={ cn('mt-1 text-base font-bold tracking-wide text-gray-950 dark:text-white', classNames.title) }>
          {title}
        </h4>
      ) : null}
      {subtitle ? (
        <p className={ cn('mt-2 text-sm leading-relaxed tracking-wide text-gray-700 dark:text-gray-300', classNames.subtitle) }>
          {subtitle}
        </p>
      ) : null}
      {children}
    </div>
  </div>
);

export default Card;
