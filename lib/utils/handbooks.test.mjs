import assert from 'node:assert/strict';
import test from 'node:test';

import { extractHandbookChanges, getHandbook } from './handbooks.js';

const posts = [
  { 'series': { 'order': 2, 'title': 'Guide' }, 'slug': 'two', 'type': 'HandbookChapter' },
  { 'slug': 'plain', 'type': 'Post' },
  { 'handbook': true, 'series': { 'order': 0, 'title': 'Guide' }, 'slug': 'index', 'type': 'Post' },
  { 'series': { 'order': 1, 'title': 'Guide' }, 'slug': 'one', 'type': 'HandbookChapter' },
  { 'series': { 'order': 1, 'title': 'Ordinary series' }, 'slug': 'series-part', 'type': 'Post' }
];

test('handbook membership follows the document type, not a matching series name', () => {
  const collection = [
    ...posts,
    { 'series': { 'order': 3, 'title': 'Guide' }, 'slug': 'related-post', 'type': 'Post' },
    { 'series': { 'order': 1, 'title': 'Other guide' }, 'slug': 'orphan-chapter', 'type': 'HandbookChapter' }
  ];

  assert.deepEqual(getHandbook(collection).chapters.map((chapter) => chapter.slug), [ 'one', 'two' ]);
});

test('extractHandbookChanges reads only the authored changelog section, not examples or adjacent sections', () => {
  const markdown = [
    '# Chapter',
    '- 1 January 2026: this is not a changelog.',
    '```md',
    '## Changelog',
    '- 2 January 2026: a code example.',
    '```',
    '> ## Changelog',
    '> - 3 January 2026: a quotation.',
    '## Changelog',
    '- 11 November 2026: first version, with eight chapters.',
    '- 2026-11-12: Updated the **release policy** and [checklist](/checklist).',
    '### Later updates',
    '- 13 November 2026: Kept the author’s words — exactly.',
    '## Related reading',
    '- 14 November 2026: belongs to another section.'
  ].join('\n');

  assert.deepEqual(extractHandbookChanges(markdown), [
    { 'date': '2026-11-11', 'summary': 'first version, with eight chapters.' },
    { 'date': '2026-11-12', 'summary': 'Updated the release policy and checklist.' },
    { 'date': '2026-11-13', 'summary': 'Kept the author’s words — exactly.' }
  ]);
});

test('extractHandbookChanges validates calendar dates and ignores empty or undated entries', () => {
  const markdown = [
    '## Changelog',
    '- 31 February 2026: invalid day.',
    '- 29 February 2025: not a leap year.',
    '- 2026-13-11: invalid month.',
    '- 11 Notamonth 2026: invalid month name.',
    '- 11 November 2026: ',
    '- A note without a date.',
    '- 29 February 2024: a real leap day.'
  ].join('\n');

  assert.deepEqual(extractHandbookChanges(markdown), [{ 'date': '2024-02-29', 'summary': 'a real leap day.' }]);
  assert.deepEqual(extractHandbookChanges('## Introduction\nNo changelog yet.'), []);
  assert.deepEqual(extractHandbookChanges(), []);
});

