import assert from 'node:assert/strict';
import test from 'node:test';

import { findPublishedDocument } from './findPublishedDocument.js';

const article = { 'slug': 'category/engineering/unified', 'title': 'Unified' };
const project = { 'externalLink': 'projects/ditto', 'slug': 'category/projects/ditto', 'type': 'Project' };
const draft = { 'draft': true, 'slug': 'category/engineering/draft' };
const documents = [ article, project, draft ];

test('published lookup accepts canonical and legacy article paths and content slugs', () => {
  for (const path of [
    'category/engineering/unified',
    'engineering/unified',
    '/blog/category/engineering/unified',
    '/blog/engineering/unified',
    '/blog/category/engineering/unified/?view=full#example'
  ]) assert.equal(findPublishedDocument(documents, path), article);
});

test('published lookup resolves project routes and Unicode slugs', () => {
  assert.equal(findPublishedDocument(documents, '/blog/projects/ditto'), project);
  assert.equal(findPublishedDocument(documents, 'projects/ditto'), project);
  assert.equal(findPublishedDocument(documents, project.slug), project);

  const unicode = { 'slug': 'category/engineering/übersicht' };

  assert.equal(findPublishedDocument([ unicode ], '/blog/category/engineering/%C3%BCbersicht'), unicode);
});

test('published lookup rejects drafts, missing documents, malformed escapes, and empty input', () => {
  for (const path of [ draft.slug, '/blog/category/engineering/missing', '%E0%A4%A', '', null, undefined ])
    assert.equal(findPublishedDocument(documents, path), null);

});
