import assert from 'node:assert/strict';
import { existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const componentDir = dirname(fileURLToPath(import.meta.url));

test('Disclaimer owns its component folder contract', () => {
  const files = readdirSync(componentDir);

  assert.ok(existsSync(join(componentDir, 'index.js')));
  assert.ok(files.some((file) => file.endsWith('.stories.jsx') || file.endsWith('.stories.js') || file.endsWith('.stories.mdx')));
  assert.ok(files.some((file) => file.endsWith('.js') || file.endsWith('.jsx')));
});
