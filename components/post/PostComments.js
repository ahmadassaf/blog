/**
 * PostComments Component
 *
 * @description Giscus-powered comments system component that provides threaded discussions
 * for blog posts. Features automatic theme detection that syncs with the site's dark/light mode.
 * Uses GitHub Discussions as the backend for comment storage and management.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

// External libraries
import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

/**
 * Renders a Giscus comments section with theme-aware styling
 *
 * @description Interactive comments component that automatically adapts to the current theme
 * (light/dark mode). Uses GitHub Discussions as the backend, mapping comments to posts via
 * OpenGraph title. Includes lazy loading for performance optimization.
 *
 * @returns {JSX.Element} Giscus comments component with theme detection
 *
 * @example
 * // Basic usage at the bottom of blog posts
 * <PostComments />
 *
 * @example
 * // Component automatically detects theme
 * // Dark mode: uses 'dark' theme
 * // Light mode: uses 'light' theme
 */
export default function Gisqus() {
  const { 'theme': nextTheme, resolvedTheme } = useTheme();
  const commentsTheme = nextTheme === 'dark' || resolvedTheme === 'dark' ? 'dark' : 'light';

  return (
    <Giscus
      id='comments'
      repo='ahmadassaf/blog-posts'
      repoId='MDEwOlJlcG9zaXRvcnk2MzYyMjgxNw=='
      category='Announcements'
      categoryId='DIC_kwDOA8rOoc4CZiP_'
      mapping='og:title'
      reactionsEnabled='1'
      emitMetadata='0'
      inputPosition='top'
      theme={ commentsTheme }
      lang='en'
      loading='lazy'
    />
  );
}
