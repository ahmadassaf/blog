import { blog } from '../JSON-LD/blog';
import siteMetadata from '../metadata';

export function metadataGenertaor(params, allPosts) {
  const slug = decodeURI(params.slug.join('/'));
  const postIndex = allPosts.findIndex((_post) => _post.slug.replace('category/', '') === slug);
  const post = allPosts[postIndex];

  if (post) return {
    'description': post.summary,
    'openGraph': {
      'authors': [ siteMetadata.author ],
      'description': post.summary,
      'images': [ `${siteMetadata.siteUrl}/static/images/logo.png` ],
      'locale': 'en_US',
      'publishedTime': new Date(post.date).toISOString(),
      'siteName': siteMetadata.title,
      'title': post.title,
      'type': 'article',
      'url': './'
    },
    'title': post.title,
    'twitter': {
      'card': 'summary_large_image',
      'description': post.summary,
      'images': [ `${siteMetadata.siteUrl}/static/images/logo.png` ],
      'title': post.title
    }
  };

}

export function linkedDataGenerator(post) {
  return {
    '@context': 'http://schema.org',
    '@type': 'BlogPosting',
    'about': post.tags.map((tag) => {
      return {
        '@id': `${siteMetadata.siteUrl}${tag.href}`,
        '@type': 'Thing',
        'name': tag.title,
        'sameAs': tag.sameAs
      };
    }),
    'datePublished': post.date,
    'genre': post.category,
    'headline': post.title,
    'isPartOf': blog(),
    'keywords': post.tags,
    'thumbnailUrl': `${siteMetadata.siteUrl}/static/images/logo.png`,
    'url': `${siteMetadata.siteUrl}/blog/${post.slug}`,
    'wordCount': post.readingTime.words
  };
}
