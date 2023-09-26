import siteMetadata from '@/data/meta/siteMetadata';

export default function manifest() {
  return {
    'background_color': '#fff',
    'description': siteMetadata.description,
    'display': 'standalone',
    'icons': [
      {
        'sizes': 'any',
        'src': '/favicon.ico',
        'type': 'image/x-icon'
      }
    ],
    'name': siteMetadata.title,
    'short_name': siteMetadata.shortname,
    'start_url': '/',
    'theme_color': '#fff'
  };
}
