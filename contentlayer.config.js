import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import path from 'path';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCitation from 'rehype-citation';
import rehypeKatex from 'rehype-katex';
import rehypePresetMinify from 'rehype-preset-minify';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import computedFields  from './lib/contentLayer/computedFields';
import contentFields from './lib/contentLayer/contentFields';
import projectFields  from './lib/contentLayer/projectFields';
import structuredData from './lib/contentLayer/structuredData';
import { remarkCodeTitles,
  remarkExtractFrontmatter,
  remarkImgToJsx } from './lib/mdx/index.js';

const root = process.cwd();

export const Project = defineDocumentType(() => {
  return {
    'computedFields': {
      ...computedFields,
      ...projectFields,
      'structuredData': {
        'resolve': structuredData.post,
        'type': 'json'
      }
    },
    'contentType': 'mdx',
    'fields': contentFields.project,
    'filePathPattern': 'blog/**/*.mdx',
    'name': 'Project'
  };
});

export const Post = defineDocumentType(() => {
  return {
    'computedFields': {
      ...computedFields,
      'structuredData': {
        'resolve': structuredData.post,
        'type': 'json'
      }
    },
    'contentType': 'mdx',
    'fields': contentFields.post,
    'filePathPattern': 'blog/**/*.mdx',
    'name': 'Post'
  };
});

export const Author = defineDocumentType(() => {
  return {
    'contentType': 'mdx',
    'fields': contentFields.author,
    'filePathPattern': 'authors/**/*.mdx',
    'name': 'Author'
  };
});

export default makeSource({
  'contentDirPath': 'data',
  'documentTypes': [ Author, Project, Post ],
  'mdx': {
    'cwd': process.cwd(),
    'rehypePlugins': [
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeKatex,
      [ rehypeCitation, { 'csl': 'https://raw.githubusercontent.com/citation-style-language/styles/master/acm-sig-proceedings.csl', 'linkCitations': true, 'path': path.join(root, 'data') }],
      [ rehypePrismPlus, { 'defaultLanguage': 'js', 'ignoreMissing': true }],
      rehypePresetMinify
    ],
    'remarkPlugins': [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx
    ]
  }
});
