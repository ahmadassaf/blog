/**
 * Thoughts Section Component
 *
 * @description Special display component for thoughts on the homepage.
 * Shows thoughts in a minimal, tweet-like list layout.
 *
 * @author Ahmad Assaf
 * @version 2.0.0
 */

import { LightBulbIcon } from '@heroicons/react/24/outline';

import Link from '@/components/elements/Link';
import { Button } from '@/components/ui';

/**
 * Renders a special thoughts section for the homepage
 *
 * @param {Object} props - Component props
 * @param {Array} props.thoughts - Array of thought objects to display
 *
 * @returns {JSX.Element} Thoughts section with minimal list layout
 */
export default function ThoughtsSection({ thoughts }) {
  const formatShortDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { 'month': 'short' });
    const day = date.getDate();

    return `${month} ${day}`;
  };

  return (
    <div className='py-8'>
      {/* Section Header */}
      <div className='mb-6 flex items-center gap-3'>
        <LightBulbIcon className='h-5 w-5 text-blue-600 dark:text-blue-400' />
        <h2 className='text-xl font-bold text-gray-900 dark:text-gray-100'>
          Recent Thoughts
        </h2>
      </div>

      {/* Thoughts List */}
      <div className='space-y-6'>
        {thoughts.slice(0, -1).map((thought) => (
          <article key={ thought.slug } className='group'>
            <Link
              href={ `/thoughts/${thought.slug}` }
              className='block'
            >
              <div className='flex gap-4'>
                {/* Date Column */}
                <time
                  dateTime={ thought.date }
                  className='flex-shrink-0 w-16 text-xs font-medium text-gray-500 dark:text-gray-400 pt-1'
                >
                  {formatShortDate(thought.date)}
                </time>

                {/* Content Column */}
                <div className='flex-1 min-w-0'>
                  <div className='flex items-start gap-2 mb-1'>
                    <h3 className='text-base font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                      {thought.title}
                    </h3>
                    {thought.featured && (
                      <span className='flex-shrink-0 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'>
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Summary */}
                  {thought.summary && (
                    <p className='text-sm text-gray-600 dark:text-gray-400 leading-relaxed'>
                      {thought.summary}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Last Thought with View All Button */}
      {thoughts.length > 0 && (
        <div className='flex items-start justify-between gap-4 pt-6'>
          <article className='group flex-1'>
            <Link
              href={ `/thoughts/${thoughts[thoughts.length - 1].slug}` }
              className='block'
            >
              <div className='flex gap-4'>
                {/* Date Column */}
                <time
                  dateTime={ thoughts[thoughts.length - 1].date }
                  className='flex-shrink-0 w-16 text-xs font-medium text-gray-500 dark:text-gray-400 pt-1'
                >
                  {formatShortDate(thoughts[thoughts.length - 1].date)}
                </time>

                {/* Content Column */}
                <div className='flex-1 min-w-0'>
                  <div className='flex items-start gap-2 mb-1'>
                    <h3 className='text-base font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                      {thoughts[thoughts.length - 1].title}
                    </h3>
                    {thoughts[thoughts.length - 1].featured && (
                      <span className='flex-shrink-0 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'>
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Summary */}
                  {thoughts[thoughts.length - 1].summary && (
                    <p className='text-sm text-gray-600 dark:text-gray-400 leading-relaxed'>
                      {thoughts[thoughts.length - 1].summary}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </article>

          {/* View All Button */}
          <div className='flex-shrink-0 pt-1'>
            <Button variant='link-primary-md' href='/thoughts' aria-label='View all thoughts'>
              View All Thoughts
              <svg className='w-4 h-4 transition-transform group-hover:translate-x-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={ 2 } d='M9 5l7 7-7 7' />
              </svg>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
