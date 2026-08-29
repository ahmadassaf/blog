/**
 * Tags Page
 *
 * @description Server page for the tags explorer. Filters out draft posts, strips
 * post objects down to the fields the client needs, and passes plain props to the
 * interactive TagsExplorer client component so no draft content ships to the browser.
 *
 * @author Ahmad Assaf
 * @version 9.0.0
 */

import { allPosts } from 'contentlayer/generated';

import TagsExplorer from '@/app/blog/tags/TagsExplorer';
import tags from '@/app/content/tags';
import { metadataGenerator } from '@/data/meta/generator/blog';
import { published, sortPosts } from '@/lib/utils/contentlayer';
import { slugify } from '@/lib/utils/slugs.mjs';

export const metadata = metadataGenerator({ 'path': '/blog/tags', 'title': 'Tags' });

/**
 * Tags page component
 *
 * @description Prepares the published (non-draft) posts as plain objects and renders
 * the interactive tags explorer.
 *
 * @returns {JSX.Element} Tags page with interactive topics explorer
 *
 * @example
 * // Rendered at /blog/tags route
 * <Tags />
 */
export default function Tags() {

  /*
   * Only the fields the drawer renders ride the RSC payload: the excerpt is
   * coalesced server-side and tag names are pre-normalized to route slugs.
   */
  const posts = sortPosts(published(allPosts)).map((post) => {
    return {
      'date': post.date,
      'slug': post.slug,
      'summary': post.summary || post.description,
      'tagSlugs': (post.tags || []).map(slugify),
      'title': post.title
    };
  });

  return <TagsExplorer tags={ tags } posts={ posts } />;
}
