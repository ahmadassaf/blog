import assert from 'node:assert/strict';
import test from 'node:test';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';

import rehypeFootnotePopover from '../rehype-footnote-popover-v2.js';

import remarkFootnoteData from './remark-footnote-data.js';

const footnoteData = (markdown) => {
  const file = { 'data': {} };
  const tree = remark().use(remarkGfm).parse(markdown);

  remarkFootnoteData()(tree, file);

  return file;
};

const reference = (id, number = '1') => {
  return {
    'children': [{ 'type': 'text', 'value': number }],
    'properties': { 'className': 'existing', 'dataFootnoteRef': true, 'href': `#user-content-fn-${id}` },
    'tagName': 'a',
    'type': 'element'
  };
};

test('footnote popovers preserve literal code, text, emphasis, and escaped link attributes', () => {
  const file = footnoteData('A note[^note].\n\n[^note]: Use `<T>` with **A & B** and [a link](https://example.com/?q=%22&x=1).');

  assert.equal(file.data.footnotes.note, 'Use <code>&lt;T&gt;</code> with <strong>A &amp; B</strong> and <a href="https://example.com/?q=%22&amp;x=1" target="_blank" rel="noopener noreferrer">a link</a>.');
});

test('named, unicode, and numeric footnote IDs use the rendered reference number', () => {
  const file = footnoteData('One[^Model-Note], two[^Café], three[^17].\n\n[^Model-Note]: First note.\n[^Café]: Second note.\n[^17]: Third note.');
  const links = [ reference('model-note'), reference('caf%C3%A9', '2'), reference('17', '3') ];

  rehypeFootnotePopover()({ 'children': links, 'type': 'root' }, file);

  assert.deepEqual(links.map((node) => node.properties['data-footnote-content']), [ 'First note.', 'Second note.', 'Third note.' ]);
  assert.deepEqual(links.map((node) => node.properties['data-footnote-number']), [ '1', '2', '3' ]);
  assert.deepEqual(links[0].properties.className, [ 'existing', 'footnote-link' ]);
});

test('a missing or malformed popover leaves the original footnotes available', () => {
  for (const id of [ 'missing', '%' ]) {
    const section = { 'children': [], 'properties': { 'dataFootnotes': true }, 'tagName': 'section', 'type': 'element' };
    const tree = { 'children': [ reference(id), section ], 'type': 'root' };

    rehypeFootnotePopover()(tree, { 'data': { 'footnotes': { 'note': 'Available note.' } } });

    assert.equal(section.properties.className, undefined);
  }
});

test('footnote identifiers cannot collide with inherited object properties', () => {
  const file = footnoteData('One[^__proto__].\n\n[^__proto__]: An ordinary footnote.');

  assert.equal(Object.getOwnPropertyDescriptor(file.data.footnotes, '__proto__').value, 'An ordinary footnote.');
});
