import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { visit } from 'unist-util-visit';

import rehypeSimpleCitations from './rehype-simple-citations.js';

function renderCitations(context, fields, text = 'A finding [@sample].', options = {}) {
  const directory = mkdtempSync(path.join(tmpdir(), 'citation-sources-'));
  const bibliography = path.join(directory, 'references.bib');
  const tree = {
    'children': [
      {
        'children': [{ 'type': 'text', 'value': text }],
        'tagName': 'p',
        'type': 'element'
      }
    ],
    'type': 'root'
  };

  context.after(() => rmSync(directory, { 'force': true, 'recursive': true }));
  writeFileSync(bibliography, `@article{sample,
    author = {Jane Example},
    title = {{A useful finding}},
    journal = {Research Journal},
    year = {2024},
    ${fields}
  }`);
  rehypeSimpleCitations({ 'citationsPaths': [ bibliography ], ...options })(tree);

  return tree;
}

function elements(tree, className) {
  const matches = [];

  visit(tree, 'element', (node) => {
    if (node.properties?.className?.includes(className)) matches.push(node);
  });

  return matches;
}

test('bibliography emits an accessible DOI source while preserving formatting and citation navigation', (context) => {
  const tree = renderCitations(context, 'doi = {10.1145/3627508.3638334}, url = {https://example.org/paper}', 'First [@sample]. Again [@sample].');
  const sources = elements(tree, 'citation-source-link');
  const links = elements(tree, 'citation-link');
  const [ backLink ] = elements(tree, 'citation-back-link');
  const [ entry ] = elements(tree, 'citation-entry');

  assert.equal(sources.length, 1);
  assert.equal(sources[0].properties.href, 'https://doi.org/10.1145/3627508.3638334');
  assert.equal(sources[0].properties.ariaLabel, 'View source: A useful finding');
  assert.equal(sources[0].children[0].value, 'View source');
  assert.equal(entry.children.find((node) => node.tagName === 'strong').children[0].value, 'A useful finding');
  assert.equal(links.length, 2);
  assert.deepEqual(links.map((node) => node.properties.href), [ '#citation-sample', '#citation-sample' ]);
  assert.equal(backLink.properties.href, `#${links[1].properties.id}`);
  assert.deepEqual(JSON.parse(backLink.properties['data-instances']), links.map((node) => node.properties.id));
});

test('bibliography normalizes DOI resolver URLs and DOI prefixes', (context) => {
  for (const doi of [ 'https://doi.org/10.1007/example_1', 'http://dx.doi.org/10.1007/example_1', 'doi:10.1007/example_1' ]) {
    const tree = renderCitations(context, `doi = {${doi}}`);

    assert.equal(elements(tree, 'citation-source-link')[0].properties.href, 'https://doi.org/10.1007/example_1');
  }
});

test('bibliography uses an ordinary web URL when the DOI is absent or malformed', (context) => {
  for (const doi of [ '', 'doi = {not-a-doi},', 'doi = {javascript:alert(1)},' ]) {
    const tree = renderCitations(context, `${doi} url = {https://example.org/research/paper?download=1}`);

    assert.equal(elements(tree, 'citation-source-link')[0].properties.href, 'https://example.org/research/paper?download=1');
  }
});

test('bibliography rejects non-web, relative, and malformed source URLs', (context) => {

  // eslint-disable-next-line no-script-url -- Unsafe schemes are deliberate test fixtures.
  for (const url of [ 'javascript:alert(1)', 'data:text/html,test', 'file:///tmp/paper', '//example.org/paper', '/paper', 'https://' ]) {
    const tree = renderCitations(context, `url = {${url}}`);

    assert.equal(elements(tree, 'citation-source-link').length, 0, url);
    assert.equal(elements(tree, 'citation-entry').length, 1, 'Citation remains available without a usable source URL');
  }
});

test('citations without a source or with the bibliography disabled keep their existing behavior', (context) => {
  const withoutSource = renderCitations(context, 'note = {No online source}');
  const withoutBibliography = renderCitations(context, 'url = {https://example.org/paper}', 'A finding [@sample].', { 'showBibliography': false });

  assert.equal(elements(withoutSource, 'citation-source-link').length, 0);
  assert.equal(elements(withoutSource, 'citation-back-link').length, 1);
  assert.equal(elements(withoutBibliography, 'citations-section').length, 0);
  assert.equal(elements(withoutBibliography, 'citation-link').length, 1);
});
