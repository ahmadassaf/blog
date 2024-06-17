const NavigationMetadata = {
  'categoriesMetadata': {
    'data': 'Everything AI, ML and Data',
    'engineering': 'Development, programming and code',
    'productivity': 'Productivity, tools and tips',
    'leadership': 'Engineering management and leadership',
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
    },
    {
      'hideInPath': '*',
      'href': '/blog/categories',
      'title': 'Categories'
    }
  ]
};

export default NavigationMetadata;
