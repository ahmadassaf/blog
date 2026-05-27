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

import { Grid, Icon, Link, Pill, Typography } from '@gaudi/design-system';
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
        <article className='mx-auto w-full group'>
          <div className='mb-4 flex items-center gap-3'>
            <Pill tone='blue' variant='solid' radius='full' size='sm'>Featured</Pill>
            <time
              dateTime={ formatDate(featuredPost.date) }
              className='text-sm font-medium text-gray-600 dark:text-gray-400'
            >
              {formatDate(featuredPost.date)}
            </time>
            {featuredPost.category && (
              <>
                <span className='text-gray-300 dark:text-gray-600'>•</span>
                <Pill tone='blue' variant='subtle' size='sm' className='capitalize'>
                  {featuredPost.category}
                </Pill>
              </>
            )}
          </div>

          <Typography variant='heading-xl' as='h2' className='mb-4 max-w-4xl'>
            <Link
              href={ `/blog/${featuredPost.slug}` }
              variant='inline'
              tone='neutral'
            >
              {featuredPost.title}
            </Link>
          </Typography>

          <Typography variant='subtitle-sm' className='mb-6 max-w-3xl'>
            {featuredPost.summary}
          </Typography>

          <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
            <Link
              href={ `/blog/${featuredPost.slug}` }
              tone='blue'
              className='inline-flex items-center gap-2'
            >
              Read Full Article
              <Icon name='ArrowRight' decorative size='xs' />
            </Link>

            {featuredPost.tags && featuredPost.tags.length > 0 && (
              <div className='flex flex-wrap gap-2'>
                {featuredPost.tags.slice(0, 4).map((tag) => (
                  <Pill key={ tag } href={ `/blog/tags/${tag.toLowerCase().replace(/\s+/g, '-')}` } tone='gray' variant='soft' size='sm' className='capitalize'>
                    {tag}
                  </Pill>
                ))}
              </div>
            )}
          </div>
        </article>

        {displayPosts.length > 0 && (
          <Grid columns='2' gap='lg' className='w-full pt-10'>
            {displayPosts.map((post) => (
              <article key={ post.slug } className='group'>
                <div className='mb-3 flex items-center gap-3'>
                  <time
                    dateTime={ post.datetime }
                    className='text-sm font-medium text-gray-500 dark:text-gray-400'
                  >
                    {formatDate(post.date)}
                  </time>
                  {post.category && (
                    <>
                      <span className='text-gray-300 dark:text-gray-600'>•</span>
                      <Pill tone='blue' variant='subtle' size='sm' className='capitalize'>
                        {post.category}
                      </Pill>
                    </>
                  )}
                </div>

                <Typography variant='heading-md' as='h2' className='mb-3'>
                  <Link href={ `/blog/${post.slug}` } tone='neutral'>
                    {post.title}
                  </Link>
                </Typography>

                <Typography variant='paragraph-md' className='mb-4'>
                  {post.summary}
                </Typography>

                {post.tags && post.tags.length > 0 && (
                  <div className='flex flex-wrap gap-2'>
                    {post.tags.slice(0, 3).map((tag) => (
                      <Pill key={ tag } href={ `/blog/tags/${tag.toLowerCase().replace(/\s+/g, '-')}` } tone='gray' variant='soft' size='sm' className='capitalize'>
                        {tag}
                      </Pill>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}
