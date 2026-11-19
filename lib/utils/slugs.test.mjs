import assert from 'node:assert/strict';
import test from 'node:test';

import { categoryLabel, categoryTitleFromSlug, safeDecodeURI, slugify, titleFromSlug } from './slugs.mjs';

test('slugify normalizes surrounding and repeated whitespace', () => {
  assert.equal(slugify('  Semantic   Web  '), 'semantic-web');
});

test('safeDecodeURI rejects malformed escape sequences', () => {
  assert.equal(safeDecodeURI('%E0%A4%A'), null);
});

test('titleFromSlug restores a readable taxonomy title', () => {
  assert.equal(titleFromSlug('semantic-web'), 'Semantic Web');
});

test('the AI & Data category keeps its route and leaves the Data tag independent', () => {
  assert.equal(categoryLabel('data'), 'AI & Data');
  assert.equal(categoryTitleFromSlug('data'), 'AI & Data');
  assert.equal(slugify('data'), 'data');
  assert.equal(titleFromSlug('data'), 'Data');
  assert.equal(categoryTitleFromSlug('web-development'), 'Web Development');
  assert.equal(categoryLabel('engineering'), 'engineering');
});
