'use client';

import { useRef } from 'react';
import { ArticleContentLayout, PostHeader, TableOfContents } from '@gaudi/design-system';
import { ReadingIndicator } from '@gaudi/design-system/core/ReadingIndicator';
import { SmoothScroll } from '@gaudi/design-system/core/ScrollArea';

// Short posts read fine without a contents rail.
const hasTableOfContents = (toc) => toc.length > 3;

/**
 * The reading frame for posts and projects, composed from Gaudi's article parts: the post header,
 * a collapsible contents rail whose table of contents follows the article, reading progress across
 * the article only, and eased wheel scrolling. data-article-frame turns off the site's blurred page
 * edge (app/responsive.css) so articles read sharp to the bottom.
 */
export default function PostArticleFrame({ children, content, locale, padding, toc }) {
  const articleRef = useRef(null);
  const hasToc = hasTableOfContents(toc);

  return (
    <div ref={ articleRef } data-article-frame=''>
      <ReadingIndicator contentRef={ articleRef } label='Reading progress' />
      <PostHeader frontMatter={ content } siteMetadata={{ locale }} />
      <ArticleContentLayout
        collapsibleAside
        defaultAsideOpen={ content.tableOfContents === true }
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
