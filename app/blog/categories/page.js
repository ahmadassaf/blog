/**
 * Categories Page Component
 *
 * @description Displays all blog categories in a responsive pill layout with post counts.
 * Shows category titles, links to filtered views, and the number of posts in each category.
 * Features responsive design that adapts layout for mobile and desktop viewing.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

// Internal components and data
import categories from '@/app/content/categories';
import Pill from '@/components/elements/Pill';

/**
 * Generates metadata for the categories page
 *
 * @description Creates page metadata including the title for SEO and browser display.
 *
 * @returns {Promise<Object>} Metadata object with page title
 */
export async function generateMetadata() {
  return {
    'title': 'Categories'
  };
}

/**
 * Categories page component displaying all blog categories
 *
 * @description Renders a responsive layout with all blog categories as clickable pills.
 * Each category shows its name and post count, linking to filtered category views.
 * Features empty state handling and responsive design.
 *
 * @returns {JSX.Element} Categories page with category pills and counts
 *
 * @example
 * // Rendered at /blog/categories route
 * <Categories />
 *
 * @example
 * // Each category pill links to:
 * // /blog/categories/[category-slug]
 */
export default function Categories() {
  return (
    <>
      <div className='flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:space-x-6 md:divide-y-0'>
        <div className='space-x-2 pt-6 pb-8 md:space-y-5'>
          <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14'>
            Categories
          </h1>
        </div>
        <div className='flex flex-wrap'>
          {categories.length === 0 && 'No Categories found'}
          {categories.map((category) => (
            <div key={ category.id } className='mt-2 mb-2 mr-5'>
              <Pill
                text={ category.title }
                link={ `/blog/categories/${category.slug}` }
                color='green'
              />
              &nbsp;{`(${category.count})`}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
