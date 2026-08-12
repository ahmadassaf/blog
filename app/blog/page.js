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
      beforeList={ <FeaturedPostsLayout posts={ posts } /> }
      paginationURL='blog/page'
      baseURL='blog'
    />
  );
}
