'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { cn } from '@/components/utils/TailwindUtils';

export const Highlight = ({ children, className }) => (
  <motion.span
    initial={{
      'backgroundSize': '0% 100%'
    }}
    animate={{
      'backgroundSize': '100% 100%'
    }}
    transition={{
      'delay': 0.5,
      'duration': 2,
      'ease': 'linear'
    }}
    style={{
      'backgroundPosition': 'left center',
      'backgroundRepeat': 'no-repeat',
      'display': 'inline'
    }}
    className={ cn(
      `relative inline-block pb-1   px-1 rounded-lg bg-gradient-to-r from-blue-100 to-blue-300 dark:from-blue-400 dark:to-blue-800`, className
    ) }
  >
    {children}
  </motion.span>
);
