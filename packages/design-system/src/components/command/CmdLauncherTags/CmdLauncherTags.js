/**
 * CmdLauncherTags
 *
 * @description Command palette page component for displaying and filtering blog tags. This component
 * renders a searchable list of tags within the command palette interface, allowing users to
 * browse available tags and see post counts for each tag. It provides filtering capabilities
 * based on search input and keyboard navigation support.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import CommandPalette, { filterItems, getItemIndex } from '@tmikeladze/react-cmdk';

import CmdTag from '@/components/command/types/CmdTag';

import '@tmikeladze/react-cmdk/dist/cmdk.css';

/**
 * TagsCmd component renders the tags page within the command palette
 *
 * @param {Object} props - Component props
 * @param {Function} props.setPage - Function to navigate between command palette pages
 * @param {string} props.search - Current search query for filtering tags
 * @param {Array} props.tags - Array of tag objects with title and count properties
 * @returns {JSX.Element} Command palette page with filtered tags list
 *
 * @example
 * <TagsCmd
 *   setPage={setPage}
 *   search="javascript"
 *   tags={[{id: 1, title: "JavaScript", count: 5}]}
 * />
 */
function TagsCmd({ setPage, search, tags }) {

  const tagItems = filterItems(
    [
      {
        'heading': 'Tags',
        'id': 'tags',
        'items': tags,
        'options': { 'filterOnListHeading': true }
      }
    ], search
  );

  return (
    <CommandPalette.Page id='tags' searchPrefix={ [ 'General', 'Tags' ] } onEscape={ () => {
      setPage('root');
    } }>

      {tagItems.length ? (
        tagItems.map((list) => (
          <CommandPalette.List key={ list.id } heading={ list.heading }>
            {list.items.map(({ id, title, count, ...rest }) => (
              <CommandPalette.ListItem
                key={ id }
                index={ getItemIndex(tagItems, id) }
                { ...rest }
              >
                <CmdTag title={ title } count={ count }/>
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

export default TagsCmd;
