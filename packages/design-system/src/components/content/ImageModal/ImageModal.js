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

import Button from '@/components/core/Button';
import Icon from '@/components/core/Icon';

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
  const closeButtonRef = useRef(null);
  const previouslyFocusedElementRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    previouslyFocusedElementRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    const handleEscape = (event) => {
      if (event.key === 'Escape')
        onClose();

    };

    const handleTab = (event) => {
      if (event.key !== 'Tab' || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];

      if (!firstFocusableElement || !lastFocusableElement) {
        event.preventDefault();

        return;
      }

      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    };

    const handleClickOutside = (event) => {
      if (modalRef.current && event.target === modalRef.current)
        onClose();

    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTab);
    document.addEventListener('click', handleClickOutside);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTab);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
      previouslyFocusedElementRef.current?.focus?.();
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
      aria-label={ caption ? undefined : alt || 'Image preview' }
    >
      {/* Modal content container */}
      <div className='relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-[70vw] max-h-[70vh] overflow-hidden'>
        {/* Close button */}
        <Button
          ref={ closeButtonRef }
          variant='ghost'
          tone='gray'
          size='sm'
          onClick={ onClose }
          className='absolute right-4 top-4 z-10 h-10 w-10 rounded-full bg-white/90 p-0 text-gray-600 hover:bg-white dark:bg-gray-800/90 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
          aria-label='Close modal'
        >
          <Icon name='X' decorative size='md' />
        </Button>

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
