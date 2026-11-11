import assert from 'node:assert/strict';
import test from 'node:test';

import { resolveContentDocument } from './resolveContentDocument.js';

const documents = [
  { 'body': {}, 'date': '2024-04-01', 'series': { 'order': 0, 'title': 'Series' }, 'slug': 'first', 'title': 'First', 'type': 'Post' },
  { 'body': {}, 'date': '2024-02-01', 'series': { 'order': 1, 'title': 'Series' }, 'slug': 'second', 'title': 'Second', 'type': 'Post' },
  { 'body': {}, 'date': '2024-03-01', 'slug': 'unrelated', 'title': 'Unrelated', 'type': 'Post' },
  { 'body': {}, 'date': '2024-01-01', 'series': { 'order': 2, 'title': 'Series' }, 'slug': 'third', 'title': 'Third', 'type': 'Post' },
  { 'body': {}, 'date': '2024-05-01', 'draft': true, 'series': { 'order': 3, 'title': 'Series' }, 'slug': 'draft', 'title': 'Draft', 'type': 'Post' }
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

test('ordinary post navigation skips chapters interleaved by publication date', () => {
  const collection = [
    ...documents,
    { 'date': '2024-03-20', 'series': { 'order': 1, 'title': 'Guide' }, 'slug': 'newer-chapter', 'type': 'HandbookChapter' },
    { 'date': '2024-02-20', 'series': { 'order': 2, 'title': 'Guide' }, 'slug': 'older-chapter', 'type': 'HandbookChapter' }
  ];
  const resolved = resolveContentDocument(collection, (document) => document.slug === 'unrelated');

  assert.equal(resolved.prev.slug, 'second');
  assert.equal(resolved.next.slug, 'first');
});

test('post series and handbook navigation remain separate when their names match', () => {
  const collection = [
    { 'date': '2024-03-01', 'handbook': true, 'series': { 'order': 0, 'title': 'Guide' }, 'slug': 'index', 'type': 'Post' },
    { 'date': '2024-03-02', 'series': { 'order': 1, 'title': 'Guide' }, 'slug': 'chapter-one', 'type': 'HandbookChapter' },
    { 'date': '2024-03-03', 'series': { 'order': 2, 'title': 'Guide' }, 'slug': 'chapter-two', 'type': 'HandbookChapter' },
    { 'date': '2024-03-04', 'series': { 'order': 0, 'title': 'Guide' }, 'slug': 'post-one', 'type': 'Post' },
    { 'date': '2024-03-05', 'series': { 'order': 1, 'title': 'Guide' }, 'slug': 'post-two', 'type': 'Post' }
  ];
  const post = resolveContentDocument(collection, (document) => document.slug === 'post-one');
  const chapter = resolveContentDocument(collection, (document) => document.slug === 'chapter-one');

  assert.equal(post.prev, null);
  assert.equal(post.next.slug, 'post-two');
  assert.equal(post.content.handbookContext, undefined);
  assert.deepEqual(post.content.seriesPosts.map((part) => part.slug), [ 'post-one', 'post-two' ]);
  assert.equal(chapter.prev.slug, 'index');
  assert.equal(chapter.next.slug, 'chapter-two');
  assert.deepEqual(chapter.content.seriesPosts.map((part) => part.slug), [ 'index', 'chapter-one', 'chapter-two' ]);
  assert.equal(chapter.content.handbookContext.chapterCount, 2);
});

test('resolveContentDocument gives handbook chapters their actual order and compact navigation context', () => {
  const handbookDocuments = documents.map((document) => {
    return {
      ...document,
      'changes': document.slug === 'second' ? [{ 'date': '2024-06-01', 'summary': 'Clarified the practice.' }] : [],
      'handbook': document.slug === 'first',
      'subtitle': `${document.title} subtitle`,
      'type': document.series && document.slug !== 'first' ? 'HandbookChapter' : 'Post'
    };
  });
  const resolved = resolveContentDocument(handbookDocuments, (document) => document.slug === 'second');

  assert.deepEqual(resolved.content.handbookContext, {
    'chapterCount': 2,
    'chapterNumber': 1,
    'chapters': [
      { 'order': 1, 'slug': 'second', 'subtitle': 'Second subtitle', 'title': 'Second', 'updated': '2024-06-01' },
      { 'order': 2, 'slug': 'third', 'subtitle': 'Third subtitle', 'title': 'Third', 'updated': '2024-01-01' }
    ],
    'href': '/blog/handbook',
    'indexSlug': 'first',
    'title': 'First',
    'updated': '2024-06-01',
    'updatesHref': '/blog/handbook/updates'
  });
  assert.deepEqual(resolved.content.seriesPosts.map((part) => part.order), [ 0, 1, 2 ]);
  assert.deepEqual(resolved.content.changes, [{ 'date': '2024-06-01', 'summary': 'Clarified the practice.' }]);
  assert.equal(resolved.content.updated, '2024-06-01');
  assert.equal(resolved.document.updated, '2024-06-01');
  assert.equal(resolved.content.body, undefined);
  assert.equal(resolved.prev.slug, 'first');
  assert.equal(resolved.next.slug, 'third');
  assert.equal(handbookDocuments[1].handbookContext, undefined);
  assert.equal(handbookDocuments[1].updated, undefined);

  const overview = resolveContentDocument(handbookDocuments, (document) => document.slug === 'first');

  assert.equal(overview.content.handbookContext.chapterNumber, null);
  assert.equal(overview.prev, null);
  assert.equal(overview.next.slug, 'second');
});

test('resolveContentDocument does not specialize a series whose handbook index is unpublished', () => {
  const handbookDocuments = documents.map((document) => {
    return { ...document, 'draft': document.slug === 'first' || document.draft, 'handbook': document.slug === 'first', 'type': document.series && document.slug !== 'first' ? 'HandbookChapter' : 'Post' };
  });
  const resolved = resolveContentDocument(handbookDocuments, (document) => document.slug === 'second');

  assert.equal(resolved.content.handbookContext, undefined);
  assert.equal(resolved.prev, null);
  assert.equal(resolved.next.slug, 'third');
  assert.deepEqual(resolved.content.seriesPosts.map((part) => part.order), [ 2, 3 ]);
});

test('resolveContentDocument preserves ordinary post dates even when they have changelogs', () => {
  const ordinaryDocuments = documents.map((document) => {
    return { ...document, 'changes': [{ 'date': '2024-06-01', 'summary': 'A later change.' }], 'updated': '2024-05-01' };
  });
  const seriesPost = resolveContentDocument(ordinaryDocuments, (document) => document.slug === 'second');
  const standalonePost = resolveContentDocument(ordinaryDocuments, (document) => document.slug === 'unrelated');

  assert.equal(seriesPost.content.updated, '2024-05-01');
  assert.equal(seriesPost.document.updated, '2024-05-01');
  assert.equal(standalonePost.content.updated, '2024-05-01');
  assert.equal(standalonePost.document.updated, '2024-05-01');
});
