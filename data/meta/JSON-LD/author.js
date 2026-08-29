import metadata from '../metadata';

import { alumni } from './alumni';
import { organisation } from './organisation';

export const author = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'London',
    'addressRegion': 'United Kingdom',
    'postalCode': 'SW3 5AF',
    'streetAddress': 'Beaufort Street'
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
