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
        2xl:absolute 2xl:w-[250px] 2xl:left-[-20%] 2xl:py-2
        my-4 px-4 py-3
        bg-gray-50 dark:bg-gray-800
        2xl:bg-transparent 2xl:dark:bg-transparent
        border-l-4 2xl:border-0 border-gray-300 dark:border-[#303030]
        ${className}
      ` }
  >
    {children}
  </div>
);

export default Aside;
