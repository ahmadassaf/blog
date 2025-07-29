/**
 * Post Metadata Generators
 *
 * @description Utility functions for generating metadata and structured data for blog posts.
 * Handles the creation of Open Graph metadata, Twitter card data, and JSON-LD structured data
 * for SEO optimization and social media sharing.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { author } from '../JSON-LD/author';
import { blog } from '../JSON-LD/blog';
import siteMetadata from '../metadata';

/**
 * Generates metadata for a blog post based on URL parameters
 *
 * @description Creates comprehensive metadata including Open Graph and Twitter card data
 * for a specific blog post. Used for SEO optimization and social media sharing.
 *
 * @param {Object} params - URL parameters containing the post slug
 * @param {Array} allPosts - Array of all blog posts to search through
 * @returns {Object|undefined} Metadata object with Open Graph and Twitter data, or undefined if post not found
 *
 * @example
 * const metadata = metadataGenertaor({ slug: ['my-blog-post'] }, allPosts);
 */
export function metadataGenertaor(params, allPosts) {
  const slug = decodeURI(params.slug.join('/'));
  const postIndex = allPosts.findIndex((_post) => _post.slug.replace('category/', '') === slug);
  const post = allPosts[postIndex];

  if (post) return {
    'description': post.summary,
    'openGraph': {
      'authors': [ siteMetadata.author ],
      'description': post.summary,
      'images': [ `/api/og?slug=${post.slug}` ],
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
      'images': [ `/api/og?slug=${post.slug}` ],
      'title': post.title
    }
  };

}

/**
 * Generates JSON-LD structured data for a blog post
 *
 * @description Creates Schema.org compliant structured data for blog posts to improve
 * SEO and enable rich snippets in search results. Includes author information,
 * publication details, tags, and related metadata.
 *
 * @param {Object} post - The blog post object with metadata
 * @returns {Object} JSON-LD structured data object
 *
 * @example
 * const structuredData = linkedDataGenerator(postData);
 * // Use in script tag: <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
 */
export function linkedDataGenerator(post) {
  return {
    '@context': 'http://schema.org',
    '@type': 'BlogPosting',
    'about': post.tags.map((tag) => {
      return {
        '@id': `${siteMetadata.siteUrl}/blog/tags/${tag.replace(' ', '-').toLowerCase()}`,
        '@type': 'Thing',
        'name': tag
      };
    }),
    'author': author(),
    'datePublished': post.date,
    'genre': post.category,
    'headline': post.title,
    'image': {
      '@id': `/api/og?slug=${post.slug}`,
      '@type': 'ImageObject',
      'height': '630',
      'url': `/api/og?slug=${post.slug}`,
      'width': '1200'
    },
    'isPartOf': blog(),
    'keywords': post.tags,
    'thumbnailUrl': `${siteMetadata.siteUrl}/static/images/logo.svg`,
    'url': `${siteMetadata.siteUrl}/blog/${post.slug}`,
    'wordCount': post.readingTime.words
  };
}
