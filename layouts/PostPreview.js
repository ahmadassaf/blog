/**
 * Post Preview Component
 *
 * @description Thin wrapper around the design-system post row. Gaudi's Post takes prepared front
 * matter, so the raw contentlayer document gets its title link and a linked category here, and the
 * blog's configured locale keeps dates deterministic.
 */

import { Post } from '@gaudi/design-system';

import siteMetadata from '@/data/meta/metadata';
import { slugify, titleFromSlug } from '@/lib/utils/slugs.mjs';

const prepare = (post) => {
  return {
    ...post,
    'category': post.category ? { 'href': `/blog/categories/${slugify(post.category)}`, 'label': titleFromSlug(post.category) } : undefined,
    'href': `/blog/${post.slug}`
  };
};

const PostPreview = ({ frontMatter, titleAs }) => <Post frontMatter={ prepare(frontMatter) } locale={ siteMetadata.locale || 'en-US' } titleAs={ titleAs } />;

export default PostPreview;
