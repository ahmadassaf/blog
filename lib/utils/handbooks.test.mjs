import assert from 'node:assert/strict';
import test from 'node:test';

import { extractHandbookChanges, getHandbook, groupHandbooks, handbookRowsForTag } from './handbooks.js';

const posts = [
  { 'series': { 'order': 2, 'title': 'Guide' }, 'slug': 'two' },
  { 'slug': 'plain' },
  { 'handbook': true, 'series': { 'order': 0, 'title': 'Guide' }, 'slug': 'index' },
  { 'series': { 'order': 1, 'title': 'Guide' }, 'slug': 'one' },
  { 'series': { 'order': 1, 'title': 'Ordinary series' }, 'slug': 'series-part' }
];

test('groupHandbooks folds chapters into the handbook index in series order', () => {
  const rows = groupHandbooks(posts);

  assert.deepEqual(rows.map((post) => post.slug), [ 'plain', 'index', 'series-part' ]);
  assert.deepEqual(rows[1].chapters.map((post) => post.slug), [ 'one', 'two' ]);
  assert.equal(rows[0].chapters, undefined);
});

test('groupHandbooks leaves chapters alone when their index is not in the list', () => {
  const withoutIndex = posts.filter((post) => !post.handbook);

  assert.equal(groupHandbooks(withoutIndex), withoutIndex);
});

test('handbookRowsForTag keeps a handbook when only a chapter carries the tag', () => {
  const tagged = posts.map((post) => {
    return { ...post, 'tags': post.slug === 'two' ? [ 'Hiring' ] : [] };
  });
  const rows = handbookRowsForTag(tagged, (post) => post.tags.includes('Hiring'));

  assert.deepEqual(rows.map((post) => post.slug), [ 'index' ]);
  assert.deepEqual(rows[0].chapters.map((post) => post.slug), [ 'one', 'two' ]);
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

test('getHandbook combines only published members, preserves chapter order and sorts actual updates', () => {
  const collection = [
    { 'date': '2026-01-01', 'draft': true, 'handbook': true, 'series': { 'order': 0, 'title': 'Unpublished guide' }, 'slug': 'unpublished-index' },
    { ...posts[0], 'body': { 'raw': 'Heavy content' }, 'changes': [{ 'date': '2026-11-11', 'summary': 'Second chapter first version.' }], 'date': '2026-11-11', 'title': 'Second chapter' },
    { ...posts[2], 'changes': [{ 'date': '2026-11-11', 'summary': 'First version of the handbook.' }], 'date': '2026-11-11', 'title': 'Handbook' },
    { ...posts[3], 'changes': [{ 'date': '2026-11-11', 'summary': 'First chapter first version.' }, { 'date': '2026-11-15', 'summary': 'Revised ownership.' }], 'date': '2026-11-11', 'title': 'First chapter', 'updated': '2026-11-12' },
    { 'changes': [{ 'date': '2026-12-01', 'summary': 'Not published.' }], 'draft': true, 'series': { 'order': 3, 'title': 'Guide' }, 'slug': 'draft' },
    { 'changes': [{ 'date': '2026-12-02', 'summary': 'Unrelated update.' }], 'date': '2026-12-02', 'slug': 'unrelated' }
  ];
  const original = JSON.stringify(collection);
  const handbook = getHandbook(collection);

  assert.equal(handbook.index.slug, 'index');
  assert.equal(handbook.href, '/blog/handbook');
  assert.equal(handbook.updatesHref, '/blog/handbook/updates');
  assert.equal(handbook.updated, '2026-11-15');
  assert.equal(handbook.index.updated, '2026-11-11');
  assert.equal(handbook.chapters[0].updated, '2026-11-15');
  assert.deepEqual(handbook.chapters.map((chapter) => chapter.slug), [ 'one', 'two' ]);
  assert.deepEqual(handbook.updates.map((update) => [ update.date, update.slug, update.order ]), [
    [ '2026-11-15', 'one', 1 ],
    [ '2026-11-11', 'index', 0 ],
    [ '2026-11-11', 'one', 1 ],
    [ '2026-11-11', 'two', 2 ]
  ]);
  assert.equal(handbook.updates[0].summary, 'Revised ownership.');
  assert.equal(handbook.updates[0].title, 'First chapter');
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
