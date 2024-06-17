
'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Link from 'next/link';

import { cn } from '@/components/utils/TailwindUtils';
import NavigationMetadata from '@/data/meta/navigationMetadata';
import IconUp from '@/static/icons/up.svg';

const FloatingMenu = ({ className }) => {
  const { scrollYProgress } = useScroll();

  const [ visible, setVisible ] = useState(false);

  useMotionValueEvent(scrollYProgress, 'change', (current) => {

    // Check if current is not undefined and is a number
    if (typeof current === 'number') {
      const direction = current - scrollYProgress.getPrevious();

      if (scrollYProgress.get() < 0.05) setVisible(false);
      else (direction < 0) ? setVisible(true) : setVisible(false);
    }
  });

  const handleScrollTop = () => {
    window.scrollTo({ 'top': 0 });
  };

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial={{ 'opacity': 1, 'y': -100 }}
        animate={{ 'opacity': visible ? 1 : 0, 'y': visible ? 0 : -100 }}
        transition={{ 'duration': 0.2 }}
        className={ cn('flex max-w-fit  fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-white bg-black text-white dark:text-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2  items-center justify-center space-x-4', className) }
      >
        {NavigationMetadata.links.map((navItem, idx) => (
          <Link key={ `link=${idx}` } href={ navItem.href } className={ cn('relative dark:text-black items-center flex space-x-1 text-white dark:hover:text-neutral-300 hover:text-neutral-500') }>
            <span className='block sm:hidden'>{navItem.icon}</span>
            <span className='hidden sm:block text-sm'>{navItem.title}</span>
          </Link>
        ))}
        <button onClick={ () => handleScrollTop() } className='border hover:bg-blue-600 hover:text-white text-sm font-medium relative border-neutral-200 dark:border-black/[0.2] text-white dark:text-black px-4 py-2 rounded-full'>
          <IconUp className='h-5 w-5 inline mx-2 align-middle'/>
          <span>Back Top</span>
          <span className='absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px' />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingMenu;
