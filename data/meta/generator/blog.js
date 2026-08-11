/**
 * Blog Metadata Generator
 *
 * @description Generates comprehensive metadata for blog pages including
 * OpenGraph, Twitter cards, RSS feeds, and viewport settings. Provides
 * structured data for SEO and social media sharing.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import siteMetadata from '../metadata';

/**
 * Generates metadata configuration for blog pages
 *
 * @param {Object} [options] - Page-specific overrides
 * @param {string} [options.path='/'] - Site-relative path used as the canonical URL
 * @param {string} [options.title] - Page title; falls back to the site title template
 * @returns {Object} Complete metadata object with OpenGraph, Twitter, and SEO settings
 *
 * @example
 * const metadata = metadataGenertaor();
 * const pageMetadata = metadataGenertaor({ path: '/blog/page/2', title: 'Blog – Page 2' });
 * // Used in Next.js layout or page components
 */
export function metadataGenertaor({ path = '/', title } = {}) {
  const ogImage = `${siteMetadata.siteUrl}/static/images/og-card.jpg`;

  return {
    'alternates': {
      'canonical': path,
      'types': {
        'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`
      }
    },
    'authors': [{ 'name': siteMetadata.author }],
    'category': 'technology',
    'description': siteMetadata.description,
    'keywords': siteMetadata.keywords,
    'metadataBase': new URL(siteMetadata.siteUrl),
    'openGraph': {
      'authors': [ siteMetadata.author ],
      'description': siteMetadata.description,
      'images': [ ogImage ],
      'title': title || siteMetadata.title,
      'type': 'website',
      'url': path
    },
    'title': title || {
      'default': siteMetadata.title,
      'template': `%s | ${siteMetadata.title}`
    },
    'twitter': {
      'card': 'summary_large_image',
      'creator': '@ahmadaassaf',
      'creatorId': '3696459741',
      'description': siteMetadata.description,
      'images': [ ogImage ],
      'title': title || siteMetadata.title
    }
  };
}
