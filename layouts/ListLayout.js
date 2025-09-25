/**
 * List Layout Component
 *
 * @description A flexible layout component for displaying lists of blog posts with search and pagination functionality.
 * Supports filtering posts by search terms, pagination controls, and responsive design. Used across
 * various blog listing pages including main blog page, category pages, and tag pages.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

import { useState } from 'react';

import Search from '@/components/elements/Search';
import Post from '@/components/post/Post';

const POSTS_PER_PAGE = 7;

/**
 * List layout component for displaying blog posts with search and pagination
 *
 * @description Renders a list of blog posts with optional search functionality and pagination controls.
 * The component handles client-side filtering of posts based on search terms and manages
 * the display state for both paginated and filtered views.
 *
 * @param {Object} props - Component props
 * @param {Array} props.posts - Array of post objects to display
 * @param {boolean} [props.filter=true] - Whether to show the search filter
 * @param {string} [props.baseURL] - Base URL for pagination links
 * @param {string} [props.paginationURL] - URL pattern for pagination
 * @param {number} [props.currentPage] - Current page number for pagination
 * @param {number} [props.totalPages] - Total number of pages for pagination
 *
 * @returns {JSX.Element} The rendered list layout component
 *
 * @example
 * <ListLayout
 *   posts={allPosts}
 *   filter={true}
 *   baseURL="/blog"
 *   paginationURL="/blog/page"
 *   currentPage={1}
 *   totalPages={5}
 * />
 */
export default function ListLayout({ posts, filter = true }) {

  const [ searchValue, setSearchValue ] = useState('');
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ isLoading, setIsLoading ] = useState(false);

  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ');

    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  const totalPages = Math.ceil(filteredBlogPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const displayPosts = searchValue ? filteredBlogPosts : filteredBlogPosts.slice(startIndex, endIndex);

  const handlePageChange = async(newPage) => {
    if (newPage === currentPage || newPage < 1 || newPage > totalPages) return;

    setIsLoading(true);

    // Simulate loading delay for smooth UX
    await new Promise((resolve) => setTimeout(resolve, 200));
    setCurrentPage(newPage);
    setIsLoading(false);
  };

  // Reset pagination when search changes
  const handleSearchChange = (value) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const prevPage = currentPage > 1;
  const nextPage = currentPage < totalPages;

  return (
    <div className='border-0'>
      <div>
        { filter && <Search setSearchValue={ handleSearchChange }></Search> }

        <ul className='pt-6'>
          {!filteredBlogPosts.length && 'No posts found'}
          {displayPosts.map((frontMatter) => (
            <Post key={ frontMatter.slug } frontMatter={ frontMatter } />
          ))}
        </ul>

        {totalPages > 1 && !searchValue && (
          <nav className='flex items-center justify-between pt-8'>
            {/* Previous Button */}
            <div className='flex w-0 flex-1'>
              {prevPage ? (
                <button
                  onClick={ () => handlePageChange(currentPage - 1) }
                  disabled={ isLoading }
                  className='group inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-[#303030] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed'
                >
                  {isLoading ? (
                    <svg className='animate-spin mr-2 h-4 w-4' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                      <path className='opacity-75' fill='currentColor' d='m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                    </svg>
                  ) : (
                    <svg className='mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={ 2 } d='M15 19l-7-7 7-7' />
                    </svg>
                  )}
                  Previous
                </button>
              ) : (
                <button
                  disabled
                  className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-[#303030] rounded-lg cursor-not-allowed'
                >
                  <svg className='mr-2 h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={ 2 } d='M15 19l-7-7 7-7' />
                  </svg>
                  Previous
                </button>
              )}
            </div>

            {/* Page Indicator */}
            <div className='flex items-center mx-8 relative group cursor-pointer'>
              {/* Default counter */}
              <span className='px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 group-hover:opacity-0 group-hover:scale-95 transition-all duration-300 ease-out'>
                <span className='text-blue-600 dark:text-blue-400 font-semibold'>{currentPage}</span>
                <span className='mx-2 text-gray-400'>of</span>
                <span className='text-gray-600 dark:text-gray-300'>{totalPages}</span>
              </span>

              {/* Expanded page numbers */}
              <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out flex items-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg px-4 py-2 text-sm font-medium whitespace-nowrap z-20'>
                {/* First page */}
                <button
                  onClick={ () => handlePageChange(1) }
                  disabled={ isLoading || currentPage === 1 }
                  className={ `px-3 py-1.5 mx-1 text-sm font-semibold rounded-md transition-all duration-200 cursor-pointer hover:scale-105 ${
                    currentPage === 1 ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  } disabled:opacity-50` }
                >
                  1
                </button>

                {/* Page numbers or ellipsis */}
                {totalPages <= 5 ? (

                  // Show all pages if 5 or fewer
                  Array.from({ 'length': totalPages - 2 }, (_, i) => i + 2).map((page) => (
                    <button
                      key={ page }
                      onClick={ () => handlePageChange(page) }
                      disabled={ isLoading || currentPage === page }
                      className={ `px-3 py-1.5 mx-1 text-sm font-semibold rounded-md transition-all duration-200 cursor-pointer hover:scale-105 ${
                        currentPage === page ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                      } disabled:opacity-50` }
                    >
                      {page}
                    </button>
                  ))
                ) : (

                  // Show 1, 2, 3, 4, ..., last for more than 5 pages
                  <>
                    {[ 2, 3, 4 ].map((page) => (
                      <button
                        key={ page }
                        onClick={ () => handlePageChange(page) }
                        disabled={ isLoading || currentPage === page }
                        className={ `px-3 py-1.5 mx-1 text-sm font-semibold rounded-md transition-all duration-200 cursor-pointer hover:scale-105 ${
                          currentPage === page ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                        } disabled:opacity-50` }
                      >
                        {page}
                      </button>
                    ))}
                    <span className='px-2 py-1.5 mx-1 text-gray-400 dark:text-gray-500 font-bold'>⋯</span>
                  </>
                )}

                {/* Last page (only if more than 1 page) */}
                {totalPages > 1 && (
                  <button
                    onClick={ () => handlePageChange(totalPages) }
                    disabled={ isLoading || currentPage === totalPages }
                    className={ `px-3 py-1.5 mx-1 text-sm font-semibold rounded-md transition-all duration-200 cursor-pointer hover:scale-105 ${
                      currentPage === totalPages ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    } disabled:opacity-50` }
                  >
                    {totalPages}
                  </button>
                )}
              </div>
            </div>

            {/* Next Button */}
            <div className='flex w-0 flex-1 justify-end'>
              {nextPage ? (
                <button
                  onClick={ () => handlePageChange(currentPage + 1) }
                  disabled={ isLoading }
                  className='group inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-[#303030] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed'
                >
                  Next
                  {isLoading ? (
                    <svg className='animate-spin ml-2 h-4 w-4' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                      <path className='opacity-75' fill='currentColor' d='m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                    </svg>
                  ) : (
                    <svg className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={ 2 } d='M9 5l7 7-7 7' />
                    </svg>
                  )}
                </button>
              ) : (
                <button
                  disabled
                  className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-[#303030] rounded-lg cursor-not-allowed'
                >
                  Next
                  <svg className='ml-2 h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={ 2 } d='M9 5l7 7-7 7' />
                  </svg>
                </button>
              )}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}
