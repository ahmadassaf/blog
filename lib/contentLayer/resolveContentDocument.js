import { coreContent, published, sortPosts } from '../utils/contentlayer.js';

export function resolveContentDocument(documents, matches, getSlug = (document) => document.slug) {
  const sortedDocuments = sortPosts(published(documents));
  const documentIndex = sortedDocuments.findIndex(matches);

  if (documentIndex === -1) return null;

  const source = sortedDocuments[documentIndex];
  const summaries = coreContent(sortedDocuments.map((document) => {
    return {
      ...document,
      'slug': getSlug(document)
    };
  }));
  const document = {
    ...source,
    'slug': getSlug(source)
  };

  if (source.series) document.seriesPosts = sortedDocuments
    .filter((candidate) => candidate.series?.title === source.series.title)
    .sort((first, second) => Number(first.series.order) - Number(second.series.order))
    .map((candidate) => {
      return {
        'order': Number(candidate.series.order) + 1,
        'series': source.series.title,
        'slug': getSlug(candidate),
        'title': candidate.title
      };
    });

  return {
    'content': coreContent(document),
    document,
    'next': summaries[documentIndex - 1] || null,
    'prev': summaries[documentIndex + 1] || null
  };
}
