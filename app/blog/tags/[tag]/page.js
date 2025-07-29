/**
 * Tag Filter Page Component
 *
 * @description Dynamic route component for displaying blog posts filtered by a specific tag.
 * Generates static paths for all available tags and filters posts accordingly.
 * Provides metadata generation for SEO optimization.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

// External libraries
import { allPosts } from 'contentlayer/generated';

// Internal components and utilities
import tags from '@/app/content/tags';
import ListLayout from '@/layouts/ListLayout';
import { coreContent, sortPosts } from '@/lib/utils/contentlayer';

/**
 * Generates metadata for the tag filter page
 *
 * @description Creates page metadata including formatted title for SEO and browser display.
 * Converts kebab-case tag slugs to proper title case.
 *
 * @param {Object} props - Component props
 * @param {Object} props.params - Route parameters
 * @param {string} props.params.tag - Tag slug from URL parameter
 *
 * @returns {Promise<Object>} Metadata object with formatted title
 *
 * @example
 * // For tag slug 'machine-learning'
 * // Returns: { title: 'Tag: Machine Learning' }
 */
export async function generateMetadata({ params }) {
  const tag = decodeURI(params.tag);
  const title = tag.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return {
    'title': `Tag: ${title}`
  };
}

/**
 * Generates static parameters for all tag filter pages
 *
 * @description Creates static paths for all available tags to enable static generation
 * at build time. Maps tag objects to parameter objects for Next.js routing.
 *
 * @returns {Promise<Array<Object>>} Array of tag parameter objects
 *
 * @example
 * // Returns array like:
 * // [{ tag: 'javascript' }, { tag: 'react' }, { tag: 'nextjs' }]
 */
export const generateStaticParams = async() => {
  const paths = tags.map((tag) => {
    return {
      'tag': tag.slug
    };
  });

  return paths;
};

/**
 * Tag filter page component
 *
 * @description Renders a filtered list of blog posts that contain the specified tag.
 * Decodes the tag parameter, filters posts by matching tags, and displays them
 * using the ListLayout component with appropriate pagination URLs.
 *
 * @param {Object} props - Component props
 * @param {Object} props.params - Route parameters
 * @param {string} props.params.tag - Tag slug to filter posts by
 *
 * @returns {JSX.Element} Filtered blog posts page
 *
 * @example
 * // Rendered at /blog/tags/javascript
 * // Shows all posts tagged with 'javascript'
 */
export default function Page({ params }) {
  const tag = decodeURI(params.tag);
  const title = tag.split('-').join(' ');
  const posts = coreContent(sortPosts(allPosts));

  const filteredPosts = posts.filter((post) => post.tags.map((_tag) => _tag.replace(' ', '-').toLowerCase()).includes(params.tag));

  return (
    <>
      <ListLayout posts={ filteredPosts } listTitle={ `${title} Posts` } paginationURL={ `blog/tags/${tag}/page` } baseURL={ `blog/tags/${tag}` }/>
    </>
  );
}
