import readingTime from 'reading-time';

import { extractTocHeadings } from '../mdx/index.js';

const computedFields = {
  'externalLink': {
    'resolve': (doc) => `${doc._raw.flattenedPath.replace(/^.+?(?<slug>\/)/, '')}`,
    'type': 'string'
  },
  'readingTime': { 'resolve': (doc) => readingTime(doc.body.raw), 'type': 'json' },
  'slug': {
    'resolve': (doc) => `category/${doc._raw.flattenedPath.replace(/^.+?(?<slug>\/)/, '')}`,
    'type': 'string'
  },
  'toc': { 'resolve': (doc) => extractTocHeadings(doc.body.raw), 'type': 'string' }
};

export default computedFields;
