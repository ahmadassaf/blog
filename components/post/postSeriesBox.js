/**
 * PostSeriesBox Component
 *
 * @description Beautiful, collapsible series navigation component that displays related posts in a blog post series.
 * Shows the series title and can be expanded to reveal all posts with the current post highlighted.
 * Features smooth animations and elegant design with improved UX.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

// External libraries
import { useState } from 'react';
import { ChevronDownIcon, Square3Stack3DIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

/**
 * Renders a beautiful, collapsible series navigation box with related posts
 *
 * @description Displays an elegant card containing the series name with expand/collapse functionality.
 * When collapsed, shows only the series title with a chevron indicator. When expanded, reveals
 * all posts in the series with the current post highlighted. Features smooth animations,
 * progress indication, and modern design aesthetics.
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.series - Array of posts in the series
 * @param {string} props.series[].slug - URL slug for the post
 * @param {string} props.series[].title - Title of the post
 * @param {string} props.series[].series - Name of the series (same for all posts)
 * @param {number} [props.series[].order] - Optional order number for the post
 * @param {string} props.slug - Current post's slug for highlighting
 *
 * @returns {JSX.Element} Collapsible series navigation card with post list
 *
 * @example
 * // Basic usage with series data
 * const seriesPosts = [
 *   { slug: 'post-1', title: 'Part 1: Introduction', series: 'React Tutorial', order: 1 },
 *   { slug: 'post-2', title: 'Part 2: Components', series: 'React Tutorial', order: 2 }
 * ];
 * <PostSeriesBox series={seriesPosts} slug="post-1" />
 */
const PostSeriesBox = ({ series, slug }) => {
  const [ isExpanded, setIsExpanded ] = useState(false);

  if (!series || series.length === 0) return null;

  const currentPostIndex = series.findIndex((post) => post.slug === slug);
  const completedCount = currentPostIndex >= 0 ? currentPostIndex + 1 : 0;
  const totalCount = series.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <div className='mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg'>

      {/* Header - Always Visible */}
      <button
        onClick={ () => setIsExpanded(!isExpanded) }
        className='w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200'
        aria-expanded={ isExpanded }
        aria-controls='series-content'
      >
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-3 flex-1'>
            <Square3Stack3DIcon className='h-4 w-4 text-blue-500' />
            <span className='text-sm text-gray-600 dark:text-gray-400'>Part of</span>
            <h3 className='font-medium text-gray-900 dark:text-gray-100 truncate'>
              {series[0].series}
            </h3>
            <div className='flex items-center space-x-2 ml-auto'>
              <div className='w-16 h-1 bg-gray-200 dark:bg-gray-700 rounded-full'>
                <div
                  className='h-full bg-green-600 rounded-full transition-all duration-300'
                  style={{ 'width': `${progressPercentage}%` }}
                />
              </div>
              <span className='text-xs text-gray-500 dark:text-gray-400'>
                {completedCount}/{totalCount}
              </span>
            </div>
          </div>

          <ChevronDownIcon
            className={ `h-4 w-4 text-gray-400 ml-2 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }` }
          />
        </div>
      </button>

      {/* Expandable Content */}
      <div
        id='series-content'
        className={ `overflow-hidden transition-all duration-300 ease-out ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }` }
      >
        <div className='px-4 pb-4 border-t border-gray-200 dark:border-gray-700'>
          <div className='mt-4 space-y-2'>
            {series.map((post, index) => {
              const isCurrentPost = post.slug === slug;
              const isCompleted = index <= currentPostIndex && currentPostIndex >= 0;

              return (
                <div key={ post.slug } className='flex items-center space-x-3 py-2'>
                  <div className='flex-shrink-0'>
                    {isCompleted ? (
                      <div className='w-2 h-2 bg-blue-600 rounded-full' />
                    ) : (
                      <div className='w-2 h-2 border border-gray-300 dark:border-gray-600 rounded-full' />
                    )}
                  </div>

                  {post.order && (
                    <span className='text-xs text-gray-500 dark:text-gray-400 w-4'>
                      {post.order}.
                    </span>
                  )}

                  <div className='flex-1 min-w-0'>
                    {isCurrentPost ? (
                      <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                        {post.title}
                        <span className='ml-2 text-xs text-gray-500 dark:text-gray-400'>(current)</span>
                      </span>
                    ) : (
                      <Link
                        href={ `/blog/${post.slug}` }
                        className='text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200'
                      >
                        {post.title}
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSeriesBox;
