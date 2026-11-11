import assert from 'node:assert/strict';
import test from 'node:test';

import rehypePracticeSections from './rehype-practice-sections.js';

const handbookFile = { 'data': { 'rawDocumentData': { 'sourceFileName': 'cto-handbook-the-beginning.mdx' } } };

const element = (tagName, text, properties = {}) => {
  return { 'children': [{ 'type': 'text', 'value': text }], properties, tagName, 'type': 'element' };
};

test('practice sections keep original nodes and stop before the next peer heading', () => {
  const intro = element('p', 'Original principle.');
  const heading = element('h3', 'How I do it now', { 'id': 'how-i-do-it-now' });
  const practice = element('p', 'The actual practice, exactly as authored.');
  const subheading = element('h4', 'Example');
  const example = element('pre', 'protected code');
  const nextHeading = element('h2', 'Next topic', { 'id': 'next-topic' });
  const tree = { 'children': [ intro, heading, practice, subheading, example, nextHeading ], 'type': 'root' };

  rehypePracticeSections()(tree, handbookFile);

  assert.equal(tree.children[0], intro);
  assert.equal(tree.children[1].tagName, 'section');
  assert.equal(tree.children[1].properties['data-handbook-practice'], '');
  assert.deepEqual(tree.children[1].children, [ heading, practice, subheading, example ]);
  assert.equal(tree.children[1].children[0].properties.id, 'how-i-do-it-now');
  assert.equal(tree.children[2], nextHeading);
});

test('ordinary headings and heading-like code remain unchanged', () => {
  const tree = { 'children': [ element('h3', 'A different section'), element('p', 'How I do it now'), element('pre', '### How I do it now') ], 'type': 'root' };
  const original = JSON.parse(JSON.stringify(tree));

  rehypePracticeSections()(tree, handbookFile);

  assert.deepEqual(tree, original);
});

test('other posts retain their original markup even when they use the same practice heading', () => {
  const tree = { 'children': [ element('h3', 'How I do it now'), element('p', 'Existing post content.') ], 'type': 'root' };
  const original = JSON.parse(JSON.stringify(tree));

  rehypePracticeSections()(tree, { 'data': { 'rawDocumentData': { 'sourceFileName': 'setting-the-engineering-foundations.mdx' } } });

  assert.deepEqual(tree, original);
});

test('past experience, current proposals and growth guidance remain separate practice sections', () => {
  const past = [ element('h3', 'How I approached it at a startup'), element('p', 'What happened then.') ];
  const proposal = [ element('h3', 'What I am trying now'), element('p', 'A proposed agreement.') ];
  const growth = [ element('h3', 'As the company grows'), element('p', 'How I would adapt it.') ];
  const next = element('h2', 'Another topic');
  const tree = { 'children': [ ...past, ...proposal, ...growth, next ], 'type': 'root' };

  rehypePracticeSections()(tree, handbookFile);

  assert.deepEqual(tree.children.slice(0, 3).map((section) => section.children), [ past, proposal, growth ]);
  assert.ok(tree.children.slice(0, 3).every((section) => section.tagName === 'section' && section.properties['data-handbook-practice'] === ''));
  assert.equal(tree.children[3], next);
});
