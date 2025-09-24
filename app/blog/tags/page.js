/**
 * Tags Page Component
 *
 * @description Displays all blog tags in a responsive pill layout with usage counts.
 * Shows tag names as clickable pills that link to filtered tag views. Features
 * empty state handling and responsive design for optimal viewing across devices.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import tags from '@/app/content/tags';
import Pill from '@/components/elements/Pill';

/**
 * Generates metadata for the tags page
 *
 * @description Creates page metadata including the title for SEO and browser display.
 *
 * @returns {Promise<Object>} Metadata object with page title
 */
export async function generateMetadata() {
  return {
    'title': 'Tags'
  };
}

/**
 * Tags page component displaying all blog tags
 *
 * @description Renders a responsive layout with all blog tags as clickable blue pills.
 * Each tag links to a filtered view showing all posts with that tag. Includes
 * empty state handling when no tags are available.
 *
 * @returns {JSX.Element} Tags page with tag pills
 *
 * @example
 * // Rendered at /blog/tags route
 * <Tags />
 *
 * @example
 * // Each tag pill links to:
 * // /blog/tags/[tag-slug]
 */
export default function Tags() {
  return (
    <>
      <div className='flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:space-x-6 md:divide-y-0'>
        <div className='space-x-2 pt-6 pb-8 md:space-y-5'>
          <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14'>
            Tags
          </h1>
        </div>
        <div className='flex flex-wrap'>
          {tags.length === 0 && 'No tags found.'}
          {tags.length && tags.map((_tag) => (
            <div key={ _tag.id } className='mt-2 mb-2 mr-5'>
              <Pill
                key={ _tag.slug }
                text={ _tag.display }
                link={ `/blog/tags/${_tag.slug}` }
                color='blue'
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
