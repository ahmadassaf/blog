/**
 * Thoughts Section Component
 *
 * @description Special display component for thoughts on the homepage.
 * Shows thoughts in a visually distinct card-based layout with clean design.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { LightBulbIcon } from '@heroicons/react/24/outline';

import Link from '@/components/elements/Link';
import { Button } from '@/components/ui';
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
    <div className='py-8'>
      {/* Section Header */}
      <div className='mb-8 flex items-center gap-3'>
        <LightBulbIcon className='h-6 w-6 text-blue-600 dark:text-blue-400' />
        <div>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
            Recent Thoughts
          </h2>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Quick ideas, reflections, and insights
          </p>
        </div>
      </div>

      {/* Thoughts Grid */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {thoughts.map((thought) => (
          <Link
            key={ thought.slug }
            href={ `/thoughts/${thought.slug}` }
            className='group block rounded-lg border border-gray-200 bg-white p-5 transition-all hover:border-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-400'
          >
            {/* Card Header */}
            <div className='mb-3 flex items-start justify-between'>
              <time
                dateTime={ thought.date }
                className='text-xs font-medium text-gray-500 dark:text-gray-400'
              >
                {formatDate(thought.date)}
              </time>
              {thought.featured && (
                <span className='rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'>
                  Featured
                </span>
              )}
            </div>

            {/* Thought Title */}
            <h3 className='mb-2 text-base font-semibold leading-snug text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
              {thought.title}
            </h3>

            {/* Summary */}
            {thought.summary && (
              <p className='text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2'>
                {thought.summary}
              </p>
            )}
          </Link>
        ))}
      </div>

      {/* View All Link */}
      <div className='flex justify-end pt-4'>
        <Button variant='link-primary-md' href='/thoughts' aria-label='View all thoughts'>
          View All Thoughts
          <svg className='w-4 h-4 transition-transform group-hover:translate-x-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={ 2 } d='M9 5l7 7-7 7' />
          </svg>
        </Button>
      </div>
    </div>
  );
}
