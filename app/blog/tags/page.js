/**
 * Clean Tags Page with Lucide Icons
 *
 * @description Minimal tags page with blue-accented stats cards using Lucide icons
 * and clean post list sidebar. No inline SVGs.
 *
 * @author Ahmad Assaf
 * @version 9.0.0
 */

'use client';

import { useEffect, useState } from 'react';
import { allPosts } from 'contentlayer/generated';
import { ChevronRight,
  FileText,
  Flame,
  FolderOpen,
  Hash,
  Loader2,
  Search,
  X } from 'lucide-react';
import Link from 'next/link';

import tags from '@/app/content/tags';
import { coreContent, sortPosts } from '@/lib/utils/contentlayer';

/**
 * Clean tags page with Lucide icons
 */
export default function Tags() {
  const [ selectedTag, setSelectedTag ] = useState(null);
  const [ sidebarOpen, setSidebarOpen ] = useState(false);
  const [ tagPosts, setTagPosts ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ searchQuery, setSearchQuery ] = useState('');

  // Sort tags by count and filter by search query
  const filteredAndSortedTags = [ ...tags ]
    .filter((tag) => tag.display.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tag.id.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => b.count - a.count);

  // Calculate stats
  const totalArticles = tags.reduce((sum, tag) => sum + tag.count, 0);
  const mostPopularTag = filteredAndSortedTags[0];

  // Lazy load posts for selected tag
  const loadTagPosts = async(tag) => {
    setLoading(true);
    setSelectedTag(tag);
    setSidebarOpen(true);

    // Simulate lazy loading with a small delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    const posts = sortPosts(allPosts);
    const corePosts = coreContent(posts);

    const filteredPosts = corePosts.filter((post) => {
      if (!post.tags) return false;

      // Use the same filtering logic as the existing tag page
      const normalizedPostTags = post.tags.map((postTag) => postTag.replace(' ', '-').toLowerCase());

      return normalizedPostTags.includes(tag.slug);
    });

    setTagPosts(filteredPosts);
    setLoading(false);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setSelectedTag(null);
    setTagPosts([]);
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape')
        closeSidebar();

    };

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      <div className='mx-auto max-w-6xl'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='mb-6 text-3xl font-semibold text-gray-900 dark:text-gray-100'>
            Topics
          </h1>

          {/* Clean Stats with Lucide Icons */}
          <div className='mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3'>
            <div className='flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900'>
              <div className='rounded-lg bg-blue-50 p-2 dark:bg-blue-900/20'>
                <FolderOpen className='h-5 w-5 text-blue-600 dark:text-blue-400' />
              </div>
              <div>
                <div className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
                  {tags.length}
                </div>
                <div className='text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide'>
                  Topics
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
                  {mostPopularTag?.count || 0}
                </div>
                <div className='text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide'>
                  Most popular
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className='relative mb-8'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <Search className='h-4 w-4 text-gray-400' />
            </div>
            <input
              type='text'
              placeholder='Search topics...'
              value={ searchQuery }
              onChange={ (event) => setSearchQuery(event.target.value) }
              className='block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-gray-400 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-500'
            />
          </div>
        </div>

        {/* Tags */}
        <div className='flex flex-wrap gap-3'>
          {filteredAndSortedTags.map((tag) => (
            <button
              key={ tag.id }
              onClick={ () => loadTagPosts(tag) }
              className='group inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm hover:border-gray-300 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600 cursor-pointer'
            >
              <span className='font-medium text-gray-900 dark:text-gray-100'>
                {tag.display}
              </span>
              <span className='text-xs text-gray-400'>
                {tag.count}
              </span>
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedTags.length === 0 && (
          <div className='py-8 text-center'>
            <p className='text-sm text-gray-400'>
              {searchQuery ? 'No topics found matching your search' : 'No topics yet'}
            </p>
          </div>
        )}
      </div>

      {/* Clean Sidebar with Lucide Icons */}
      {sidebarOpen && (
        <div className='fixed inset-0 z-50 overflow-hidden'>
          {/* Simple Backdrop */}
          <div
            className='absolute inset-0 bg-black/20'
            onClick={ closeSidebar }
          />

          {/* Sidebar */}
          <div className='absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-lg dark:bg-gray-900'>
            <div className='flex h-full flex-col'>
              {/* Simple Header */}
              <div className='border-b border-gray-200 p-6 dark:border-gray-700'>
                <div className='flex items-center justify-between'>
                  <div>
                    <div className='flex items-center gap-2'>
                      <Hash className='h-5 w-5 text-gray-600 dark:text-gray-400' />
                      <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
                        {selectedTag?.display}
                      </h2>
                    </div>
                    <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                      {selectedTag?.count} {selectedTag?.count === 1 ? 'article' : 'articles'}
                    </p>
                  </div>
                  <button
                    onClick={ closeSidebar }
                    className='rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300'
                  >
                    <X className='h-5 w-5' />
                  </button>
                </div>
              </div>

              {/* Clean Post List with Better Typography */}
              <div className='flex-1 overflow-y-auto'>
                {loading && (
                  <div className='flex items-center justify-center py-12'>
                    <Loader2 className='h-6 w-6 animate-spin text-gray-400' />
                  </div>
                )}
                {!loading && tagPosts.length === 0 && (
                  <div className='py-12 text-center'>
                    <p className='text-gray-500 dark:text-gray-400'>No articles found</p>
                  </div>
                )}
                {!loading && tagPosts.length > 0 && (
                  <div className='divide-y divide-gray-100 dark:divide-gray-800'>
                    {tagPosts.map((post) => (
                      <Link
                        key={ post.slug }
                        href={ `/blog/${post.slug}` }
                        onClick={ closeSidebar }
                        className='group block p-6 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      >
                        <article>
                          <h3 className='mb-2 text-base font-bold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400 line-clamp-2 leading-snug transition-colors'>
                            {post.title}
                          </h3>
                          <p className='mb-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed'>
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
                )}
              </div>

              {/* Simple Footer */}
              <div className='border-t border-gray-200 p-6 dark:border-gray-700'>
                <Link
                  href={ `/blog/tags/${selectedTag?.slug}` }
                  onClick={ closeSidebar }
                  className='block w-full rounded-lg border border-gray-300 bg-white py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:border-blue-600 dark:hover:text-blue-400 transition-colors'
                >
                  View All Articles →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
