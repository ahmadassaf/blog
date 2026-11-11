import assert from 'node:assert/strict';
import test from 'node:test';

import { groupPostSeries } from './postSeries.js';

const post = (slug, order, collapseInLists, title = 'A series') => {
  return { 'series': { collapseInLists, order, title }, slug, 'type': 'Post' };
};

test('series stay independent unless their lead explicitly opts in', () => {
  const posts = [ post('second', 1), { 'slug': 'standalone', 'type': 'Post' }, post('first', 0) ];
  const rows = groupPostSeries(posts);

  assert.deepEqual(rows, posts);
  assert.ok(rows.every((row, index) => row === posts[index]));
  assert.deepEqual(groupPostSeries(), []);
});

test('an explicit false on the lead overrides a later part opting in', () => {
  const posts = [ post('second', 1, true), post('first', 0, false) ];

  assert.deepEqual(groupPostSeries(posts), posts);
});

test('an opt-in on a nonlead part cannot collapse its series', () => {
  const posts = [ post('second', 1, true), post('first', 0) ];

  assert.deepEqual(groupPostSeries(posts), posts);
});

test('the lowest-order lead groups all remaining parts in order without mutating input', () => {
  const posts = [ post('third', 2), { 'slug': 'standalone', 'type': 'Post' }, post('first', 0, true), post('second', 1) ];
  const original = JSON.stringify(posts);
  const rows = groupPostSeries(posts);

  assert.deepEqual(rows.map((row) => row.slug), [ 'standalone', 'first' ]);
  assert.deepEqual(rows[1].seriesPosts.map((part) => part.slug), [ 'second', 'third' ]);
  assert.equal(rows[0], posts[1]);
  assert.equal(JSON.stringify(posts), original);
});

test('matching a child retains the whole opted-in series before filtering', () => {
  const posts = [ post('third', 2), post('first', 0, true), post('second', 1), post('unrelated', 0, true, 'Another series') ];
  const rows = groupPostSeries(posts, (entry) => entry.slug === 'second');

  assert.deepEqual(rows.map((row) => row.slug), [ 'first' ]);
  assert.deepEqual(rows[0].seriesPosts.map((part) => part.slug), [ 'second', 'third' ]);
  assert.deepEqual(groupPostSeries(posts, () => false), []);
});

test('uncollapsed series filter each post independently', () => {
  const posts = [ post('first', 0), post('second', 1), post('third', 2) ];

  assert.deepEqual(groupPostSeries(posts, (entry) => entry.slug === 'second'), [ posts[1] ]);
});

test('a one-post series has no disclosure and does not affect other series', () => {
  const posts = [ post('solo', 0, true, 'Solo'), post('other-second', 1), post('other-first', 0) ];

  assert.deepEqual(groupPostSeries(posts), posts);
  assert.ok(groupPostSeries(posts).every((row) => row.seriesPosts === undefined));
});

test('equal series orders choose the same lead regardless of input order', () => {
  const first = post('a-first', 0, true);
  const second = post('b-second', 0, false);
  const third = post('c-third', 1);

  for (const posts of [[ third, second, first ], [ first, third, second ]]) {
    const rows = groupPostSeries(posts);

    assert.equal(rows[0].slug, 'a-first');
    assert.deepEqual(rows[0].seriesPosts.map((part) => part.slug), [ 'b-second', 'c-third' ]);
  }
});
