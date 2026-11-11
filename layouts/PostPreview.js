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
        {frontMatter.seriesPosts?.length > 0 && (
          <details className={ styles.series }>
            <summary className={ styles.seriesToggle }>
              <span className={ styles.expandLabel }>Show {frontMatter.seriesPosts.length} {frontMatter.handbook ? 'chapter' : 'more post'}{frontMatter.seriesPosts.length === 1 ? '' : 's'}</span>
              <span className={ styles.collapseLabel }>Hide {frontMatter.handbook ? 'chapters' : 'series posts'}</span>
              <Icon name='ChevronDown' decorative size='sm' className={ styles.seriesIcon } />
            </summary>
            <ol aria-label={ `${frontMatter.handbook ? 'Chapters' : 'More posts'} in ${frontMatter.series.title}` } className={ styles.seriesList }>
              {frontMatter.seriesPosts.map((part, index) => (
                <li key={ part.slug } className={ styles.part }>
                  <span aria-hidden='true' className={ styles.partNumber }>{index + (frontMatter.handbook ? 1 : 2)}</span>
                  <Link href={ `/blog/${part.slug}` } tone='neutral' className={ styles.partLink }>{part.title}</Link>
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
