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

import { allPosts } from 'contentlayer/generated';

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
        {/* Clean Typography-focused Hero */}
        <article className='mx-auto w-full group'>
          <div className='mb-4 flex items-center gap-3'>
            <span className='inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white'>
              Featured
            </span>
            <time
              dateTime={ formatDate(featuredPost.date) }
              className='text-sm font-medium text-gray-600 dark:text-gray-400'
            >
              {formatDate(featuredPost.date)}
            </time>
            {featuredPost.category && (
              <>
                <span className='text-gray-300 dark:text-gray-600'>•</span>
                <span className='text-sm font-medium text-blue-600 dark:text-blue-400 capitalize'>
                  {featuredPost.category}
                </span>
              </>
            )}
          </div>

          <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight mb-4 max-w-4xl'>
            <a
              href={ `/blog/${featuredPost.slug}` }
              className='hover:text-blue-600 dark:hover:text-blue-400  duration-300 decoration-2 hover:underline underline-offset-4'
            >
              {featuredPost.title}
            </a>
          </h2>

          <p className='text-lg md:text-xl leading-8 text-gray-700 dark:text-gray-300 max-w-3xl mb-6'>
            {featuredPost.summary}
          </p>

          <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
            <a
              href={ `/blog/${featuredPost.slug}` }
              className='inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all duration-200 group/link'
            >
              Read Full Article
              <svg className='w-4 h-4 transition-transform group-hover/link:translate-x-1' viewBox='0 0 20 20' fill='currentColor'>
                <path fillRule='evenodd' d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z' clipRule='evenodd' />
              </svg>
            </a>

            {featuredPost.tags && featuredPost.tags.length > 0 && (
              <div className='flex flex-wrap gap-2'>
                {featuredPost.tags.slice(0, 4).map((tag) => (
                  <a key={ tag } href={ `/blog/tags/${tag.toLowerCase().replace(/\s+/g, '-')}` } className='inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer capitalize'>
                    {tag}
                  </a>
                ))}
              </div>
            )}
          </div>
        </article>
        {/* Clean typography-focused additional posts */}
        {displayPosts.length > 0 && (
          <div className='mx-auto w-full pt-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {displayPosts.map((post) => (
                <article key={ post.slug } className='group'>
                  <div className='flex items-center gap-3 mb-3'>
                    <time
                      dateTime={ post.datetime }
                      className='text-sm font-medium text-gray-500 dark:text-gray-400'
                    >
                      {formatDate(post.date)}
                    </time>
                    {post.category && (
                      <>
                        <span className='text-gray-300 dark:text-gray-600'>•</span>
                        <span className='text-sm font-medium text-blue-600 dark:text-blue-400 capitalize'>
                          {post.category}
                        </span>
                      </>
                    )}
                  </div>

                  <h2 className='text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 duration-200'>
                    <a href={ `/blog/${post.slug}` } className='decoration-2 hover:underline underline-offset-2'>
                      {post.title}
                    </a>
                  </h2>

                  <p className='text-base leading-7 text-gray-600 dark:text-gray-300 mb-4'>
                    {post.summary}
                  </p>

                  {post.tags && post.tags.length > 0 && (
                    <div className='flex flex-wrap gap-2'>
                      {post.tags.slice(0, 3).map((tag) => (
                        <a key={ tag } href={ `/blog/tags/${tag.toLowerCase().replace(/\s+/g, '-')}` } className='inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer capitalize'>
                          {tag}
                        </a>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
