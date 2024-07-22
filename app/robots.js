export default function robots() {
  return {
    'host': `https://assaf.website`,
    'rules': [
      {
        'allow': '/',
        'userAgent': '*'
      },
      {
        'allow': '/api/og/*',
        'userAgent': '*'
      }
    ],
    'sitemap': `https://assaf.website/sitemap.xml`
  };
}
