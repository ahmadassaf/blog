import assert from 'node:assert/strict';
import test from 'node:test';

import { getBlogListing } from './blogListing.js';
import { paginate, paginationPageNumbers } from './contentlayer.js';

const document = (slug, fields = {}) => {
  return { 'category': 'management', 'date': '2026-11-11', slug, 'tags': [], 'title': slug, 'type': 'Post', ...fields };
};

const handbookDocuments = (collapseInLists = true) => [
  document('guide', { 'handbook': true, 'series': { collapseInLists, 'order': 0, 'title': 'Guide' } }),
  document('first-chapter', { 'series': { 'order': 1, 'title': 'Guide' }, 'type': 'HandbookChapter' }),
  document('second-chapter', { 'category': 'engineering', 'series': { 'order': 2, 'title': 'Guide' }, 'tags': [ 'Hiring' ], 'type': 'HandbookChapter' })
];

test('listing excludes drafts from ordinary posts, series and the handbook', () => {
  const { posts } = getBlogListing([
    ...handbookDocuments(),
    document('live', { 'series': { 'order': 1, 'title': 'Ordinary series' } }),
    document('draft-lead', { 'draft': true, 'series': { 'collapseInLists': true, 'order': 0, 'title': 'Ordinary series' } }),
    document('draft-chapter', { 'draft': true, 'series': { 'order': 3, 'title': 'Guide' }, 'type': 'HandbookChapter' }),
    document('draft-guide', { 'draft': true, 'handbook': true, 'series': { 'order': 0, 'title': 'Draft guide' } })
  ]);

  assert.deepEqual(posts.map((post) => post.slug).sort(), [ 'guide', 'live' ]);
  assert.equal(posts.find((post) => post.slug === 'live').seriesPosts, undefined);
  assert.deepEqual(posts.find((post) => post.handbook).seriesPosts.map((chapter) => chapter.slug), [ 'first-chapter', 'second-chapter' ]);
});

test('handbook membership uses document types and leaves same-title ordinary posts in the list', () => {
  const { posts } = getBlogListing([
    ...handbookDocuments(),
    document('related-post', { 'series': { 'order': 3, 'title': 'Guide' } }),
    document('orphan-chapter', { 'series': { 'order': 1, 'title': 'Other guide' }, 'type': 'HandbookChapter' })
  ]);

  assert.deepEqual(posts.map((post) => post.slug).sort(), [ 'guide', 'orphan-chapter', 'related-post' ]);
  assert.deepEqual(posts.find((post) => post.handbook).seriesPosts.map((chapter) => chapter.slug), [ 'first-chapter', 'second-chapter' ]);
  assert.equal(posts.find((post) => post.slug === 'related-post').seriesPosts, undefined);
  assert.equal(posts.find((post) => post.slug === 'orphan-chapter').seriesPosts, undefined);
});

test('additional handbook families retain their own members and filter independently', () => {
  const documents = [
    ...handbookDocuments(),
    document('another-guide', { 'handbook': true, 'series': { 'collapseInLists': true, 'order': 0, 'title': 'Another guide' } }),
    document('another-second', { 'series': { 'order': 2, 'title': 'Another guide' }, 'tags': [ 'Data' ], 'type': 'HandbookChapter' }),
    document('another-first', { 'series': { 'order': 1, 'title': 'Another guide' }, 'type': 'HandbookChapter' })
  ];
  const { posts } = getBlogListing(documents);
  const filtered = getBlogListing(documents, (post) => post.tags.includes('Data')).posts;

  assert.deepEqual(posts.map((post) => post.slug).sort(), [ 'another-guide', 'guide' ]);
  assert.deepEqual(posts.find((post) => post.slug === 'guide').seriesPosts.map((chapter) => chapter.slug), [ 'first-chapter', 'second-chapter' ]);
  assert.deepEqual(posts.find((post) => post.slug === 'another-guide').seriesPosts.map((chapter) => chapter.slug), [ 'another-first', 'another-second' ]);
  assert.deepEqual(filtered.map((post) => post.slug), [ 'another-guide' ]);
  assert.equal(filtered[0].seriesPosts.length, 2);
});

