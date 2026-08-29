/**
 * Metadata Generator
 *
 * @description Generates the Next.js metadata object (OpenGraph, Twitter cards,
 * canonical/RSS alternates) for every page of the site. Static pages pass just a
 * path and title; post pages layer their own description, image, and publication
 * details on the same base so both shapes stay in sync.
 *
 * @author Ahmad Assaf
 * @version 2.0.0
 */

import siteMetadata from '../metadata';

/**
 * Generates metadata configuration for a page
 *
 * @param {Object} [options] - Page-specific overrides
 * @param {string} [options.description] - Page description; falls back to the site description
 * @param {string} [options.image] - Social-card image (absolute, or site-relative resolved via metadataBase)
 * @param {string} [options.path='/'] - Site-relative path used as the canonical URL
 * @param {string} [options.publishedTime] - ISO publication timestamp for articles
 * @param {string} [options.title] - Page title; falls back to the site title template
 * @param {string} [options.type='website'] - OpenGraph type (website or article)
 * @returns {Object} Complete metadata object with OpenGraph, Twitter, and SEO settings
 *
 * @example
 * const metadata = metadataGenerator();
 * const pageMetadata = metadataGenerator({ path: '/blog/page/2', title: 'Blog – Page 2' });
 */
export function metadataGenerator({ description = siteMetadata.description, image, path = '/', publishedTime, title, type = 'website' } = {}) {
  const ogImage = image || `${siteMetadata.siteUrl}/static/images/og-card.jpg`;
  const ogTitle = title || siteMetadata.title;

  return {
    'alternates': {
      'canonical': path,
      'types': {
        'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`
      }
    },
    'authors': [{ 'name': siteMetadata.author }],
    'category': 'technology',
    description,
    'keywords': siteMetadata.keywords,
    'metadataBase': new URL(siteMetadata.siteUrl),
    'openGraph': {
      'authors': [ siteMetadata.author ],
      description,
      'images': [ ogImage ],
      'locale': 'en_US',
      ...publishedTime ? { publishedTime } : {},
      'siteName': siteMetadata.title,
      'title': ogTitle,
      type,
      'url': path
    },
    'title': title || {
      'default': siteMetadata.title,
      'template': `%s | ${siteMetadata.title}`
    },
    'twitter': {
      'card': 'summary_large_image',
      'creator': siteMetadata.twitterHandle,
      'creatorId': siteMetadata.twitterId,
      description,
      'images': [ ogImage ],
      'title': ogTitle
    }
  };
}
