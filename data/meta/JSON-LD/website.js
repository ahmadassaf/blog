import metadata from '../metadata';

import { author } from './author';

export function website() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'about': metadata.description,
    'author': author(),
    'keywords': metadata.keywords,
    'thumbnailUrl': `${metadata.siteUrl}/static/images/logo.png`,
    'url': 'https://assaf.website'
  };
}

