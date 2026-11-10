import assert from 'node:assert/strict';
import test from 'node:test';

import { serializeJsonLd } from './serializeJsonLd.mjs';

test('JSON-LD cannot close its script element and preserves the original data', () => {
  const data = { 'headline': '</script><script>alert("title")</script>', 'summary': 'A < B & C' };
  const serialized = serializeJsonLd(data);

  assert.equal(serialized.includes('<'), false);
  assert.deepEqual(JSON.parse(serialized), data);
});
