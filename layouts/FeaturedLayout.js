/**
 * FeaturedLayout Component
 *
 * @description Layout component for displaying featured blog posts in a prominent grid format.
 * Shows the first featured post as a large hero section, followed by additional featured posts
 * in a responsive grid layout.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { Grid, Icon, Link, Pill, Typography } from '@gaudi/design-system';

import formatDate from '@/lib/utils/formatDate';

/**
 * Renders a featured posts layout with hero post and grid
 *
 * @description Displays featured blog posts in a hierarchical layout with the first featured post
 * as a prominent hero section and additional featured posts in a responsive 2-column grid.
 * Automatically filters posts by 'featured' flag and handles responsive design. Falls back to
 * the newest post when no post is flagged as featured, and renders nothing when no posts exist.
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.posts - Sorted, published core-content posts (page computes these once and shares them with its list layout)
 * @returns {JSX.Element|null} Featured posts layout with hero and grid sections
 *
 * @example
 * // Basic usage
 * <FeaturedLayout posts={coreContent(sortPosts(published(allPosts)))} />
 *
 * @example
 * // Layout structure:
 * // - First featured post: Large hero section with title, date, summary
 * // - Additional featured posts: 2-column grid (1-column on mobile)
 * // - Responsive design with proper spacing and hover effects
 */
export default function FeaturedLayout({ posts }) {
  const featuredPosts = posts.filter((post) => post.featured);

  // Extract the first featured post for hero display, falling back to the newest post
  const featuredPost = featuredPosts[0] || posts[0];
  const featuredLabel = featuredPosts[0] ? 'Featured' : 'Latest';

  // Get additional featured posts for grid display (posts 2-3)
  const displayPosts = featuredPosts.slice(1, 3);

  if (!featuredPost) return null;

  return (
    <div className='pb-8 lg:pb-10'>
      <section aria-label='Featured writing'>
        <article className='w-full group'>
          <div className='mb-3 flex flex-wrap items-center gap-x-3 gap-y-2'>
            <Pill tone='blue' variant='solid' radius='full' size='sm'>{featuredLabel}</Pill>
            <Typography
              as='time'
              variant='post-meta'
              dateTime={ featuredPost.date }
            >
              {formatDate(featuredPost.date)}
            </Typography>
            {featuredPost.category && (
              <>
                <Typography as='span' variant='post-meta'>·</Typography>
                <Pill tone='blue' variant='subtle' size='sm' className='capitalize'>
                  {featuredPost.category}
                </Pill>
              </>
            )}
          </div>

          <Typography variant='index-hero-title' as='h2' className='mb-3 max-w-none'>
            <Link
              href={ `/blog/${featuredPost.slug}` }
              variant='bare'
              tone='neutral'
              className='break-words no-underline transition-colors duration-200 hover:text-blue-600 hover:no-underline dark:hover:text-blue-400'
            >
              {featuredPost.title}
            </Link>
          </Typography>

          <Typography variant='index-hero-summary' className='mb-5 max-w-none text-pretty'>
            {featuredPost.summary}
          </Typography>

          <Link
            href={ `/blog/${featuredPost.slug}` }
            tone='blue'
            className='inline-flex max-w-full items-center gap-2'
          >
            Read Full Article
            <Icon name='ArrowRight' decorative size='xs' />
          </Link>
        </article>

        {displayPosts.length > 0 && (
          <Grid columns='2' gap='md' className='w-full pt-8'>
            {displayPosts.map((post) => (
              <article key={ post.slug } className='group'>
                <div className='mb-3 flex flex-wrap items-center gap-x-3 gap-y-2'>
                  <Typography
                    as='time'
                    variant='post-meta'
                    dateTime={ post.date }
                  >
                    {formatDate(post.date)}
                  </Typography>
                  {post.category && (
                    <>
                      <Typography as='span' variant='post-meta'>·</Typography>
                      <Pill tone='blue' variant='subtle' size='sm' className='capitalize'>
                        {post.category}
                      </Pill>
                    </>
                  )}
                </div>

                <Typography variant='index-feature-title' as='h2' className='mb-2'>
                  <Link href={ `/blog/${post.slug}` } tone='neutral' variant='bare' className='break-words no-underline transition-colors duration-200 hover:text-blue-600 hover:no-underline dark:hover:text-blue-400'>
                    {post.title}
                  </Link>
                </Typography>

                <Typography variant='index-feature-summary' className='mb-3 text-pretty'>
                  {post.summary}
                </Typography>
              </article>
            ))}
          </Grid>
        )}
      </section>
    </div>
  );
}
