/**
 * Image Modal Component
 *
 * @description Full-screen modal component for displaying enlarged images.
 * Features smooth animations, keyboard navigation (ESC to close), and click-outside-to-close.
 * Optimized for both desktop and mobile viewing with proper accessibility support.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/**
 * Renders a full-screen modal overlay for displaying enlarged images
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to call when modal should be closed
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Image alt text
 * @param {string} [props.caption] - Optional image caption
 * @returns {JSX.Element|null} Portal-rendered modal or null if closed
 *
 * @example
 * <ImageModal
 *   isOpen={isModalOpen}
 *   onClose={() => setIsModalOpen(false)}
 *   src="/static/images/posts/example.svg"
 *   alt="Example diagram"
 *   caption="Figure 1: System Architecture"
 * />
 */
const ImageModal = ({ isOpen, onClose, src, alt, caption }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape')
        onClose();

    };

    const handleClickOutside = (event) => {
      if (modalRef.current && event.target === modalRef.current)
        onClose();

    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [ isOpen, onClose ]);

  if (!isOpen || typeof document === 'undefined')
    return null;

  return createPortal(
    <div
      ref={ modalRef }
      className='fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/80 dark:bg-black/80 backdrop-blur-sm'
      role='dialog'
      aria-modal='true'
      aria-labelledby={ caption ? 'modal-caption' : undefined }
    >
      {/* Modal content container */}
      <div className='relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-[70vw] max-h-[70vh] overflow-hidden'>
        {/* Close button */}
        <button
          onClick={ onClose }
          className='absolute top-4 right-4 z-10 p-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white bg-white/90 dark:bg-gray-800/90 rounded-full transition-colors duration-200'
          aria-label='Close modal'
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={ 2 }
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>

        {/* Image container */}
        <div className='flex flex-col items-center p-6'>
          <img
            src={ src }
            alt={ alt }
            className='max-w-full max-h-[55vh] object-contain rounded-lg'
            loading='lazy'
          />

          {caption && (
            <p
              id='modal-caption'
              className='mt-4 text-center text-sm text-gray-700 dark:text-gray-300 max-w-2xl'
            >
              {caption}
            </p>
          )}
        </div>
      </div>
    </div>, document.body
  );
};

export default ImageModal;
