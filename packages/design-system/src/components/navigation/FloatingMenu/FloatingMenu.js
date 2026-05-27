/**
 * FloatingMenu Component
 *
 * @description Floating/sticky navigation component that appears and disappears based on scroll behavior.
 * This component provides quick access to main navigation links and a "scroll to top" button.
 * Features smooth animations, responsive design, and intelligent scroll-based visibility logic.
 * The menu appears when scrolling up and hides when scrolling down, with a minimum scroll threshold.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

import React, { useEffect, useState } from 'react';

import Button from '@/components/core/Button';
import Icon from '@/components/core/Icon';
import Link from '@/components/core/Link';
import { cn } from '@/components/utilities/TailwindUtils';
import NavigationMetadata from '@/data/meta/navigationMetadata';

/**
 * Renders a floating navigation menu with scroll-based visibility
 *
 * @description Simple floating menu that tracks scroll position and direction to show/hide intelligently.
 * Displays main navigation links and a scroll-to-top button. Adapts its styling for both light and dark themes.
 * Mobile responsive with adjusted sizing and spacing.
 *
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes to apply to the menu container
 *
 * @returns {JSX.Element} Floating navigation menu with scroll-based visibility
 *
 * @example
 * // Basic usage
 * <FloatingMenu />
 *
 * @example
 * // With custom styling
 * <FloatingMenu className="custom-floating-menu" />
 *
 * @example
 * // The menu automatically shows/hides based on scroll:
 * // - Hidden when at top of page
 * // - Shows when scrolling up
 * // - Hides when scrolling down
 */
const FloatingMenu = ({ className }) => {
  const [ visible, setVisible ] = useState(false);
  const [ lastScrollY, setLastScrollY ] = useState(0);
  const [ mounted, setMounted ] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50)
        setVisible(false);
      else if (currentScrollY < lastScrollY)
        setVisible(true);
      else if (currentScrollY > lastScrollY)
        setVisible(false);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { 'passive': true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ lastScrollY, mounted ]);

  /**
   * Scrolls the page to the top smoothly
   *
   * @description Handler function that smoothly scrolls the page to the top when the
   * "Back Top" button is clicked. Uses the native window.scrollTo method.
   *
   * @returns {void}
   */
  const handleScrollTop = () => {
    window.scrollTo({ 'behavior': 'smooth', 'top': 0 });
  };

  return (
    <div
      className={ cn(
        'flex min-w-[414px] max-sm:py-2 max-sm:w-[90%] max-w-fit fixed top-4 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-white bg-black text-white dark:text-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-5000 pr-2 pl-8 py-2 items-center justify-center max-sm:ml-1! space-x-4 transition-all duration-200', mounted && visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none', className
      ) }
    >
      {NavigationMetadata.links.map((navItem, idx) => (
        <Link key={ `link=${idx}` } href={ navItem.href } className={ cn('relative dark:text-black items-center flex space-x-1 text-white dark:hover:text-blue-600 hover:text-blue-600') }>
          <span className='block text-sm'>{navItem.title}</span>
        </Link>
      ))}
      <Button variant='outline' tone='neutral' size='sm' onClick={ () => handleScrollTop() } className='relative rounded-full border-neutral-200 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 hover:text-white dark:border-black/[0.2] dark:text-black max-sm:border-none max-sm:p-0' aria-label='Back to top'>
        <Icon name='ArrowUpCircle' size='md' decorative className='inline mx-2 align-middle max-sm:m-0!'/>
        <span className='max-sm:hidden'>Back Top</span>
        <span className='absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-linear-to-r from-transparent via-blue-500 to-transparent h-px' />
      </Button>
    </div>
  );
};

export default FloatingMenu;
