/**
 * Blog Main Page
 *
 * @description Main blog page component that displays featured posts
 * and recent posts by year, with older writing grouped under "Long time ago".
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { allPosts } from 'contentlayer/generated';

import { metadataGenerator } from '@/data/meta/generator/blog';
import ArchiveLayout from '@/layouts/ArchiveLayout';
import FeaturedPostsLayout from '@/layouts/FeaturedLayout';
import { getPublishedPosts } from '@/lib/utils/contentlayer';

export const metadata = metadataGenerator({ 'path': '/blog', 'title': 'Ahmad Assaf’s Blog' });

// Refresh the rolling two-year archive cutoff daily when the page is statically cached.
export const revalidate = 86400;

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
      title='Ahmad Assaf’s Blog'
      titleClassName='text-[2.5rem]/[1.15] sm:text-5xl/[1.15] lg:text-6xl/[1.15]'
      description='Writing about AI, semantic systems, data products, and engineering practice.'
      beforeList={ <div className='pt-8 sm:pt-12'><FeaturedPostsLayout posts={ posts } /></div> }
    />
  );
}
