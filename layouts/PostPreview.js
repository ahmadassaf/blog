/**
 * Post Preview Component
 *
 * @description Card wrapper around the design-system post entry. Gaudi's Post takes prepared front
 * matter, so the raw contentlayer document gets its title link and a linked category here, and the
 * blog's configured locale keeps dates deterministic.
 */

import { Icon, Link, Post } from '@gaudi/design-system';

import siteMetadata from '@/data/meta/metadata';
import { slugify, titleFromSlug } from '@/lib/utils/slugs.mjs';

import styles from './PostPreview.module.css';

const prepare = (post) => {
  return {
    ...post,
    'category': post.category ? { 'href': `/blog/categories/${slugify(post.category)}`, 'label': titleFromSlug(post.category) } : undefined,
    'date': post.date?.slice(0, 10),
    'href': `/blog/${post.slug}`
  };
};

const PostPreview = ({ frontMatter, titleAs }) => (
  <Post
    frontMatter={ prepare(frontMatter) }
    locale={ siteMetadata.locale || 'en-US' }
    titleAs={ titleAs }
    layout='stacked'
    className={ styles.card }
    footer={ (
      <Link href={ `/blog/${frontMatter.slug}` } tone='blue' className={ styles.readMore } aria-label={ `Read ${frontMatter.title}` }>
        Read article
        <Icon name='ArrowRight' size='sm' decorative />
      </Link>
    ) }
  />
);

export default PostPreview;
