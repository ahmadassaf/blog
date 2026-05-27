'use client';

import { useState } from 'react';
import { ArticleContentLayout,
  Button,
  Icon,
  PostHeader,
  TableOfContents } from '@gaudi/design-system';

const tableOfContentsClassName = 'max-xl:order-1 max-xl:block max-xl:static max-xl:col-span-full max-xl:max-h-72 max-xl:border-b max-xl:border-gray-200 max-xl:px-0 max-xl:pb-4 dark:max-xl:border-gray-700';
const hasTableOfContents = (toc) => toc.length > 3;
const shouldOpenTableOfContents = (content) => content.tableOfContents === true;

const ContentsToggle = ({ isOpen, onToggle }) => (
  <Button
    variant='subtle'
    tone='gray'
    size='sm'
    aria-expanded={ isOpen }
    aria-label={ `${isOpen ? 'Hide' : 'Show'} table of contents` }
    aria-pressed={ isOpen }
    className='gap-1.5 rounded-sm py-0.5 text-sm font-medium'
    onClick={ onToggle }
  >
    <Icon name='List' size='xs' decorative className='text-gray-400' />
    <span>{isOpen ? 'Hide contents' : 'Show contents'}</span>
  </Button>
);

export default function PostArticleFrame({
  children,
  content,
  padding,
  siteMetadata,
  toc
}) {
  const hasToc = hasTableOfContents(toc);
  const [ isTocOpen, setIsTocOpen ] = useState(shouldOpenTableOfContents(content));

  return (
    <>
      <PostHeader
        frontMatter={ content }
        siteMetadata={ siteMetadata }
        toc={ toc }
        tocControl={ hasToc ? <ContentsToggle isOpen={ isTocOpen } onToggle={ () => setIsTocOpen((current) => !current) } /> : null }
      />

      <ArticleContentLayout
        aside={ <TableOfContents toc={ toc } className={ tableOfContentsClassName } /> }
        asideOpen={ isTocOpen }
        collapsibleAside
        hasAside={ hasToc }
        padding={ padding }
        showAsideToggleControl={ false }
      >
        {children}
      </ArticleContentLayout>
    </>
  );
}
