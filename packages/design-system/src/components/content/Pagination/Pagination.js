/**
 * Pagination Component
 *
 * @description A pagination component that provides navigation controls for paginated content.
 * Displays previous/next buttons and page indicators with proper accessibility attributes.
 * Supports customizable URLs for different content types (posts, categories, tags, etc.).
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import Icon from '@/components/primitives/Icon';
import { cn } from '@/components/utilities/cn';

/**
 * Number of posts to display per page
 * @constant {number}
 */
const POSTS_PER_PAGE = 7;

/**
 * Enhanced pagination component for navigating through paginated content
 *
 * @description Renders clean, typography-focused pagination controls with improved styling.
 * Features enhanced hover effects, better spacing, and consistent visual design.
 *
 * @param {Object} props - Component props
 * @param {number} props.totalPages - Total number of pages available
 * @param {number} props.currentPage - Current active page number
 * @param {string} props.baseURL - Base URL for the first page (e.g., 'blog')
 * @param {string} props.paginationURL - URL pattern for paginated pages (e.g., 'blog/page')
 *
 * @returns {JSX.Element} The rendered pagination component
 *
 * @example
 * <Pagination
 *   totalPages={10}
 *   currentPage={3}
 *   baseURL="blog"
 *   paginationURL="blog/page"
 * />
 */
const Pagination = ({ className, classNames = {}, totalPages, currentPage, baseURL, paginationURL }) => {
  const prevPage = parseInt(currentPage) - 1 > 0;
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages);

  return (
    <nav className={ cn('mt-8 flex items-center justify-between pt-2', className, classNames.root) }>
      {/* Previous Button */}
      <div className={ cn('flex w-0 flex-1', classNames.previousSlot) }>
        {prevPage ? (
          <a
            href={ currentPage - 1 === 1 ? `/${baseURL}/` : `/${paginationURL}/${currentPage - 1}` }
            className={ cn('group inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-blue-300 hover:bg-gray-50 hover:text-blue-600 dark:border-border-dark dark:bg-gray-900 dark:text-gray-300 dark:hover:border-blue-600 dark:hover:bg-gray-800 dark:hover:text-blue-400', classNames.action) }
          >
            <Icon name='ArrowLeft' size='sm' decorative className={ cn('mr-2 transition-transform duration-200 group-hover:-translate-x-1', classNames.icon) } />
            Previous
          </a>
        ) : (
          <button
            type='button'
            disabled
            className={ cn('inline-flex cursor-not-allowed items-center rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400 dark:border-border-dark dark:bg-gray-800 dark:text-gray-600', classNames.disabledAction) }
          >
            <Icon name='ArrowLeft' size='sm' decorative className='mr-2' />
            Previous
          </button>
        )}
      </div>

      {/* Page Indicator */}
      <div className={ cn('mx-8 flex items-center', classNames.statusSlot) }>
        <span className={ cn('rounded-md bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 dark:bg-gray-800/50 dark:text-gray-300', classNames.status) }>
          <span className='text-blue-600 dark:text-blue-400 font-semibold'>{currentPage}</span>
          <span className='mx-1.5 text-gray-400'>of</span>
          <span className='text-gray-600 dark:text-gray-300'>{totalPages}</span>
        </span>
      </div>

      {/* Next Button */}
      <div className={ cn('flex w-0 flex-1 justify-end', classNames.nextSlot) }>
        {nextPage ? (
          <a
            href={ `/${paginationURL}/${currentPage + 1}` }
            className={ cn('group inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-blue-300 hover:bg-gray-50 hover:text-blue-600 dark:border-border-dark dark:bg-gray-900 dark:text-gray-300 dark:hover:border-blue-600 dark:hover:bg-gray-800 dark:hover:text-blue-400', classNames.action) }
          >
            Next
            <Icon name='ArrowRight' size='sm' decorative className={ cn('ml-2 transition-transform duration-200 group-hover:translate-x-1', classNames.icon) } />
          </a>
        ) : (
          <button
            type='button'
            disabled
            className={ cn('inline-flex cursor-not-allowed items-center rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400 dark:border-border-dark dark:bg-gray-800 dark:text-gray-600', classNames.disabledAction) }
          >
            Next
            <Icon name='ArrowRight' size='sm' decorative className='ml-2' />
          </button>
        )}
      </div>
    </nav>
  );
};

export { Pagination, POSTS_PER_PAGE };
