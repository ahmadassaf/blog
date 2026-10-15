'use client';

import { useMemo, useRef, useState } from 'react';
import { ArticleContentLayout, Button, Icon, PostHeader, TableOfContents } from '@gaudi/design-system';
import { ReadingIndicator } from '@gaudi/design-system/core/ReadingIndicator';
import { SmoothScroll } from '@gaudi/design-system/core/ScrollArea';
import Tooltip from '@gaudi/design-system/core/Tooltip';
import { cn } from '@gaudi/design-system/utilities/cn';

// Short posts read fine without a contents rail.
const hasTableOfContents = (toc) => toc.length > 3;

/**
 * The reading frame for posts and projects, composed from Gaudi's article parts: the post header,
 * a contents rail whose table of contents follows the article, reading progress across the article
 * only, and eased wheel scrolling. A sidebar icon in the header shows and hides the contents; hiding
 * them lets the article take the full width. data-article-frame turns off the site's blurred
 * page edge (app/responsive.css) so articles read sharp to the bottom.
 */
export default function PostArticleFrame({ children, content, locale, padding, toc }) {
  const articleRef = useRef(null);
  const hasToc = hasTableOfContents(toc);
  const [ contentsOpen, setContentsOpen ] = useState(content.tableOfContents === true);

  // The header leaves out the reading time.
  const frontMatter = useMemo(() => {
    return { ...content, 'readingTime': undefined };
  }, [ content ]);

  // A sidebar icon in the header opens and closes the contents; it stays highlighted while open.
  const contentsLabel = contentsOpen ? 'Hide contents' : 'Show contents';
  const contentsToggle = hasToc ? (
    <Tooltip content={ contentsLabel }>
      <Button
        variant='ghost'
        tone='neutral'
        size='icon'
        aria-label={ contentsLabel }
        aria-expanded={ contentsOpen }
        className={ cn('size-8 text-text-muted', contentsOpen && 'bg-surface-muted text-text') }
        onClick={ () => setContentsOpen((open) => !open) }
      >
        <Icon name='PanelRightOpen' size='sm' decorative />
      </Button>
    </Tooltip>
  ) : null;

  return (
    <div ref={ articleRef } data-article-frame=''>
      <ReadingIndicator contentRef={ articleRef } label='Reading progress' />
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