test('a chapter-only tag or category match retains the complete opted-in handbook group', () => {
  for (const matches of [ (post) => post.tags.includes('Hiring'), (post) => post.category === 'engineering' ]) {
    const { posts } = getBlogListing(handbookDocuments(), matches);

    assert.deepEqual(posts.map((post) => post.slug), [ 'guide' ]);
    assert.deepEqual(posts[0].seriesPosts.map((chapter) => chapter.slug), [ 'first-chapter', 'second-chapter' ]);
  }
});

test('unrelated matches and unpublished chapter tags do not retain the handbook group', () => {
  const documents = [
    ...handbookDocuments(),
    document('ordinary', { 'tags': [ 'Data' ] }),
    document('draft-chapter', { 'draft': true, 'series': { 'order': 3, 'title': 'Guide' }, 'tags': [ 'Data' ], 'type': 'HandbookChapter' })
  ];
  const { posts } = getBlogListing(documents, (post) => post.tags.includes('Data'));

  assert.deepEqual(posts.map((post) => post.slug), [ 'ordinary' ]);
  assert.deepEqual(getBlogListing(), { 'posts': [] });
});

test('series grouping precedes tag filtering and pagination counts grouped rows', () => {
  const documents = [
    ...handbookDocuments(),
    document('series-third', { 'series': { 'order': 2, 'title': 'Ordinary series' } }),
    document('series-lead', { 'series': { 'collapseInLists': true, 'order': 0, 'title': 'Ordinary series' } }),
    document('series-second', { 'series': { 'order': 1, 'title': 'Ordinary series' }, 'tags': [ 'Hiring' ] }),
    ...[ 'one', 'two', 'three' ].map((slug) => document(slug, { 'tags': [ 'Hiring' ] }))
  ];
  const { posts } = getBlogListing(documents, (post) => post.tags.includes('Hiring'));
  const series = posts.find((post) => post.slug === 'series-lead');

  assert.equal(posts.length, 5);
  assert.deepEqual(series.seriesPosts.map((part) => part.slug), [ 'series-second', 'series-third' ]);
  assert.deepEqual(paginationPageNumbers(posts.length, 2), [ 2, 3 ]);
  assert.equal(paginate(posts, '1', 2).totalPages, 3);
  assert.equal(paginate(posts, '2', 2).pagePosts.length, 2);
  assert.equal(paginate(posts, '3', 2).pagePosts.length, 1);
  assert.equal(paginate(posts, '4', 2), null);
  assert.deepEqual([
    ...paginate(posts, '1', 2).pagePosts,
    ...paginate(posts, '2', 2).pagePosts,
    ...paginate(posts, '3', 2).pagePosts
  ], posts);
});

test('a handbook-only filter counts the opted-in group once for pagination', () => {
  const { posts } = getBlogListing(handbookDocuments(), (post) => post.tags.includes('Hiring'));

  assert.equal(posts.length, 1);
  assert.deepEqual(paginationPageNumbers(posts.length, 2), []);
  assert.equal(paginate(posts, '2', 2), null);
});

test('handbooks without opt-in keep their index and typed chapters independent', () => {
  for (const collapseInLists of [ false, undefined ]) {
    const documents = handbookDocuments(false);

    if (collapseInLists === undefined) delete documents[0].series.collapseInLists;

    const { posts } = getBlogListing(documents);

    assert.deepEqual(posts.map((post) => post.slug).sort(), [ 'first-chapter', 'guide', 'second-chapter' ]);
    assert.ok(posts.every((post) => post.seriesPosts === undefined));
    assert.equal(posts.filter((post) => post.type === 'HandbookChapter').length, 2);
    assert.deepEqual(getBlogListing(documents, (post) => post.tags.includes('Hiring')).posts.map((post) => post.slug), [ 'second-chapter' ]);
  }
});

test('ordinary series remain independent by default beside an opted-in handbook', () => {
  const { posts } = getBlogListing([
    ...handbookDocuments(),
    document('ordinary-first', { 'series': { 'order': 0, 'title': 'Ordinary series' } }),
    document('ordinary-second', { 'series': { 'order': 1, 'title': 'Ordinary series' } })
  ]);

  assert.deepEqual(posts.map((post) => post.slug).sort(), [ 'guide', 'ordinary-first', 'ordinary-second' ]);
  assert.ok(posts.filter((post) => !post.handbook).every((post) => post.seriesPosts === undefined));
});
