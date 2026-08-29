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

import { allPosts } from 'contentlayer/generated';

import { metadataGenerator } from '@/data/meta/generator/blog';
import FeaturedPostsLayout from '@/layouts/FeaturedLayout';
import ListLayout from '@/layouts/ListLayout';
import { getPublishedPosts } from '@/lib/utils/contentlayer';

export const metadata = metadataGenerator({ 'path': '/blog', 'title': 'Blog' });

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
  const posts = getPublishedPosts(allPosts);

  return (
    <ListLayout
      posts={ posts }
      paginate={ false }
      pageTitle='Blog'
      pageTitleVariant='display-lg'
      pageDescription='Writing about AI, semantic systems, data products, and engineering practice.'
      listTitle='All Posts'
      listTitleVariant='heading-lg'
      archive
      titleAs='h2'
      className='tracking-tight'
      beforeList={ <div className='pt-2 sm:pt-3'><FeaturedPostsLayout posts={ posts } /></div> }
    />
  );
}
