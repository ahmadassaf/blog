/**
 * Tooltip Component
 *
 * @description Simple tooltip component that displays additional information on hover.
 * Features a small icon indicator with text appearing above it on hover.
 *
 * @author Ahmad Assaf
 * @version 2.0.0
 */

'use client';

import Icon from '@/components/primitives/Icon';

/**
 * Renders an interactive tooltip with hover effects
 *
 * @param {Object} props - Component props
 * @param {string} props.message - The tooltip text to display on hover (alias for text)
 * @param {string} props.text - The tooltip text to display on hover
 * @param {React.ReactNode} props.children - The content that triggers the tooltip
 * @returns {JSX.Element} A span element with tooltip functionality
 *
 * @example
 * // In MDX content:
 * <Tooltip message="This provides additional context">
 *   Hover over this text
 * </Tooltip>
 */
export default function Tooltip({ message, text, children }) {

  // Support both message and text props for flexibility
  const tooltipText = message || text || '';

  return (
    <span className='inline-flex items-baseline'>
      {children}
      <span className='group relative inline-block'>
        <Icon
          name='Info'
          decorative
          className='h-3.5 w-3.5 ml-0.5 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-help transition-colors align-baseline'
        />
        {/* Simple tooltip above icon */}
        <span className='absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-gray-900 dark:bg-gray-700 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[200px] max-w-[500px] whitespace-normal text-center pointer-events-none'>
          {tooltipText}
        </span>
      </span>
    </span>
  );
}
