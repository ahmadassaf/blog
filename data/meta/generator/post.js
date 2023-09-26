import { author } from '../JSON-LD/author';
import { blog } from '../JSON-LD/blog';
import knowledgeBase from '../knowledgeBase.mjs';
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
        '@id': `${siteMetadata.siteUrl}/blog/tags/${tag.replace(' ', '-').toLowerCase()}`,
        '@type': 'Thing',
        'name': tag,
        'sameAs': knowledgeBase[tag].sameAs
      };
    }),
    'author': author(),
    'datePublished': post.date,
    'genre': post.category,
    'headline': post.title,
    'image': {
      '@id': `${siteMetadata.siteUrl}/static/images/logo.png`,
      '@type': 'ImageObject',
      'height': '362',
      'url': `${siteMetadata.siteUrl}/static/images/logo.png`,
      'width': '388'
    },
    'isPartOf': blog(),
    'keywords': post.tags,
    'thumbnailUrl': `${siteMetadata.siteUrl}/static/images/logo.png`,
    'url': `${siteMetadata.siteUrl}/blog/${post.slug}`,
    'wordCount': post.readingTime.words
  };
}
