/**
 * Tags Explorer Component
 *
 * @description Interactive client component for the tags page. Renders blue-accented
 * stats cards, a searchable topic list, and an accessible slide-over drawer with the
 * articles for a selected topic. Receives plain, pre-filtered data from the server page.
 *
 * @author Ahmad Assaf
 * @version 9.0.0
 */

'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Card, FieldInput, Grid, Icon, Link, Pill, Typography } from '@gaudi/design-system';

import { PostSummary, StatCard } from '@/app/blog/ExplorerCards';

/**
 * Interactive tags explorer with searchable topics and an accessible drawer
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.posts - Stripped post objects (no drafts) with pre-normalized tagSlugs
 * @param {Array<Object>} props.tags - Tag descriptors with id, display, slug, and count
 * @returns {JSX.Element} Tags explorer with stats, topic buttons, and drawer
 *
 * @example
 * <TagsExplorer tags={tags} posts={posts} />
 */
export default function TagsExplorer({ posts, tags }) {
  const [ selectedTag, setSelectedTag ] = useState(null);
  const [ searchQuery, setSearchQuery ] = useState('');

  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previouslyFocusedElementRef = useRef(null);

  // Index posts by tag slug once so opening a topic is a lookup, not a rescan
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

  const sortedTags = useMemo(() => [ ...tags ].sort((a, b) => b.count - a.count), [ tags ]);
  const filteredTags = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return sortedTags;

    return sortedTags.filter((tag) => tag.display.toLowerCase().includes(query) || tag.id.toLowerCase().includes(query));
  }, [ searchQuery, sortedTags ]);

  // Calculate stats
  const totalArticles = posts.length;
  const mostPopularTag = sortedTags[0];

  // The drawer state is fully derived from the selected tag
  const sidebarOpen = selectedTag !== null;
  const tagPosts = selectedTag ? postsByTagSlug.get(selectedTag.slug) || [] : [];

  const closeSidebar = () => setSelectedTag(null);

  // Handle escape key, focus trap, and focus restore while the drawer is open
  useEffect(() => {
    if (!sidebarOpen) return undefined;

    previouslyFocusedElementRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    const handleEscape = (event) => {
      if (event.key === 'Escape')
        closeSidebar();

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
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTab);
      previouslyFocusedElementRef.current?.focus?.();
    };
  }, [ sidebarOpen ]);

  return (
    <>
      <div className='mx-auto max-w-6xl divide-y divide-gray-200 dark:divide-gray-700'>
        <header className='space-y-2 pt-2 pb-6'>
          <Typography variant='title-md'>
            Tags
          </Typography>
        </header>

        <div className='pt-5'>
          <Grid columns='3' gap='sm' className='mb-5'>
            <StatCard icon='FolderOpen' value={ tags.length } label='Tags' />
            <StatCard icon='FileText' value={ totalArticles } label='Articles' />
            <StatCard icon='Flame' value={ mostPopularTag?.count || 0 } label='Most popular' />
          </Grid>

          <div className='relative mb-6 w-full'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400'>
              <Icon name='Search' size='sm' decorative />
            </div>
            <FieldInput
              type='search'
              aria-label='Search tags'
              placeholder='Search tags…'
              value={ searchQuery }
              onChange={ (event) => setSearchQuery(event.target.value) }
              className='w-full border-gray-200 pl-11 shadow-none dark:border-gray-800'
            />
          </div>

          <div className='flex flex-wrap gap-2'>
            {filteredTags.map((tag) => (
              <Button
                key={ tag.id }
                onClick={ () => setSelectedTag(tag) }
                variant='soft'
                tone='gray'
                size='xs'
                className='min-h-9 max-w-full justify-start whitespace-normal px-3 text-left text-sm font-medium'
              >
                {tag.display}
                <Pill tone='blue' variant='soft' radius='full' size='xs' className='my-0 px-1.5 py-0 text-[10px] leading-4'>{tag.count}</Pill>
              </Button>
            ))}
          </div>

          {filteredTags.length === 0 && (
            <div className='py-8 text-center'>
              <Typography variant='paragraph-sm'>
                {searchQuery ? 'No tags match your search' : 'No tags yet'}
              </Typography>
            </div>
          )}
        </div>
      </div>

      {sidebarOpen && (
        <div
          ref={ drawerRef }
          role='dialog'
          aria-modal='true'
          aria-labelledby='tags-drawer-title'
          className='fixed inset-0 z-50 overflow-hidden'
        >
          <div
            aria-hidden='true'
            className='absolute inset-0 bg-black/20'
            onClick={ closeSidebar }
          />

          <Card variant='outline' radius='none' padding='none' className='absolute right-0 top-0 h-full w-full max-w-lg shadow-lg'>
            <div className='flex h-full flex-col'>
              <Card variant='flat' radius='none' className='border-x-0 border-t-0 p-6'>
                <div className='flex items-start justify-between gap-4'>
                  <div className='min-w-0'>
                    <div className='flex min-w-0 items-center gap-2'>
                      <Icon name='Tags' size='md' decorative />
                      <Typography variant='heading-sm' as='h2' id='tags-drawer-title' className='break-words'>
                        {selectedTag?.display}
                      </Typography>
                    </div>
                    <Typography variant='paragraph-sm' className='mt-1'>
                      {selectedTag?.count} {selectedTag?.count === 1 ? 'article' : 'articles'}
                    </Typography>
                  </div>
                  <Button
                    ref={ closeButtonRef }
                    onClick={ closeSidebar }
                    variant='ghost'
                    tone='gray'
                    size='xs'
                    aria-label='Close tags panel'
                    className='shrink-0'
                  >
                    <Icon name='X' size='md' decorative />
                  </Button>
                </div>
              </Card>

              <div className='flex-1 overflow-y-auto'>
                {tagPosts.length === 0 && (
                  <div className='py-12 text-center'>
                    <Typography variant='paragraph-sm'>No articles found</Typography>
                  </div>
                )}
                {tagPosts.length > 0 && (
                  <div>
                    {tagPosts.map((post) => (
                      <Link
                        key={ post.slug }
                        href={ `/blog/${post.slug}` }
                        onClick={ closeSidebar }
                        variant='bare'
                        className='block p-6'
                      >
                        <PostSummary post={ post } />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Card variant='flat' radius='none' className='border-x-0 border-b-0 p-6'>
                <Button
                  href={ `/blog/tags/${selectedTag?.slug}` }
                  onClick={ closeSidebar }
                  variant='outline'
                  tone='gray'
                  className='w-full'
                >
                    View All Articles →
                </Button>
              </Card>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
