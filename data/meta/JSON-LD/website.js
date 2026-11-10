import metadata from '../metadata.js';

import { author } from './author.js';

export const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'about': metadata.description,
  author,
  'keywords': metadata.keywords,
  'name': metadata.title,
  'thumbnailUrl': `${metadata.siteUrl}${metadata.siteLogo}`,
  'url': metadata.siteUrl
};
