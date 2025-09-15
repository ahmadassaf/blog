/**
 * Link Preview Component
 *
 * @description A production-ready link preview component that fetches and displays metadata for external URLs.
 * It shows links with favicons and titles, and optionally displays rich hover cards with images.
 * Includes comprehensive error handling, multi-layer caching, performance optimizations, and accessibility features.
 *
 * @author Ahmad Assaf
 * @version 2.1.0
 */

'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LinkIcon, LinkSlashIcon } from '@heroicons/react/20/solid';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

import ImageFallback from '@/components/elements/ImageFallback';

/**
 * Advanced cache implementation with size limits and TTL
 */
class PreviewCache {
  constructor(maxSize = 100, ttl = 3600000) {
    this.cache = new Map();
    this.maxSize = maxSize;

    // 1 hour default TTL
    this.ttl = ttl;
  }

  get(key) {
    const entry = this.cache.get(key);

    if (!entry) return null;

    // Check if entry has expired
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);

      return null;
    }

    // Move to end (LRU implementation)
    this.cache.delete(key);
    this.cache.set(key, entry);

    return entry.data;
  }

  set(key, data) {

    // Remove oldest entry if at capacity
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;

      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      data,
      'timestamp': Date.now()
    });
  }

  clear() {
    this.cache.clear();
  }

  has(key) {
    return this.cache.has(key) && this.get(key) !== null;
  }
}

// Global cache instance
const previewCache = new PreviewCache();

// Request deduplication to prevent duplicate API calls
const pendingRequests = new Map();

// Performance monitoring
const performanceMonitor = {
  end(url, success = true) {
    if (!this.startTime) return null;

    const duration = performance.now() - this.startTime;

    // Log metrics (replace with your analytics service)
    if (process.env.NODE_ENV === 'development') console.log(`Preview fetch for ${url}: ${duration.toFixed(2)}ms (${success ? 'success' : 'error'})`);

    this.startTime = null;

    return duration;
  },

  start() {

    this.startTime = performance.now();
  },

  'startTime': null
};

/**
 * Generate preview image URL based on platform
 */
const getPreviewImageUrl = (url, data) => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    const { pathname } = urlObj;

    // YouTube video thumbnails
    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      let videoId = null;

      if (hostname.includes('youtube.com')) videoId = urlObj.searchParams.get('v');
      else if (hostname.includes('youtu.be')) videoId = pathname.slice(1);

      if (videoId) return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    }

    // GitHub repository cards (using OpenGraph image API)
    if (hostname.includes('github.com')) {
      const pathParts = pathname.split('/').filter(Boolean);

      if (pathParts.length >= 2) {
        const [ owner, repo ] = pathParts;

        // GitHub's OpenGraph image
        return `https://opengraph.githubassets.com/1/${owner}/${repo}`;
      }
    }

    // Twitter/X tweet cards
    if (hostname.includes('twitter.com') || hostname.includes('x.com'))

      // Use the OG image if available from the fetched data
      if (data?.image) return data.image;

    // Stack Overflow questions
    if (hostname.includes('stackoverflow.com'))

      // Stack Overflow doesn't provide great preview images, use a fallback
      if (data?.image) return data.image;

    // Medium articles
    if (hostname.includes('medium.com')) if (data?.image) return data.image;

    // Default: Use OpenGraph image if available
    if (data?.image) return data.image;

    /*
     * Fallback to screenshot service (you can use various services)
     * Option 1: Microlink API (free tier available)
     */
    return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;

    /*
     * Option 2: Alternative screenshot service
     * return `https://image.thum.io/get/width/1200/crop/630/${url}`;
     */
  } catch (error) {
    console.error('Error generating preview image URL:', error);

    return null;
  }
};

/**
 * Custom hook for fetching preview data with advanced features
 */
