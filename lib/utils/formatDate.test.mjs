import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import test from 'node:test';

import formatDate, { formatShortDate } from './formatDate.js';

test('long and short formats use the same publication day for date-only and Contentlayer values', () => {
  for (const date of [ '2026-11-10', '2026-11-10T00:00:00.000Z', new Date('2026-11-10T00:00:00.000Z') ]) {
    assert.equal(formatDate(date), 'November 10, 2026');
    assert.equal(formatShortDate(date), 'Nov 10, 2026');
  }
});

test('publication dates do not change in time zones west or east of UTC', () => {
  const moduleUrl = new URL('./formatDate.js', import.meta.url).href;
  const script = `import formatDate, { formatShortDate } from ${JSON.stringify(moduleUrl)}; console.log(JSON.stringify([formatDate('2026-11-10T00:00:00.000Z'), formatShortDate('2026-11-10T00:00:00.000Z')]));`;

  for (const timeZone of [ 'America/Los_Angeles', 'Pacific/Kiritimati' ]) {
    const output = execFileSync(process.execPath, [ '--input-type=module', '-e', script ], {
      'encoding': 'utf8',
      'env': { ...process.env, 'TZ': timeZone }
    });

    assert.deepEqual(JSON.parse(output), [ 'November 10, 2026', 'Nov 10, 2026' ]);
  }
});
