import { remarkCode } from '@gaudi/design-system/mdx/remark';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { remark } from 'remark';

import { remarkCodeTitles } from './remark-code-title.js';

const transform = async(source) => {
  const processor = remark().use(remarkCodeTitles).use(remarkCode);

  return processor.run(processor.parse(source));
};

test('legacy titles become code metadata without an extra title renderer', async() => {
  const tree = await transform('```js:example.js {1} showLineNumbers\nconst answer = 42;\n```');

  assert.equal(tree.children.length, 1);
  assert.equal(tree.children[0].lang, 'js');
  assert.deepEqual(tree.children[0].data.hProperties, {
    'data-highlight': '1', 'data-line-numbers': '', 'data-title': 'example.js'
  });
});

test('code groups preserve labels, explicit titles, legacy titles and fence metadata', async() => {
  const tree = await transform('::: code-group labels=[First, Second]\n\n```js:old.js {1}\nfirst\n```\n\n```js title="new.js" /second/\nsecond\n```\n\n:::');
  const group = tree.children[0];

  assert.equal(group.name, 'CodeGroup');
  assert.equal(group.children[0].data.hProperties['data-title'], 'old.js');
  assert.equal(group.children[1].data.hProperties['data-title'], 'new.js');
  assert.equal(group.children[1].data.hProperties['data-words'], '["second"]');
});

test('the rich-blog-posts article retains both authored code groups', async() => {
  const source = await readFile(new URL('../../data/blog/engineering/creating-rich-blog-posts.mdx', import.meta.url), 'utf8');
  const tree = await transform(source);
  const groups = tree.children.filter((node) => node.name === 'CodeGroup');

  assert.equal(groups.length, 2);
  assert.deepEqual(groups.map((group) => group.children.map((node) => node.data.hProperties['data-title'])), [[ 'Markdown', 'MDAST/JSON' ], [ 'Markdown', 'MDAST/JSON', 'HAST/JSON' ]]);
});
