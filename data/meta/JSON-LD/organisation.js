export function organisation() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'London ',
      'postalCode': 'EC1Y 8LZ',
      'streetAddress': 'HYLO, 105 Bunhill Row'
    },
    'email': 'support@beamery.com',
    'member': [
      {
        '@type': 'Organization'
      }
    ],
    'name': 'Beamery',
    'sameAs': [ 'https://en.wikipedia.org/wiki/Beamery' ],
    'url': 'https://beamery.com'
  };
}

