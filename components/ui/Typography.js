/**
 * Typography Component
 *
 * @description A comprehensive typography component that abstracts heading elements (H1-H6)
 * with consistent styling and responsive design. Provides predefined variants for different
 * use cases while allowing customization through props.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import React from 'react';

/**
 * Typography variants with their corresponding styles
 */

const variants = {
  'author-name': {
    'className': 'text-4xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl sm:leading-10 md:text-6xl md:leading-14',
    'element': 'h1'
  },
  'author-role': {
    'className': 'text-1xl sm:text-1xl leading-9 tracking-tight text-gray-600 dark:text-gray-100 sm:leading-10 md:text-2xl md:leading-14',
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
    'className': 'text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100',
    'element': 'h1'
  },
  'display-xl': {
    'className': 'text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100',
    'element': 'h1'
  },
  'error-title': {
    'className': 'text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:border-r-2 md:px-6 md:text-8xl md:leading-14',
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
    'className': 'text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white',
    'element': 'h2'
  },
  'paragraph-lg': {
    'className': 'text-lg leading-7 text-gray-700 dark:text-gray-300',
    'element': 'p'
  },
  'paragraph-md': {
    'className': 'text-base leading-6 text-gray-700 dark:text-gray-300',
    'element': 'p'
  },
  'paragraph-sm': {
    'className': 'text-sm leading-5 text-gray-600 dark:text-gray-400',
    'element': 'p'
  },
  'post-subtitle': {
    'className': 'text-2xl sm:text-2xl md:text-3xl lg:text-3xl tracking-tight text-gray-600 dark:text-gray-100 leading-snug capitalize break-words',
    'element': 'h3'
  },
  'post-title': {
    'className': 'text-5xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100 break-words',
    'element': 'h1'
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

/**
 * Typography component for consistent heading styles
 *
 * @description Renders heading elements with predefined styling variants. Supports
 * custom element override, additional classes, and all standard HTML attributes.
 * Provides responsive typography that works across different screen sizes.
 *
 * @param {Object} props - Component props
 * @param {'display-xl'|'display-lg'|'title-xl'|'title-lg'|'title-md'|'heading-xl'|'heading-lg'|'heading-md'|'heading-sm'|'subtitle-xl'|'subtitle-lg'|'subtitle-md'|'card-title'|'card-subtitle'|'author-name'|'author-role'|'paragraph-lg'|'paragraph-md'|'paragraph-sm'|'post-title'|'post-subtitle'|'error-title'} props.variant - Typography variant
 * @param {'h1'|'h2'|'h3'|'h4'|'h5'|'h6'|'div'|'span'} [props.as] - Override the default HTML element
 * @param {string} [props.className] - Additional CSS classes to append
 * @param {React.ReactNode} props.children - Content to render
 * @param {...Object} props.rest - Additional HTML attributes
 *
 * @returns {JSX.Element} Rendered typography element
 *
 * @example
 * // Basic usage with variant
 * <Typography variant="title-xl">
 *   Welcome to My Blog
 * </Typography>
 *
 * @example
 * // Override element type
 * <Typography variant="heading-lg" as="h1">
 *   Page Title
 * </Typography>
 *
 * @example
 * // Add custom classes
 * <Typography variant="subtitle-md" className="mb-6 text-center">
 *   Subtitle with custom styling
 * </Typography>
 *
 * @example
 * // Post header usage
 * <Typography variant="post-title">
 *   {frontMatter.title}
 * </Typography>
 * <Typography variant="post-subtitle">
 *   {frontMatter.subtitle}
 * </Typography>
 */
const Typography = ({
  variant,
  as,
  className = '',
  children,
  ...rest
}) => {
  if (!variant || !variants[variant]) {
    console.warn(`Typography: Unknown variant "${variant}". Available variants:`, Object.keys(variants));

    return null;
  }

  const config = variants[variant];
  const Element = as || config.element;
  const combinedClassName = className ? `${config.className} ${className}` : config.className;

  return (
    <Element className={ combinedClassName } { ...rest }>
      { children }
    </Element>
  );
};

// Export individual variant configurations for advanced use cases
export { variants };

export default Typography;
