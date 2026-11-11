import { coreContent, published, sortPosts } from '../utils/contentlayer.js';
import { getHandbook } from '../utils/handbooks.js';

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
    const handbook = getHandbook(seriesDocuments);

    next = seriesDocuments[seriesIndex + 1] || null;
    prev = seriesDocuments[seriesIndex - 1] || null;
    document.seriesPosts = seriesDocuments.map((candidate) => {
      return {
        'order': Number(candidate.series.order) + (handbook ? 0 : 1),
        'series': source.series.title,
        'slug': candidate.slug,
        'title': candidate.title
      };
    });

    if (handbook) {
      const member = handbook.index.slug === document.slug ? handbook.index : handbook.chapters.find((chapter) => chapter.slug === document.slug);

      document.updated = member?.updated || document.updated;
      document.handbookContext = {
        'chapterCount': handbook.chapters.length,
        'chapterNumber': source.handbook ? null : Number(source.series.order),
        'chapters': handbook.chapters.map((chapter) => {
          return {
            'order': Number(chapter.series.order),
            'slug': chapter.slug,
            'subtitle': chapter.subtitle,
            'title': chapter.title,
            'updated': chapter.updated || chapter.date
          };
        }),
        'href': handbook.href,
        'indexSlug': handbook.index.slug,
        'title': handbook.index.title,
        'updated': handbook.updated,
        'updatesHref': handbook.updatesHref
      };
    }

  }

  return {
    'content': coreContent(document),
    document,
    next,
    prev
  };
}
