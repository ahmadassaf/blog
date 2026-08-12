/**
 * Blog Main Page
 *
 * @description Main blog page component that displays featured posts
 * and a complete list of all blog posts. Combines FeaturedPostsLayout
 * and ListLayout for comprehensive blog presentation.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { Icon, Link, Typography } from '@gaudi/design-system';
import { allPosts } from 'contentlayer/generated';

import { metadataGenertaor } from '@/data/meta/generator/blog';
import FeaturedPostsLayout from '@/layouts/FeaturedLayout';
import ListLayout from '@/layouts/ListLayout';
import { coreContent, published, sortPosts } from '@/lib/utils/contentlayer';

export const metadata = metadataGenertaor({ 'path': '/blog', 'title': 'Blog' });

/**
 * Main blog page component with featured posts and full listing
 *
 * @returns {JSX.Element} Complete blog page with featured posts and post list
 *
 * @example
 * // Rendered at /blog route
 * <Blog />
 */
export default function Blog() {
  const posts = coreContent(sortPosts(published(allPosts)));

  return (
    <ListLayout
      posts={ posts }
      pageTitle='Blog'
      pageDescription='Writing about AI, semantic systems, data products, and engineering practice.'
      listTitle='Latest writing'
      titleAs='h2'
      beforeList={ (
        <>
          <nav aria-label='Browse writing' className='mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-gray-200 py-3 dark:border-gray-800'>
            <Typography as='span' variant='metadata'>Browse</Typography>
            <Link href='/blog/categories' tone='neutral' className='inline-flex items-center gap-1.5'>
              Categories
              <Icon name='ArrowRight' decorative size='xs' />
            </Link>
            <Link href='/blog/tags' tone='neutral' className='inline-flex items-center gap-1.5'>
              Tags
              <Icon name='ArrowRight' decorative size='xs' />
            </Link>
            <Link href='/blog/projects' tone='neutral'>Projects</Link>
            <Link href='/blog/publications' tone='neutral'>Publications</Link>
          </nav>
          <FeaturedPostsLayout posts={ posts } />
        </>
      ) }
      paginationURL='blog/page'
      baseURL='blog'
    />
  );
}
