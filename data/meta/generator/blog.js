import siteMetadata from '../metadata';

export function metadataGenertaor() {
  return {
    'alternates': {
      'types': {
        'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`
      }
    },
    'authors': [{ 'name': siteMetadata.author }],
    'category': 'technology',
    'description': siteMetadata.description,
    'keywords': siteMetadata.keywords,
    'metadataBase': new URL(siteMetadata.siteUrl),
    'openGraph': {
      'authors': [ siteMetadata.author ],
      'description': siteMetadata.description,
      'images': [ `${siteMetadata.siteUrl}/static/images/logo.png` ],
      'title': siteMetadata.title,
      'type': 'website'
    },
    'title': {
      'default': siteMetadata.title,
      'template': `%s | ${siteMetadata.title}`
    },
    'twitter': {
      'card': 'summary_large_image',
      'creator': '@ahmadaassaf',
      'creatorId': '3696459741',
      'description': siteMetadata.description,
      'images': [ `${siteMetadata.siteUrl}/static/images/logo.png` ],
      'title': siteMetadata.title
    },
    'viewport': {
      'initialScale': 1,
      'maximumScale': 1,
      'width': 'device-width'
    }
  };
}
