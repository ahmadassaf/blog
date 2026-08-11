/**
 * Post Preview Component
 *
 * @description Thin wrapper around the design-system post row that binds the
 * blog's configured locale so dates render deterministically.
 */

import { Post } from '@gaudi/design-system';

import siteMetadata from '@/data/meta/metadata';

const PostPreview = ({ frontMatter }) => <Post frontMatter={ frontMatter } locale={ siteMetadata.locale || 'en-US' } />;

export default PostPreview;
