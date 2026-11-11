import assert from 'node:assert/strict';
import test from 'node:test';

import { groupHandbooks, handbookRowsForTag } from './handbooks.js';

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
