import { globbySync } from 'globby';
import { readFileSync } from 'node:fs';
import { relative } from 'node:path';

const roots = [ 'app/**/*.{js,jsx,ts,tsx}', 'layouts/**/*.{js,jsx,ts,tsx}' ];
const ignored = [
  'app/api/**',
  'app/content/**'
];

const forbiddenClassPatterns = [
  /(?:^|:)text-(?:xs|sm|base|lg|xl|[2-9]xl|\d)/,
  /(?:^|:)text-(?:black|white|gray|slate|zinc|neutral|stone|red|orange|amber|yellow|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-/,
  /(?:^|:)bg-(?:black|white|gray|slate|zinc|neutral|stone|red|orange|amber|yellow|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-/,
  /(?:^|:)border-(?:black|white|gray|slate|zinc|neutral|stone|red|orange|amber|yellow|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-/,
  /(?:^|:)(?:fill|stroke)-(?:black|white|gray|slate|zinc|neutral|stone|red|orange|amber|yellow|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-/,
  /(?:^|:)font-/,
  /(?:^|:)leading-/,
  /(?:^|:)tracking-/,
  /(?:^|:)prose(?:\b|-|:)/
];

const files = globbySync(roots, {
  'gitignore': true,
  'ignore': ignored
});

const stringLiteralPattern = /(?<quote>['"`])(?<value>(?:\\.|(?!\k<quote>).)*)\k<quote>/g;
const violations = [];

const findForbiddenClasses = (line) => {
  const forbiddenClasses = [];

  for (const match of line.matchAll(stringLiteralPattern)) {
    const literal = match.groups.value;
    const classes = literal.split(/\s+/).filter(Boolean);

    forbiddenClasses.push(
      ...classes.filter((classToken) => forbiddenClassPatterns.some((pattern) => pattern.test(classToken)))
    );
  }

  return forbiddenClasses;
};

for (const file of files) {
  const source = readFileSync(file, 'utf8');
  const lines = source.split('\n');

  for (const [ index, line ] of lines.entries()) {
    const forbiddenClasses = findForbiddenClasses(line);

    if (forbiddenClasses.length)
      violations.push({
        'classes': forbiddenClasses,
        'file': relative(process.cwd(), file),
        'line': index + 1
      });
  }
}

if (violations.length) {
  console.error('App-side visual styling must come from @gaudi/design-system components.');
  console.error('Move colors, typography, and prose styling into DS components before using them in app/layout files.\n');

  for (const violation of violations)
    console.error(`${violation.file}:${violation.line} ${violation.classes.join(' ')}`);

  process.exit(1);
}

console.log('DS boundary audit passed.');
