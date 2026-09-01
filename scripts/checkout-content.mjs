/**
 * Content submodule checkout
 *
 * @description Initializes the data/blog content submodule at its pinned
 * commit. The content repository is private, so environments without ambient
 * git credentials (CI, Vercel) must provide a read-only token through the
 * GIT_CONTENT_TOKEN environment variable; local clones with working
 * credentials need nothing. The token is written to the repo-local git
 * config, never logged.
 */

import { execFileSync } from 'node:child_process';

const run = (args) => execFileSync('git', args, { 'stdio': 'inherit' });

const token = process.env.GIT_CONTENT_TOKEN;

/*
 * Setting submodule.<path>.url before `submodule update --init` wins over
 * the URL recorded in .gitmodules, which is how the token gets injected
 * without ever being committed.
 */
if (token) execFileSync('git', [
  'config',
  'submodule.data/blog.url',
  `https://x-access-token:${token}@github.com/ahmadassaf/blog-posts.git`
]);

run([ 'submodule', 'update', '--init', '--recursive', 'data/blog' ]);
