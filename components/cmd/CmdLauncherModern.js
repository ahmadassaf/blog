/**
 * Modern Command Launcher Component
 *
 * @description Next-generation command palette with performance optimizations, modern UI design,
 * glass morphism styling, unified architecture, and enhanced accessibility. Features debounced
 * search, memoized collections, smooth animations, and a mobile-first responsive design.
 *
 * @author Ahmad Assaf
 * @version 2.0.0
 */

import React, { Suspense } from 'react';
import CommandPalette, { filterItems, getItemIndex } from '@tmikeladze/react-cmdk';

import CmdItem from '@/components/cmd/CmdItem';
import CmdFooter from '@/components/cmd/CmdLauncherFooter';
import CmdSearch from '@/components/cmd/CmdSearch';
import { useCmdLauncher } from '@/components/cmd/hooks/useCmdLauncher';

// Modern CSS imports
import '@tmikeladze/react-cmdk/dist/cmdk.css';

/**
 * Loading skeleton for the command palette
 */
const CmdSkeleton = () => (
  <div className='p-4 space-y-4'>
    <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse' />
    <div className='space-y-3'>
      {[ ...Array(4) ].map((_, i) => (
        <div key={ i } className='flex items-center gap-3'>
          <div className='w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse' />
          <div className='flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse' />
        </div>
      ))}
    </div>
  </div>
);

/**
 * Modern error boundary component
 */
class CmdErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 'hasError': false };
  }

  static getDerivedStateFromError() {
    return { 'hasError': true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Command Launcher Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) return (
      <div className='p-8 text-center'>
        <div className='text-red-500 mb-2'>⚠️</div>
        <p className='text-gray-600 dark:text-gray-400'>
            Something went wrong with the command palette.
        </p>
      </div>
    );

    return this.props.children;
  }
}

/**
 * Individual page components for different content types
 */
const CmdPage = ({ type, items, setPage, search, setSearch }) => (
  <CommandPalette.Page id={ type } searchPrefix={ [ type ] }>
    <CommandPalette.List heading={ `${type.charAt(0).toUpperCase() + type.slice(1)}` }>
      {items.map((item) => (
        <CommandPalette.ListItem
          key={ `${type}-${item.id}` }
          index={ getItemIndex([{ items }], item.id) }
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
  </CommandPalette.Page>
);

/**
 * Modern command launcher component with comprehensive optimizations
 *
 * @description Revolutionary command palette interface with glass morphism design,
 * performance optimizations, unified architecture, and enhanced user experience.
 * Features memoized collections, debounced search, smooth animations, and
 * comprehensive accessibility support.
 *
 * @param {Object} props - Component props
 * @param {Array} props.projects - Array of project objects
 * @param {Array} props.posts - Array of post objects
 * @param {Array} props.publications - Array of publication objects
 * @param {Array} props.tags - Array of tag objects
 * @param {boolean} props.open - Whether the command palette is open
 * @param {Function} props.setOpen - Function to control the open state
 *
 * @returns {JSX.Element} Modern command launcher interface
 *
 * @example
 * <ModernCommandLauncher
 *   projects={allProjects}
 *   posts={allPosts}
 *   publications={allPublications}
 *   tags={allTags}
 *   open={isOpen}
 *   setOpen={setIsOpen}
 * />
 */
const ModernCommandLauncher = ({ projects, posts, publications, tags, open, setOpen }) => {
  const {
    page,
    search,
    deferredSearch,
    selected,
    recentSearches,
    theme,
    collections,
    navigationItems,
    setPage,
    setSearch,
    setSelected,
    isSearching,
    isEmpty
  } = useCmdLauncher({
    open,
    posts,
    projects,
    publications,
    setOpen,
    tags
  });

  // Filter navigation items based on search
  const filteredItems = filterItems(navigationItems, search);

  // Custom styles for glass morphism effect
  const customStyles = {
    '--cmdk-backdrop': 'rgba(0, 0, 0, 0.5)',
    '--cmdk-modal-background': theme === 'dark' ? 'rgba(17, 24, 39, 0.85)' : 'rgba(255, 255, 255, 0.85)',
    '--cmdk-modal-border': theme === 'dark' ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.3)',
    '--cmdk-modal-shadow': theme === 'dark' ? '0 25px 50px -12px rgba(0, 0, 0, 0.8)' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  };

  return (
    <CmdErrorBoundary>
      <div style={ customStyles }>
        <CommandPalette
          commandPaletteContentClassName={ `
            ${theme === 'dark' ? 'dark' : ''}
            backdrop-blur-xl
            border border-gray-200/30 dark:border-gray-700/30
            shadow-2xl
            rounded-2xl
            overflow-hidden
          ` }
          onChangeSelected={ setSelected }
          onChangeSearch={ setSearch }
          onChangeOpen={ setOpen }
          selected={ selected }
          search={ search }
          isOpen={ open }
          page={ page }
          footer={ <CmdFooter /> }
          placeholder='Search or type command...'
        >
          {/* Main root page */}
          <CommandPalette.Page id='root' searchPrefix={ [ 'General' ] }>
            {isSearching ? (
              <Suspense fallback={ <CmdSkeleton /> }>
                <CmdSearch
                  search={ deferredSearch }
                  collections={ collections }
                  recentSearches={ recentSearches }
                />
              </Suspense>
            ) : (
              <>
                {filteredItems.length > 0 ? (
                  filteredItems.map((list) => (
                    <div
                      key={ `cmd-${list.id}` }
                      className={ search.toLowerCase() === list.heading.toLowerCase() ? 'hidden' : '' }
                    >
                      <CommandPalette.List heading={ list.heading }>
                        {list.items.map((item) => (
                          <CommandPalette.ListItem
                            key={ `cmdPaletteItem-${list.id}-${item.id}` }
                            index={ getItemIndex(filteredItems, item.id) }
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
                  ))
                ) : (
                  <div className='p-8 text-center'>
                    <p className='text-gray-500 dark:text-gray-400'>
                      {isEmpty ? 'No content available' : 'Start typing to search...'}
                    </p>
                  </div>
                )}
              </>
            )}
          </CommandPalette.Page>

          {/* Dynamic pages for each content type */}
          {Object.entries(collections).map(([ type, items ]) => (
            <CmdPage
              key={ type }
              type={ type }
              items={ items }
              setPage={ setPage }
              search={ search }
              setSearch={ setSearch }
            />
          ))}

          {/* Contact/Social page */}
          <CommandPalette.Page id='contact' searchPrefix={ [ 'Contact' ] }>
            <CommandPalette.List heading='Get in touch'>
              <CommandPalette.ListItem index={ 0 } href='mailto:hello@example.com'>
                <CmdItem
                  title='Send Email'
                  subtitle='hello@example.com'
                  type='navigation'
                  icon='IdentificationIcon'
                />
              </CommandPalette.ListItem>
              <CommandPalette.ListItem index={ 1 } href='https://twitter.com/example'>
                <CmdItem
                  title='Twitter'
                  subtitle='@example'
                  type='navigation'
                  icon='IdentificationIcon'
                />
              </CommandPalette.ListItem>
              <CommandPalette.ListItem index={ 2 } href='https://linkedin.com/in/example'>
                <CmdItem
                  title='LinkedIn'
                  subtitle='Connect professionally'
                  type='navigation'
                  icon='IdentificationIcon'
                />
              </CommandPalette.ListItem>
            </CommandPalette.List>
          </CommandPalette.Page>
        </CommandPalette>
      </div>
    </CmdErrorBoundary>
  );
};

export default ModernCommandLauncher;
