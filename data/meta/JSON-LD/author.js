import metadata from '../metadata.js';

import { alumni } from './alumni.js';
import { organisation } from './organisation.js';

export const author = {
  '@context': 'https://schema.org',
  '@type': 'Person',

  // City and country only: a street address and postcode on every page is more than search needs
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'London',
    'addressRegion': 'United Kingdom'
  },
  'affiliation': organisation,
  'alumniOf': alumni,
  'email': metadata.email,
  'familyName': 'Assaf',
  'givenName': 'Ahmad',
  'jobTitle': 'CTO at Mav9',
  'name': metadata.author,
  'sameAs': [
    metadata.twitter,
    metadata.github,
    metadata.linkedin,
    'http://stackoverflow.com/users/557821/ahmadassaf',
    'https://www.instagram.com/ahmadaassaf/',
    'https://news.ycombinator.com/user?id=ahmadassaf'
  ],
  'url': metadata.siteUrl
};
