import assert from 'node:assert/strict';
import test from 'node:test';

import { isPublicAddress, resolvePublicAddresses } from './safeFetch.mjs';

test('isPublicAddress rejects local and reserved networks', () => {
  for (const address of [ '0.0.0.0', '10.0.0.1', '127.0.0.1', '169.254.1.1', '192.168.1.1', '::1', 'fc00::1', 'fe80::1' ])
    assert.equal(isPublicAddress(address), false, address);

  assert.equal(isPublicAddress('1.1.1.1'), true);
  assert.equal(isPublicAddress('2606:4700:4700::1111'), true);
});

test('resolvePublicAddresses rejects a hostname when any answer is private', async() => {
  const lookup = async() => [
    { 'address': '1.1.1.1', 'family': 4 },
    { 'address': '127.0.0.1', 'family': 4 }
  ];

  await assert.rejects(
    resolvePublicAddresses(new URL('https://example.test'), lookup), { 'code': 'ERR_URL_BLOCKED' }
  );
});

test('resolvePublicAddresses accepts only HTTP and HTTPS URLs', async() => {
  await assert.rejects(resolvePublicAddresses(new URL('file:///etc/passwd')), { 'code': 'ERR_URL_BLOCKED' });
});

test('resolvePublicAddresses returns the validated addresses used by the request', async() => {
  const addresses = [
    { 'address': '1.1.1.1', 'family': 4 },
    { 'address': '2606:4700:4700::1111', 'family': 6 }
  ];

  assert.deepEqual(
    await resolvePublicAddresses(new URL('https://example.test'), async() => addresses), addresses
  );
});
