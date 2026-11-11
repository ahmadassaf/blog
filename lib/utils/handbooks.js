/**
 * Handbook Grouping
 *
 * @description A handbook is a series whose index post sets `handbook: true`.
 * In listings the index post stands for the whole handbook and carries its
 * HandbookChapter documents in the same series, so a list shows one
 * collapsible row instead of one row per chapter.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { toString } from 'mdast-util-to-string';
import { remark } from 'remark';

import { coreContent, published } from './contentlayer.js';

export const isHandbookChapter = (document) => document.type === 'HandbookChapter';

const isHandbookIndex = (document) => document.type === 'Post' && document.handbook && document.series?.title;

const monthNames = [ 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december' ];

/** Accept a real calendar date, without browser-dependent date parsing. */
const calendarDate = (value) => {
  if (typeof value !== 'string') return null;

  const date = value.slice(0, 10);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;

  const timestamp = Date.parse(`${date}T00:00:00Z`);

  return Number.isFinite(timestamp) && new Date(timestamp).toISOString().slice(0, 10) === date ? date : null;
};

const changeDate = (value) => {
  const isoDate = calendarDate(value);

  if (isoDate) return isoDate;

  const parts = /^(?<day>\d{1,2})\s+(?<month>[A-Za-z]+)\s+(?<year>\d{4})$/.exec(value)?.groups;

  if (!parts) return null;

  const month = monthNames.indexOf(parts.month.toLowerCase()) + 1;

  if (!month) return null;

  return calendarDate(`${parts.year}-${String(month).padStart(2, '0')}-${parts.day.padStart(2, '0')}`);
};

/**
 * Read the authored changelog once for chapter history and the combined feed.
 * Markdown's syntax tree keeps code examples, quoted headings and other sections out.
 * Summaries retain the visible text of the original entry; MDX remains unchanged.
 */
export const extractHandbookChanges = (markdown = '') => {
  const tree = remark().parse(markdown);
  const changes = [];
  let changelogDepth = null;

  for (const node of tree.children) {
    if (node.type === 'heading') {
      if (changelogDepth !== null && node.depth <= changelogDepth) break;
      if (changelogDepth === null && toString(node).trim().toLowerCase() === 'changelog') changelogDepth = node.depth;
    }

    if (changelogDepth === null || node.type !== 'list') continue;

    for (const item of node.children) {
      const paragraph = item.children.find((child) => child.type === 'paragraph');
      const entry = /^(?<date>\d{4}-\d{2}-\d{2}|\d{1,2}\s+[A-Za-z]+\s+\d{4}):\s*(?<summary>[\s\S]+)$/.exec(toString(paragraph || {}).trim())?.groups;
      const date = entry ? changeDate(entry.date) : null;

      if (date && entry.summary.trim()) changes.push({ date, 'summary': entry.summary.trim() });
    }
  }

  return changes;
};

/** A changelog edit updates handbook dates without duplicating the date in frontmatter. */
const withLatestHandbookDate = (post) => {
  const dates = [ post.date, post.updated, ...(post.changes || []).map((change) => change.date) ]
    .map(calendarDate)
    .filter(Boolean)
    .sort();

  return { ...post, 'updated': dates.at(-1) || null };
};

/**
 * The published handbook, its reading order and its curated milestones.
 * Heavy generated bodies never enter the collection passed to view components.
 */
export const getHandbook = (posts = []) => {
  const entries = coreContent(published(posts));
  const sourceIndex = entries.find(isHandbookIndex);

  if (!sourceIndex) return null;

  const index = withLatestHandbookDate(sourceIndex);
  const chapters = entries
    .filter((post) => isHandbookChapter(post) && post.series?.title === index.series.title)
    .sort((first, second) => Number(first.series.order) - Number(second.series.order))
    .map(withLatestHandbookDate);
  const members = [ index, ...chapters ];

  // Public updates are deliberately authored in the index; chapter edits only affect freshness.
  const updates = (index.changes || [])
    .filter((change) => calendarDate(change.date) && typeof change.summary === 'string' && change.summary.trim())
    .map((change) => {
      return {
        'date': calendarDate(change.date),
        'order': 0,
        'slug': index.slug,
        'summary': change.summary,
        'title': index.title
      };
    })
    .sort((first, second) => second.date.localeCompare(first.date));
  const dates = members.map((post) => post.updated)
    .filter(Boolean)
    .sort();

  return {
    chapters,
    'href': '/blog/handbook',
    index,
    'updated': dates.at(-1) || null,
    updates,
    'updatesHref': '/blog/handbook/updates'
  };
};

/**
 * Folds handbook chapters into their index post
 *
 * @param {Array<Object>} [posts=[]] - Listing posts, already filtered and sorted
 * @returns {Array<Object>} The same list without chapter posts; each handbook
 * index gains a `chapters` array ordered by `series.order`
 *
 * @example
 * const rows = groupHandbooks(getPublishedPosts(allBlogDocuments));
 */
export const groupHandbooks = (posts = []) => {
  const handbookTitles = new Set(posts
    .filter(isHandbookIndex)
    .map((post) => post.series.title));

  if (!handbookTitles.size) return posts;

  const isChapter = (post) => isHandbookChapter(post) && handbookTitles.has(post.series?.title);

  return posts
    .filter((post) => !isChapter(post))
    .map((post) => {
      if (!isHandbookIndex(post)) return post;

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
