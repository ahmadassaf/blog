import assert from 'node:assert/strict';
import test from 'node:test';

import rehypePracticeSections from './rehype-practice-sections.js';

const handbookFile = { 'data': { 'rawDocumentData': { 'sourceFileName': 'cto-handbook-the-beginning.mdx' } } };

const element = (tagName, text, properties = {}) => {
  return { 'children': [{ 'type': 'text', 'value': text }], properties, tagName, 'type': 'element' };
};

test('practice sections keep original nodes and stop before the next peer heading', () => {
  const intro = element('p', 'Original principle.');
  const heading = element('h3', 'How we do it at Mav9', { 'id': 'how-we-do-it-at-mav9' });
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
  assert.equal(tree.children[1].children[0].properties.id, 'how-we-do-it-at-mav9');
  assert.equal(tree.children[2], nextHeading);
});

test('ordinary headings and heading-like code remain unchanged', () => {
  const tree = { 'children': [ element('h3', 'A different section'), element('p', 'How we do it at Mav9'), element('pre', '### How we do it at Mav9') ], 'type': 'root' };
  const original = JSON.parse(JSON.stringify(tree));

  rehypePracticeSections()(tree, handbookFile);

  assert.deepEqual(tree, original);
});

test('other posts retain their original markup even when they use the same practice heading', () => {
  const tree = { 'children': [ element('h3', 'How we do it at Mav9'), element('p', 'Existing post content.') ], 'type': 'root' };
  const original = JSON.parse(JSON.stringify(tree));

  rehypePracticeSections()(tree, { 'data': { 'rawDocumentData': { 'sourceFileName': 'setting-the-engineering-foundations.mdx' } } });

  assert.deepEqual(tree, original);
});
