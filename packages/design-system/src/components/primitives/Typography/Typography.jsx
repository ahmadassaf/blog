import { cn } from '@/components/utilities/cn';

export const typographyVariants = {
  'author-name': {
    'className': 'text-4xl font-extrabold leading-[1.12] tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl sm:leading-[1.08] md:text-6xl md:leading-[1.08] text-balance break-words',
    'element': 'h1'
  },
  'author-role': {
    'className': 'text-xl leading-8 tracking-tight text-gray-600 dark:text-gray-300 md:text-2xl md:leading-9',
    'element': 'h3'
  },
  'card-subtitle': {
    'className': 'text-lg font-medium text-gray-600 dark:text-gray-400',
    'element': 'h4'
  },
  'card-title': {
    'className': 'text-xl font-bold text-gray-900 dark:text-white leading-tight',
    'element': 'h3'
  },
  'display-lg': {
    'className': 'text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.12] tracking-tight text-gray-900 dark:text-gray-100 text-balance',
    'element': 'h1'
  },
  'display-xl': {
    'className': 'text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.08] tracking-tight text-gray-900 dark:text-gray-100 text-balance',
    'element': 'h1'
  },
  'error-title': {
    'className': 'text-7xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-gray-100 md:border-r-2 md:border-gray-900 md:pr-6 md:text-8xl dark:md:border-gray-100',
    'element': 'h1'
  },
  'heading-lg': {
    'className': 'text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight',
    'element': 'h2'
  },
  'heading-md': {
    'className': 'text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight',
    'element': 'h3'
  },
  'heading-sm': {
    'className': 'text-lg md:text-xl font-semibold text-gray-900 dark:text-white',
    'element': 'h4'
  },
  'heading-xl': {
    'className': 'text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white text-balance',
    'element': 'h2'
  },
  'metadata': {
    'className': 'text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400',
    'element': 'p'
  },
  'paragraph-lg': {
    'className': 'text-lg leading-8 text-gray-700 dark:text-gray-300',
    'element': 'p'
  },
  'paragraph-md': {
    'className': 'text-base leading-7 text-gray-700 dark:text-gray-300',
    'element': 'p'
  },
  'paragraph-sm': {
    'className': 'text-sm leading-5 text-gray-600 dark:text-gray-400',
    'element': 'p'
  },
  'post-meta': {
    'className': 'text-sm leading-6 text-gray-500 dark:text-gray-400',
    'element': 'p'
  },
  'post-subtitle': {
    'className': 'w-full text-lg leading-8 text-gray-600 dark:text-gray-300 sm:text-xl sm:leading-9 md:text-2xl md:leading-10',
    'element': 'h3'
  },
  'post-title': {
    'className': 'w-full text-4xl font-extrabold leading-[1.16] tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl sm:leading-[1.14] lg:text-6xl lg:leading-[1.12] break-words',
    'element': 'h1'
  },
  'prose-lead': {
    'className': 'text-xl leading-10 text-gray-700 dark:text-gray-300',
    'element': 'p'
  },
  'subtitle-lg': {
    'className': 'text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-300 leading-snug',
    'element': 'h3'
  },
  'subtitle-md': {
    'className': 'text-lg font-medium text-gray-600 dark:text-gray-400',
    'element': 'h4'
  },
  'subtitle-xl': {
    'className': 'text-2xl sm:text-3xl font-medium tracking-tight text-gray-600 dark:text-gray-300 leading-snug',
    'element': 'h2'
  },
  'title-lg': {
    'className': 'text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white',
    'element': 'h1'
  },
  'title-md': {
    'className': 'text-3xl sm:text-4xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100',
    'element': 'h1'
  },
  'title-xl': {
    'className': 'text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100',
    'element': 'h1'
  }
};

const Typography = ({
  as,
  children,
  className = '',
  variant = 'paragraph-md',
  ...rest
}) => {
  const config = typographyVariants[variant];

  if (!config) return null;

  const Element = as || config.element;

  return (
    <Element className={ cn(config.className, className) } { ...rest }>
      {children}
    </Element>
  );
};

export { typographyVariants as variants };
export default Typography;
