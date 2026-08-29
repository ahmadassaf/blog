/**
 * ContentLayer Field Definitions
 *
 * @description Defines the field schemas and validation rules for different content types in the blog.
 * Used by ContentLayer to validate and process MDX files for posts, projects, and author pages.
 * Ensures consistent data structure across all content types.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { defineNestedType } from 'contentlayer2/source-files';

/**
 * Series nested type definition for blog posts
 *
 * @description Defines the structure for blog post series information,
 * allowing posts to be grouped into ordered series with titles.
 */
export const Series = defineNestedType(() => {
  return {
    'fields': {
      'order': {
        'required': true,
        'type': 'number'
      },
      'title': {
        'required': true,
        'type': 'string'
      }
    },
    'name': 'Series'
  };
});

/**
 * Content field definitions for different content types
 *
 * @description Comprehensive field schemas for blog posts, projects, and author pages.
 * Defines required fields, optional fields, data types, and default values for each content type.
 */
const contentFields = {
  'author': {
    'avatar': { 'type': 'string' },
    'company': { 'type': 'string' },
    'email': { 'type': 'string' },
    'github': { 'type': 'string' },
    'layout': { 'type': 'string' },
    'linkedin': { 'type': 'string' },
    'name': { 'required': true, 'type': 'string' },
    'occupation': { 'type': 'string' },
    'twitter': { 'type': 'string' }
  },
  'post': {
    'bibliography': { 'default': [], 'of': { 'type': 'string' }, 'type': 'list' },
    'category': { 'required': true, 'type': 'string' },
    'date': { 'required': true, 'type': 'date' },
    'draft': { 'type': 'boolean' },
    'featured': { 'type': 'boolean' },
    'layout': { 'type': 'string' },
    'series': { 'of': Series, 'type': 'nested' },
    'subtitle': { 'required': false, 'type': 'string' },
    'summary': { 'type': 'string' },
    'tableOfContents': { 'type': 'boolean' },
    'tags': { 'default': [], 'of': { 'type': 'string' }, 'type': 'list' },
    'title': { 'required': true, 'type': 'string' },
    'updated': { 'required': false, 'type': 'date' }
  },
  'project': {
    'category': { 'required': true, 'type': 'string' },
    'date': { 'required': true, 'type': 'date' },
    'draft': { 'type': 'boolean' },
    'featured': { 'type': 'boolean' },
    'github': { 'required': true, 'type': 'string' },
    'layout': { 'required': true, 'type': 'string' },
    'subtitle': { 'required': false, 'type': 'string' },
    'summary': { 'type': 'string' },
    'tableOfContents': { 'type': 'boolean' },
    'tags': { 'default': [], 'of': { 'type': 'string' }, 'type': 'list' },
    'title': { 'required': true, 'type': 'string' }
  }
};

export default contentFields;
