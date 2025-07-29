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

// Internal imports
import siteMetadata from '../metadata';

/**
 * Generates metadata configuration for blog pages
 *
 * @returns {Object} Complete metadata object with OpenGraph, Twitter, and SEO settings
 *
 * @example
 * const metadata = metadataGenertaor();
 * // Used in Next.js layout or page components
 */
export function metadataGenertaor() {
  return {
    'alternates': {
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
      'images': [ `${siteMetadata.siteUrl}/static/images/logo.svg` ],
      'title': siteMetadata.title,
      'type': 'website'
    },
    'title': {
      'default': siteMetadata.title,
      'template': `%s | ${siteMetadata.title}`
    },
    'twitter': {
      'card': 'summary_large_image',
      'creator': '@ahmadaassaf',
      'creatorId': '3696459741',
      'description': siteMetadata.description,
      'images': [ `${siteMetadata.siteUrl}/static/images/logo.svg` ],
      'title': siteMetadata.title
    },
    'viewport': {
      'initialScale': 1,
      'maximumScale': 1,
      'width': 'device-width'
    }
  };
}
