/**
 * Tags Explorer Component
 *
 * @description Interactive client component for the tags page. Renders the counts in the
 * header, a searchable topic list, and Gaudi's Sheet with the articles for a selected topic.
 * Receives plain, pre-filtered data from the server page.
 *
 * @author Ahmad Assaf
 * @version 10.0.0
 */

'use client';

import { useMemo, useState } from 'react';
import { Button, EmptyState, Icon, Input, Pill, Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@gaudi/design-system';
import PageHeader from '@gaudi/design-system/layout/PageHeader';

import { PostSummary } from '@/app/blog/ExplorerCards';

/**
 * Interactive tags explorer with searchable topics and a drawer of articles
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

  // The drawer state is fully derived from the selected tag; Sheet owns focus, Escape and restore
  const tagPosts = selectedTag ? postsByTagSlug.get(selectedTag.slug) || [] : [];
  const closeSidebar = () => setSelectedTag(null);

  return (
    <>
      <div className='mx-auto max-w-6xl'>
        <PageHeader title='Tags' description={ `${tags.length} topics across ${posts.length} articles` } divider className='pt-2 pb-6' />

        <div className='pt-8'>
          <Input
            type='search'
            aria-label='Search tags'
            placeholder='Search tags…'
            value={ searchQuery }
            onChange={ (event) => setSearchQuery(event.target.value) }
            prefix={ <Icon name='Search' size='sm' decorative /> }
            className='mb-6'
          />

          <div className='flex flex-wrap gap-2'>
            {filteredTags.map((tag) => (
              <Button key={ tag.id } onClick={ () => setSelectedTag(tag) } variant='soft' tone='gray' size='sm'>
                {tag.display}
                <Pill tone='blue' variant='soft' radius='full' size='xs'>{tag.count}</Pill>
              </Button>
            ))}
          </div>

          {filteredTags.length === 0 && (
            <EmptyState compact role='status' title={ searchQuery ? 'No tags match your search' : 'No tags yet' } />
          )}
        </div>
      </div>

      <Sheet open={ selectedTag !== null } onOpenChange={ (open) => {
        if (!open) closeSidebar();
      } }>
        <SheetContent side='right' size='lg' className='flex flex-col'>
          <SheetHeader>
            <SheetTitle className='flex items-center gap-2 break-words'>
              <Icon name='Tags' size='md' decorative />
              {selectedTag?.display}
            </SheetTitle>
            <SheetDescription>
              {selectedTag?.count} {selectedTag?.count === 1 ? 'article' : 'articles'}
            </SheetDescription>
          </SheetHeader>

          <div className='flex-1 overflow-y-auto px-2'>
            {tagPosts.length === 0 ? <EmptyState compact title='No articles found' /> : (
              tagPosts.map((post) => <PostSummary key={ post.slug } post={ post } onClick={ closeSidebar } />)
            )}
          </div>

          <SheetFooter>
            <Button href={ `/blog/tags/${selectedTag?.slug}` } onClick={ closeSidebar } variant='outline' tone='gray' className='w-full'>
              View all articles
              <Icon name='ArrowRight' size='sm' decorative />
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
