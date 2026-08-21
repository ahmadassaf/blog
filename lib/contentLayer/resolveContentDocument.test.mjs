import assert from 'node:assert/strict';
import test from 'node:test';

import { resolveContentDocument } from './resolveContentDocument.js';

const documents = [
  { 'body': {}, 'date': '2024-01-01', 'series': { 'order': 0, 'title': 'Series' }, 'slug': 'first', 'title': 'First' },
  { 'body': {}, 'date': '2024-02-01', 'series': { 'order': 1, 'title': 'Series' }, 'slug': 'second', 'title': 'Second' },
  { 'body': {}, 'date': '2024-03-01', 'slug': 'latest', 'title': 'Latest' }
];

test('resolveContentDocument resolves navigation and ordered series without mutation', () => {
  const resolved = resolveContentDocument(documents, (document) => document.slug === 'second');

  assert.equal(resolved.next.slug, 'latest');
  assert.equal(resolved.prev.slug, 'first');
  assert.deepEqual(resolved.content.seriesPosts, [
    { 'order': 1, 'series': 'Series', 'slug': 'first', 'title': 'First' },
    { 'order': 2, 'series': 'Series', 'slug': 'second', 'title': 'Second' }
  ]);
  assert.equal(documents[1].seriesPosts, undefined);
});

test('resolveContentDocument applies consumer route slugs consistently', () => {
  const projects = documents.map((document) => {
    return { ...document, 'externalLink': `projects/${document.slug}` };
  });
  const resolved = resolveContentDocument(
    projects, (document) => document.externalLink === 'projects/second', (document) => document.externalLink
  );

  assert.equal(resolved.content.slug, 'projects/second');
  assert.equal(resolved.next.slug, 'projects/latest');
  assert.equal(resolved.content.seriesPosts[0].slug, 'projects/first');
});
