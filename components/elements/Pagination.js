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

import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';

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
const Pagination = ({ totalPages, currentPage, baseURL, paginationURL }) => {
  const prevPage = parseInt(currentPage) - 1 > 0;
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages);

  return (
    <nav className='flex items-center justify-between pt-2 mt-8'>
      {/* Previous Button */}
      <div className='flex w-0 flex-1'>
        {prevPage ? (
          <a
            href={ currentPage - 1 === 1 ? `/${baseURL}/` : `/${paginationURL}/${currentPage - 1}` }
            className='group inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-[#303030] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200'
          >
            <ArrowLongLeftIcon className='mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200' />
            Previous
          </a>
        ) : (
          <button
            disabled
            className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-[#303030] rounded-lg cursor-not-allowed'
          >
            <ArrowLongLeftIcon className='mr-2 h-4 w-4' />
            Previous
          </button>
        )}
      </div>

      {/* Page Indicator */}
      <div className='flex items-center mx-8'>
        <span className='px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 rounded-md'>
          <span className='text-blue-600 dark:text-blue-400 font-semibold'>{currentPage}</span>
          <span className='mx-1.5 text-gray-400'>of</span>
          <span className='text-gray-600 dark:text-gray-300'>{totalPages}</span>
        </span>
      </div>

      {/* Next Button */}
      <div className='flex w-0 flex-1 justify-end'>
        {nextPage ? (
          <a
            href={ `/${paginationURL}/${currentPage + 1}` }
            className='group inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-[#303030] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200'
          >
            Next
            <ArrowLongRightIcon className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200' />
          </a>
        ) : (
          <button
            disabled
            className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-[#303030] rounded-lg cursor-not-allowed'
          >
            Next
            <ArrowLongRightIcon className='ml-2 h-4 w-4' />
          </button>
        )}
      </div>
    </nav>
  );
};

export { Pagination, POSTS_PER_PAGE };
