import siteMetadata from '@/data/siteMetadata';

export default function robots() {
  return {
    'host': siteMetadata.siteUrl,
    'rules': {
      'allow': '/',
      'userAgent': '*'
    },
    'sitemap': `${siteMetadata.siteUrl}/sitemap.xml`
  };
}
