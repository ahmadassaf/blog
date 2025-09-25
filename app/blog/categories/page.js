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

import { allPosts } from 'contentlayer/generated';
import { ChevronRight,
  FileText,
  Flame,
  FolderOpen } from 'lucide-react';
import Link from 'next/link';

import categories from '@/app/content/categories';
import { coreContent, sortPosts } from '@/lib/utils/contentlayer';

/**
 * Clean categories page with Lucide icons
 */
export default function Categories() {

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
        {/* Header */}
        <div className='mb-8'>
          <h1 className='mb-6 text-3xl font-semibold text-gray-900 dark:text-gray-100'>
            Categories
          </h1>

          {/* Clean Stats with Lucide Icons */}
          <div className='mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3'>
            <div className='flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900'>
              <div className='rounded-lg bg-blue-50 p-2 dark:bg-blue-900/20'>
                <FolderOpen className='h-5 w-5 text-blue-600 dark:text-blue-400' />
              </div>
              <div>
                <div className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
                  {categories.length}
                </div>
                <div className='text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide'>
                  Categories
                </div>
              </div>
            </div>

            <div className='flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900'>
              <div className='rounded-lg bg-blue-50 p-2 dark:bg-blue-900/20'>
                <FileText className='h-5 w-5 text-blue-600 dark:text-blue-400' />
              </div>
              <div>
                <div className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
                  {totalArticles}
                </div>
                <div className='text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide'>
                  Articles
                </div>
              </div>
            </div>

            <div className='flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900'>
              <div className='rounded-lg bg-blue-50 p-2 dark:bg-blue-900/20'>
                <Flame className='h-5 w-5 text-blue-600 dark:text-blue-400' />
              </div>
              <div>
                <div className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
                  {mostPopularCategory?.count || 0}
                </div>
                <div className='text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide'>
                  Most popular
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories with Posts */}
        <div className='space-y-12'>
          {categoriesWithPosts.map((category) => (
            <div key={ category.id } className=''>
              {/* Category Header */}
              <div className='mb-6 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100 capitalize'>
                    {category.title.replace('-', ' ')}
                  </h2>
                  <span className='inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'>
                    {category.count} {category.count === 1 ? 'article' : 'articles'}
                  </span>
                </div>
                <Link
                  href={ `/blog/categories/${category.slug}` }
                  className='text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium'
                >
                  View all →
                </Link>
              </div>

              {/* Category Description */}
              <p className='mb-6 text-gray-600 dark:text-gray-400'>
                {category.description}
              </p>

              {/* Sample Posts */}
              {category.samplePosts.length > 0 ? (
                <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                  {category.samplePosts.map((post) => (
                    <Link
                      key={ post.slug }
                      href={ `/blog/${post.slug}` }
                      className='group block rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-gray-300 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600'
                    >
                      <article>
                        <h3 className='mb-2 text-base font-bold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400 line-clamp-2 leading-snug transition-colors'>
                          {post.title}
                        </h3>
                        <p className='mb-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed'>
                          {post.summary || post.description}
                        </p>
                        <div className='flex items-center justify-between text-xs text-gray-500 dark:text-gray-500'>
                          <time className='font-medium'>
                            {new Date(post.date).toLocaleDateString('en-US', {
                              'day': 'numeric',
                              'month': 'short',
                              'year': 'numeric'
                            })}
                          </time>
                          <div className='flex items-center gap-1 text-gray-400 group-hover:text-blue-500 transition-colors'>
                            <span className='text-xs'>Read</span>
                            <ChevronRight className='h-3 w-3' />
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className='py-8 text-center'>
                  <p className='text-sm text-gray-400'>No articles in this category yet</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {categoriesWithPosts.length === 0 && (
          <div className='py-8 text-center'>
            <p className='text-sm text-gray-400'>No categories yet</p>
          </div>
        )}
      </div>
    </>
  );
}
