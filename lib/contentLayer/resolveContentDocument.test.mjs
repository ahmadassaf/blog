import assert from 'node:assert/strict';
import test from 'node:test';

import { resolveContentDocument } from './resolveContentDocument.js';

const documents = [
  { 'body': {}, 'date': '2024-04-01', 'series': { 'order': 0, 'title': 'Series' }, 'slug': 'first', 'title': 'First' },
  { 'body': {}, 'date': '2024-02-01', 'series': { 'order': 1, 'title': 'Series' }, 'slug': 'second', 'title': 'Second' },
  { 'body': {}, 'date': '2024-03-01', 'slug': 'unrelated', 'title': 'Unrelated' },
  { 'body': {}, 'date': '2024-01-01', 'series': { 'order': 2, 'title': 'Series' }, 'slug': 'third', 'title': 'Third' },
  { 'body': {}, 'date': '2024-05-01', 'draft': true, 'series': { 'order': 3, 'title': 'Series' }, 'slug': 'draft', 'title': 'Draft' }
];

test('resolveContentDocument resolves navigation and ordered series without mutation', () => {
  const resolved = resolveContentDocument(documents, (document) => document.slug === 'second');

  assert.equal(resolved.next.slug, 'third');
  assert.equal(resolved.prev.slug, 'first');
  assert.deepEqual(resolved.content.seriesPosts, [
    { 'order': 1, 'series': 'Series', 'slug': 'first', 'title': 'First' },
    { 'order': 2, 'series': 'Series', 'slug': 'second', 'title': 'Second' },
    { 'order': 3, 'series': 'Series', 'slug': 'third', 'title': 'Third' }
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
  assert.equal(resolved.next.slug, 'projects/third');
  assert.equal(resolved.prev.slug, 'projects/first');
  assert.equal(resolved.content.seriesPosts[0].slug, 'projects/first');
});

test('resolveContentDocument keeps series boundaries and excludes drafts', () => {
  const first = resolveContentDocument(documents, (document) => document.slug === 'first');
  const last = resolveContentDocument(documents, (document) => document.slug === 'third');

  assert.equal(first.prev, null);
  assert.equal(first.next.slug, 'second');
  assert.equal(last.prev.slug, 'second');
  assert.equal(last.next, null);
  assert.equal(resolveContentDocument(documents, (document) => document.slug === 'draft'), null);
});

test('resolveContentDocument retains chronological navigation outside a series', () => {
  const resolved = resolveContentDocument(documents, (document) => document.slug === 'unrelated');

  assert.equal(resolved.prev.slug, 'second');
  assert.equal(resolved.next.slug, 'first');
  assert.equal(resolved.content.seriesPosts, undefined);
});
