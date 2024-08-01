import metadata from '../metadata';

import { author } from './author';

export function blog() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'about': metadata.description,
    'author': author(),
    'keywords': metadata.keywords,
    'mainEntityOfPage': {
      '@id': 'https://assaf.website',
      '@type': 'WebSite'
    },
    'thumbnailUrl': `${metadata.siteUrl}/static/images/logo.svg`,
    'url': 'https://assaf.website/blog'
  };
}

