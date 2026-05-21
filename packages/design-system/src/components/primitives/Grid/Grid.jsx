import { cn } from '@/components/utilities/cn';
import { createVariants } from '@/components/utilities/variants';

export const gridVariants = createVariants({
  'base': 'mx-auto grid grid-cols-1',
  'defaultVariants': {
    'columns': '3',
    'gap': 'md'
  },
  'variants': {
    'columns': {
      '2': 'md:grid-cols-2',
      '3': 'md:grid-cols-3',
      '4': 'md:grid-cols-2 lg:grid-cols-4'
    },
    'gap': {
      'lg': 'gap-6',
      'md': 'gap-4',
      'sm': 'gap-3'
    }
  }
});

export const gridItemVariants = createVariants({
  'base': 'group/grid row-span-1 flex flex-col justify-between space-y-4 border transition duration-200',
  'defaultVariants': {
    'padding': 'md',
    'radius': 'md',
    'variant': 'elevated'
  },
  'variants': {
    'padding': {
      'lg': 'p-6',
      'md': 'p-4',
      'sm': 'p-3'
    },
    'radius': {
      'lg': 'rounded-lg',
      'md': 'rounded-md',
      'sm': 'rounded-sm'
    },
    'variant': {
      'elevated': 'border-gray-200 bg-white shadow-sm hover:shadow-md dark:border-white/[0.2] dark:bg-black dark:shadow-none',
      'outline': 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950',
      'soft': 'border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900'
    }
  }
});

export const Grid = ({ children, className, columns, gap }) => (
  <div className={ gridVariants({ className, columns, gap }) }>
    {children}
  </div>
);

export const GridItem = ({ className, classNames = {}, description, header, icon, padding, radius, title, variant }) => (
  <div className={ gridItemVariants({ 'className': cn(className, classNames.root), padding, radius, variant }) }>
    {header}
    <div className={ cn('transition duration-200 group-hover/grid:translate-x-2', classNames.body) }>
      {icon}
      <div className={ cn('mb-2 mt-2 font-sans font-bold text-gray-700 dark:text-gray-200', classNames.title) }>
        {title}
      </div>
      <div className={ cn('text-xs font-normal text-gray-600 dark:text-gray-300', classNames.description) }>
        {description}
      </div>
    </div>
  </div>
);
