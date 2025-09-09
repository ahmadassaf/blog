
/**
 * Link Preview Component
 *
 * @description An interactive link preview component that fetches and displays metadata for external URLs.
 * It shows a hover card with preview images, titles, and favicons, providing rich link previews
 * similar to social media platforms. Includes loading states and error handling for unreachable URLs.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

import React from 'react';
import { LinkIcon, LinkSlashIcon } from '@heroicons/react/20/solid';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import ImageFallback from '@/components/elements/ImageFallback';
import { cn } from '@/components/utils/TailwindUtils';

// Global cache for URL previews
const previewCache = new Map();

/**
 * Interactive link preview component with hover card functionality
 *
 * @description Fetches metadata for external URLs and displays rich previews with images, titles, and favicons.
 * Features smooth animations, loading states, error handling, and responsive hover interactions.
 * The component automatically handles protocol normalization and fallback states.
 *
 * @param {Object} props - Component props
 * @param {string} props.url - The URL to preview and link to
 * @param {string} [props.title] - Optional custom title to override the fetched title
 * @param {string} [props.className] - Additional CSS classes for styling
 * @param {number} [props.width=200] - Width of the preview image in pixels
 * @param {number} [props.height=125] - Height of the preview image in pixels
 * @param {number} [props.quality=50] - Image quality setting (1-100)
 * @param {boolean} [props.preview=true] - Whether to show preview functionality
 *
 * @returns {JSX.Element} The rendered preview component
 *
 * @example
 * <Preview
 *   url="https://example.com"
 *   title="Custom Title"
 *   width={300}
 *   height={200}
 *   quality={75}
 * />
 */
const Preview = ({ url, title, className, width = 200, height = 125, quality = 50, preview = true }) => {
  const [ data, setData ] = React.useState(null);
  const [ loading, setLoading ] = React.useState(true);
  const [ isOpen, setOpen ] = React.useState(false);
  const [ isMounted, setIsMounted ] = React.useState(false);
  const [ isIntersecting, setIsIntersecting ] = React.useState(false);
  const elementRef = React.useRef(null);

  // Intersection Observer to detect when component is near viewport
  React.useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            setIsIntersecting(true);

            // Stop observing once triggered
            observer.unobserve(entry.target);
          }
        });
      }, {

        // Start loading 200px before entering viewport
        'rootMargin': '200px',
        'threshold': 0
      }
    );

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, []);

  // Fetch preview data only when in viewport and not cached
  React.useEffect(() => {
    if (!isIntersecting) return;

    setIsMounted(true);

    // Check cache first
    if (previewCache.has(url)) {
      const cachedData = previewCache.get(url);

      if (title && cachedData.title !== title) cachedData.title = title;

      setData(cachedData);
      setLoading(false);

      return;
    }

    // Fetch if not in cache
    fetch(`/api/preview?url=${url}`)
      .then((res) => res.json())
      .then((_response) => {
        const response = JSON.parse(_response);

        if (title) response.title = title;

        // Cache the response
        previewCache.set(url, response);

        setLoading(false);
        setData(response);
      })
      .catch((error) => {
        console.error('Preview fetch error:', error);
        const errorData = { 'status': 404, 'title': title || url };

        previewCache.set(url, errorData);
        setData(errorData);
        setLoading(false);
      });
  }, [ isIntersecting, title, url ]);

  const springConfig = { 'damping': 15, 'stiffness': 100 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  /**
   * Handles mouse movement for interactive hover animations
   *
   * @description Calculates the mouse position relative to the target element and updates
   * the motion value for smooth hover animations. Creates a parallax-like effect where
   * the preview card follows the mouse movement.
   *
   * @param {MouseEvent} event - The mouse move event
   */
  const handleMouseMove = (event) => {
    const targetRect = event.target.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;

    x.set(offsetFromCenter);
  };

  // At the default state; the preview is not open and show the loader
  if (loading) return (
    <span ref={ elementRef }>
      <img
        className='h-4 w-4 inline-flex m-0 mr-2'
        src='/static/icons/loading.svg'
        alt='Loading ...'
      />
    </span>
  );

  // If the URL is not reachable and was a status 404 from the API then show the disabled link icon
  else if (data.status === 404) return (
    <span className='inline-flex items-center align-middle'>
      <LinkSlashIcon className='h-4 w-4 m-0 mr-1' />
      <a href={ url }>{data.title ? data.title.split(':')[0] : url}</a>
    </span>
  );

  if (data.image) {
    data.image = data.image.startsWith('//') ? `https:${data.image}` : data.image;
    if (!data.image.startsWith('http')) data.image = `https://${data.image}`;
  } else {
    data.image = null;
  }

  if (data.favicon) {
    data.favicon = data.favicon.startsWith('//') ? `https:${data.favicon}` : data.favicon;
    if (!data.favicon.startsWith('http')) data.favicon = `https://${data.favicon}`;
  } else {
    data.favicon = null;
  }

  return (
    <>
      {isMounted ? (
        <span className='hidden'>
          {data.image && (
            <Image
              src={ data.image }
              width={ width }
              height={ height }
              quality={ quality }
              alt='hidden image'
            />
          )}
        </span>
      ) : null}

      <HoverCardPrimitive.Root
        openDelay={ 50 }
        closeDelay={ 100 }
        onOpenChange={ (open) => {
          setOpen(open);
        } }
      >
        <HoverCardPrimitive.Trigger
          onMouseMove={ handleMouseMove }
          className={ cn('text-black dark:text-white', className) }
          href={ url }
        >
          <span className='inline-flex items-center'>
            {data.favicon ? (
              <ImageFallback
                className='h-4 w-4 !m-0 !mr-1'
                fallback='/static/icons/link.svg'
                src={ data.favicon }
                width={ 10 }
                height={ 10 }
                alt={ data ? data.title : 'Loading...' }
              />
            ) : (
              <LinkIcon className='h-4 w-4 m-0 mr-1' />
            )}
            <button className='text-blue-600 text-left!' href={ url }>
              {data.title ? data.title.split(':')[0] : url}
            </button>
          </span>
        </HoverCardPrimitive.Trigger>
        { }
        {data.status === 200 && (
          <HoverCardPrimitive.Portal>
            <HoverCardPrimitive.Content
              className='[transform-origin:var(--radix-hover-card-content-transform-origin)]'
              side='top'
              align='center'
              sideOffset={ 10 }
            >
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ 'opacity': 0, 'scale': 0.6, 'y': 20 }}
                    animate={{
                      'opacity': 1,
                      'scale': 1,
                      'transition': { 'damping': 20, 'stiffness': 260, 'type': 'spring' },
                      'y': 0
                    }}
                    exit={{ 'opacity': 0, 'scale': 0.6, 'y': 20 }}
                    className='shadow-xl rounded-xl'
                    style={{ 'x': translateX }}
                  >
                    <Link
                      href={ url }
                      className='block p-1 bg-white border-2 border-transparent shadow-sm rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800'
                      style={{ 'fontSize': 0 }}
                    >
                      {data.image && (
                        <Image
                          src={ data.image }
                          width={ width }
                          height={ height }
                          quality={ quality }
                          className='rounded-lg'
                          alt='preview image'
                        />
                      )}
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </HoverCardPrimitive.Content>
          </HoverCardPrimitive.Portal>
        )}
      </HoverCardPrimitive.Root>
    </>
  );
};

export default Preview;
