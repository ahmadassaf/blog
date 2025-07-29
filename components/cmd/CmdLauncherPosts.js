/**
 * Command Launcher Posts Page Component
 *
 * @description A command palette page component that displays searchable blog posts within the command launcher.
 * Provides filtering functionality and renders posts in a structured list format with proper indexing and navigation.
 * Users can search through posts and select them for navigation.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import CommandPalette, { filterItems, getItemIndex } from '@tmikeladze/react-cmdk';

import CmdPost from '@/components/cmd/types/CmdPost';

import '@tmikeladze/react-cmdk/dist/cmdk.css';

/**
 * Posts command palette page component
 *
 * @description Renders a searchable list of blog posts within the command palette interface.
 * Filters posts based on search input and displays them with proper indexing and navigation.
 *
 * @param {Object} props - Component props
 * @param {Function} props.setPage - Function to navigate between command palette pages
 * @param {string} props.search - Current search query for filtering posts
 * @param {Array} props.posts - Array of post objects to display and search through
 *
 * @returns {JSX.Element} The rendered posts command palette page
 *
 * @example
 * <PostsCmd
 *   setPage={setCurrentPage}
 *   search="react"
 *   posts={allPosts}
 * />
 */
function PostsCmd({ setPage, search, posts }) {

  const postsItems = filterItems(
    [
      {
        'heading': 'Posts',
        'id': 'posts',
        'items': posts,
        'options': { 'filterOnListHeading': true }
      }
    ], search
  );

  return (
    <CommandPalette.Page id='posts' searchPrefix={ [ 'General', 'Posts' ] } onEscape={ () => {
      setPage('root');
    } }>

      {postsItems.length ? (
        postsItems.map((list) => (
          <CommandPalette.List key={ list.id } heading={ list.heading }>
            {list.items.map(({ id, title, category, ...rest }) => (
              <CommandPalette.ListItem
                key={ id }
                index={ getItemIndex(postsItems, id) }
                { ...rest }
              >
                <CmdPost title={ title } category={ category } />
              </CommandPalette.ListItem>
            ))}
          </CommandPalette.List>
        ))
      ) : (
        <CommandPalette.FreeSearchAction />
      )}
    </CommandPalette.Page>
  );
}

export default PostsCmd;
