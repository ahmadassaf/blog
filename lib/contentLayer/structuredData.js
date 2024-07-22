import siteMetadata from '../../data/meta/siteMetadata';

const structuredData = {
  'post': (doc) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'author': doc.authors,
      'dateModified': doc.lastmod || doc.date,
      'datePublished': doc.date,
      'description': doc.summary,
      'headline': doc.title,
      'image': `/api/og?slug=${doc.slug}`,
      'url': `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`
    };
  },
  'project': (doc) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'author': doc.authors,
      'dateModified': doc.lastmod || doc.date,
      'datePublished': doc.date,
      'description': doc.summary,
      'headline': doc.title,
      'image': `/api/og?slug=${doc.slug}`,
      'url': `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`
    };
  }
};

export default structuredData;
