/**
 * Structured Data Generators
 *
 * @description Generates JSON-LD structured data for SEO optimization.
 * Creates Schema.org compliant structured data for blog posts and projects
 * to improve search engine understanding and rich snippets display.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import siteMetadata from '../../data/meta/siteMetadata';

/**
 * Structured data generators for different content types
 *
 * @description Functions that generate Schema.org JSON-LD structured data
 * for blog posts and projects. Improves SEO and enables rich snippets.
 */
const structuredData = {

  /**
   * Generates BlogPosting structured data for blog posts
   *
   * @description Creates Schema.org BlogPosting JSON-LD with post metadata
   * including author, dates, description, title, and social image.
   *
   * @param {Object} doc - Blog post document
   * @returns {Object} BlogPosting structured data object
   */
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

  /**
   * Generates BlogPosting structured data for project pages
   *
   * @description Creates Schema.org BlogPosting JSON-LD for project content
   * with similar structure to blog posts but tailored for project showcase.
   *
   * @param {Object} doc - Project document
   * @returns {Object} BlogPosting structured data object
   */
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
