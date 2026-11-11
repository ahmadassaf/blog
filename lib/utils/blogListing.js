import { getPublishedPosts } from './contentlayer.js';
import { isHandbookChapter } from './handbooks.js';
import { groupPostSeries } from './postSeries.js';

/** Resolve opt-in series before filtering, keeping handbook membership type-based. */
export const getBlogListing = (documents = [], matches = () => true) => {
  const published = getPublishedPosts(documents);
  const ordinaryRows = groupPostSeries(published.filter((post) => post.type === 'Post' && !post.handbook), matches);
  const handbookRows = groupPostSeries(published.filter((post) => isHandbookChapter(post) || (post.type === 'Post' && post.handbook)), matches);

  return { 'posts': getPublishedPosts([ ...ordinaryRows, ...handbookRows ]) };
};
