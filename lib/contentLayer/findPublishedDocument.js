import { safeDecodeURI } from '../utils/slugs.mjs';

/** Resolve public article/project paths and content slugs without loading navigation data. */
export function findPublishedDocument(documents, pathOrSlug) {
  if (typeof pathOrSlug !== 'string') return null;

  const slug = safeDecodeURI(pathOrSlug.split(/[?#]/, 1)[0]
    .replace(/^\/?blog\//, '')
    .replace(/^\/+|\/+$/g, ''));

  if (!slug) return null;

  const contentSlug = slug.startsWith('category/') ? slug : `category/${slug}`;

  return documents.find((document) => !document.draft && document.slug === contentSlug) || null;
}
