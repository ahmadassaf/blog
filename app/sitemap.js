/**
 * Sitemap Generator
 *
 * @description Generates XML sitemap data for search engines by combining
 * static navigation routes with dynamic blog post routes from Contentlayer.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { allPosts } from 'contentlayer/generated';

import NavigationMetadata from '@/data/meta/navigationMetadata';
import siteMetadata from '@/data/meta/siteMetadata';

/**
 * Generates sitemap data for Next.js XML sitemap
 *
 * @returns {Array<Object>} Array of sitemap entries with url and lastModified properties
 *
 * @example
 * // Next.js will automatically serve this at /sitemap.xml
 * const sitemapData = sitemap();
 */
export default function sitemap() {
  const { siteUrl } = siteMetadata;

  const blogRoutes = allPosts.map((post) => {
    return {
      'lastModified': post.date,
      'url': `${siteUrl}/blog/${post.slug}`
    };
  });

  const routes = NavigationMetadata.links.map((route) => {
    return {
      'lastModified': new Date().toISOString().split('T')[0],
      'url': `${siteUrl}${route.href}`
    };
  });

  return [ ...routes, ...blogRoutes ];
}