function usePreviewData(url, customTitle, options = {}) {
  const [ data, setData ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const abortControllerRef = useRef(null);
  const retryCountRef = useRef(0);

  const {
    timeout = 10000,
    maxRetries = 2,
    retryDelay = 1000
  } = options;

  const fetchPreview = useCallback(async() => {

    // Skip if no URL provided
    if (!url) {
      setLoading(false);

      return;
    }

    // Check cache first
    const cached = previewCache.get(url);

    if (cached) {
      setData(customTitle ? { ...cached, 'title': customTitle } : cached);
      setLoading(false);

      return;
    }

    // Check if request is already pending (deduplication)
    if (pendingRequests.has(url)) try {
      const result = await pendingRequests.get(url);

      setData(customTitle ? { ...result, 'title': customTitle } : result);
      setLoading(false);

      return;
    } catch (err) {
      setError(err);
      setLoading(false);

      return;
    }

    // Start performance monitoring
    performanceMonitor.start();

    // Function to make the actual fetch request
    const makeFetchRequest = async() => {

      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, timeout);

      try {
        const response = await fetch(
          `/api/preview?url=${encodeURIComponent(url)}`, {
            'cache': 'force-cache',

            // Use browser cache when possible
            'signal': controller.signal
          }
        );

        clearTimeout(timeoutId);

        // Check if response is ok first
        if (!response.ok) {
          console.log(`Preview API returned status ${response.status} for ${url}`);

          // Try to parse error response
          let errorMessage = `HTTP ${response.status}`;

          try {
            const errorData = await response.json();
            const parsed = typeof errorData === 'string' ? JSON.parse(errorData) : errorData;

            errorMessage = parsed.error || errorMessage;
          } catch {

            // If we can't parse the error, use the default message
          }

          return {
            'error': true,
            errorMessage,
            'status': response.status,
            'title': customTitle || new URL(url).hostname
          };
        }

        // Parse successful response
        const rawData = await response.json();
        const parsedData = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;

        // Check if parsed data contains an error
        if (parsedData.error) {
          console.log(`Preview API returned error for ${url}:`, parsedData.error);

          return {
            'error': true,
            'errorMessage': parsedData.error,
            'status': parsedData.status || 404,
            'title': customTitle || new URL(url).hostname
          };
        }

        // Store successful data in cache
        previewCache.set(url, parsedData);

        const duration = performanceMonitor.end(url, true);

        // Add performance data if duration is available
        if (duration !== null) parsedData._performance = { duration };

        return parsedData;
      } catch (err) {
        clearTimeout(timeoutId);
        performanceMonitor.end(url, false);

        // Retry logic
        if (retryCountRef.current < maxRetries && err.name !== 'AbortError') {
          retryCountRef.current++;
          await new Promise((resolve) => setTimeout(resolve, retryDelay * retryCountRef.current));

          return makeFetchRequest(); // Recursive retry
        }

        throw err;
      }
    };

    // Create promise and store for deduplication
    const fetchPromise = makeFetchRequest();

    pendingRequests.set(url, fetchPromise);

    try {
      const result = await fetchPromise;

      setData(customTitle ? { ...result, 'title': customTitle } : result);
      setError(null);
    } catch (err) {
      console.log('Preview fetch error:', err.message);

      // Create fallback data for errors
      let fallbackTitle = customTitle || url;

      try {
        fallbackTitle = customTitle || new URL(url).hostname;
      } catch {

        // If URL parsing fails, use the raw URL
      }

      const errorData = {
        'error': true,
        'errorMessage': err.message,
        'status': err.status || 404,
        'title': fallbackTitle
      };

      // Cache error responses to prevent retry loops
      previewCache.set(url, errorData);
      setData(errorData);

      // Don't set error state for expected failures
      if (err.name !== 'AbortError' && !err.message.includes('HTTP')) setError(err);

    } finally {
      setLoading(false);
      retryCountRef.current = 0;
      pendingRequests.delete(url);
    }
  }, [ url, customTitle, timeout, maxRetries, retryDelay ]);

  useEffect(() => {
    fetchPreview();

    // Cleanup on unmount
    return () => {
      abortControllerRef.current?.abort();
    };
  }, [ fetchPreview ]);

  return { data, error, loading };
}

/**
 * Helper function to normalize favicon URLs
 */
const normalizeFaviconURL = (favicon) => {
  if (!favicon) return null;

  // Handle protocol-relative URLs
  if (favicon.startsWith('//')) return `https:${favicon}`;

  // Handle relative URLs
  if (!favicon.startsWith('http')) return `https://${favicon}`;

  return favicon;
};

/**
 * Helper function to format titles
 */
const formatTitle = (title, url) => {
  if (!title) try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }

  // Remove common suffixes that add noise
  const cleanTitle = title
    .split(' - ')[0]
    .split(' | ')[0]
    .split(' · ')[0]
    .split(' :: ')[0]
    .split(' : ')[0]
    .trim();

  // Truncate if too long
  const maxLength = 60;

  return cleanTitle.length > maxLength ? `${cleanTitle.substring(0, maxLength - 3)}...` : cleanTitle;
};

/**
 * Helper function to get platform-specific icon (only when no favicon is available)
 */
