import assert from 'node:assert/strict';
import test from 'node:test';

import { getArchiveYears } from './archiveYears.js';
import { getBlogListing } from './blogListing.js';

const today = new Date('2026-11-18T12:00:00Z');
const post = (slug, date, extra = {}) => {
  return { 'category': 'data', date, slug, 'title': slug, 'type': 'Post', ...extra };
};

test('archives keep publication order and show distinct revisions in their actual year', () => {
  const old = post('old', '2019-01-01', { 'updatedAt': '2026-11-18' });
  const revised = post('revised', '2018-01-01', { 'updatedAt': '2021-09-22' });
  const newest = post('newest', '2025-11-18', { 'updatedAt': '2026-02-01' });
  const sameDay = post('same-day', '2025-05-06T01:00:00Z', { 'updatedAt': '2025-05-06T15:00:00Z' });
  const unpublished = post('draft', '2026-01-01', { 'draft': true, 'updatedAt': '2026-11-18' });
  const { posts } = getBlogListing([ old, newest, revised, sameDay, unpublished ]);
  const groups = getArchiveYears(posts, undefined, today);

  assert.deepEqual(groups.map(({ label }) => label), [ '2026', '2025', 'Long time ago' ]);
  assert.deepEqual(groups.map((group) => group.posts.map((p) => p.slug)), [[], [ 'newest', 'same-day' ], [ 'old', 'revised' ]]);
  assert.deepEqual(groups[0].updates[0].articles.map((p) => p.slug), [ 'old', 'newest' ]);
  assert.deepEqual(groups[1].updates, []);
  assert.equal(groups[2].updates[0].year, '2021');
  assert.deepEqual(groups[2].updates[0].articles.map((p) => p.slug), [ 'revised' ]);
});

test('only explicitly dated archive revisions participate, regardless of legacy freshness or change notes', () => {
  const legacy = post('legacy', '2023-03-01', { 'updated': '2026-11-18' });
  const described = post('described', '2023-03-01', { 'changes': [{ 'date': '2026-11-18', 'summary': 'Recent edits.' }], 'updateSummary': 'Updated example.' });
  const earlier = post('earlier', '2023-03-01', { 'updated': '2026-11-18', 'updatedAt': '2025-02-01' });
  const later = post('later', '2023-04-01', { 'updated': '2024-01-01', 'updatedAt': '2025-03-01' });
  const [ revisedYear, publicationGroup ] = getArchiveYears([ legacy, described, earlier, later ], undefined, today);

  assert.equal(revisedYear.label, '2025');
  assert.deepEqual(revisedYear.updates[0].articles, [ later, earlier ]);
  assert.equal(publicationGroup.posts.length, 4);
  assert.deepEqual(publicationGroup.updates, []);
});

test('keep the rolling two-year boundary in UTC for publication and update dates', () => {
  const onBoundary = post('on-boundary', '2024-11-18T00:00:00Z');
  const beforeBoundary = post('before-boundary', '2024-11-17T00:00:00Z', { 'updatedAt': '2024-11-18T00:00:00Z' });
  const [ year, older ] = getArchiveYears([ beforeBoundary, onBoundary ], undefined, today);

  assert.deepEqual(year.posts, [ onBoundary ]);
  assert.deepEqual(year.updates[0].articles, [ beforeBoundary ]);
  assert.deepEqual(older.posts, [ beforeBoundary ]);
});

test('category revisions include matching series members without leaking other categories or handbook chapters', () => {
  const series = { 'collapseInLists': true, 'order': 0, 'title': 'Series' };
  const lead = post('lead', '2020-02-01', { 'category': 'engineering', series, 'updatedAt': '2026-11-18' });
  const member = post('member', '2020-03-02', { 'series': { ...series, 'order': 1 }, 'updatedAt': '2026-11-17' });
  const chapter = post('chapter', '2020-08-26', { 'type': 'HandbookChapter', 'updatedAt': '2026-11-18' });
  const listing = getBlogListing([ lead, member, chapter ], (p) => p.category === 'data');
  const [ current, older ] = getArchiveYears(listing.posts, { 'categorySlug': 'data' }, today);

  assert.deepEqual(current.updates[0].articles.map((p) => p.slug), [ 'member' ]);
  assert.deepEqual(older.posts.map((p) => p.slug), [ 'chapter', 'lead' ]);
});

test('tag revisions match individual series members while keeping the series publication row intact', () => {
  const series = { 'collapseInLists': true, 'order': 0, 'title': 'Series' };
  const lead = post('lead', '2020-02-01', { series, 'tags': [ 'Engineering' ], 'updatedAt': '2026-11-18' });
  const member = post('member', '2020-03-02', { 'series': { ...series, 'order': 1 }, 'tags': [ 'Semantic Web' ], 'updatedAt': '2026-11-17' });
  const listing = getBlogListing([ lead, member ], (p) => p.tags.includes('Semantic Web'));
  const [ current, older ] = getArchiveYears(listing.posts, { 'tagSlug': 'semantic-web' }, today);

  assert.deepEqual(current.updates[0].articles.map((p) => p.slug), [ 'member' ]);
  assert.deepEqual(older.posts.map((p) => p.slug), [ 'lead' ]);
  assert.deepEqual(older.posts[0].seriesPosts.map((p) => p.slug), [ 'member' ]);
});
