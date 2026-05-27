'use client';

import { useState } from 'react';

import Button from '@/components/core/Button';
import { cn } from '@/components/utilities/cn';

const prosePadding = {
  'lg': 'pt-10 pb-8',
  'md': 'pt-8 pb-8'
};

const ArticleContentLayout = ({
  aside,
  asideToggleLabel = 'Table of contents',
  asideOpen,
  children,
  className,
  collapsibleAside = false,
  contentClassName,
  defaultAsideOpen = true,
  hasAside = Boolean(aside),
  onAsideOpenChange,
  padding = 'md',
  showAsideToggleControl = true
}) => {
  const [ uncontrolledAsideOpen, setUncontrolledAsideOpen ] = useState(defaultAsideOpen);
  const isAsideOpen = asideOpen ?? uncontrolledAsideOpen;
  const setIsAsideOpen = (value) => {
    setUncontrolledAsideOpen(value);
    onAsideOpenChange?.(value);
  };
  const showAside = hasAside && (!collapsibleAside || isAsideOpen);
  const showAsideRail = hasAside && collapsibleAside;
  const showAsideToggle = hasAside && collapsibleAside && showAsideToggleControl;
  const reserveAsideRail = showAside || showAsideToggle;
  const standaloneAside = !showAsideRail && showAside ? aside : null;

  return (
    <div className={ cn('pb-8', className) }>
      <div
        className={ cn(
          'flex flex-col divide-y divide-gray-200 dark:divide-gray-700 xl:grid xl:gap-x-6 xl:divide-y-0', reserveAsideRail ? 'xl:grid-cols-9' : 'xl:grid-cols-1'
        ) }
        style={{ 'gridTemplateRows': 'auto 1fr' }}
      >
        <div className={ cn('order-2 divide-y divide-gray-200 dark:divide-gray-700 xl:order-none xl:row-span-2 xl:pb-0', reserveAsideRail && 'xl:col-span-6') }>
          <div className={ cn('prose max-w-none dark:prose-invert', prosePadding[padding], contentClassName) }>
            {children}
          </div>
        </div>
        {showAsideRail && reserveAsideRail ? (
          <div className='order-1 border-b border-gray-100 py-3 dark:border-gray-800 xl:order-none xl:col-span-3 xl:border-b-0 xl:pt-8'>
            {showAsideToggle ? (
              <Button
                variant='subtle'
                tone='gray'
                size='xs'
                aria-expanded={ isAsideOpen }
                aria-label={ `${isAsideOpen ? 'Hide' : 'Show'} ${asideToggleLabel}` }
                className='gap-2 rounded-sm py-1 text-xs font-medium'
                onClick={ () => setIsAsideOpen(!isAsideOpen) }
              >
                <span className={ cn('h-1.5 w-1.5 rounded-full transition-colors', isAsideOpen ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600') } />
                <span>{isAsideOpen ? 'Hide contents' : 'Show contents'}</span>
              </Button>
            ) : null}
            {showAside ? aside : null}
          </div>
        ) : null}
        {standaloneAside}
      </div>
    </div>
  );
};

export default ArticleContentLayout;
