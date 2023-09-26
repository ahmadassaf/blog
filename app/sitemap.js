import { allPosts } from 'contentlayer/generated';

import NavigationMetadata from '@/data/meta/navigationMetadata';
import siteMetadata from '@/data/meta/siteMetadata';

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
