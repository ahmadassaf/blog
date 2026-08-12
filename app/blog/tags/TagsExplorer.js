/**
 * Tags Explorer Component
 *
 * @description Searchable editorial index of blog tags with an accessible
 * slide-over showing the articles associated with a selected tag.
 *
 * @author Ahmad Assaf
 * @version 10.0.0
 */

'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Button, Icon, Link, Search, Typography } from '@gaudi/design-system';

import { PostSummary } from '@/app/blog/ExplorerCards';

/**
 * Searchable tags index with an accessible article drawer.
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.posts - Stripped post objects with pre-normalized tag slugs
 * @param {Array<Object>} props.tags - Tag descriptors with id, display, slug, and count
 * @returns {JSX.Element} Tags index and article drawer
 */
export default function TagsExplorer({ posts, tags }) {
  const [ selectedTag, setSelectedTag ] = useState(null);
  const [ searchQuery, setSearchQuery ] = useState('');
  const generatedId = useId();
  const resultsId = `tag-results-${generatedId}`;
  const statusId = `tag-results-status-${generatedId}`;

  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previouslyFocusedElementRef = useRef(null);

  const postsByTagSlug = useMemo(() => {
    const index = new Map();

    posts.forEach((post) => {
      (post.tagSlugs || []).forEach((slug) => {
        if (!index.has(slug)) index.set(slug, []);

        index.get(slug).push(post);
      });
    });

    return index;
  }, [ posts ]);

  const sortedTags = useMemo(() => (
    [ ...tags ].sort((a, b) => a.display.localeCompare(b.display, 'en', { 'sensitivity': 'base' }))
  ), [ tags ]);

  const filteredTags = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return sortedTags;

    return sortedTags.filter((tag) => (
      tag.display.toLowerCase().includes(query) || tag.id.toLowerCase().includes(query)
    ));
  }, [ searchQuery, sortedTags ]);

  const sidebarOpen = selectedTag !== null;
  const tagPosts = selectedTag ? postsByTagSlug.get(selectedTag.slug) || [] : [];
  const resultLabel = filteredTags.length === 1 ? 'tag' : 'tags';
  const statusText = searchQuery.trim() ? `${filteredTags.length} ${resultLabel} matching “${searchQuery.trim()}”` : `${filteredTags.length} ${resultLabel}`;

  const closeSidebar = () => setSelectedTag(null);

  useEffect(() => {
    if (!sidebarOpen) return undefined;

    previouslyFocusedElementRef.current = document.activeElement;
    const previousBodyOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleEscape = (event) => {
      if (event.key === 'Escape') closeSidebar();
    };

    const handleTab = (event) => {
      if (event.key !== 'Tab' || !drawerRef.current) return;

      const focusableElements = drawerRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];

      if (!firstFocusableElement || !lastFocusableElement) {
        event.preventDefault();

        return;
      }

      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTab);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTab);
      previouslyFocusedElementRef.current?.focus?.();
    };
  }, [ sidebarOpen ]);

  return (
    <>
      <div>
        <header className='border-b border-gray-200 py-10 dark:border-gray-800 md:py-12'>
          <Typography variant='title-md'>Tags</Typography>
          <Typography variant='index-feature-summary' className='mt-3 max-w-2xl'>
            A searchable index of the technologies, research areas, and working practices covered across the archive.
          </Typography>
          <div className='mt-4 flex flex-wrap gap-x-5 gap-y-2'>
            <Typography variant='metadata'>{tags.length} tags</Typography>
            <Typography variant='metadata'>{posts.length} articles</Typography>
          </div>
        </header>

        <div className='max-w-xl py-6'>
          <Search
            clearLabel='Clear tag search'
            label='Search tags'
            resultsId={ resultsId }
            setSearchValue={ setSearchQuery }
            value={ searchQuery }
          />
          <Typography
            id={ statusId }
            variant='paragraph-sm'
            role='status'
            aria-live='polite'
            aria-atomic='true'
            className='mt-2'
          >
            {statusText}
          </Typography>
        </div>

        {filteredTags.length > 0 ? (
          <div id={ resultsId } aria-describedby={ statusId } role='list' className='grid border-t border-gray-200 dark:border-gray-800 md:grid-cols-2'>
            {filteredTags.map((tag) => (
              <div key={ tag.id } role='listitem' className='border-b border-gray-200 dark:border-gray-800 md:odd:border-r'>
                <Button
                  onClick={ () => setSelectedTag(tag) }
                  aria-controls='tags-drawer'
                  aria-expanded={ selectedTag?.id === tag.id }
                  aria-haspopup='dialog'
                  variant='ghost'
                  tone='gray'
                  size='sm'
                  className='min-h-14 w-full justify-between rounded-none px-4 py-3 text-left font-medium'
                >
                  <span className='min-w-0 break-words'>{tag.display}</span>
                  <span className='ml-4 inline-flex shrink-0 items-center gap-2 text-gray-500 dark:text-gray-400'>
                    <span className='text-xs tabular-nums'>{tag.count}</span>
                    <Icon name='ArrowRight' size='xs' decorative />
                  </span>
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div id={ resultsId } aria-describedby={ statusId } className='border-y border-gray-200 py-12 text-center dark:border-gray-800'>
            <Typography variant='heading-sm' as='p' className='mb-2'>No matching tags</Typography>
            <Typography variant='paragraph-sm'>Try a shorter term or clear the search to see the complete index.</Typography>
          </div>
        )}
      </div>

      {sidebarOpen && (
        <div
          id='tags-drawer'
          ref={ drawerRef }
          role='dialog'
          aria-modal='true'
          aria-labelledby='tags-drawer-title'
          aria-describedby='tags-drawer-description'
          className='fixed inset-0 z-50 overflow-hidden'
        >
          <div
            aria-hidden='true'
            className='absolute inset-0 bg-gray-950/35'
            onClick={ closeSidebar }
          />

          <aside className='absolute right-0 top-0 flex h-full w-full max-w-lg flex-col border-l border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-950'>
            <header className='flex items-start justify-between gap-4 border-b border-gray-200 p-5 dark:border-gray-800 sm:p-6'>
              <div className='min-w-0'>
                <Typography variant='heading-md' as='h2' id='tags-drawer-title' className='break-words'>
                  {selectedTag?.display}
                </Typography>
                <Typography id='tags-drawer-description' variant='post-meta' className='mt-1'>
                  {selectedTag?.count} {selectedTag?.count === 1 ? 'article' : 'articles'}
                </Typography>
              </div>
              <Button
                ref={ closeButtonRef }
                onClick={ closeSidebar }
                variant='ghost'
                tone='gray'
                size='xs'
                aria-label='Close tag panel'
                className='shrink-0'
              >
                <Icon name='X' size='md' decorative />
              </Button>
            </header>

            <div className='flex-1 overflow-y-auto'>
              {tagPosts.length > 0 ? (
                <ul className='divide-y divide-gray-200 dark:divide-gray-800'>
                  {tagPosts.map((post) => (
                    <li key={ post.slug }>
                      <Link
                        href={ `/blog/${post.slug}` }
                        onClick={ closeSidebar }
                        variant='bare'
                        className='group block p-5 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900 sm:p-6'
                      >
                        <PostSummary post={ post } />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className='py-12 text-center'>
                  <Typography variant='paragraph-sm'>No articles found.</Typography>
                </div>
              )}
            </div>

            <footer className='border-t border-gray-200 p-5 dark:border-gray-800 sm:p-6'>
              <Button
                href={ `/blog/tags/${selectedTag?.slug}` }
                onClick={ closeSidebar }
                variant='outline'
                tone='gray'
                size='sm'
                className='w-full'
              >
                View all articles
                <Icon name='ArrowRight' size='xs' decorative />
              </Button>
            </footer>
          </aside>
        </div>
      )}
    </>
  );
}
