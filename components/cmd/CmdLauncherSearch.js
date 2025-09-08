/**
 * CmdLauncherSearch
 *
 * @description Command palette search component that provides full-text search functionality
 * across blog posts and projects. This component uses FlexSearch to index and search through
 * content, displaying results with different renderers based on content type. It provides
 * real-time search results as users type in the command palette.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { useCallback, useEffect, useState } from 'react';
import { TbFaceIdError } from 'react-icons/tb';
import CommandPalette, { getItemIndex } from '@tmikeladze/react-cmdk';
import { allPosts } from 'contentlayer/generated';
import pkg from 'flexsearch';

import CmdPost from '@/components/cmd/types/CmdPost';
import CmdProject from '@/components/cmd/types/CmdProject';

import '@tmikeladze/react-cmdk/dist/cmdk.css';

const { Index } = pkg;

const index = new Index({
  'cache': true,
  'contextual': true,
  'preset': 'match',
  'tokenize': 'full'
});

allPosts.forEach((post) => {
  index.add(post.slug, post.body.raw);
});

/**
 * SearchCmd component provides full-text search functionality within the command palette
 *
 * @param {Object} props - Component props
 * @param {string} props.search - Current search query string
 * @param {Function} props.setShowType - Function to set the display type for results
 * @param {Array} props.content - Array of content items (posts, projects) to search through
 * @returns {JSX.Element} Search results interface with filtered content
 *
 * @example
 * <SearchCmd
 *   search="react hooks"
 *   setShowType={setShowType}
 *   content={allContent}
 * />
 */
function SearchCmd({ search, setShowType, content }) {
  const [ searchResult, setSearchResult ] = useState([]);

  /**
   * Performs search operation using FlexSearch index
   *
   * @param {string} query - Search query string
   * @returns {Promise<void>} Promise that resolves when search is complete
   */
  const searchAPI = useCallback(async(query) => {
    setSearchResult({ 'items': content.filter((_content) => index.search(query).includes(_content.slug)) });

  }, [ content ]);

  useEffect(() => {
    searchAPI(search).catch(() => {

      // Ignore search errors
    });
  }, [ searchAPI, search ]);

  if (!searchResult) searchAPI(search);

  return (
    <div>
      { searchResult.items && searchResult.items.length ? (
        <div>
          {searchResult.items && searchResult.items.length && (
            <CommandPalette.List key='fullTextSearch' heading={ 'Full-text Search Results' }>
              {searchResult.items.map(({ id, type, title, subtitle, category, ...rest }) => (
                <CommandPalette.ListItem
                  key={ id }
                  index={ getItemIndex([ searchResult ], id) }
                  { ...rest }
                >
                  {(() => {
                    switch (type) {
                    case 'post':
                      return <CmdPost title={ title } category={ category }/>;
                    case 'project':
                      return <CmdProject title={ title } subtitle={ subtitle } showType={ true }/>;
                    default:
                      return <CmdPost title={ title } category={ category }/>;
                    }
                  })()}
                </CommandPalette.ListItem>
              ))}
            </CommandPalette.List>
          )}
        </div>
      ) : (
        <div className='flex flex-column items-center'>
          <TbFaceIdError className='m-2'/>
          <p>Cannot find any match (Full-text search enabled)</p>
        </div>
      )}
    </div>
  );
}

export default SearchCmd;
