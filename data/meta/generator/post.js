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

import { safeDecodeURI, slugify } from '../../../lib/utils/slugs';
import { author } from '../JSON-LD/author';
import { blog } from '../JSON-LD/blog';
import siteMetadata from '../metadata';

/**
 * Resolves the site-relative path a post is served from
 *
 * @description Posts and thoughts are served at `/blog/${slug}`, while
 * projects are served from their externalLink (e.g. /blog/projects/gaudi).
 *
 * @param {Object} post - The content document
 * @returns {string} Site-relative path for the post
 */
function postPath(post) {
  return post.type === 'Project' ? `/blog/${post.externalLink}` : `/blog/${post.slug}`;
}

/**
 * Generates metadata for a blog post based on URL parameters
 *
 * @description Creates comprehensive metadata including Open Graph and Twitter card data
 * for a specific blog post. Used for SEO optimization and social media sharing.
 *
 * @param {Object} params - URL parameters containing the post slug
 * @param {Array} allPosts - Array of all blog posts to search through
 * @returns {Object} Metadata object with Open Graph and Twitter data, or a minimal fallback if the post is not found
 *
 * @example
 * const metadata = metadataGenertaor({ slug: ['my-blog-post'] }, allPosts);
 */
export function metadataGenertaor(params, allPosts) {
  const slug = safeDecodeURI(params.slug.join('/'));
  const post = slug === null ? undefined : allPosts.find((_post) => _post.slug === slug || _post.slug.replace('category/', '') === slug);

  if (!post) return {
    'title': 'Post not found'
  };

  const path = postPath(post);

  return {
    'alternates': {
      'canonical': path
    },
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
      'url': path
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
  const postUrl = `${siteMetadata.siteUrl}${postPath(post)}`;
  const ogImage = `${siteMetadata.siteUrl}/api/og?slug=${post.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'about': (post.tags || []).map((tag) => {
      return {
        '@id': `${siteMetadata.siteUrl}/blog/tags/${slugify(tag)}`,
        '@type': 'Thing',
        'name': tag
      };
    }),
    'author': author(),
    'dateModified': post.updated || post.date,
    'datePublished': post.date,
    'description': post.summary,
    'genre': post.category,
    'headline': post.title,
    'image': {
      '@id': ogImage,
      '@type': 'ImageObject',
      'height': '630',
      'url': ogImage,
      'width': '1200'
    },
    'isPartOf': blog(),
    'keywords': post.tags || [],
    'mainEntityOfPage': {
      '@id': postUrl,
      '@type': 'WebPage'
    },
    'thumbnailUrl': `${siteMetadata.siteUrl}/static/images/og-card.jpg`,
    'url': postUrl,
    'wordCount': post.readingTime?.words || 0
  };
}
