/**
 * Thoughts Page
 *
 * @description Main thoughts page component that displays a list of short thoughts and articles.
 * Uses ListLayout to present all thoughts in a clean, organized manner.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { Typography } from '@gaudi/design-system';
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
          <Typography variant='title-xl'>
            Thoughts
          </Typography>
          <Typography variant='subtitle-md'>
            Short thoughts, reflections, and mini articles
          </Typography>
        </div>
      </div>
      <ListLayout posts={ sortPosts(allThoughts, 'date') } />
    </div>
  );
}
