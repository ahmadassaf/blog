/**
 * FeaturedLayout Component
 *
 * @description Layout component for displaying featured blog posts in a prominent grid format.
 * Shows the first featured post as a large hero section, followed by additional featured posts
 * in a responsive grid layout. Supports optional title hiding and custom styling.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

// External libraries
import { allPosts } from 'contentlayer/generated';

// Internal components and utilities
import { coreContent, sortPosts } from '@/lib/utils/contentlayer';
import formatDate from '@/lib/utils/formatDate';

/**
 * Renders a featured posts layout with hero post and grid
 *
 * @description Displays featured blog posts in a hierarchical layout with the first featured post
 * as a prominent hero section and additional featured posts in a responsive 2-column grid.
 * Automatically filters posts by 'featured' flag and handles responsive design.
 *
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes for the title
 * @param {boolean} [props.hideTitle] - Whether to hide the "Featured Posts" title
 *
 * @returns {JSX.Element} Featured posts layout with hero and grid sections
 *
 * @example
 * // Basic usage with title
 * <FeaturedLayout />
 *
 * @example
 * // Hidden title with custom styling
 * <FeaturedLayout hideTitle={true} className="custom-title-style" />
 *
 * @example
 * // Layout structure:
 * // - First featured post: Large hero section with title, date, summary
 * // - Additional featured posts: 2-column grid (1-column on mobile)
 * // - Responsive design with proper spacing and hover effects
 */
export default function ListLayout({ className, hideTitle }) {

  const posts = coreContent(sortPosts(allPosts));

  // Extract the first featured post for hero display
  const featuredPost = posts.filter((post) => post.featured).slice(0, 1)[0];

  // Get additional featured posts for grid display (posts 2-3)
  const displayPosts = posts.filter((post) => post.featured).slice(1, 3);

  return (
    <div>

      <div className={ `pb-10` }>
        {/* Hero featured post section */}
        <article className='mx-auto w-full py-2'>
          <time
            dateTime={ formatDate(featuredPost.date) }
            className='block text-sm leading-6 text-gray-600 dark:text-gray-400'
          >
            {formatDate(featuredPost.date)}
          </time>
          <h2 id='featured-post' className='mt-4 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white'>
            <a
              href={ `/blog/${featuredPost.slug}` }
              className='hover:text-blue-600'
              aria-describedby='featured-post'
            >
              {featuredPost.title}
            </a>
          </h2>
          <p className='mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300'>
            {featuredPost.summary}
          </p>
        </article>
        {/* Additional featured posts grid */}
        <div className='mx-auto w-full pt-12 sm:pt-16 mt-5'>
          <div className='grid grid-cols-2 gap-12 max-lg:grid-cols-1'>
            {displayPosts.map((post) => (
              <article key={ post.slug }>
                <div className='group relative'>
                  <time
                    dateTime={ post.datetime }
                    className='block text-sm leading-6 text-gray-600 dark:text-gray-400'
                  >
                    {formatDate(post.date)}
                  </time>
                  <h2 className='mt-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white'>
                    <a href={ `/blog/${post.slug}` }>
                      <span className='absolute inset-0' />
                      {post.title}
                    </a>
                  </h2>
                  <p className='mt-4 text-md leading-6 text-gray-600 dark:text-gray-300'>
                    {post.summary}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
