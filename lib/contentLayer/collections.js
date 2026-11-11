import { allHandbookChapters, allPosts } from '../../.contentlayer/generated/index.mjs';

/**
 * Published-state filtering is left to consumers; previews also need drafts.
 * Use this collection for routes, search and archives that include both writing types.
 * Recent posts, featured writing and RSS use Contentlayer's allPosts collection.
 */
export const allBlogDocuments = [ ...allPosts, ...allHandbookChapters ];
