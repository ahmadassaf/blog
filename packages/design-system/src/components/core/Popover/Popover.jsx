'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';

import { cn } from '@/components/utilities/cn';

export const Popover = forwardRef(({ children, className }, ref) => <div ref={ ref } className={ cn('relative inline-block', className) }>{children}</div>);
Popover.displayName = 'Popover';

export const PopoverTrigger = ({ children, className, onClick }) => (
  <button type='button' className={ cn('inline-flex min-h-10 items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-xs hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200 dark:hover:bg-gray-900', className) } onClick={ onClick }>
    {children}
  </button>
);

export const PopoverContent = ({ children, className }) => (
  <div className={ cn('absolute left-0 top-full z-50 mt-2 w-72 rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-lg dark:border-gray-800 dark:bg-gray-950 dark:text-gray-200', className) }>
    {children}
  </div>
);

export const PopoverRoot = ({ children, className, trigger }) => {
  const [ open, setOpen ] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);

    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  return (
    <Popover ref={ rootRef } className={ className }>
      <PopoverTrigger onClick={ () => setOpen(!open) }>{trigger}</PopoverTrigger>
      {open ? <PopoverContent>{children}</PopoverContent> : null}
    </Popover>
  );
};

export default PopoverRoot;
