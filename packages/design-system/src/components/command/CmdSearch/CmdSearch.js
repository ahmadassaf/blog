/**
 * Modern Command Search Component
 *
 * @description High-performance search component for the command palette with FlexSearch
 * integration, skeleton loading states, and optimized rendering. Provides real-time
 * search results with debouncing and intelligent result ranking.
 *
 * @author Ahmad Assaf
 * @version 2.0.0
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CommandPalette, { getItemIndex } from '@tmikeladze/react-cmdk';
import pkg from 'flexsearch';

import CmdItem from '@/components/command/CmdItem';
import Icon from '@/components/primitives/Icon';

const { Index } = pkg;

/**
 * Skeleton loader for search results
 */
const SearchSkeleton = () => (
  <div className='p-4 space-y-3'>
    <div className='flex items-center gap-3'>
      <div className='w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse' />
      <div className='flex-1'>
        <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2' />
        <div className='h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4' />
      </div>
    </div>
    <div className='flex items-center gap-3'>
      <div className='w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse' />
      <div className='flex-1'>
        <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2' />
        <div className='h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3' />
      </div>
    </div>
    <div className='flex items-center gap-3'>
      <div className='w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse' />
      <div className='flex-1'>
        <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2' />
        <div className='h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2' />
      </div>
    </div>
  </div>
);

/**
 * Empty state component for no search results
 */
const EmptyState = ({ query }) => (
  <div className='flex flex-col items-center justify-center py-12 px-4 text-center'>
    <div className='w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4'>
      <Icon name='ExclamationTriangleIcon' size='xl' decorative className='text-gray-400' />
    </div>
    <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-2'>
      No results found
    </h3>
    <p className='text-gray-500 dark:text-gray-400 max-w-sm'>
      No results found for <span className='font-medium'>"{query}"</span>.
      Try searching with different keywords.
    </p>
  </div>
);

/**
 * Modern command search component with performance optimizations
 *
 * @description Provides real-time search across all content types with FlexSearch,
 * skeleton loading states, and intelligent result ranking. Optimized for performance
 * with debouncing and memoization.
 *
 * @param {Object} props - Component props
 * @param {string} props.search - Current search query
 * @param {Object} props.collections - Content collections to search through
 * @param {Array} [props.recentSearches] - Recent search queries
 *
 * @returns {JSX.Element} Search interface with results
 *
 * @example
 * <CmdSearch
 *   search="react hooks"
 *   collections={{ posts, projects, publications }}
 *   recentSearches={['javascript', 'nextjs']}
 * />
 */
const CmdSearch = ({ search, collections, recentSearches = [] }) => {
  const [ searchResults, setSearchResults ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);

  // Initialize FlexSearch index
  const initializeIndex = useCallback(() => {
    const index = new Index({
      'cache': true,
      'contextual': true,
      'preset': 'match',
      'tokenize': 'full'
    });

    // Index all content
    let docId = 0;
    const indexedItems = [];

    Object.entries(collections).forEach(([ type, items ]) => {
      items.forEach((item) => {
        const searchableText = [
          item.title,
          item.subtitle,
          item.category,
          item.children
        ].filter(Boolean).join(' ').toLowerCase();

        index.add(docId, searchableText);
        indexedItems[docId] = { ...item, type };
        docId++;
      });
    });

    return { index, 'items': indexedItems };
  }, [ collections ]);

  // Memoized search index initialization
  const indexData = useMemo(() => {
    if (Object.keys(collections).length === 0) return null;

    return initializeIndex();
  }, [ collections, initializeIndex ]);

  // Perform search with debouncing
  useEffect(() => {
    if (!search || search.length < 2 || !indexData) {
      setSearchResults([]);
      setIsLoading(false);

      return;
    }

    setIsLoading(true);

    const searchTimer = setTimeout(() => {
      try {
        const results = indexData.index.search(search, { 'limit': 20 });
        const items = results.map((id) => indexData.items[id]).filter(Boolean);

        // Group results by type for better organization
        const groupedResults = items.reduce((acc, item) => {
          const type = item.type || 'other';

          if (!acc[type]) acc[type] = [];
          acc[type].push(item);

          return acc;
        }, {});

        setSearchResults(groupedResults);
      } catch {
        setSearchResults({});
      } finally {
        setIsLoading(false);
      }
    }, 150);

    return () => clearTimeout(searchTimer);
  }, [ search, indexData ]);

  // Show skeleton loading state
  if (isLoading) return <SearchSkeleton />;

  // Show empty state for queries with no results
  if (search.length >= 2 && Object.keys(searchResults).length === 0) return <EmptyState query={ search } />;

  // Show recent searches when no active search
  if (!search && recentSearches.length > 0) return (
    <div className='p-4'>
      <div className='flex items-center gap-2 mb-3'>
        <Icon name='Search' size='sm' decorative className='text-gray-400' />
        <span className='text-sm font-medium text-gray-500 dark:text-gray-400'>
            Recent searches
        </span>
      </div>
      <div className='space-y-1'>
        {recentSearches.map((query, index) => (
          <div
            key={ index }
            className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors duration-200'
          >
            <Icon name='Search' size='sm' decorative className='text-gray-400' />
            <span className='text-sm text-gray-600 dark:text-gray-300'>{query}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // Render search results grouped by type
  const typeLabels = {
    'post': 'Posts',
    'project': 'Projects',
    'publication': 'Publications',
    'tag': 'Tags'
  };

  return (
    <div className='max-h-96 overflow-y-auto'>
      {Object.entries(searchResults).map(([ type, items ]) => (
        <div key={ type } className='mb-4'>
          <CommandPalette.List heading={ typeLabels[type] || 'Results' }>
            {items.map((item, index) => (
              <CommandPalette.ListItem
                key={ `search-${type}-${item.id}-${index}` }
                index={ getItemIndex(Object.values(searchResults).flat(), item.id) }
                href={ item.href }
                onClick={ item.onClick }
                closeOnSelect={ item.closeOnSelect !== false }
              >
                <CmdItem
                  title={ item.title }
                  subtitle={ item.subtitle }
                  category={ item.category }
                  count={ item.count }
                  type={ item.type }
                  icon={ item.icon }
                >
                  {item.children}
                </CmdItem>
              </CommandPalette.ListItem>
            ))}
          </CommandPalette.List>
        </div>
      ))}
    </div>
  );
};

export default CmdSearch;
