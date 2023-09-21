const NavigationMetadata = {
  'categoriesMetadata': {
    'data': 'Everything AI, ML and Data',
    'development': 'Development, programming and code',
    'productivity': 'Productivity, tools and tips',
    'semantic-web': 'Linked Data, RDF, SPARQL, etc.'
  },
  'links': [
    {
      'hideInPath': '/blog',
      'href': '/about',
      'title': 'About'
    },
    {
      'hideInPath': '*',
      'href': '/blog/tags',
      'showInPath': '/blog',
      'title': 'Tags'
    },
    {
      'href': '/blog/publications',
      'showInPath': '*',
      'title': 'Publications'
    },
    {
      'href': '/blog/projects',
      'showInPath': '*',
      'title': 'Projects'
    }
  ]
};

export default NavigationMetadata;
