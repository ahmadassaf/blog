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

// External libraries
import React, { useState } from 'react';
import { IoArrowUpCircleOutline } from 'react-icons/io5';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Link from 'next/link';

// Internal utilities and data
import { cn } from '@/components/utils/TailwindUtils';
import NavigationMetadata from '@/data/meta/navigationMetadata';

/**
 * Renders a floating navigation menu with scroll-based visibility
 *
 * @description Animated floating menu that tracks scroll position and direction to show/hide intelligently.
 * Displays main navigation links and a scroll-to-top button. The component uses Framer Motion for
 * smooth animations and adapts its styling for both light and dark themes. Mobile responsive with
 * adjusted sizing and spacing.
 *
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes to apply to the menu container
 *
 * @returns {JSX.Element} Floating navigation menu with scroll-based animations
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
 * // - Hidden when at top of page (scrollYProgress < 0.05)
 * // - Shows when scrolling up
 * // - Hides when scrolling down
 */
const FloatingMenu = ({ className }) => {
  const { scrollYProgress } = useScroll();

  const [ visible, setVisible ] = useState(false);

  useMotionValueEvent(scrollYProgress, 'change', (current) => {

    if (typeof current === 'number') {
      const direction = current - scrollYProgress.getPrevious();

      if (scrollYProgress.get() < 0.05) setVisible(false);
      else (direction < 0) ? setVisible(true) : setVisible(false);
    }
  });

  /**
   * Scrolls the page to the top smoothly
   *
   * @description Handler function that smoothly scrolls the page to the top when the
   * "Back Top" button is clicked. Uses the native window.scrollTo method.
   *
   * @returns {void}
   */
  const handleScrollTop = () => {
    window.scrollTo({ 'top': 0 });
  };

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial={{ 'opacity': 1, 'y': -100 }}
        animate={{ 'opacity': visible ? 1 : 0, 'y': visible ? 0 : -100 }}
        transition={{ 'duration': 0.2 }}
        className={ cn('flex min-w-[414px] max-sm:py-2 max-sm:w-[90%] max-w-fit fixed top-4 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-white bg-black text-white dark:text-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-5000 pr-2 pl-8 py-2  items-center justify-center max-sm:ml-1! space-x-4', className) }
      >
        {NavigationMetadata.links.map((navItem, idx) => (
          <Link key={ `link=${idx}` } href={ navItem.href } className={ cn('relative dark:text-black items-center flex space-x-1 text-white dark:hover:text-blue-600 hover:text-blue-600') }>
            <span className='block text-sm'>{navItem.title}</span>
          </Link>
        ))}
        <button onClick={ () => handleScrollTop() } className='border hover:bg-blue-600 hover:text-white text-sm font-medium relative border-neutral-200 dark:border-black/[0.2] text-white dark:text-black px-4 py-2 rounded-full max-sm:p-0 max-sm:border-none'>
          <IoArrowUpCircleOutline className='h-5 w-5 inline mx-2 align-middle max-sm:m-0!'/>
          <span className='max-sm:hidden'>Back Top</span>
          <span className='absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-linear-to-r from-transparent via-blue-500 to-transparent  h-px' />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingMenu;
