import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const componentDir = dirname(fileURLToPath(import.meta.url));
const commandDir = dirname(componentDir);
const packageDir = dirname(dirname(dirname(commandDir)));

test('CmdLauncherShortcut owns its component folder contract', () => {
  const files = readdirSync(componentDir);

  assert.ok(existsSync(join(componentDir, 'index.js')));
  assert.ok(files.some((file) => file.endsWith('.js') || file.endsWith('.jsx')));

  const parentStory = readFileSync(join(commandDir, 'CmdLauncher', 'CmdLauncher.stories.jsx'), 'utf8');
  const componentDocs = readFileSync(join(packageDir, '.storybook', 'stories', 'ComponentDocs.jsx'), 'utf8');
  const mainExample = parentStory.split('export default')[0];

  assert.match(parentStory, /export const Shortcut/);
  assert.match(parentStory, /<CmdLauncherShortcut\s*\/>/);
  assert.doesNotMatch(mainExample, /<CmdLauncherShortcut\s*\/>/);
  assert.match(componentDocs, /CmdLauncherShortcut/);
  assert.match(componentDocs, /do not render CmdLauncherShortcut/);
});
