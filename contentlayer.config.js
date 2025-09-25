import { defineDocumentType, makeSource } from 'contentlayer2/source-files';

// Import path from 'path';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeGroup from 'rehype-code-group-next';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import emoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';
import { remarkAlert } from 'remark-github-blockquote-alert';
import remarkMath from 'remark-math';

import computedFields  from './lib/contentLayer/computedFields';
import contentFields from './lib/contentLayer/contentFields';
import projectFields  from './lib/contentLayer/projectFields';
import structuredData from './lib/contentLayer/structuredData';
import { remarkCodeTitles, remarkExtractFrontmatter, remarkImgToJsx, remarkLinks } from './lib/mdx/index.js';
import remarkFootnoteData from './lib/mdx/remark-footnote-data.js';

// Import rehypeSimpleCitations from './lib/rehype-simple-citations.js';
import rehypeFootnotePopoverV2 from './lib/rehype-footnote-popover-v2.js';
import rehypeInternalLinks from './lib/rehype-internal-links.js';

// Const root = process.cwd();

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
      rehypeCodeGroup,

      // [ rehypeSimpleCitations, { 'citationsPaths': [path.join(root, 'data', 'meta', 'bibliography', 'references.bib'), path.join(root, 'data', 'meta', 'bibliography', 'kg.bib')], 'showBibliography': true }],
      rehypeFootnotePopoverV2,
      rehypeInternalLinks,
      [ rehypePrettyCode, { 'theme': 'aurora-x' }]

    ],
    'remarkPlugins': [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkFootnoteData,
      emoji,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
      remarkLinks,
      remarkAlert
    ]
  }
});
