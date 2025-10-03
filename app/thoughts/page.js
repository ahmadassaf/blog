/**
 * Thoughts Page
 *
 * @description Main thoughts page component that displays a list of short thoughts and articles.
 * Uses ListLayout to present all thoughts in a clean, organized manner.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { allThoughts } from 'contentlayer/generated';

import ListLayout from '@/layouts/ListLayout';
import { sortPosts } from '@/lib/utils/contentlayer';

/**
 * Generates metadata for the thoughts page
 *
 * @returns {Promise<Object>} Metadata object with page title and description
 */
export async function generateMetadata() {
  return {
    'description': 'Short thoughts, reflections, and mini articles',
    'title': 'Thoughts'
  };
}

/**
 * Main thoughts page component with listing
 *
 * @returns {JSX.Element} Complete thoughts page with thought list
 *
 * @example
 * // Rendered at /thoughts route
 * <Thoughts />
 */
export default function Thoughts() {
  return (
    <div>
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <div className='space-y-2 pb-8 pt-6 md:space-y-5'>
          <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
            Thoughts
          </h1>
          <p className='text-lg leading-7 text-gray-500 dark:text-gray-400'>
            Short thoughts, reflections, and mini articles
          </p>
        </div>
      </div>
      <ListLayout posts={ sortPosts(allThoughts, 'date') } />
    </div>
  );
}
