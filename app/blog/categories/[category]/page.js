/**
 * Category Filter Page Component
 *
 * @description Dynamic route component for displaying blog posts filtered by a specific category.
 * Generates static paths for all available categories and filters posts accordingly.
 * Provides metadata generation for SEO optimization.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { allPosts } from 'contentlayer/generated';

import categories from '@/app/content/categories';
import ListLayout from '@/layouts/ListLayout';
import { coreContent, sortPosts } from '@/lib/utils/contentlayer';

/**
 * Generates metadata for the category filter page
 *
 * @description Creates page metadata including formatted title for SEO and browser display.
 * Converts kebab-case category slugs to proper title case.
 *
 * @param {Object} props - Component props
 * @param {Object} props.params - Route parameters
 * @param {string} props.params.category - Category slug from URL parameter
 *
 * @returns {Promise<Object>} Metadata object with formatted title
 *
 * @example
 * // For category slug 'web-development'
 * // Returns: { title: 'Category: Web Development' }
 */
export async function generateMetadata({ params }) {
  const category = decodeURI(params.category);
  const title = category.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return {
    'title': `Category: ${title}`
  };
}

/**
 * Generates static parameters for all category filter pages
 *
 * @description Creates static paths for all available categories to enable static generation
 * at build time. Maps category objects to parameter objects for Next.js routing.
 *
 * @returns {Promise<Array<Object>>} Array of category parameter objects
 *
 * @example
 * // Returns array like:
 * // [{ category: 'technology' }, { category: 'tutorials' }, { category: 'reviews' }]
 */
export const generateStaticParams = async() => {
  const paths = categories.map((category) => {
    return {
      'category': category.slug
    };
  });

  return paths;
};

/**
 * Category filter page component
 *
 * @description Renders a filtered list of blog posts that belong to the specified category.
 * Decodes the category parameter, filters posts by matching category, and displays them
 * using the ListLayout component with appropriate pagination URLs.
 *
 * @param {Object} props - Component props
 * @param {Object} props.params - Route parameters
 * @param {string} props.params.category - Category slug to filter posts by
 *
 * @returns {JSX.Element} Filtered blog posts page
 *
 * @example
 * // Rendered at /blog/categories/technology
 * // Shows all posts in the 'technology' category
 */
export default function Page({ params }) {
  const category = decodeURI(params.category);
  const title = category.replace('-', ' ');
  const sortedPosts = coreContent(sortPosts(allPosts));
  const filteredPosts = sortedPosts.filter((post) => post.category.replace(' ', '-').toLowerCase() === params.category);

  return (
    <>
      <div>
        <ListLayout className='capitalize' posts={ filteredPosts } listTitle={ `${title} Posts` } paginationURL={ `blog/categories/${category}/page` } baseURL={ `blog/categories/${category}` }/>
      </div>
    </>
  );
}
