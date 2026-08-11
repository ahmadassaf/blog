/**
 * Robots Configuration
 *
 * @description Generates the robots.txt configuration for search engine crawlers.
 * Defines which parts of the site can be crawled and provides sitemap location.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

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
  return {
    'host': 'https://assaf.website',
    'rules': [
      {
        'allow': [ '/', '/api/og', '/api/og/*' ],
        'disallow': '/api/',
        'userAgent': '*'
      }
    ],
    'sitemap': 'https://assaf.website/sitemap.xml'
  };
}
