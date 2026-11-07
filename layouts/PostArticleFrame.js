'use client';

import { useMemo, useRef, useState } from 'react';
import { ArticleContentLayout, Icon, PostHeader, TableOfContents, Toggle } from '@gaudi/design-system';
import { ScrollEdges, SmoothScroll } from '@gaudi/design-system/core/ScrollArea';
import Tooltip from '@gaudi/design-system/core/Tooltip';

import tagIndex from '@/app/content/tags.json';
import { slugify, titleFromSlug } from '@/lib/utils/slugs.mjs';

// Tag pages are built from posts only, so a project-only tag has no page to link to.
const taggedSlugs = new Set(tagIndex.map((tag) => tag.slug));

// Short posts read fine without a contents rail.
const hasTableOfContents = (toc) => toc.length > 3;

/**
 * The reading frame for posts and projects, composed from Gaudi's article parts: the post header,
 * a contents rail whose table of contents follows the article, and eased wheel scrolling. A sidebar
 * icon in the header shows and hides the contents; hiding them lets the article take the full width.
 * Only blog posts get a blurred bottom edge where more content continues below the viewport.
 */
export default function PostArticleFrame({ children, content, locale, padding, toc }) {
  const articleRef = useRef(null);
  const hasToc = hasTableOfContents(toc);
  const [ contentsOpen, setContentsOpen ] = useState(content.tableOfContents === true);

  /*
   * The header leaves out the reading time and links the category and tags to their listings.
   * PostSeriesBox wants each part as { id, href, title, series, order } plus the current post's id;
   * the resolver hands back slugs, so the slug doubles as the id here.
   */
  const frontMatter = useMemo(() => {
    const category = content.category ? { 'href': `/blog/categories/${slugify(content.category)}`, 'label': titleFromSlug(content.category) } : undefined;

    const tags = content.tags?.map((tag) => {
      return { 'href': taggedSlugs.has(slugify(tag)) ? `/blog/tags/${slugify(tag)}` : undefined, 'id': tag, 'label': tag };
    });

    const seriesPosts = content.seriesPosts?.map((part) => {
      return { ...part, 'href': `/blog/${part.slug}`, 'id': part.slug };
    });

    // Bare calendar dates: DS formatDate pins only YYYY-MM-DD strings to UTC, so ISO timestamps would shift a day west of UTC and mismatch the server.
    const date = content.date?.slice(0, 10);
    const updated = content.updated?.slice(0, 10);

    return { ...content, category, date, 'id': content.slug, 'readingTime': undefined, seriesPosts, tags, updated };
  }, [ content ]);

  // A sidebar icon in the header opens and closes the contents; Gaudi's Toggle shows it pressed while open.
  const contentsLabel = contentsOpen ? 'Hide contents' : 'Show contents';
  const contentsToggle = hasToc ? (
    <Tooltip content={ contentsLabel }>
      <Toggle size='sm' aria-label={ contentsLabel } pressed={ contentsOpen } onPressedChange={ setContentsOpen }>
        <Icon name='PanelRightOpen' size='sm' decorative />
      </Toggle>
    </Tooltip>
  ) : null;

  return (
    <div ref={ articleRef }>
      {/* The subtitle runs as wide as the title; PostHeader's 3xl cap wraps it a word early. */}
      <PostHeader
        frontMatter={ frontMatter }
        siteMetadata={{ locale }}
        tocControl={ contentsToggle }
        classNames={{ 'subtitle': 'max-w-none', 'title': 'text-5xl md:text-6xl' }}
      />
      <ArticleContentLayout
        collapsibleAside
        asideOpen={ contentsOpen }
        onAsideOpenChange={ setContentsOpen }
        showAsideToggleControl={ false }
        hasAside={ hasToc }
        aside={ hasToc ? <TableOfContents toc={ toc } contentRef={ articleRef } aria-label='Post contents' /> : null }
        padding={ padding }
        contentClassName={ content.type === 'Post' ? 'post-reading' : undefined }
      >
        {children}
      </ArticleContentLayout>
      <SmoothScroll />
      {content.type === 'Post' && <ScrollEdges edges='bottom' />}
    </div>
  );
}
