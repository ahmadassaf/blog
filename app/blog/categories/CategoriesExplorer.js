/**
 * Categories Explorer Component
 *
 * @description Interactive client component for the categories page. Renders the
 * counts and a cards/list view switch in the header, then per-category sections with
 * sample articles.
 * Receives plain, pre-computed data from the server page.
 *
 * @author Ahmad Assaf
 * @version 10.0.0
 */

'use client';

import { useState } from 'react';
import { EmptyState, Icon, Link, ToggleGroup, Typography } from '@gaudi/design-system';
import PageHeader from '@gaudi/design-system/layout/PageHeader';

import { PostSummary } from '@/app/blog/ExplorerCards';
import { titleFromSlug } from '@/lib/utils/slugs.mjs';

const viewOptions = [
  { 'label': <><Icon name='Grid3X3' size='sm' decorative />Cards</>, 'value': 'cards' },
  { 'label': <><Icon name='List' size='sm' decorative />List</>, 'value': 'list' }
];

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
  const [ viewMode, setViewMode ] = useState('cards');

  const totalArticles = categoriesWithPosts.reduce((sum, category) => sum + category.count, 0);

  // A single-choice group never clears: an empty value keeps the current view
  const viewSwitch = <ToggleGroup label='Category view' variant='outline' size='sm' value={ viewMode } onValueChange={ (value) => value && setViewMode(value) } options={ viewOptions } />;

  return (
    <div className='mx-auto max-w-6xl'>
      {/* The counts read as one line under the title, with the view switch beside them */}
      <PageHeader
        title='Categories'
        description={ `${totalArticles} articles across ${categoriesWithPosts.length} categories` }
        divider
        className='pt-2 pb-6'
        actions={ viewSwitch }
      />

      <div className='pt-8'>
        <div className='space-y-12'>
          {categoriesWithPosts.map((category) => (
            <section key={ category.id } aria-labelledby={ `category-${category.slug}` }>
              <div className='mb-4 flex items-end justify-between gap-4'>
                <div className='min-w-0 space-y-1'>
                  <Typography id={ `category-${category.slug}` } variant='heading-sm' as='h2'>
                    {titleFromSlug(category.title)}
                  </Typography>
                  <Typography variant='paragraph-sm'>
                    {category.description} · {category.count} {category.count === 1 ? 'article' : 'articles'}
                  </Typography>
                </div>
                <Link href={ `/blog/categories/${category.slug}` } tone='accent' className='inline-flex shrink-0 items-center gap-1 text-sm'>
                  View all
                  <Icon name='ArrowRight' size='xs' decorative />
                </Link>
              </div>

              {category.samplePosts.length === 0 && <EmptyState compact title='No articles in this category yet' />}
              {category.samplePosts.length > 0 && (
                <div className={ viewMode === 'cards' ? 'grid grid-cols-1 gap-3 md:grid-cols-3' : 'flex flex-col gap-1' }>
                  {category.samplePosts.map((post) => (
                    <PostSummary key={ post.slug } post={ post } variant={ viewMode === 'cards' ? 'outline' : 'default' } />
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {categoriesWithPosts.length === 0 && <EmptyState compact title='No categories yet' />}
      </div>
    </div>
  );
}
