/**
 * Command Launcher Thoughts Page Component
 *
 * @description A command palette page component that displays searchable thoughts within the command launcher.
 * Provides filtering functionality and renders thoughts in a structured list format with proper indexing and navigation.
 * Users can search through thoughts and select them for navigation.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import CommandPalette, { filterItems, getItemIndex } from '@tmikeladze/react-cmdk';

import CmdItem from '@/components/cmd/CmdItem';

import '@tmikeladze/react-cmdk/dist/cmdk.css';

/**
 * Thoughts command palette page component
 *
 * @description Renders a searchable list of thoughts within the command palette interface.
 * Filters thoughts based on search input and displays them with proper indexing and navigation.
 *
 * @param {Object} props - Component props
 * @param {Function} props.setPage - Function to navigate between command palette pages
 * @param {string} props.search - Current search query for filtering thoughts
 * @param {Array} props.thoughts - Array of thought objects to display and search through
 *
 * @returns {JSX.Element} The rendered thoughts command palette page
 *
 * @example
 * <ThoughtsCmd
 *   setPage={setCurrentPage}
 *   search="learning"
 *   thoughts={allThoughts}
 * />
 */
function ThoughtsCmd({ setPage, search, thoughts }) {

  const thoughtsItems = filterItems(
    [
      {
        'heading': 'Thoughts',
        'id': 'thoughts',
        'items': thoughts,
        'options': { 'filterOnListHeading': true }
      }
    ], search
  );

  return (
    <CommandPalette.Page id='thoughts' searchPrefix={ [ 'General', 'Thoughts' ] } onEscape={ () => {
      setPage('root');
    } }>

      {thoughtsItems.length ? (
        thoughtsItems.map((list) => (
          <CommandPalette.List key={ list.id } heading={ list.heading }>
            {list.items.map(({ id, title, summary, type, ...rest }) => (
              <CommandPalette.ListItem
                key={ id }
                index={ getItemIndex(thoughtsItems, id) }
                { ...rest }
              >
                <CmdItem
                  title={ title }
                  subtitle={ summary }
                  type={ type }
                  icon='LightBulbIcon'
                />
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

export default ThoughtsCmd;
