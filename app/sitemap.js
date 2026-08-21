/**
 * Sitemap Generator
 *
 * @description Generates XML sitemap data for search engines by combining
 * static navigation routes with dynamic blog post, project,  tag,
 * and category routes from Contentlayer and generated content indexes.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { allPosts, allProjects } from 'contentlayer/generated';

import categories from '@/app/content/categories';
import tags from '@/app/content/tags';
import NavigationMetadata from '@/data/meta/navigationMetadata';
import siteMetadata from '@/data/meta/siteMetadata';
import { published } from '@/lib/utils/contentlayer';

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
  const today = new Date().toISOString().split('T')[0];

  const blogRoutes = published(allPosts).map((post) => {
    return {
      'lastModified': post.updated || post.date,
      'url': `${siteUrl}/blog/${post.slug}`
    };
  });

  const projectRoutes = published(allProjects).map((project) => {
    return {
      'lastModified': project.updated || project.date,
      'url': `${siteUrl}/blog/${project.externalLink}`
    };
  });

  const tagRoutes = tags.map((tag) => {
    return {
      'lastModified': today,
      'url': `${siteUrl}${tag.href}`
    };
  });

  const categoryRoutes = categories.map((category) => {
    return {
      'lastModified': today,
      'url': `${siteUrl}${category.href}`
    };
  });

  const routes = NavigationMetadata.links.map((route) => {
    return {
      'lastModified': today,
      'url': `${siteUrl}${route.href}`
    };
  });

  return [ ...routes, ...blogRoutes, ...projectRoutes, ...categoryRoutes, ...tagRoutes ];
}
