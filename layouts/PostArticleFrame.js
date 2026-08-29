'use client';

import { useState } from 'react';
import { ArticleContentLayout,
  Button,
  Icon,
  PostHeader,
  TableOfContents } from '@gaudi/design-system';

const shouldShowTableOfContents = (content) => content.tableOfContents === true;
const hasTableOfContents = (toc) => toc.length > 3;

const ContentsToggle = ({ isOpen, onToggle }) => (
  <span className='hidden items-center gap-3 lg:inline-flex'>
    <Button
      variant='subtle'
      tone='gray'
      size='xs'
      aria-expanded={ isOpen }
      aria-label={ `${isOpen ? 'Hide' : 'Show'} table of contents` }
      aria-pressed={ isOpen }
      className='ds-control-hit-target relative min-h-8 gap-2 p-0 text-xs font-normal'
      onClick={ onToggle }
    >
      <Icon name='List' size='sm' decorative className='text-gray-400' />
      <span>{isOpen ? 'Hide contents' : 'Show contents'}</span>
    </Button>
    <span aria-hidden='true' className='text-gray-300 dark:text-gray-600'>·</span>
  </span>
);

export default function PostArticleFrame({
  children,
  content,
  locale,
  padding,
  toc
}) {
  const hasToc = hasTableOfContents(toc);
  const [ isTocOpen, setIsTocOpen ] = useState(shouldShowTableOfContents(content));

  return (
    <>
      <PostHeader
        frontMatter={ content }
        siteMetadata={{ locale }}
        tocControl={ hasToc ? <ContentsToggle isOpen={ isTocOpen } onToggle={ () => setIsTocOpen((current) => !current) } /> : null }
      />

      <ArticleContentLayout
        aside={ isTocOpen ? <TableOfContents toc={ toc } /> : null }
        hasAside={ hasToc && isTocOpen }
        padding={ padding }
      >
        {children}
      </ArticleContentLayout>
    </>
  );
}