const getPlatformIcon = (url, type, hasFavicon) => {

  // Don't show platform icon if we already have a favicon
  if (hasFavicon) return null;

  try {
    const hostname = new URL(url).hostname.toLowerCase();

    // Platform-specific icons (only when no favicon is available)
    if (type === 'video' || hostname.includes('youtube.com') || hostname.includes('youtu.be')) return (
      <svg className='h-3 w-3 ml-1 text-red-500' fill='currentColor' viewBox='0 0 20 20'>
        <path d='M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l4 2A1 1 0 0020 14V6a1 1 0 00-1.447-.894l-4 2z' />
      </svg>
    );

    if (type === 'repository' || hostname.includes('github.com')) return (
      <svg className='h-3 w-3 ml-1 text-gray-600' fill='currentColor' viewBox='0 0 20 20'>
        <path fillRule='evenodd' d='M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-1.02-.01-1.86-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.52 1.02 1.52 1.02.89 1.52 2.33 1.08 2.9.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.02-2.68-.1-.25-.44-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0110 4.8c.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.54 1.37.2 2.39.1 2.64.64.7 1.02 1.59 1.02 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.02 10.02 0 0020 10c0-5.523-4.477-10-10-10z' clipRule='evenodd' />
      </svg>
    );

  } catch {

    // Ignore errors
  }

  return null;
};

/**
 * Link preview component with favicon and metadata
 *
 * @param {Object} props - Component props
 * @param {string} props.url - The URL to preview and link to
 * @param {string} [props.title] - Optional custom title to override fetched title
 * @param {string} [props.className] - Additional CSS classes for styling
 * @param {boolean} [props.showImage] - Show image preview on hover (default: true)
 * @param {boolean} [props.lazy] - Enable lazy loading (default: false)
 * @param {number} [props.timeout] - Request timeout in milliseconds (default: 10000)
 * @param {Function} [props.onLoad] - Callback when preview loads successfully
 * @param {Function} [props.onError] - Callback when preview fails to load
 * @param {React.ReactNode} [props.fallback] - Custom fallback component
 * @returns {JSX.Element} The rendered preview component
 */
