/**
 * Aside Component
 *
 * @description A styled aside component for supplementary content.
 * Handles both inline and block content gracefully, ensuring consistent
 * rendering regardless of how MDX processes the children.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import React from 'react';

/**
 * Renders a styled aside element with consistent formatting
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The content to display within the aside
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} A styled aside element
 *
 * @example
 * // In MDX content - inline:
 * <Aside>This is supplementary information about the topic.</Aside>
 *
 * @example
 * // In MDX content - block:
 * <Aside>
 * This is supplementary information.
 *
 * It can have multiple paragraphs.
 * </Aside>
 */
const Aside = ({ children, className = '' }) => (
  <div
    className={ `
        text-sm leading-6 text-gray-500 dark:text-gray-200
        lg:absolute lg:w-[250px] lg:left-[-20%] lg:py-2
        my-4 px-4 py-3
        bg-gray-50 dark:bg-gray-800 
        lg:bg-transparent lg:dark:bg-transparent
        border-l-4 lg:border-0 border-gray-300 dark:border-[#303030]
        ${className}
      ` }
  >
    {children}
  </div>
);

export default Aside;
