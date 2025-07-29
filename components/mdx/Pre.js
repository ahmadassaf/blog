/**
 * Pre Component
 *
 * @description Interactive code block wrapper with copy-to-clipboard functionality.
 * Enhances standard pre elements with hover effects and clipboard integration.
 * Used within MDX content to display code blocks with enhanced user experience.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

import { useRef, useState } from 'react';

/**
 * Interactive code block component with copy functionality
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The code content to be displayed
 * @returns {JSX.Element} A div containing the interactive pre element
 *
 * @example
 * // In MDX content (automatically used for code blocks):
 * ```javascript
 * const example = 'This will be wrapped in Pre component';
 * ```
 */
const Pre = (props) => {
  const textInput = useRef(null);
  const [ hovered, setHovered ] = useState(false);
  const [ copied, setCopied ] = useState(false);

  /**
   * Handles mouse enter event to show copy button
   */
  const onEnter = () => {
    setHovered(true);
  };

  /**
   * Handles mouse leave event to hide copy button and reset state
   */
  const onExit = () => {
    setHovered(false);
    setCopied(false);
  };

  /**
   * Copies code content to clipboard and shows success feedback
   */
  const onCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(textInput.current.textContent);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div ref={ textInput } onMouseEnter={ onEnter } onMouseLeave={ onExit } className='relative'>
      {hovered && (
        <button
          aria-label='Copy code'
          type='button'
          className={ `absolute right-2 top-2 h-8 w-8 rounded border-2 bg-gray-700 p-1 dark:bg-gray-800 ${
            copied ? 'border-green-400 focus:border-green-400 focus:outline-hidden' : 'border-gray-300'
          }` }
          onClick={ onCopy }
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' stroke='currentColor' fill='none' className={ copied ? 'text-green-400' : 'text-gray-300' }>
            {copied ? (
              <>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={ 2 } d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'/>
              </>
            ) : (
              <>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={ 2 } d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'/>
              </>
            )}
          </svg>
        </button>
      )}

      <pre>{props.children}</pre>
    </div>
  );
};

export default Pre;
