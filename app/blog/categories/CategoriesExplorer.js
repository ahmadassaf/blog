/**
 * Categories Explorer Component
 *
 * @description Interactive client component for the categories page. Renders
 * blue-accented stats cards, a cards/list view toggle, and per-category sections
 * with sample articles. Receives plain, pre-computed data from the server page.
 *
 * @author Ahmad Assaf
 * @version 9.0.0
 */

'use client';

import { useState } from 'react';
import { Button, Card, Grid, Icon, Link, Pill, Typography } from '@gaudi/design-system';

import { formatShortDate, PostSummary, StatCard } from '@/app/blog/ExplorerCards';

/**
 * Interactive categories explorer with view mode toggle
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.categoriesWithPosts - Categories (sorted by article count) enriched with stripped sample posts
 * @returns {JSX.Element} Categories explorer with stats and category sections
 *
 * @example
 * <CategoriesExplorer categoriesWithPosts={categoriesWithPosts} />
 */
export default function CategoriesExplorer({ categoriesWithPosts }) {
  const [ viewMode, setViewMode ] = useState('cards'); // 'cards' or 'list'

  const totalArticles = categoriesWithPosts.reduce((sum, category) => sum + category.count, 0);

  // CategoriesWithPosts arrives sorted by count, so the first entry is the most popular
  const mostPopularCount = categoriesWithPosts[0]?.count || 0;

  return (
    <>
      <div className='mx-auto max-w-6xl divide-y divide-gray-200 dark:divide-gray-700'>
        <header className='space-y-2 pt-2 pb-6'>
          <Typography variant='title-md'>
            Categories
          </Typography>
        </header>

        <div className='pt-5'>
          <Grid columns='3' gap='sm' className='mb-5'>
            <StatCard icon='FolderOpen' value={ categoriesWithPosts.length } label='Categories' />
            <StatCard icon='FileText' value={ totalArticles } label='Articles' />
            <StatCard icon='Flame' value={ mostPopularCount } label='Most popular' />
          </Grid>

          <div className='mb-6 flex justify-end'>
            <div className='inline-flex gap-2'>
              <Button
                onClick={ () => setViewMode('cards') }
                aria-pressed={ viewMode === 'cards' }
                variant={ viewMode === 'cards' ? 'solid' : 'outline' }
                tone={ viewMode === 'cards' ? 'blue' : 'gray' }
                size='xs'
                className='min-h-9'
              >
                <Icon name='Grid3X3' size='sm' decorative />
                Cards
              </Button>
              <Button
                onClick={ () => setViewMode('list') }
                aria-pressed={ viewMode === 'list' }
                variant={ viewMode === 'list' ? 'solid' : 'outline' }
                tone={ viewMode === 'list' ? 'blue' : 'gray' }
                size='xs'
                className='min-h-9'
              >
                <Icon name='List' size='sm' decorative />
                List
              </Button>
            </div>
          </div>
          <div className='space-y-10'>
            {categoriesWithPosts.map((category, index) => (
              <section key={ category.id }>
                {index > 0 && viewMode === 'list' ? <div className='mb-10' /> : null}
                <div className='mb-1.5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                  <div className='flex flex-wrap items-center gap-2 sm:gap-3'>
                    <Typography variant='heading-sm' as='h2' className='text-base leading-5 capitalize md:text-lg md:leading-6'>
                      {category.title.replace('-', ' ')}
                    </Typography>
                    <Pill tone='blue' variant='soft' radius='full' size='xs' className='my-0 px-1.5 py-0 text-[10px] leading-4'>
                      {category.count} {category.count === 1 ? 'article' : 'articles'}
                    </Pill>
                  </div>
                  <Link
                    href={ `/blog/categories/${category.slug}` }
                    tone='blue'
                    className='shrink-0 text-sm'
                  >
                  View all →
                  </Link>
                </div>

                <Typography variant='paragraph-sm' className='mb-4'>
                  {category.description}
                </Typography>

                {category.samplePosts.length === 0 && (
                  <div className='py-8 text-center'>
                    <Typography variant='paragraph-sm'>No articles in this category yet</Typography>
                  </div>
                )}
                {category.samplePosts.length > 0 && viewMode === 'cards' && (
                  <Grid columns='3' gap='sm'>
                    {category.samplePosts.map((post) => (
                      <Link
                        key={ post.slug }
                        href={ `/blog/${post.slug}` }
                        variant='bare'
                        className='block h-full'
                      >
                        <PostSummaryCard post={ post } />
                      </Link>
                    ))}
                  </Grid>
                )}
                {category.samplePosts.length > 0 && viewMode === 'list' && (
                  <div className='divide-y divide-gray-200 dark:divide-gray-800'>
                    {category.samplePosts.map((post) => (
                      <Link
                        key={ post.slug }
                        href={ `/blog/${post.slug}` }
                        variant='bare'
                        className='block py-2.5'
                      >
                        <article>
                          <Typography as='time' variant='metadata' className='mb-1 block text-[11px] leading-4 normal-case'>
                            {formatShortDate(post.date)}
                          </Typography>
                          <Typography variant='heading-sm' as='h3' className='mb-1 text-sm leading-5 md:text-base md:leading-5'>
                            {post.title}
                          </Typography>
                          {post.subtitle && (
                            <Typography variant='paragraph-sm' className='text-xs leading-4'>
                              {post.subtitle}
                            </Typography>
                          )}
                        </article>
                      </Link>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>

          {categoriesWithPosts.length === 0 && (
            <div className='py-8 text-center'>
              <Typography variant='paragraph-sm'>No categories yet</Typography>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const PostSummaryCard = ({ post }) => (
  <Card interactive className='h-full' padding='sm' variant='outline'>
    <PostSummary post={ post } summaryClamp='line-clamp-3' />
  </Card>
);
