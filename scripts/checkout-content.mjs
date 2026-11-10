/** Initialize missing content without resetting an existing local checkout. */
import { execFileSync } from 'node:child_process';

const token = process.env.GIT_CONTENT_TOKEN;
const authorization = token ? `AUTHORIZATION: basic ${Buffer.from(`x-access-token:${token}`).toString('base64')}` : null;
const redact = (message) => {
  let safe = String(message).replace(/https:\/\/[^\s/@]+:[^\s@]+@/g, 'https://***@');

  if (token) safe = safe.replaceAll(token, '***').replaceAll(authorization, '***');

  return safe;
};

const runGit = (args, env = process.env) => {
  try {
    return execFileSync('git', args, { 'encoding': 'utf8', env, 'stdio': [ 'ignore', 'pipe', 'pipe' ] });
  } catch (error) {
    throw new Error(redact(error.stderr || error.message));
  }
};

const status = runGit([ 'submodule', 'status', '--', 'data/blog' ]);

if (status.startsWith('-')) {
  const env = { ...process.env };

  // Command-scoped authentication: never persist a token in a repository URL or git config.
  if (authorization) {
    const configCount = Number(env.GIT_CONFIG_COUNT || 0);

    if (!Number.isSafeInteger(configCount) || configCount < 0) throw new Error('Invalid GIT_CONFIG_COUNT');

    env.GIT_CONFIG_COUNT = String(configCount + 1);
    env[`GIT_CONFIG_KEY_${configCount}`] = 'http.https://github.com/.extraheader';
    env[`GIT_CONFIG_VALUE_${configCount}`] = authorization;
  }

  runGit([ 'submodule', 'update', '--init', '--recursive', 'data/blog' ], env);
  console.log('Blog content initialized at the pinned commit.');
} else if (status.startsWith(' ') || status.startsWith('+')) {
  console.log('Using the existing blog content checkout.');
} else {
  throw new Error('Blog content submodule is missing or has an unresolved merge.');
}
