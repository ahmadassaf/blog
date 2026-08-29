import metadata from '../metadata';

import { website } from './website';

export const blog = {
  ...website,
  '@type': 'Blog',
  'mainEntityOfPage': {
    '@id': metadata.siteUrl,
    '@type': 'WebSite'
  },
  'url': `${metadata.siteUrl}/blog`
};
