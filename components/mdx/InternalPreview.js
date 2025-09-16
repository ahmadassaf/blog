/**
 * Internal Preview Component
 *
 * @description Displays rich preview cards for internal blog posts with metadata,
 * tags, excerpts, and category information. Used for cross-referencing content
 * within the blog.
 *
 * @author Ahmad Assaf
 * @version 2.1.0
 */

'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CalendarDaysIcon, ClockIcon } from '@heroicons/react/20/solid';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

/**
 * Internal link preview for blog posts
 *
 * @param {Object} props - Component props
 * @param {string} props.slug - The blog post slug (e.g., 'gaudi-my-bash-framework')
 * @param {string} props.category - The blog post category (e.g., 'engineering')
 * @param {string} [props.title] - Optional custom title override
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.showImage] - Show hover card preview (default: true)
 */
const InternalPreview = ({
  slug,
  category,
  'title': customTitle,
  className = '',
  showImage = true
}) => {
  const [ post, setPost ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const [ isHovered, setIsHovered ] = useState(false);
  const [ position, setPosition ] = useState({ 'left': 0, 'top': 0 });
  const linkRef = useRef(null);
  const timeoutRef = useRef(null);

  // Construct the post URL for navigation
  const postUrl = `/blog/${category}/${slug}`;

  // Fetch post data
  useEffect(() => {
    const fetchPost = async() => {
      try {
        setLoading(true);

        // Import all posts
        const { allPosts } = await import('../../.contentlayer/generated/index.mjs');

        /*
         * The slug in ContentLayer is stored as "category/{category}/{slug}"
         * So we need to construct it properly
         */
        const targetSlug = `category/${category}/${slug}`;

        // Find the post by matching the slug
        const foundPost = allPosts.find((p) => p.slug === targetSlug);

        if (foundPost) {
          setPost(foundPost);
        } else {

          /*
           * Try alternative matching strategies
           * Sometimes the slug might not have the "category/" prefix
           */
          const alternativePost = allPosts.find((p) => p.slug === `${category}/${slug}` ||
            (p.slug.endsWith(slug) && p.category === category));

          if (alternativePost)
            setPost(alternativePost);
          else
            throw new Error(`Post not found: ${category}/${slug}`);

        }

        setError(null);
      } catch (err) {
        console.error('Error fetching internal post:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug && category)
      fetchPost();

  }, [ slug, category ]);

  // Handle mouse enter with delay
  const handleMouseEnter = (event) => {
    if (!showImage || !post) return;

    // Clear any existing timeout
    if (timeoutRef.current)
      clearTimeout(timeoutRef.current);

    // Get cursor position
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Calculate optimal position near cursor
    const cardWidth = 384;
    const cardHeight = 300;
    const offset = 10;

    let left = mouseX + offset;
    let top = mouseY + offset;

    // Adjust if card would go off screen
    if (left + cardWidth > window.innerWidth)
      left = mouseX - cardWidth - offset;

    if (top + cardHeight > window.innerHeight)
      top = mouseY - cardHeight - offset;

    // Ensure card stays within viewport
    left = Math.max(8, Math.min(left, window.innerWidth - cardWidth - 8));
    top = Math.max(8, Math.min(top, window.innerHeight - cardHeight - 8));

    setPosition({ left, top });

    // Show hover with a small delay
    timeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 300);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {

    // Clear any pending timeout
    if (timeoutRef.current)
      clearTimeout(timeoutRef.current);

    setIsHovered(false);
  };

  // Cleanup timeout on unmount and handle scroll
  useEffect(() => {
    const handleScroll = () => {

      // Hide popover on scroll
      if (isHovered)
        setIsHovered(false);

      // Clear any pending timeout
      if (timeoutRef.current)
        clearTimeout(timeoutRef.current);

    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, true);

    return () => {

      // Remove scroll listener
      window.removeEventListener('scroll', handleScroll, true);

      // Clear timeout
      if (timeoutRef.current)
        clearTimeout(timeoutRef.current);

    };
  }, [ isHovered ]);

  // Format date
  const formattedDate = useMemo(() => {
    if (!post?.date) return '';

    return new Date(post.date).toLocaleDateString('en-US', {
      'day': 'numeric',
      'month': 'long',
      'year': 'numeric'
    });
  }, [ post?.date ]);

  // Format reading time
  const readingTime = useMemo(() => {
    if (!post?.readingTime?.text) return '';

    return post.readingTime.text;
  }, [ post?.readingTime ]);

  // Get display title
  const displayTitle = customTitle || post?.title || slug;

  // Loading state
  if (loading)
    return (
      <span className={ `inline-flex items-center ${className}` }>
        <span className='inline-block h-4 w-4 mr-2 bg-blue-200 rounded animate-pulse' />
        <span className='inline-block h-4 w-32 bg-blue-200 rounded animate-pulse' />
      </span>
    );

  // Error state
  if (error || !post)
    return (
      <Link
        href={ postUrl }
        className={ `text-red-600 hover:text-red-800 transition-colors ${className}` }
      >
        {displayTitle} (not found)
      </Link>
    );

  // Simple link without hover card
  if (!showImage)
    return (
      <Link
        href={ postUrl }
        className={ `text-blue-600 hover:text-blue-800 transition-colors font-medium ${className}` }
      >
        {displayTitle}
      </Link>
    );

  // Render hover card with portal
  const hoverCard = isHovered && typeof document !== 'undefined' ? createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ 'opacity': 0, 'y': 10 }}
        animate={{ 'opacity': 1, 'y': 0 }}
        exit={{ 'opacity': 0, 'y': 10 }}
        transition={{ 'duration': 0.2 }}
        className='fixed z-[9999] w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 pointer-events-auto'
        style={{
          'left': `${position.left}px`,
          'maxWidth': 'min(384px, calc(100vw - 2rem))',
          'top': `${position.top}px`
        }}
        onMouseEnter={ () => setIsHovered(true) }
        onMouseLeave={ handleMouseLeave }
      >
        {/* Category Badge */}
        <div className='mb-3'>
          <span className='inline-block px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded'>
            {category}
          </span>
        </div>

        {/* Title */}
        <h3 className='text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2'>
          {post.title}
        </h3>

        {/* Summary */}
        {post.summary && (
          <p className='text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3'>
            {post.summary}
          </p>
        )}

        {/* Meta Information */}
        <div className='flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3'>
          {formattedDate && (
            <div className='flex items-center gap-1'>
              <CalendarDaysIcon className='h-3 w-3' />
              <span>{formattedDate}</span>
            </div>
          )}
          {readingTime && (
            <div className='flex items-center gap-1'>
              <ClockIcon className='h-3 w-3' />
              <span>{readingTime}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className='flex flex-wrap gap-2'>
            {post.tags.slice(0, 5).map((tag) => (
              <span
                key={ tag }
                className='inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400'
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 5 && (
              <span className='text-xs text-gray-500 dark:text-gray-400 self-center'>
                +{post.tags.length - 5} more
              </span>
            )}
          </div>
        )}
      </motion.div>
    </AnimatePresence>, document.body
  ) : null;

  return (
    <>
      <Link
        ref={ linkRef }
        href={ postUrl }
        className={ `text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ${className}` }
        onMouseEnter={ handleMouseEnter }
        onMouseLeave={ handleMouseLeave }
      >
        {displayTitle}
      </Link>
      {hoverCard}
    </>
  );
};

export default InternalPreview;
