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

  let next = summaries[documentIndex - 1] || null;
  let prev = summaries[documentIndex + 1] || null;

  if (source.series) {
    const seriesDocuments = summaries
      .filter((candidate) => candidate.series?.title === source.series.title)
      .sort((first, second) => Number(first.series.order) - Number(second.series.order));
    const seriesIndex = seriesDocuments.indexOf(summaries[documentIndex]);

    next = seriesDocuments[seriesIndex + 1] || null;
    prev = seriesDocuments[seriesIndex - 1] || null;
    document.seriesPosts = seriesDocuments.map((candidate) => {
      return {
        'order': Number(candidate.series.order) + 1,
        'series': source.series.title,
        'slug': candidate.slug,
        'title': candidate.title
      };
    });
  }

  return {
    'content': coreContent(document),
    document,
    next,
    prev
  };
}
