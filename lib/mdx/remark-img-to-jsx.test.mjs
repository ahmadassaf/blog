import assert from 'node:assert/strict';
import test from 'node:test';

import { remarkImgToJsx } from './remark-img-to-jsx.js';

const image = (url) => {
  return { 'alt': url, 'type': 'image', url };
};

test('every local image in a paragraph becomes a sized Image and the text stays', () => {
  const paragraph = { 'children': [ image('/static/images/homepage.png'), { 'type': 'text', 'value': ' and ' }, image('/static/images/logo.png') ], 'type': 'paragraph' };

  remarkImgToJsx()({ 'children': [ paragraph ], 'type': 'root' });

  assert.equal(paragraph.type, 'div');
  assert.deepEqual(paragraph.children.map((child) => child.name ?? child.type), [ 'Image', 'text', 'Image' ]);
  assert.ok(paragraph.children[2].attributes.find((attribute) => attribute.name === 'width').value > 0);
});

test('a paragraph with only remote images is left alone', () => {
  const paragraph = { 'children': [ image('https://example.com/a.png') ], 'type': 'paragraph' };

  remarkImgToJsx()({ 'children': [ paragraph ], 'type': 'root' });

  assert.equal(paragraph.type, 'paragraph');
  assert.equal(paragraph.children[0].type, 'image');
});