const Preview = ({
  url,
  title,
  className = '',

  // Default back to true to show hover previews
  showImage = true,
  lazy = false,
  timeout = 10000,
  onLoad,
  onError,
  fallback
}) => {

  // Early return if no URL provided
  if (!url) {
    console.warn('Preview component called without URL');

    return <span className='text-gray-500'>No URL provided</span>;
  }
  const [ isInView, setIsInView ] = useState(!lazy);
  const [ isHoverCardOpen, setIsHoverCardOpen ] = useState(false);
  const [ imageLoaded, setImageLoaded ] = useState(false);
  const [ imageError, setImageError ] = useState(false);
  const observerRef = useRef(null);
  const elementRef = useRef(null);

  // Debug: Log props on mount
  useEffect(() => {
    console.log('Preview component mounted with URL:', url, 'Title:', title);
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || isInView) return;

    const observer = new IntersectionObserver(
      ([ entry ]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      }, { 'rootMargin': '50px', 'threshold': 0.1 }
    );

    if (elementRef.current) observer.observe(elementRef.current);

    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [ lazy, isInView ]);

  // Fetch data only when in view
  const { data, loading, error } = usePreviewData(
    isInView ? url : null, title, { timeout }
  );

  // Debug logging
  useEffect(() => {
    if (data) console.log('Preview data for', url, ':', data);

  }, [ data, url ]);

  // Handle callbacks
  useEffect(() => {
    if (data && !data.error && onLoad) onLoad(data);

  }, [ data, onLoad ]);

  useEffect(() => {
    if (error && onError) onError(error);

  }, [ error, onError ]);

  // Get preview image URL
  const previewImageUrl = useMemo(() => {
    if (!showImage || !data) return null;

    return getPreviewImageUrl(url, data);
  }, [ url, data, showImage ]);

  // Normalize favicon URL
  const normalizedFavicon = useMemo(() => normalizeFaviconURL(data?.favicon), [ data?.favicon ]);

  // Format title
  const formattedTitle = useMemo(() => {
    try {
      return formatTitle(data?.title || title, url);
    } catch {
      return title || url;
    }
  }, [ data?.title, title, url ]);

  // Get site name for display
  const siteName = useMemo(() => {
    if (data?.siteName) return data.siteName;
    try {
      const hostname = new URL(url).hostname.replace('www.', '');

      // Capitalize first letter
      return hostname.charAt(0).toUpperCase() + hostname.slice(1);
    } catch {
      return null;
    }
  }, [ data?.siteName, url ]);

  // Lazy loading placeholder
  if (!isInView && lazy) return (
    <span ref={ elementRef } className={ `inline-flex items-center ${className}` }>
      <LinkIcon className='h-4 w-4 m-0 mr-1 text-gray-400' />
      <span className='text-gray-500'>{title || 'Loading...'}</span>
    </span>
  );

  // Loading state with skeleton
  if (loading) return (
    <span className={ `inline-flex items-center ${className}` }>
      <span className='inline-block h-4 w-4 mr-1 bg-gray-200 rounded animate-pulse' />
      <span className='inline-block h-4 w-32 bg-gray-200 rounded animate-pulse' />
    </span>
  );

  // Custom fallback
  if (fallback && (error || data?.error || data?.status === 404)) return <>{fallback}</>;

  // Error state - still show the link with error styling
  if (data?.error) return (
    <span className={ `inline-flex items-center align-middle ${className}` }>
      <LinkSlashIcon className='h-4 w-4 m-0 mr-1 text-red-500' />
      <a
        href={ url }
        className='text-red-600 hover:text-red-800 transition-colors'
        target='_blank'
        rel='noopener noreferrer'
        title={ data?.errorMessage || 'This link may be unavailable' }
        aria-label={ `${formattedTitle} (link may be unavailable)` }
      >
        {formattedTitle}
      </a>
    </span>
  );

  // If no data yet (shouldn't happen but just in case)
  if (!data) return (
    <span className={ `inline-flex items-center ${className}` }>
      <LinkIcon className='h-4 w-4 m-0 mr-1 text-gray-400' />
      <a
        href={ url }
        className='text-blue-600 hover:text-blue-800 transition-colors'
        target='_blank'
        rel='noopener noreferrer'
      >
        {title || url}
      </a>
    </span>
  );

  // Success state with hover card
  const linkContent = (
    <>
      {normalizedFavicon ? (
        <ImageFallback
          className='h-4 w-4 !m-0 !mr-1 flex-shrink-0'
          fallback='/static/icons/link.svg'
          src={ normalizedFavicon }
          width={ 16 }
          height={ 16 }
          alt=''
          role='presentation'
        />
      ) : (
        <LinkIcon className='h-4 w-4 m-0 mr-1 text-blue-500' />
      )}
      <a
        className='text-blue-600 hover:text-blue-800 transition-colors'
        href={ url }
        target='_blank'
        rel='noopener noreferrer'
        title={ data?.description || formattedTitle }
        aria-label={ `${formattedTitle}${data?.siteName ? ` - ${data.siteName}` : ''}` }
      >
        {formattedTitle}
      </a>
      {getPlatformIcon(url, data?.type, !!normalizedFavicon)}
      {data?.duration && (
        <span className='text-xs text-gray-500 ml-1'>{data.duration}</span>
      )}
      {data?.readingTime && (
        <span className='text-xs text-gray-500 ml-1'>· {data.readingTime}</span>
      )}
      {/* Performance indicator in development */}
      {process.env.NODE_ENV === 'development' && data?._performance?.duration && (
        <span className='text-xs text-gray-400 ml-1' title={ `Loaded in ${data._performance.duration.toFixed(0)}ms` }>
          ⚡
        </span>
      )}
    </>
  );

  // Check if we should show hover card - show it when showImage is true and we have data
  const shouldShowHoverCard = showImage && data && !loading;

  // If we shouldn't show hover card, return simple link
  if (!shouldShowHoverCard) return (
    <span
      className={ `inline-flex items-center ${className}` }
      data-preview-url={ url }
    >
      {linkContent}
    </span>
  );

  // Return link with hover card (only when we have an image)
  return (
    <HoverCardPrimitive.Root
      openDelay={ 200 }
      closeDelay={ 100 }
      onOpenChange={ (open) => {
        setIsHoverCardOpen(open);

        // Reset image states when closing
        if (!open) {
          setImageLoaded(false);
          setImageError(false);
        }
      } }
    >
      <HoverCardPrimitive.Trigger asChild>
        <span
          className={ `inline-flex items-center ${className}` }
          data-preview-url={ url }
        >
          {linkContent}
        </span>
      </HoverCardPrimitive.Trigger>

      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          className='z-50'
          sideOffset={ 8 }
          align='start'
        >
          <AnimatePresence>
            {isHoverCardOpen && (
              <motion.div
                initial={{ 'opacity': 0, 'scale': 0.96, 'y': 8 }}
                animate={{
                  'opacity': 1,
                  'scale': 1,
                  'transition': { 'duration': 0.15 },
                  'y': 0
                }}
                exit={{
                  'opacity': 0,
                  'scale': 0.96,
                  'transition': { 'duration': 0.1 },
                  'y': 8
                }}
                className='bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-[#303030] overflow-hidden'
                style={{ 'width': '320px' }}
              >
                {/* Special content display for Wikipedia instead of image */}
                {data?.type === 'wikipedia' && data?.excerpt ? (
                  <div className='bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6'>
                    <div className='flex items-center gap-2 mb-3'>
                      <svg className='h-5 w-5 text-gray-600 dark:text-gray-400' fill='currentColor' viewBox='0 0 20 20'>
                        <path d='M9 4.804A1 1 0 017.53 5.02L5.032 9.513a1 1 0 00.268 1.537l2.5 1.5a1 1 0 001.2-.268l2.5-3.5a1 1 0 00-.134-1.366l-2-1.612zM11 4.804a1 1 0 011.47.216l2.498 4.493a1 1 0 01-.268 1.537l-2.5 1.5a1 1 0 01-1.2-.268l-2.5-3.5a1 1 0 01.134-1.366l2-1.612z'/>
                      </svg>
                      <span className='text-sm font-semibold text-gray-700 dark:text-gray-300'>Wikipedia Article</span>
                    </div>
                    <div className='space-y-2'>
                      <h4 className='text-base font-bold text-gray-900 dark:text-gray-100'>
                        {data.articleName || formattedTitle}
                      </h4>
                      {data.description && (
                        <p className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                          {data.description}
                        </p>
                      )}
                      <p className='text-xs text-gray-600 dark:text-gray-400 leading-relaxed'>
                        {data.excerpt}
                      </p>
                    </div>
                  </div>
                ) : (

                  /* Regular image preview for other sites */
                  previewImageUrl && !imageError && (
                    <div className='relative w-full h-48 bg-gray-100 dark:bg-gray-900'>
                      {!imageLoaded && (
                        <div className='absolute inset-0 flex items-center justify-center'>
                          <div className='animate-pulse'>
                            <LinkIcon className='h-8 w-8 text-gray-400' />
                          </div>
                        </div>
                      )}
                      <Image
                        src={ previewImageUrl }
                        alt={ formattedTitle }
                        fill
                        className='object-cover'
                        onLoad={ () => {
                          setImageLoaded(true);
                          setImageError(false);
                        } }
                        onError={ () => {
                          console.log('Image failed to load:', previewImageUrl);
                          setImageError(true);
                          setImageLoaded(false);
                        } }
                        unoptimized
                      />
                    </div>
                  )
                )}

                {/* Content Footer - Skip for Wikipedia since content is shown above */}
                {data?.type !== 'wikipedia' && (
                  <div className='p-4'>
                    <div className='flex items-start gap-2'>
                      {normalizedFavicon && (
                        <ImageFallback
                          className='h-4 w-4 mt-0.5 flex-shrink-0'
                          fallback='/static/icons/link.svg'
                          src={ normalizedFavicon }
                          width={ 16 }
                          height={ 16 }
                          alt=''
                        />
                      )}
                      <div className='flex-1 min-w-0'>
                        <h3 className='font-medium text-sm text-gray-900 dark:text-gray-100 line-clamp-2'>
                          {formattedTitle}
                        </h3>

                        {data?.description && (
                          <p className='text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2'>
                            {data.description}
                          </p>
                        )}

                        <div className='flex items-center gap-2 mt-2'>
                          <span className='text-xs text-gray-500 dark:text-gray-500'>
                            {siteName}
                          </span>
                          {data?.publishedTime && (
                            <>
                              <span className='text-xs text-gray-400'>·</span>
                              <span className='text-xs text-gray-500'>
                                {new Date(data.publishedTime).toLocaleDateString()}
                              </span>
                            </>
                          )}
                          {data?.readingTime && (
                            <>
                              <span className='text-xs text-gray-400'>·</span>
                              <span className='text-xs text-gray-500'>
                                {data.readingTime}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  );
};

// Memory cleanup on unmount
if (typeof window !== 'undefined') window.addEventListener('beforeunload', () => {
  previewCache.clear();
  pendingRequests.clear();
});

export default Preview;
