/**
 * Categories Explorer Component
 *
 * @description Editorial directory of blog categories. Each section pairs a
 * concise category description with a few recent articles and a route to the
 * complete archive.
 *
 * @author Ahmad Assaf
 * @version 10.0.0
 */

import { Icon, Link, Typography } from '@gaudi/design-system';

import { formatShortDate } from '@/app/blog/ExplorerCards';
import { titleFromSlug } from '@/lib/utils/slugs';

/**
 * Category directory with recent article samples.
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.categoriesWithPosts - Categories enriched with stripped sample posts
 * @returns {JSX.Element} Categories directory
 */
export default function CategoriesExplorer({ categoriesWithPosts }) {
  const totalArticles = categoriesWithPosts.reduce((sum, category) => sum + category.count, 0);

  return (
    <div>
      <header className='border-b border-gray-200 py-10 dark:border-gray-800 md:py-12'>
        <Typography variant='title-md'>Categories</Typography>
        <Typography variant='index-feature-summary' className='mt-3 max-w-2xl'>
          Broad lanes for the writing here, from engineering and data to leadership, productivity, and shorter reflections.
        </Typography>
        <div className='mt-4 flex flex-wrap gap-x-5 gap-y-2'>
          <Typography variant='metadata'>{categoriesWithPosts.length} categories</Typography>
          <Typography variant='metadata'>{totalArticles} articles</Typography>
        </div>
      </header>

      {categoriesWithPosts.length > 0 ? (
        <div className='divide-y divide-gray-200 dark:divide-gray-800'>
          {categoriesWithPosts.map((category) => (
            <section key={ category.id } className='grid gap-6 py-8 md:py-10 lg:grid-cols-[minmax(13rem,0.65fr)_minmax(0,1.35fr)] lg:gap-12'>
              <div className='max-w-md'>
                <Typography variant='index-feature-title' as='h2'>
                  {titleFromSlug(category.title)}
                </Typography>
                <Typography variant='post-meta' className='mt-1'>
                  {category.count} {category.count === 1 ? 'article' : 'articles'}
                </Typography>
                <Typography variant='paragraph-sm' className='mt-3'>
                  {category.description}
                </Typography>
                <Link
                  href={ `/blog/categories/${category.slug}` }
                  tone='blue'
                  className='mt-4 inline-flex items-center gap-2'
                >
                  View category
                  <Icon name='ArrowRight' size='xs' decorative />
                </Link>
              </div>

              {category.samplePosts.length > 0 ? (
                <ol className='divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-800 dark:border-gray-800'>
                  {category.samplePosts.map((post) => (
                    <li key={ post.slug }>
                      <Link
                        href={ `/blog/${post.slug}` }
                        variant='bare'
                        className='group block py-3.5'
                      >
                        <article className='grid gap-1 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-6'>
                          <Typography variant='index-list-title' as='h3' className='transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400'>
                            {post.title}
                          </Typography>
                          <Typography as='time' variant='post-meta' dateTime={ post.date }>
                            {formatShortDate(post.date)}
                          </Typography>
                        </article>
                      </Link>
                    </li>
                  ))}
                </ol>
              ) : (
                <div className='border-y border-gray-200 py-6 dark:border-gray-800'>
                  <Typography variant='paragraph-sm'>No articles in this category yet.</Typography>
                </div>
              )}
            </section>
          ))}
        </div>
      ) : (
        <div className='py-12 text-center'>
          <Typography variant='paragraph-sm'>No categories yet.</Typography>
        </div>
      )}
    </div>
  );
}
