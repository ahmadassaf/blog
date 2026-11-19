import { allHandbookChapters, allPosts as generatedPosts } from '../../.contentlayer/generated/index.mjs';

/*
 * UpdatedAt opts a post into public revision lists. Existing consumers use updated
 * for sorting, feeds and metadata, including posts with only a legacy date.
 */
const withRevisionDate = (post) => (post.updatedAt ? { ...post, 'updated': post.updatedAt } : post);

export const allPosts = generatedPosts.map(withRevisionDate);
export const allBlogDocuments = [ ...allPosts, ...allHandbookChapters.map(withRevisionDate) ];
