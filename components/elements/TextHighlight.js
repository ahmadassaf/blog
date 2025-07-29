/**
 * Text Highlight Component
 *
 * @description An animated text highlighting component that creates a visual emphasis effect using Framer Motion.
 * Provides a smooth background color animation that expands from left to right, creating an engaging
 * highlight effect for important text content.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { cn } from '@/components/utils/TailwindUtils';

/**
 * Animated text highlight component
 *
 * @description Creates an animated background highlight effect that expands from 0% to 100% width
 * over 2 seconds with a 0.3 second delay. Uses a gradient background that adapts to light/dark themes.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The text content to be highlighted
 * @param {string} [props.className] - Additional CSS classes to apply to the component
 *
 * @returns {JSX.Element} The rendered animated highlight component
 *
 * @example
 * <TextHighlight className="text-lg font-bold">
 *   Important highlighted text
 * </TextHighlight>
 */
export const TextHighlight = ({ children, className }) => (
  <motion.span
    initial={{ 'backgroundSize': '0% 100%' }}
    animate={{ 'backgroundSize': '100% 100%' }}
    transition={{ 'delay': 0.3, 'duration': 2, 'ease': 'linear' }}
    style={{ 'backgroundPosition': 'left center', 'backgroundRepeat': 'no-repeat', 'display': 'inline' }}
    className={ cn(`relative inline-block pb-1   px-1 rounded-lg bg-linear-to-r from-blue-100 to-blue-300 dark:from-blue-400 dark:to-blue-800`, className) }>

    {children}

  </motion.span>
);
