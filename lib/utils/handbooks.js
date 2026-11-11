/**
 * Handbook Grouping
 *
 * @description A handbook is a series whose index post sets `handbook: true`.
 * In listings the index post stands for the whole handbook and carries its
 * chapters (every other post in the same series), so a list shows one
 * collapsible row instead of one row per chapter.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

/**
 * Folds handbook chapters into their index post
 *
 * @param {Array<Object>} [posts=[]] - Listing posts, already filtered and sorted
 * @returns {Array<Object>} The same list without chapter posts; each handbook
 * index gains a `chapters` array ordered by `series.order`
 *
 * @example
 * const rows = groupHandbooks(getPublishedPosts(allPosts));
 */
export const groupHandbooks = (posts = []) => {
  const handbookTitles = new Set(posts
    .filter((post) => post.handbook && post.series?.title)
    .map((post) => post.series.title));

  if (!handbookTitles.size) return posts;

  const isChapter = (post) => !post.handbook && handbookTitles.has(post.series?.title);

  return posts
    .filter((post) => !isChapter(post))
    .map((post) => {
      if (!post.handbook || !post.series?.title) return post;

      const chapters = posts
        .filter((candidate) => isChapter(candidate) && candidate.series.title === post.series.title)
        .sort((first, second) => Number(first.series.order) - Number(second.series.order));

      return { ...post, chapters };
    });
};

/**
 * The listing rows for one tag, with handbooks folded
 *
 * @description A handbook index appears when it or any of its chapters carries
 * the tag, and always lists every chapter. Chapters never appear on their own
 * while their index is published.
 *
 * @param {Array<Object>} posts - Sorted, published posts
 * @param {Function} hasTag - Predicate that tells whether a post carries the tag
 * @returns {Array<Object>} Rows for the tag listing
 *
 * @example
 * const rows = handbookRowsForTag(posts, (post) => post.tags.includes('AI'));
 */
export const handbookRowsForTag = (posts, hasTag) => groupHandbooks(posts)
  .filter((post) => hasTag(post) || post.chapters?.some(hasTag));
