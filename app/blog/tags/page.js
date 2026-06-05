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
import { Button, Card, FieldInput, Grid, Icon, Link, Pill, Spinner, Typography } from '@gaudi/design-system';
import { allPosts } from 'contentlayer/generated';

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
        <div className='mb-8'>
          <Typography variant='title-md' className='mb-6'>
            Topics
          </Typography>

          <Grid columns='3' gap='md' className='mb-6'>
            <StatCard icon='FolderOpen' value={ tags.length } label='Topics' />
            <StatCard icon='FileText' value={ totalArticles } label='Articles' />
            <StatCard icon='Flame' value={ mostPopularTag?.count || 0 } label='Most popular' />
          </Grid>

          <div className='relative mb-8'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <Icon name='Search' size='sm' decorative />
            </div>
            <FieldInput
              type='text'
              placeholder='Search topics...'
              value={ searchQuery }
              onChange={ (event) => setSearchQuery(event.target.value) }
              className='pl-10'
            />
          </div>
        </div>

        <div className='flex flex-wrap gap-3'>
          {filteredAndSortedTags.map((tag) => (
            <Button
              key={ tag.id }
              onClick={ () => loadTagPosts(tag) }
              variant='outline'
              tone='gray'
              size='sm'
            >
              {tag.display}
              <Pill tone='gray' variant='soft' size='xs'>{tag.count}</Pill>
            </Button>
          ))}
        </div>

        {filteredAndSortedTags.length === 0 && (
          <div className='py-8 text-center'>
            <Typography variant='paragraph-sm'>
              {searchQuery ? 'No topics found matching your search' : 'No topics yet'}
            </Typography>
          </div>
        )}
      </div>

      {sidebarOpen && (
        <div className='fixed inset-0 z-50 overflow-hidden'>
          <div
            className='absolute inset-0 bg-black/20'
            onClick={ closeSidebar }
          />

          <Card variant='outline' radius='none' padding='none' className='absolute right-0 top-0 h-full w-full max-w-lg shadow-lg'>
            <div className='flex h-full flex-col'>
              <Card variant='flat' radius='none' className='border-x-0 border-t-0 p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <div className='flex items-center gap-2'>
                      <Icon name='Tags' size='md' decorative />
                      <Typography variant='heading-sm' as='h2'>
                        {selectedTag?.display}
                      </Typography>
                    </div>
                    <Typography variant='paragraph-sm' className='mt-1'>
                      {selectedTag?.count} {selectedTag?.count === 1 ? 'article' : 'articles'}
                    </Typography>
                  </div>
                  <Button
                    onClick={ closeSidebar }
                    variant='ghost'
                    tone='gray'
                    size='xs'
                    aria-label='Close topics panel'
                  >
                    <Icon name='X' size='md' decorative />
                  </Button>
                </div>
              </Card>

              <div className='flex-1 overflow-y-auto'>
                {loading && (
                  <div className='flex items-center justify-center py-12'>
                    <Spinner label='Loading topic articles' />
                  </div>
                )}
                {!loading && tagPosts.length === 0 && (
                  <div className='py-12 text-center'>
                    <Typography variant='paragraph-sm'>No articles found</Typography>
                  </div>
                )}
                {!loading && tagPosts.length > 0 && (
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

const PostSummary = ({ post }) => (
  <article>
    <Typography variant='heading-sm' as='h3' className='mb-2 line-clamp-2'>
      {post.title}
    </Typography>
    <Typography variant='paragraph-sm' className='mb-3 line-clamp-2'>
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
      <Typography as='span' variant='metadata' className='inline-flex items-center gap-1'>
        Read
        <Icon name='ChevronRight' size='xs' decorative />
      </Typography>
    </div>
  </article>
);
