/**
 * Thoughts Section Component
 *
 * @description Special display component for thoughts on the homepage.
 * Shows thoughts in a visually distinct card-based layout with icons and hover effects.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { LightBulbIcon, SparklesIcon } from '@heroicons/react/24/outline';

import Link from '@/components/elements/Link';
import formatDate from '@/lib/utils/formatDate';

/**
 * Renders a special thoughts section for the homepage
 *
 * @param {Object} props - Component props
 * @param {Array} props.thoughts - Array of thought objects to display
 *
 * @returns {JSX.Element} Thoughts section with card-based layout
 */
export default function ThoughtsSection({ thoughts }) {
  return (
    <div className='pt-16 pb-8'>
      {/* Section Header */}
      <div className='mb-8 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500'>
            <LightBulbIcon className='h-6 w-6 text-white' />
          </div>
          <div>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
              Recent Thoughts
            </h2>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Quick ideas, reflections, and insights
            </p>
          </div>
        </div>
      </div>

      {/* Thoughts Grid */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {thoughts.map((thought) => (
          <Link
            key={ thought.slug }
            href={ `/thoughts/${thought.slug}` }
            className='group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600'
          >
            {/* Card Header */}
            <div className='mb-3 flex items-start justify-between'>
              <SparklesIcon className='h-5 w-5 text-amber-500 dark:text-amber-400' />
              {thought.featured && (
                <span className='rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'>
                  Featured
                </span>
              )}
            </div>

            {/* Thought Title */}
            <h3 className='mb-2 text-base font-semibold leading-snug text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
              {thought.title}
            </h3>

            {/* Date */}
            <time
              dateTime={ thought.date }
              className='text-xs text-gray-500 dark:text-gray-400'
            >
              {formatDate(thought.date)}
            </time>

            {/* Tags */}
            {thought.tags && thought.tags.length > 0 && (
              <div className='mt-3 flex flex-wrap gap-1.5'>
                {thought.tags.slice(0, 2).map((tag) => (
                  <span
                    key={ tag }
                    className='inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Hover Effect Border */}
            <div className='absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full' />
          </Link>
        ))}
      </div>

      {/* View All Link */}
      <div className='mt-6 flex justify-center'>
        <Link
          href='/thoughts'
          className='inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105'
        >
          View All Thoughts
          <svg className='h-4 w-4 transition-transform group-hover:translate-x-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={ 2 } d='M9 5l7 7-7 7' />
          </svg>
        </Link>
      </div>
    </div>
  );
}
