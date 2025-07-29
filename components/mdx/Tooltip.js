/**
 * Tooltip Component
 *
 * @description Interactive tooltip component that displays additional information on hover.
 * Features a small icon indicator and smooth scaling animation with customizable tooltip text.
 * Used within MDX content to provide contextual information without cluttering the main text.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { EllipsisHorizontalCircleIcon } from '@heroicons/react/20/solid';

/**
 * Renders an interactive tooltip with hover effects
 *
 * @param {Object} props - Component props
 * @param {string} props.text - The tooltip text to display on hover
 * @param {React.ReactNode} props.children - The content that triggers the tooltip
 * @returns {JSX.Element} A span element with tooltip functionality
 *
 * @example
 * // In MDX content:
 * <Tooltip text="This provides additional context">
 *   Hover over this text
 * </Tooltip>
 */
export default function Tooltip({ text, children }) {
  return (
    <span className='group relative inline-flex! hover:text-blue-700 cursor-context-menu'>
      {children}
      <EllipsisHorizontalCircleIcon className='h-3 w-3 text-gray-700 group-hover:text-blue-700'/>
      <span className='absolute top-8 scale-0 text-center w-[400px] transition-all rounded-sm bg-gray-800 group-hover:bg-blue-700 p-2 text-xs text-white group-hover:scale-100'>{text}</span>
    </span>
  );
}
