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
      <div className='mx-auto max-w-6xl'>
        <div className='mb-8'>
          <Typography variant='title-md' className='mb-6'>
            Categories
          </Typography>

          <Grid columns='3' gap='md' className='mb-6'>
            <StatCard icon='FolderOpen' value={ categoriesWithPosts.length } label='Categories' />
            <StatCard icon='FileText' value={ totalArticles } label='Articles' />
            <StatCard icon='Flame' value={ mostPopularCount } label='Most popular' />
          </Grid>

          <div className='mb-8 flex justify-end'>
            <div className='inline-flex gap-2'>
              <Button
                onClick={ () => setViewMode('cards') }
                variant={ viewMode === 'cards' ? 'solid' : 'outline' }
                tone={ viewMode === 'cards' ? 'blue' : 'gray' }
                size='sm'
              >
                <Icon name='Grid3X3' size='sm' decorative />
                Cards
              </Button>
              <Button
                onClick={ () => setViewMode('list') }
                variant={ viewMode === 'list' ? 'solid' : 'outline' }
                tone={ viewMode === 'list' ? 'blue' : 'gray' }
                size='sm'
              >
                <Icon name='List' size='sm' decorative />
                List
              </Button>
            </div>
          </div>
        </div>

        <div className='space-y-12'>
          {categoriesWithPosts.map((category, index) => (
            <section key={ category.id }>
              {index > 0 && viewMode === 'list' ? <div className='mb-12' /> : null}
              <div className='mb-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <div className='flex flex-wrap items-center gap-2 sm:gap-3'>
                  <Typography variant='heading-md' as='h2' className='capitalize'>
                    {category.title.replace('-', ' ')}
                  </Typography>
                  <Pill tone='blue' variant='soft' radius='full' size='sm'>
                    {category.count} {category.count === 1 ? 'article' : 'articles'}
                  </Pill>
                </div>
                <Link
                  href={ `/blog/categories/${category.slug}` }
                  tone='blue'
                  className='shrink-0'
                >
                  View all →
                </Link>
              </div>

              <Typography variant='paragraph-md' className='mb-6'>
                {category.description}
              </Typography>

              {category.samplePosts.length === 0 && (
                <div className='py-8 text-center'>
                  <Typography variant='paragraph-sm'>No articles in this category yet</Typography>
                </div>
              )}
              {category.samplePosts.length > 0 && viewMode === 'cards' && (
                <Grid columns='3' gap='lg'>
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
                <div className='space-y-2'>
                  {category.samplePosts.map((post) => (
                    <Link
                      key={ post.slug }
                      href={ `/blog/${post.slug}` }
                      variant='bare'
                      className='block py-3'
                    >
                      <article>
                        <Typography as='time' variant='metadata' className='mb-1 block'>
                          {formatShortDate(post.date)}
                        </Typography>
                        <Typography variant='heading-sm' as='h3' className='mb-1'>
                          {post.title}
                        </Typography>
                        {post.subtitle && (
                          <Typography variant='paragraph-sm'>
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
    </>
  );
}

const PostSummaryCard = ({ post }) => (
  <Card interactive className='h-full' variant='outline'>
    <PostSummary post={ post } summaryClamp='line-clamp-3' />
  </Card>
);
