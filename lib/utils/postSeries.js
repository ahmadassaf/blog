const compareSeriesOrder = (first, second) => {
  const order = Number(first.series.order) - Number(second.series.order);

  if (order) return order;

  return first.slug < second.slug ? -1 : Number(first.slug > second.slug);
};

/**
 * Prepare published ordinary posts for an archive or filtered list.
 *
 * The lowest-order post controls its series through `series.collapseInLists`.
 * Group before filtering so a matching part can retain its series even when the
 * lead does not match. Grouped leads expose the remaining parts as `seriesPosts`.
 * Surviving rows keep their input order; parts follow series order.
 *
 * @param {Array<Object>} posts - Published ordinary posts in listing order
 * @param {(post: Object) => boolean} matches - Optional category or tag predicate
 * @returns {Array<Object>} Filtered rows, with opted-in series collapsed
 */
export const groupPostSeries = (posts = [], matches = () => true) => {
  const membersByTitle = new Map();

  for (const post of posts) {
    if (!post.series?.title) continue;

    const members = membersByTitle.get(post.series.title) || [];

    members.push(post);
    membersByTitle.set(post.series.title, members);
  }

  const collapsedByTitle = new Map();

  for (const [ title, members ] of membersByTitle) {
    members.sort(compareSeriesOrder);

    if (members.length > 1 && members[0].series.collapseInLists === true) collapsedByTitle.set(title, members);
  }

  return posts.flatMap((post) => {
    const members = collapsedByTitle.get(post.series?.title);

    if (!members) return matches(post) ? [ post ] : [];

    if (post !== members[0] || !members.some(matches)) return [];

    return [{ ...post, 'seriesPosts': members.slice(1) }];
  });
};
