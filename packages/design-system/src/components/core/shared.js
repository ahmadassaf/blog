import assert from 'node:assert/strict';
import { existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

export const runComponentFolderContract = (importMetaUrl, name) => {
  const componentDir = dirname(fileURLToPath(importMetaUrl));

  test(`${name} owns its component folder contract`, () => {
    const files = readdirSync(componentDir);

    assert.ok(existsSync(join(componentDir, 'index.js')));
    assert.ok(files.some((file) => file.endsWith('.stories.jsx') || file.endsWith('.stories.js') || file.endsWith('.stories.mdx')));
    assert.ok(files.some((file) => file.endsWith('.js') || file.endsWith('.jsx')));
  });
};
