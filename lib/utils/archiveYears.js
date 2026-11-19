import { slugify } from './slugs.mjs';

const olderLabel = 'Long time ago';

/** Preserve publication order and list revisions separately in the year they happened. */
export const getArchiveYears = (posts, { categorySlug, tagSlug } = {}, today = new Date()) => {
  const cutoffDate = new Date(today);

  cutoffDate.setUTCFullYear(cutoffDate.getUTCFullYear() - 2);
  const cutoff = cutoffDate.toISOString().slice(0, 10);
  const groups = new Map();

  const groupFor = (date) => {
    const label = date < cutoff ? olderLabel : date.slice(0, 4);

    if (!groups.has(label)) groups.set(label, { label, 'older': label === olderLabel, 'posts': [], 'updates': new Map() });

    return groups.get(label);
  };

  for (const post of [ ...posts ].sort((a, b) => b.date.localeCompare(a.date))) {
    groupFor(post.date.slice(0, 10)).posts.push(post);

    /*
     * A collapsed series may contain articles with other categories or tags. Its
     * publication row stays intact, but revisions must match the archive's filter.
     */
    for (const article of [ post, ...(post.seriesPosts || []) ]) {
      const updatedAt = article.updatedAt?.slice(0, 10);

      if (article.type !== 'Post' || !updatedAt || updatedAt <= article.date.slice(0, 10)) continue;
      if (categorySlug && categorySlug !== slugify(article.category)) continue;
      if (tagSlug && !article.tags?.some((tag) => slugify(tag) === tagSlug)) continue;

      const { updates } = groupFor(updatedAt);
      const year = updatedAt.slice(0, 4);

      if (!updates.has(year)) updates.set(year, []);

      updates.get(year).push(article);
    }
  }

  return [ ...groups.values() ]
    .sort((a, b) => Number(a.older) - Number(b.older) || b.label.localeCompare(a.label))
    .map((group) => {
      return {
        ...group,
        'updates': [ ...group.updates ].sort(([ a ], [ b ]) => b.localeCompare(a)).map(([ year, articles ]) => {
          return {
            'articles': articles.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || a.title.localeCompare(b.title)),
            year
          };
        })
      };
    });
};
