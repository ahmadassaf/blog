import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { chmodSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const script = fileURLToPath(new URL('./checkout-content.mjs', import.meta.url));
const fakeToken = 'test-only-content-token';

// The fake git executable records command/config intent; it never accesses a repository.
const runCheckout = (status, options = {}) => {
  const directory = mkdtempSync(path.join(tmpdir(), 'blog-checkout-test-'));
  const git = path.join(directory, 'git');
  const callsPath = path.join(directory, 'calls.jsonl');

  writeFileSync(git, `#!${process.execPath}
const fs = require('node:fs');
const args = process.argv.slice(2);
const config = Array.from({length: Number(process.env.GIT_CONFIG_COUNT || 0)}, (_, i) => [process.env['GIT_CONFIG_KEY_' + i], process.env['GIT_CONFIG_VALUE_' + i]]);
fs.appendFileSync(process.env.TEST_CALLS_PATH, JSON.stringify({args, config}) + '\\n');
if (args[1] === 'status') process.stdout.write(process.env.TEST_SUBMODULE_STATUS);
else if (process.env.TEST_FAIL_UPDATE === 'true') {
  process.stderr.write('Denied https://x-access-token:' + process.env.GIT_CONTENT_TOKEN + '@github.com/example/repo ' + config.at(-1)[1]);
  process.exit(1);
}
`);
  chmodSync(git, 0o755);

  try {
    const result = spawnSync(process.execPath, [ script ], {
      'cwd': directory,
      'encoding': 'utf8',
      'env': {
        ...process.env,
        'GIT_CONFIG_COUNT': '1',
        'GIT_CONFIG_KEY_0': 'color.ui',
        'GIT_CONFIG_VALUE_0': 'false',
        'GIT_CONTENT_TOKEN': fakeToken,
        'PATH': `${directory}${path.delimiter}${process.env.PATH}`,
        'TEST_CALLS_PATH': callsPath,
        'TEST_FAIL_UPDATE': String(options.failUpdate || false),
        'TEST_SUBMODULE_STATUS': status
      }
    });
    const calls = readFileSync(callsPath, 'utf8').trim().split('\n')
      .map((line) => JSON.parse(line));

    return { calls, ...result };
  } finally {
    rmSync(directory, { 'force': true, 'recursive': true });
  }
};

test('content checkout preserves initialized content, including a different local HEAD', () => {
  for (const status of [ ' abc123 data/blog\n', '+abc123 data/blog\n' ]) {
    const result = runCheckout(status);

    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(result.calls.map((call) => call.args), [[ 'submodule', 'status', '--', 'data/blog' ]]);
  }
});

test('missing content initializes once using ephemeral auth while preserving inherited git config', () => {
  const result = runCheckout('-abc123 data/blog\n');

  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(result.calls[1].args, [ 'submodule', 'update', '--init', '--recursive', 'data/blog' ]);
  assert.deepEqual(result.calls[1].config, [
    [ 'color.ui', 'false' ],
    [ 'http.https://github.com/.extraheader', `AUTHORIZATION: basic ${Buffer.from(`x-access-token:${fakeToken}`).toString('base64')}` ]
  ]);
  assert.equal(result.calls.some((call) => call.args.includes('config')), false);
  assert.equal(result.stdout.includes(fakeToken), false);
});

test('content initialization errors never expose the token or authorization header', () => {
  const result = runCheckout('-abc123 data/blog\n', { 'failUpdate': true });
  const output = `${result.stdout}${result.stderr}`;

  assert.notEqual(result.status, 0);
  assert.equal(output.includes(fakeToken), false);
  assert.equal(output.includes(Buffer.from(`x-access-token:${fakeToken}`).toString('base64')), false);
  assert.match(output, /Denied/);
});
