import assert from 'node:assert/strict';
import test from 'node:test';

import rehypeInternalLinks from './rehype-internal-links.js';

const transform = (href) => {
  const tree = {
    'children': [
      {
        'children': [{ 'type': 'text', 'value': 'A useful post' }],
        'properties': { href },
        'tagName': 'a',
        'type': 'element'
      }
    ],
    'type': 'root'
  };

  rehypeInternalLinks()(tree);

  return tree.children[0];
};

test('article and project links retain preview support and their query/hash', () => {
  for (const href of [ '/blog/category/data/example', '/blog/projects/ditto', '/blog/engineering/example?source=post#details' ]) {
    const node = transform(href);

    assert.equal(node.tagName, 'Preview');
    assert.equal(node.properties.url, href);
    assert.equal(node.properties.title, 'A useful post');
  }
});

test('taxonomy and other ordinary links remain links without a broken article preview', () => {
  for (const href of [ '/blog/categories/data', '/blog/tags/engineering', '/blog', '/about', 'https://example.com/blog/data' ])
    assert.equal(transform(href).tagName, 'a', href);
});
