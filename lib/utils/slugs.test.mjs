import assert from 'node:assert/strict';
import test from 'node:test';

import { safeDecodeURI, slugify, titleFromSlug } from './slugs.mjs';

test('slugify normalizes surrounding and repeated whitespace', () => {
  assert.equal(slugify('  Semantic   Web  '), 'semantic-web');
});

test('safeDecodeURI rejects malformed escape sequences', () => {
  assert.equal(safeDecodeURI('%E0%A4%A'), null);
});

test('titleFromSlug restores a readable taxonomy title', () => {
  assert.equal(titleFromSlug('semantic-web'), 'Semantic Web');
});
