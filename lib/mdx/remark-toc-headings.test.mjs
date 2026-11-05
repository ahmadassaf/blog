import assert from 'node:assert/strict';
import test from 'node:test';

import { extractTocHeadings } from './remark-toc-headings.js';

const ids = (toc) => toc.flatMap((entry) => [ entry.id, ...ids(entry.children) ]);

test('TOC ids keep underscores and unicode, matching rehype-slug', async() => {
  const toc = await extractTocHeadings('## .bash_profile & .bashrc\n## Café à la carte');

  assert.deepEqual(ids(toc), [ 'bash_profile--bashrc', 'café-à-la-carte' ]);
  assert.equal(toc[0].url, '#bash_profile--bashrc');
});

test('duplicate headings get the -1, -2 suffixes rehype-slug assigns per document', async() => {
  const toc = await extractTocHeadings('## Install\n### Installation\n## Setup\n### Installation\n### Installation');

  assert.deepEqual(ids(toc), [ 'install', 'installation', 'setup', 'installation-1', 'installation-2' ]);
});

test('each document starts with a fresh slugger', async() => {
  await extractTocHeadings('## Installation');
  const toc = await extractTocHeadings('## Installation');

  assert.equal(toc[0].id, 'installation');
});
