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

import Icon from '@/components/primitives/Icon';

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
  const [ copied, setCopied ] = useState(false);

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
    <div ref={ textInput } className='relative'>
      <button
        aria-label={ copied ? 'Code copied' : 'Copy code' }
        type='button'
        className={ `code-copy-button absolute right-3 z-10 flex h-6 w-6 items-center justify-center rounded-md text-zinc-400 transition-colors hover:text-zinc-200 focus:outline-hidden focus:ring-2 focus:ring-blue-400 ${
          copied ? 'text-green-400 hover:text-green-300' : ''
        }` }
        onClick={ onCopy }
      >
        {copied ? <Icon name='CheckIcon' decorative className='h-3.5 w-3.5' stroke={ 2 } /> : <Icon name='CopyIcon' decorative className='h-3.5 w-3.5' stroke={ 2 } />}
      </button>

      <pre>{props.children}</pre>
    </div>
  );
};

export default Pre;
