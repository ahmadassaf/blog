/**
 * Clean Categories Page with Lucide Icons
 *
 * @description Minimal categories page with blue-accented stats cards using Lucide icons
 * and clean category list sidebar. No inline SVGs.
 *
 * @author Ahmad Assaf
 * @version 9.0.0
 */

'use client';

import { useState } from 'react';
import { Button, Card, Grid, Icon, Link, Pill, Typography } from '@gaudi/design-system';
import { allPosts } from 'contentlayer/generated';

import categories from '@/app/content/categories';
import { coreContent, sortPosts } from '@/lib/utils/contentlayer';

/**
 * Clean categories page with Lucide icons
 */
export default function Categories() {
  const [ viewMode, setViewMode ] = useState('cards'); // 'cards' or 'list'

  // Sort categories by count
  const sortedCategories = [ ...categories ].sort((a, b) => b.count - a.count);

  // Calculate stats
  const totalArticles = categories.reduce((sum, category) => sum + category.count, 0);
  const mostPopularCategory = sortedCategories[0];

  // Get all posts for categories
  const posts = sortPosts(allPosts);
  const corePosts = coreContent(posts);

  // Get posts for each category with samples
  const categoriesWithPosts = sortedCategories.map((category) => {
    const categoryPosts = corePosts.filter((post) => post.category && post.category.toLowerCase() === category.slug.toLowerCase());

    return {
      ...category,
      'posts': categoryPosts,
      'samplePosts': categoryPosts.slice(0, 3)
    };
  });

  return (
    <>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-8'>
          <Typography variant='title-md' className='mb-6'>
            Categories
          </Typography>

          <Grid columns='3' gap='md' className='mb-6'>
            <StatCard icon='FolderOpen' value={ categories.length } label='Categories' />
            <StatCard icon='FileText' value={ totalArticles } label='Articles' />
            <StatCard icon='Flame' value={ mostPopularCategory?.count || 0 } label='Most popular' />
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
              {index > 0 && viewMode === 'list' && (
                <div className='border-t border-gray-100 dark:border-gray-800 mb-12' />
              )}
              <div className='mb-2 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
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
                          {new Date(post.date).toLocaleDateString('en-US', {
                            'day': 'numeric',
                            'month': 'short',
                            'year': 'numeric'
                          })}
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

const StatCard = ({ icon, label, value }) => (
  <Card variant='outline'>
    <div className='flex items-center gap-3'>
      <Icon name={ icon } size='md' decorative color='primary' />
      <div>
        <Typography variant='heading-sm'>{value}</Typography>
        <Typography variant='metadata'>{label}</Typography>
      </div>
    </div>
  </Card>
);

const PostSummaryCard = ({ post }) => (
  <Card interactive className='h-full' variant='outline'>
    <article>
      <Typography variant='heading-sm' as='h3' className='mb-2 line-clamp-2'>
        {post.title}
      </Typography>
      <Typography variant='paragraph-sm' className='mb-3 line-clamp-3'>
        {post.summary || post.description}
      </Typography>
      <div className='flex items-center justify-between'>
        <Typography as='time' variant='metadata'>
          {new Date(post.date).toLocaleDateString('en-US', {
            'day': 'numeric',
            'month': 'short',
            'year': 'numeric'
          })}
        </Typography>
        <span className='inline-flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400'>
          Read
          <Icon name='ChevronRight' size='xs' decorative />
        </span>
      </div>
    </article>
  </Card>
);
