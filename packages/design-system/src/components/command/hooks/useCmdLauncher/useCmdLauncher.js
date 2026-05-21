/**
 * Command Launcher Hooks
 *
 * @description Performance-optimized hooks for managing command launcher state,
 * search functionality, and data preparation. Includes memoization, debouncing,
 * and efficient data structures for smooth user experience.
 *
 * @author Ahmad Assaf
 * @version 2.0.0
 */

import { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';
import { useTheme } from 'next-themes';

import { omit } from '@/lib/utils/contentlayer';

/**
 * Prepares a content collection for command launcher with performance optimizations
 *
 * @param {Array} collection - Raw content collection
 * @param {string} type - Content type (post, project, publication, tag)
 * @returns {Array} Optimized collection for command palette
 */
const prepareCollection = (collection, type) => {
  if (!Array.isArray(collection)) return [];

  return collection.map((item) => {
    const baseItem = {
      'children': item.title || item.display || item.name,
      'id': type === 'publication' ? item.id : item.slug,
      'showType': false,
      'title': item.title || item.display || item.name,
      type
    };

    // Add type-specific properties
    switch (type) {
    case 'post':
      return {
        ...baseItem,
        'category': item.category,
        'href': `/blog/${item.slug}`,
        ...omit(item, [ 'featured', 'filePath', 'readingTime', 'tableOfContents', 'draft' ])
      };

    case 'project':
      return {
        ...baseItem,
        'href': `/blog/projects/${item.slug}`,
        'subtitle': item.description || item.summary,
        ...omit(item, [ 'featured', 'filePath', 'externalLink', 'draft' ])
      };

    case 'publication':
      return {
        ...baseItem,
        'href': item.href || '#',
        'subtitle': `${item.venue} (${item.year})`,
        ...omit(item, [ 'venueType', 'sameAs' ])
      };

    case 'tag':
      return {
        ...baseItem,
        'count': item.count || 0,
        'href': `/blog/tags/${item.slug}`
      };

    default:
      return baseItem;
    }
  });
};

/**
 * Main command launcher hook with performance optimizations
 *
 * @param {Object} props - Hook configuration
 * @param {Array} props.posts - Posts collection
 * @param {Array} props.projects - Projects collection
 * @param {Array} props.publications - Publications collection
 * @param {Array} props.tags - Tags collection
 * @param {boolean} props.open - Whether command palette is open
 * @param {Function} props.setOpen - Function to control open state
 *
 * @returns {Object} Command launcher state and handlers
 */
export const useCmdLauncher = ({ posts, projects, publications, tags, open, setOpen }) => {
  const [ page, setPage ] = useState('root');
  const [ search, setSearch ] = useState('');
  const [ selected, setSelected ] = useState(0);
  const [ recentSearches, setRecentSearches ] = useState([]);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Debounced search for better performance
  const deferredSearch = useDeferredValue(search);

  // Memoized collections - only recalculate when data changes
  const collections = useMemo(() => {
    return {
      'posts': prepareCollection(posts, 'post'),
      'projects': prepareCollection(projects, 'project'),
      'publications': prepareCollection(publications, 'publication'),
      'tags': prepareCollection(tags, 'tag')
    };
  }, [ posts, projects, publications, tags ]);

  // Optimized page change handler
  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
    setSearch('');
    setSelected(0);
  }, []);

  // Theme toggle handler
  const handleThemeToggle = useCallback(() => {
    setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [ theme, resolvedTheme, setTheme ]);

  // Memoized navigation items
  const navigationItems = useMemo(() => [
    {
      'heading': 'Navigation',
      'id': 'cmdLauncher',
      'items': [
        {
          'children': 'Home',
          'href': '/',
          'icon': 'HomeIcon',
          'id': 'home',
          'type': 'navigation'
        },
        {
          'children': 'Blog',
          'href': '/blog',
          'icon': 'BookOpenIcon',
          'id': 'blog',
          'type': 'navigation'
        },
        {
          'children': 'Projects',
          'closeOnSelect': false,
          'icon': 'RectangleGroupIcon',
          'id': 'projects',
          'onClick': () => handlePageChange('projects'),
          'type': 'navigation'
        },
        {
          'children': 'Posts',
          'closeOnSelect': false,
          'icon': 'RectangleStackIcon',
          'id': 'posts_list',
          'onClick': () => handlePageChange('posts'),
          'type': 'navigation'
        },
        {
          'children': 'Publications',
          'closeOnSelect': false,
          'icon': 'NewspaperIcon',
          'id': 'publications',
          'onClick': () => handlePageChange('publications'),
          'type': 'navigation'
        },
        {
          'children': 'Tags',
          'closeOnSelect': false,
          'icon': 'TagIcon',
          'id': 'tags',
          'onClick': () => handlePageChange('tags'),
          'type': 'navigation'
        }
      ]
    },
    {
      'heading': 'Actions',
      'id': 'other',
      'items': [
        {
          'children': 'About me',
          'href': '/about',
          'icon': 'FingerPrintIcon',
          'id': 'about_me',
          'type': 'navigation'
        },
        {
          'children': 'Reach out',
          'closeOnSelect': false,
          'icon': 'IdentificationIcon',
          'id': 'reach_out',
          'onClick': () => handlePageChange('contact'),
          'type': 'navigation'
        },
        {
          'children': 'Switch Theme',
          'closeOnSelect': false,
          'icon': 'ArrowRightOnRectangleIcon',
          'id': 'switch_theme',
          'onClick': handleThemeToggle,
          'type': 'navigation'
        }
      ]
    }
  ], [ handlePageChange, handleThemeToggle ]);

  // Global keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen(!open);
        if (!open) {
          setPage('root');
          setSearch('');
          setSelected(0);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [ open, setOpen ]);

  // Track recent searches
  useEffect(() => {
    if (deferredSearch.length > 2) setRecentSearches((prev) => {
      const updated = [ deferredSearch, ...prev.filter((s) => s !== deferredSearch) ];

      // Keep only 5 recent searches
      return updated.slice(0, 5);
    });

  }, [ deferredSearch ]);

  return {

    // Collections
    collections,
    deferredSearch,
    'isEmpty': Object.values(collections).every((col) => col.length === 0),
    'isSearching': deferredSearch.length > 0,
    navigationItems,

    // State
    page,
    recentSearches,
    search,
    selected,
    setOpen,

    // Handlers
    'setPage': handlePageChange,
    setSearch,
    setSelected,
    theme
  };
};

/**
 * Hook for managing FlexSearch index with performance optimizations
 *
 * @param {Object} collections - Prepared collections object
 * @returns {Object} Search functionality
 */
export const useCmdSearch = (collections) => {

  /*
   * This will be implemented with the search component
   * For now, return basic search functionality
   */
  const searchContent = useCallback((query) => {
    if (!query || query.length < 2) return [];

    const results = [];
    const lowerQuery = query.toLowerCase();

    Object.entries(collections).forEach(([ type, items ]) => {
      items.forEach((item) => {
        if (
          item.title?.toLowerCase().includes(lowerQuery) ||
          item.subtitle?.toLowerCase().includes(lowerQuery) ||
          item.category?.toLowerCase().includes(lowerQuery)
        ) results.push({ ...item, 'searchScore': 1 });

      });
    });

    // Limit results
    return results.slice(0, 10);
  }, [ collections ]);

  return { searchContent };
};