test('getHandbook keeps chapter edits out of the curated milestone feed while preserving freshness', () => {
  const collection = [
    { 'date': '2026-01-01', 'draft': true, 'handbook': true, 'series': { 'order': 0, 'title': 'Unpublished guide' }, 'slug': 'unpublished-index', 'type': 'Post' },
    { ...posts[0], 'body': { 'raw': 'Heavy content' }, 'changes': [{ 'date': '2026-11-11', 'summary': 'Second chapter first version.' }], 'date': '2026-11-11', 'title': 'Second chapter' },
    { ...posts[2], 'changes': [
      { 'date': '2026-11-11', 'summary': 'First version of the handbook.' },
      { 'date': '2026-11-14', 'summary': 'Added an incident response chapter.' },
      { 'date': '2026-11-14', 'summary': 'Introduced a new onboarding methodology.' },
      { 'date': '2026-13-01', 'summary': 'Invalid date.' },
      { 'date': '2026-11-13', 'summary': ' ' }
    ], 'date': '2026-11-11', 'title': 'Handbook' },
    { ...posts[3], 'changes': [{ 'date': '2026-11-11', 'summary': 'First chapter first version.' }, { 'date': '2026-11-15', 'summary': 'Revised ownership.' }], 'date': '2026-11-11', 'title': 'First chapter', 'updated': '2026-11-12' },
    { 'changes': [{ 'date': '2026-12-01', 'summary': 'Not published.' }], 'draft': true, 'series': { 'order': 3, 'title': 'Guide' }, 'slug': 'draft', 'type': 'HandbookChapter' },
    { 'changes': [{ 'date': '2026-12-02', 'summary': 'Unrelated update.' }], 'date': '2026-12-02', 'slug': 'unrelated', 'type': 'Post' }
  ];
  const original = JSON.stringify(collection);
  const handbook = getHandbook(collection);

  assert.equal(handbook.index.slug, 'index');
  assert.equal(handbook.href, '/blog/handbook');
  assert.equal(handbook.updatesHref, '/blog/handbook/updates');
  assert.equal(handbook.updated, '2026-11-15');
  assert.equal(handbook.index.updated, '2026-11-14');
  assert.equal(handbook.chapters[0].updated, '2026-11-15');
  assert.deepEqual(handbook.chapters.map((chapter) => chapter.slug), [ 'one', 'two' ]);
  assert.deepEqual(handbook.updates.map((update) => [ update.date, update.slug, update.order ]), [
    [ '2026-11-14', 'index', 0 ],
    [ '2026-11-14', 'index', 0 ],
    [ '2026-11-11', 'index', 0 ]
  ]);
  assert.deepEqual(handbook.updates.map((update) => update.summary), [
    'Added an incident response chapter.',
    'Introduced a new onboarding methodology.',
    'First version of the handbook.'
  ]);
  assert.equal(handbook.updates[0].title, 'Handbook');
  assert.equal(handbook.chapters[1].body, undefined);
  assert.equal(JSON.stringify(collection), original);
});

test('getHandbook reports real metadata updates without inventing changelog entries', () => {
  const handbook = getHandbook([
    { ...posts[2], 'date': '2026-11-11T00:00:00.000Z', 'title': 'Guide' },
    { ...posts[3], 'date': '2026-11-11', 'updated': '2026-11-13T00:00:00.000Z' }
  ]);

  assert.equal(handbook.updated, '2026-11-13');
  assert.deepEqual(handbook.updates, []);
  assert.equal(getHandbook([{ ...posts[2], 'draft': true }]), null);
  assert.equal(getHandbook(), null);
});

test('getHandbook normalizes each member to its latest valid date without changing the source', () => {
  const collection = [
    { ...posts[2], 'changes': [{ 'date': '2026-11-14', 'summary': 'Clarified the handbook scope.' }], 'date': '2026-11-11', 'updated': '2026-11-12' },
    { ...posts[3], 'changes': [{ 'date': '2026-11-13', 'summary': 'An earlier change.' }, { 'date': '2026-13-01', 'summary': 'Invalid date.' }], 'date': '2026-11-15', 'updated': '2026-11-14' },
    { ...posts[0], 'changes': [{ 'date': '2026-11-16', 'summary': 'Updated this chapter.' }], 'date': '2026-11-11', 'updated': '2026-11-17T00:00:00.000Z' }
  ];
  const handbook = getHandbook(collection);

  assert.equal(handbook.index.updated, '2026-11-14');
  assert.deepEqual(handbook.chapters.map((chapter) => chapter.updated), [ '2026-11-15', '2026-11-17' ]);
  assert.equal(handbook.updated, '2026-11-17');
  assert.equal(collection[0].updated, '2026-11-12');
  assert.equal(collection[1].updated, '2026-11-14');
  assert.equal(collection[2].updated, '2026-11-17T00:00:00.000Z');
});
