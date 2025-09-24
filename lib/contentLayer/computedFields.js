/**
 * ContentLayer Computed Fields
 *
 * @description Defines computed fields that are automatically generated for content documents.
 * These fields are derived from the raw content and provide additional metadata like
 * reading time, table of contents, slugs, and external links.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import readingTime from 'reading-time';

import { extractTocHeadings } from '../mdx/index.js';

/**
 * Computed field definitions for ContentLayer
 *
 * @description Object containing field definitions that are automatically computed
 * during content processing. Each field has a resolve function and type specification.
 */
const computedFields = {

  /**
   * External link path for GitHub source viewing
   * Extracts the relative path for linking to source files
   */
  'externalLink': {
    'resolve': (doc) => `${doc._raw.flattenedPath.replace(/^.+?(?<slug>\/)/, '')}`,
    'type': 'string'
  },

  /**
   * Reading time estimation based on content length
   * Uses the reading-time library to calculate estimated reading duration
   */
  'readingTime': {
    'resolve': (doc) => readingTime(doc.body.raw),
    'type': 'json'
  },

  /**
   * URL slug with category prefix
   * Generates SEO-friendly URLs with category structure
   */
  'slug': {
    'resolve': (doc) => `category/${doc._raw.flattenedPath.replace(/^.+?(?<slug>\/)/, '')}`,
    'type': 'string'
  },

  /**
   * Table of contents extracted from markdown headings
   * Generates hierarchical TOC structure for navigation
   */
  'toc': {
    'resolve': (doc) => extractTocHeadings(doc.body.raw),
    'type': 'string'
  }
};

export default computedFields;
