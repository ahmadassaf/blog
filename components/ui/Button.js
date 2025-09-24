/**
 * Button/Link Component
 *
 * @description A versatile button and link component that provides consistent styling
 * variants for different use cases. Can render as buttons, internal links, or external links
 * with predefined styles for common UI patterns.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import React from 'react';
import Link from 'next/link';

/**
 * Button/Link variants with their corresponding styles
 */

const variants = {
  'ghost-lg': {
    'className': 'inline-flex items-center gap-3 px-8 py-4 text-base font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200',
    'element': 'button'
  },
  'ghost-md': {
    'className': 'inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200',
    'element': 'button'
  },
  'ghost-sm': {
    'className': 'inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-all duration-200',
    'element': 'button'
  },
  'link-primary-lg': {
    'className': 'inline-flex items-center gap-3 px-8 py-4 text-base font-semibold text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-900 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-700 dark:hover:text-blue-300 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 group',
    'element': 'link'
  },
  'link-primary-md': {
    'className': 'inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-900 border border-gray-200 dark:border-[#303030] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-700 dark:hover:text-blue-300 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 group',
    'element': 'link'
  },
  'link-primary-sm': {
    'className': 'inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-900 border border-gray-200 dark:border-[#303030] rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-700 dark:hover:text-blue-300 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 group',
    'element': 'link'
  },
  'link-secondary-lg': {
    'className': 'inline-flex items-center gap-3 px-8 py-4 text-base font-semibold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-200 group',
    'element': 'link'
  },
  'link-secondary-md': {
    'className': 'inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-200 group',
    'element': 'link'
  },
  'link-secondary-sm': {
    'className': 'inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-200 group',
    'element': 'link'
  },
  'link-text': {
    'className': 'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200',
    'element': 'link'
  },
  'link-text-muted': {
    'className': 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200',
    'element': 'link'
  },
  'primary-lg': {
    'className': 'inline-flex items-center gap-3 px-8 py-4 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200',
    'element': 'button'
  },
  'primary-md': {
    'className': 'inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200',
    'element': 'button'
  },
  'primary-sm': {
    'className': 'inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200',
    'element': 'button'
  },
  'secondary-lg': {
    'className': 'inline-flex items-center gap-3 px-8 py-4 text-base font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200',
    'element': 'button'
  },
  'secondary-md': {
    'className': 'inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200',
    'element': 'button'
  },
  'secondary-sm': {
    'className': 'inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200',
    'element': 'button'
  }
};

/**
 * Button/Link component with predefined styling variants
 *
 * @description Renders buttons or links with consistent styling based on variant.
 * Automatically handles Next.js Link for internal navigation and regular anchors
 * for external links. Supports all standard HTML attributes and custom styling.
 *
 * @param {Object} props - Component props
 * @param {'primary-lg'|'primary-md'|'primary-sm'|'secondary-lg'|'secondary-md'|'secondary-sm'|'link-primary-lg'|'link-primary-md'|'link-primary-sm'|'link-secondary-lg'|'link-secondary-md'|'link-secondary-sm'|'link-text'|'link-text-muted'|'ghost-lg'|'ghost-md'|'ghost-sm'} props.variant - Button/Link variant
 * @param {'button'|'link'|'external-link'} [props.as] - Override the default element type
 * @param {string} [props.href] - Link destination (required for link variants)
 * @param {string} [props.className] - Additional CSS classes to append
 * @param {boolean} [props.disabled] - Disable the button (only for button variants)
 * @param {React.ReactNode} props.children - Button/Link content
 * @param {...Object} props.rest - Additional HTML attributes
 *
 * @returns {JSX.Element} Rendered button or link element
 *
 * @example
 * // Primary button
 * <Button variant="primary-md" onClick={handleClick}>
 *   Save Changes
 * </Button>
 *
 * @example
 * // Internal link styled as button
 * <Button variant="link-primary-md" href="/blog">
 *   View All Posts
 * </Button>
 *
 * @example
 * // External link
 * <Button variant="link-text" href="https://example.com" as="external-link">
 *   Learn More
 * </Button>
 */
const Button = ({
  variant,
  as,
  href,
  className = '',
  disabled = false,
  children,
  ...rest
}) => {
  if (!variant || !variants[variant]) {
    console.warn(`Button: Unknown variant "${variant}". Available variants:`, Object.keys(variants));

    return null;
  }

  const config = variants[variant];
  const combinedClassName = className ? `${config.className} ${className}` : config.className;

  // Handle disabled state for buttons
  const finalClassName = disabled && config.element === 'button' ? `${combinedClassName} opacity-50 cursor-not-allowed` : combinedClassName;

  // Determine element type
  let elementType = as || config.element;

  // Auto-detect external vs internal links
  if (elementType === 'link' && href)
    elementType = href.startsWith('http') || href.startsWith('mailto:') ? 'external-link' : 'internal-link';

  // Render based on element type
  switch (elementType) {
  case 'internal-link':
    return (
      <Link href={ href } className={ finalClassName } { ...rest }>
        {children}
      </Link>
    );

  case 'external-link':
    return (
      <a
        href={ href }
        className={ finalClassName }
        target='_blank'
        rel='noopener noreferrer'
        { ...rest }
      >
        {children}
      </a>
    );

  case 'button':
  default:
    return (
      <button
        className={ finalClassName }
        disabled={ disabled }
        { ...rest }
      >
        {children}
      </button>
    );
  }
};

// Export individual variant configurations for advanced use cases
export { variants };

export default Button;
