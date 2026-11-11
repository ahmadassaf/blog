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
    'href': post.handbook ? '/blog/handbook' : `/blog/${post.slug}`
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
      <div className={ styles.footer }>
        {frontMatter.chapters?.length > 0 && (
          <details className={ styles.chapters }>
            <summary className={ styles.chaptersToggle }>
              <span className={ styles.expandLabel }>Show {frontMatter.chapters.length} {frontMatter.chapters.length === 1 ? 'chapter' : 'chapters'}</span>
              <span className={ styles.collapseLabel }>Hide chapters</span>
              <Icon name='ChevronDown' decorative size='sm' className={ styles.chaptersIcon } />
            </summary>
            <ol aria-label={ `Chapters of ${frontMatter.title}` } className={ styles.chapterList }>
              {frontMatter.chapters.map((chapter, index) => (
                <li key={ chapter.slug } className={ styles.chapter }>
                  <span aria-hidden='true' className={ styles.chapterNumber }>{index + 1}</span>
                  <Link href={ `/blog/${chapter.slug}` } tone='neutral' className={ styles.chapterLink }>{chapter.title}</Link>
                </li>
              ))}
            </ol>
          </details>
        )}
        <Link href={ frontMatter.handbook ? '/blog/handbook' : `/blog/${frontMatter.slug}` } tone='blue' className={ styles.readMore } aria-label={ `Read ${frontMatter.title}` }>
          {frontMatter.handbook ? 'Read handbook' : 'Read article'}
          <Icon name='ArrowRight' size='sm' decorative />
        </Link>
      </div>
    ) }
  />
);

export default PostPreview;
