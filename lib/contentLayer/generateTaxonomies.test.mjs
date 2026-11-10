import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { getAllTags } from './generateTaxonomies.mjs';

test('taxonomy names cannot collide with object prototype properties', () => {
  const directory = mkdtempSync(path.join(tmpdir(), 'blog-taxonomy-test-'));
  const previousDirectory = process.cwd();

  try {
    mkdirSync(path.join(directory, 'app/content'), { 'recursive': true });
    process.chdir(directory);
    getAllTags([{ 'tags': [ 'Constructor', 'JavaScript' ] }, { 'tags': [ 'Constructor' ] }]);
    const tags = JSON.parse(readFileSync('./app/content/tags.json', 'utf8'));

    assert.deepEqual(tags.map((tag) => [ tag.slug, tag.count ]), [[ 'constructor', 2 ], [ 'javascript', 1 ]]);
    assert.equal(tags[0].title, 'Constructor');
    assert.equal(tags[0].href, '/blog/tags/constructor');
  } finally {
    process.chdir(previousDirectory);
    rmSync(directory, { 'force': true, 'recursive': true });
  }
});
