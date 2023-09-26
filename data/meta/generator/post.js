import { blog } from '../JSON-LD/blog';
import siteMetadata from '../metadata';

export function metadataGenertaor(slug, allPosts) {
  const title = decodeURI(slug.join('/'));
  const postIndex = allPosts.findIndex((_post) => _post.slug.replace('category/', '') === title);
  const post = allPosts[postIndex];
  const publishedAt = new Date(post.date).toISOString();

  return {
    'description': post.summary,
    'openGraph': {
      'authors': [ siteMetadata.author ],
      'description': post.summary,
      'images': [ `${siteMetadata.siteUrl}/static/images/logo.png` ],
      'locale': 'en_US',
      'publishedTime': publishedAt,
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
    '__html': {
      '@context': 'http://schema.org',
      '@type': 'BlogPosting',
      'datePublished': post.date,
      'genre': post.category,
      'headline': post.title,
      'isPartOf': blog(),
      'keywords': post.tags,
      'thumbnailUrl': `${siteMetadata.siteUrl}/static/images/logo.png`,
      'url': `${siteMetadata.url}/blog/${post.slug}`,
      'wordCount': post.readingTime.words
    }
  };
}
