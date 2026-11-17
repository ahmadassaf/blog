import assert from 'node:assert/strict';
import test from 'node:test';

import { enrichCommandMetadata, enrichPublicationCommandMetadata } from './commandMetadata.js';

test('writing metadata displays only the category while preserving tags for search', () => {
  const tags = Object.freeze([ 'Engineering', 'RDF', ' rdf ', 'Linked Data', 'API Design', 'JavaScript', '', null, 42 ]);
  const item = Object.freeze({
    'category': 'engineering',
    'href': '',
    'id': 0,
    'subtitle': 'The supplied subtitle',
    'summary': 'A longer summary',
    tags,
    'title': 'RDF and APIs',
    'type': 'HandbookChapter'
  });
  const enriched = enrichCommandMetadata(item);

  assert.deepEqual(enriched.badges, [{ 'label': 'engineering', 'tone': 'blue' }]);
  assert.equal(enriched.tags, tags);
  assert.deepEqual({ ...enriched, 'badges': undefined }, { ...item, 'badges': undefined });
  assert.equal(item.badges, undefined);
});

test('subtitle fallback preserves explicit empty and zero values', () => {
  for (const subtitle of [ undefined, null ])
    assert.equal(enrichCommandMetadata({ subtitle, 'summary': 'Fallback summary' }).subtitle, 'Fallback summary');

  for (const subtitle of [ '', 0 ])
    assert.equal(enrichCommandMetadata({ subtitle, 'summary': 'Fallback summary' }).subtitle, subtitle);

  assert.equal(enrichCommandMetadata({}).subtitle, undefined);
});

test('absent and invalid taxonomy values never produce empty or fabricated badges', () => {
  for (const tags of [ undefined, null, 'RDF', 0, {}])
    assert.deepEqual(enrichCommandMetadata({ 'category': ' ', tags }).badges, []);

  assert.deepEqual(enrichCommandMetadata({ 'category': 0, 'tags': [ null, false, 0, '', '  ', {}, 'RDF', 'rdf' ] }).badges, []);
  assert.deepEqual(enrichCommandMetadata({ 'tags': [ 'RDF', 'Linked Data' ] }).badges, []);
});

test('publication metadata retains identity and exposes actual venue, year and award', () => {
  const item = Object.freeze({
    'authors': 'A Assaf, R Troncy',
    'award': 'Best paper Award',
    'href': 'https://example.org/paper.pdf',
    'id': 0,
    'subtitle': 'Existing subtitle',
    'title': 'Paper title',
    'type': 'Publication',
    'venue': 'Linked Data Quality Workshop',
    'venueType': 'Workshop',
    'year': 0
  });
  const enriched = enrichPublicationCommandMetadata(item);

  assert.deepEqual(enriched, {
    ...item,
    'badges': [
      { 'label': 'Workshop', 'tone': 'gray' },
      { 'label': 'Best paper Award', 'tone': 'blue' }
    ],
    'subtitle': item.venue,
    'trailingMetadata': 0
  });
  assert.equal(item.subtitle, 'Existing subtitle');
  assert.equal(item.badges, undefined);
});

test('publication metadata preserves empty fields and only falls back from nullish venues', () => {
  for (const venue of [ undefined, null ])
    assert.equal(enrichPublicationCommandMetadata({ 'subtitle': 'Existing subtitle', venue }).subtitle, 'Existing subtitle');

  assert.equal(enrichPublicationCommandMetadata({ 'subtitle': 'Existing subtitle', 'venue': '' }).subtitle, '');
  assert.equal(enrichPublicationCommandMetadata({ 'subtitle': '' }).subtitle, '');
  assert.equal(enrichPublicationCommandMetadata({ 'year': '' }).trailingMetadata, '');
  assert.equal(enrichPublicationCommandMetadata({}).trailingMetadata, undefined);
  assert.deepEqual(enrichPublicationCommandMetadata({ 'award': false, 'venueType': '  ' }).badges, []);
});
