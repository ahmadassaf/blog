/**
 * Blog Main Page
 *
 * @description Main blog page component that displays featured posts
 * and the complete year-grouped archive of all blog posts.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { allPosts } from 'contentlayer/generated';

import { metadataGenerator } from '@/data/meta/generator/blog';
import ArchiveLayout from '@/layouts/ArchiveLayout';
import FeaturedPostsLayout from '@/layouts/FeaturedLayout';
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
    <ArchiveLayout
      posts={ posts }
      title='Blog'
      description='Writing about AI, semantic systems, data products, and engineering practice.'
      listTitle='All Posts'
      beforeList={ <div className='pt-2 sm:pt-3'><FeaturedPostsLayout posts={ posts } /></div> }
    />
  );
}
