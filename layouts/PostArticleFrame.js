'use client';

import { useMemo, useRef, useState } from 'react';
import { ArticleContentLayout, Icon, PostHeader, TableOfContents, Toggle } from '@gaudi/design-system';
import { SmoothScroll } from '@gaudi/design-system/core/ScrollArea';
import Tooltip from '@gaudi/design-system/core/Tooltip';
import PageChrome from '@gaudi/design-system/layout/PageChrome';

import { slugify, titleFromSlug } from '@/lib/utils/slugs.mjs';

// Short posts read fine without a contents rail.
const hasTableOfContents = (toc) => toc.length > 3;

/**
 * The reading frame for posts and projects, composed from Gaudi's article parts: the post header,
 * a contents rail whose table of contents follows the article, and eased wheel scrolling. A sidebar
 * icon in the header shows and hides the contents; hiding them lets the article take the full width. PageChrome turns off the site's blurred page edge so
 * articles read sharp to the bottom.
 */
export default function PostArticleFrame({ children, content, locale, padding, toc }) {
  const articleRef = useRef(null);
  const hasToc = hasTableOfContents(toc);
  const [ contentsOpen, setContentsOpen ] = useState(content.tableOfContents === true);

  // The header leaves out the reading time and links the category to its listing.
  const frontMatter = useMemo(() => {
    const category = content.category ? { 'href': `/blog/categories/${slugify(content.category)}`, 'label': titleFromSlug(content.category) } : undefined;

    return { ...content, category, 'readingTime': undefined };
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
      <PageChrome scrollEdges={ false } />
      <PostHeader
        frontMatter={ frontMatter }
        siteMetadata={{ locale }}
        tocControl={ contentsToggle }
        classNames={{ 'title': 'text-5xl md:text-6xl' }}
      />
      <ArticleContentLayout
        collapsibleAside
        asideOpen={ contentsOpen }
        onAsideOpenChange={ setContentsOpen }
        showAsideToggleControl={ false }
        hasAside={ hasToc }
        aside={ hasToc ? <TableOfContents toc={ toc } contentRef={ articleRef } aria-label='Post contents' /> : null }
        padding={ padding }
      >
        {children}
      </ArticleContentLayout>
      <SmoothScroll />
    </div>
  );
}
