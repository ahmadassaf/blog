import { alumni } from './alumni';
import { organisation } from './organisation';

export function author() {
  return {
    '@context': 'http://schema.org',
    '@type': 'Person',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'London',
      'addressRegion': 'United Kingdom',
      'postalCode': 'SW3 5AF',
      'streetAddress': 'Beaufort Street'
    },
    'affiliation': organisation(),
    'alumniOf': alumni(),
    'email': 'me@assaf.website',
    'familyName': 'Assaf',
    'givenName': 'Ahmad',
    'jobTitle': 'VP of AI & Data',
    'name': 'Ahmad Assaf',
    'sameAs': [
      'https://twitter.com/ahmadaassaf',
      'https://github.com/ahmadassaf',
      'https://linkedin.com/in/ahmadassaf',
      'http://stackoverflow.com/users/557821/ahmadassaf',
      'https://www.instagram.com/ahmadaassaf/',
      'https://news.ycombinator.com/user?id=ahmadassaf'
    ],
    'url': 'http://www.assaf.website'
  };
}
