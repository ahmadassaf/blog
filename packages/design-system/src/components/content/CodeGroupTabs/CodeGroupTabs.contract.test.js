import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const componentDir = dirname(fileURLToPath(import.meta.url));
const packageDir = dirname(dirname(dirname(dirname(componentDir))));

test('CodeGroupTabs owns its component folder contract', () => {
  const files = readdirSync(componentDir);
  const codeHighlightingStory = readFileSync(join(packageDir, '.storybook', 'stories', 'MdxCodeHighlighting.stories.jsx'), 'utf8');

  assert.ok(existsSync(join(componentDir, 'index.js')));
  assert.ok(files.some((file) => file.endsWith('.js') || file.endsWith('.jsx')));
  assert.match(codeHighlightingStory, /title: 'MDX\/Code Highlighting'/);
  assert.match(codeHighlightingStory, /<CodeGroupTabs\s*\/>/);
  assert.match(codeHighlightingStory, /rehype-code-group/);
});
