import assert from 'node:assert/strict';
import test from 'node:test';
import { remark } from 'remark';

import { remarkLinks } from './remark-links.js';

const transform = (source) => {
  const processor = remark().use(remarkLinks);

  return processor.runSync(processor.parse(source)).children[0].children[0];
};

test('external preview labels include all authored text and inline formatting', () => {
  for (const source of [ '[Read **the guide** and `examples`](https://example.com)', '[**Read the guide**](https://example.com)' ]) {
    const node = transform(source);

    assert.equal(node.name, 'Preview');
    assert.equal(node.attributes.find((attribute) => attribute.name === 'title').value, source.includes('examples') ? 'Read the guide and examples' : 'Read the guide');
  }
});

test('linked images remain images instead of becoming text-only previews', () => {
  const node = transform('[![Diagram](/diagram.png)](https://example.com)');

  assert.equal(node.type, 'link');
  assert.equal(node.children[0].type, 'image');
});

test('local, loopback, and non-web links do not request external previews', () => {
  for (const href of [ '/about', '#section', 'mailto:me@example.com', 'http://localhost:3000', 'http://docs.localhost', 'http://127.0.0.2', 'http://[::1]:3000' ])
    assert.equal(transform(`[Example](${href})`).type, 'link', href);
});
