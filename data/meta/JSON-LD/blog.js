import metadata from '../metadata.js';

import { website } from './website.js';

export const blog = {
  ...website,
  '@type': 'Blog',
  'mainEntityOfPage': {
    '@id': metadata.siteUrl,
    '@type': 'WebSite'
  },
  'url': `${metadata.siteUrl}/blog`
};
