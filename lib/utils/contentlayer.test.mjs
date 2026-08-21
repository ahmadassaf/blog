import assert from 'node:assert/strict';
import test from 'node:test';

import { paginate, paginationPageNumbers, published } from './contentlayer.js';

test('published removes draft documents', () => {
  assert.deepEqual(
    published([{ 'draft': true, 'slug': 'draft' }, { 'slug': 'live' }]), [{ 'slug': 'live' }]
  );
});

test('paginationPageNumbers excludes the base page', () => {
  assert.deepEqual(paginationPageNumbers(0, 7), []);
  assert.deepEqual(paginationPageNumbers(7, 7), []);
  assert.deepEqual(paginationPageNumbers(8, 7), [ 2 ]);
  assert.deepEqual(paginationPageNumbers(22, 7), [ 2, 3, 4 ]);
});

test('paginate rejects invalid and out-of-range pages', () => {
  const posts = Array.from({ 'length': 8 }, (_, index) => index + 1);

  assert.equal(paginate(posts, '0', 7), null);
  assert.equal(paginate(posts, '1.5', 7), null);
  assert.equal(paginate(posts, '3', 7), null);
  assert.deepEqual(paginate(posts, '2', 7), {
    'currentPage': 2,
    'pagePosts': [ 8 ],
    'totalPages': 2
  });
});
