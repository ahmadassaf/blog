/**
 * Robots Configuration
 *
 * @description Generates the robots.txt configuration for search engine crawlers.
 * Defines which parts of the site can be crawled and provides sitemap location.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import siteMetadata from '@/data/meta/metadata';

/**
 * Generates robots.txt configuration for search engine crawlers
 *
 * @returns {Object} Robots configuration object with host, rules, and sitemap
 *
 * @example
 * // Next.js will automatically serve this at /robots.txt
 * const robotsConfig = robots();
 */
export default function robots() {
  const { siteUrl } = siteMetadata;

  return {
    'host': siteUrl,
    'rules': [
      {
        'allow': [ '/', '/api/og', '/api/og/*' ],
        'disallow': '/api/',
        'userAgent': '*'
      }
    ],
    'sitemap': `${siteUrl}/sitemap.xml`
  };
}
