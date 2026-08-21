import { lookup } from 'node:dns/promises';
import { request as requestHttp } from 'node:http';
import { request as requestHttps } from 'node:https';
import { BlockList, isIP } from 'node:net';
import { Readable } from 'node:stream';

const PRIVATE_ADDRESSES = new BlockList();

PRIVATE_ADDRESSES.addSubnet('0.0.0.0', 8, 'ipv4');
PRIVATE_ADDRESSES.addSubnet('10.0.0.0', 8, 'ipv4');
PRIVATE_ADDRESSES.addSubnet('100.64.0.0', 10, 'ipv4');
PRIVATE_ADDRESSES.addSubnet('127.0.0.0', 8, 'ipv4');
PRIVATE_ADDRESSES.addSubnet('169.254.0.0', 16, 'ipv4');
PRIVATE_ADDRESSES.addSubnet('172.16.0.0', 12, 'ipv4');
PRIVATE_ADDRESSES.addSubnet('192.168.0.0', 16, 'ipv4');
PRIVATE_ADDRESSES.addSubnet('224.0.0.0', 3, 'ipv4');
PRIVATE_ADDRESSES.addSubnet('::', 127, 'ipv6');
PRIVATE_ADDRESSES.addSubnet('64:ff9b::', 96, 'ipv6');
PRIVATE_ADDRESSES.addSubnet('fc00::', 7, 'ipv6');
PRIVATE_ADDRESSES.addSubnet('fe80::', 10, 'ipv6');
PRIVATE_ADDRESSES.addSubnet('ff00::', 8, 'ipv6');

const FETCH_HEADERS = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'User-Agent': 'Mozilla/5.0 (compatible; PreviewBot/1.0)'
};

const REDIRECT_STATUSES = new Set([ 301, 302, 303, 307, 308 ]);

export function blockedUrlError(message) {
  const error = new Error(message);

  error.code = 'ERR_URL_BLOCKED';

  return error;
}

export function isPublicAddress(ip) {
  const zoneIndex = ip.indexOf('%');
  const address = zoneIndex === -1 ? ip : ip.slice(0, zoneIndex);
  const family = isIP(address);

  return family !== 0 && !PRIVATE_ADDRESSES.check(address, family === 6 ? 'ipv6' : 'ipv4');
}

export async function resolvePublicAddresses(urlObj, lookupFn = lookup) {
  if (![ 'http:', 'https:' ].includes(urlObj.protocol)) throw blockedUrlError('Only HTTP(S) URLs are allowed');

  const hostname = urlObj.hostname.toLowerCase().replace(/^\[|\]$/g, '');

  if (hostname === 'localhost' || hostname.endsWith('.localhost') || hostname.endsWith('.local') || hostname.endsWith('.internal')) throw blockedUrlError('Local URLs are not allowed');

  const family = isIP(hostname);

  if (family !== 0) {
    if (!isPublicAddress(hostname)) throw blockedUrlError('Local URLs are not allowed');

    return [{ 'address': hostname, family }];
  }

  let addresses;

  try {
    addresses = await lookupFn(hostname, { 'all': true });
  } catch {
    throw blockedUrlError('Could not resolve hostname');
  }

  if (!addresses.length || addresses.some(({ address }) => !isPublicAddress(address))) throw blockedUrlError('Local URLs are not allowed');

  return addresses;
}

function createPinnedLookup(addresses) {
  return (_hostname, options, callback) => {
    if (options?.all) {
      callback(null, addresses);

      return;
    }

    callback(null, addresses[0].address, addresses[0].family);
  };
}

function requestPinned(urlObj, addresses, signal) {
  const request = urlObj.protocol === 'https:' ? requestHttps : requestHttp;

  return new Promise((resolve, reject) => {
    const outgoing = request(urlObj, {
      'agent': false,
      'headers': FETCH_HEADERS,
      'lookup': createPinnedLookup(addresses),
      signal
    }, (incoming) => {
      const status = incoming.statusCode || 500;

      resolve({
        'body': Readable.toWeb(incoming),
        'headers': new globalThis.Headers(incoming.headers),
        'ok': status >= 200 && status < 300,
        status,
        'statusText': incoming.statusMessage || ''
      });
    });

    outgoing.on('error', reject);
    outgoing.end();
  });
}

export async function safeFetch(initialUrl, abortSignal, { lookupFn = lookup, maxRedirects = 3 } = {}) {
  let currentUrl = initialUrl;

  for (let hop = 0; hop <= maxRedirects; hop += 1) {
    const urlObj = new URL(currentUrl);
    const addresses = await resolvePublicAddresses(urlObj, lookupFn);
    const response = await requestPinned(urlObj, addresses, abortSignal);

    if (!REDIRECT_STATUSES.has(response.status)) return response;

    const location = response.headers.get('location');

    if (!location) return response;

    await response.body.cancel();
    currentUrl = new URL(location, currentUrl).href;
  }

  throw blockedUrlError('Too many redirects');
}
