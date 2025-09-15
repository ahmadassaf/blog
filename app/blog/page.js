/**
 * Blog Main Page
 *
 * @description Main blog page component that displays featured posts
 * and a complete list of all blog posts. Combines FeaturedPostsLayout
 * and ListLayout for comprehensive blog presentation.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

// External imports
import { allPosts } from 'contentlayer/generated';

// Internal imports
import FeaturedPostsLayout from '@/layouts/FeaturedLayout';
import ListLayout from '@/layouts/ListLayout';
import { sortPosts } from '@/lib/utils/contentlayer';

/**
 * Generates metadata for the blog page
 *
 * @returns {Promise<Object>} Metadata object with page title
 */
export async function generateMetadata() {
  return {
    'title': 'Blog'
  };
}

/**
 * Main blog page component with featured posts and full listing
 *
 * @returns {JSX.Element} Complete blog page with featured posts and post list
 *
 * @example
 * // Rendered at /blog route
 * <Blog />
 */
export default function Blog() {
  return (
    <div>
      <FeaturedPostsLayout hideTitle={ true } />
      <ListLayout posts={ sortPosts(allPosts, 'date') } />
    </div>
  );
}
