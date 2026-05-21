/**
 * CmdLauncherPublications
 *
 * @description Command palette page component for displaying and filtering academic publications.
 * This component renders a searchable list of publications within the command palette interface,
 * allowing users to browse available publications with their titles and years. It provides
 * filtering capabilities based on search input and keyboard navigation support.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import CommandPalette, { filterItems, getItemIndex } from '@tmikeladze/react-cmdk';

import CmdPublication from '@/components/command/types/CmdPublication';

import '@tmikeladze/react-cmdk/dist/cmdk.css';

/**
 * PublicationsCmd component renders the publications page within the command palette
 *
 * @param {Object} props - Component props
 * @param {Function} props.setPage - Function to navigate between command palette pages
 * @param {string} props.search - Current search query for filtering publications
 * @param {Array} props.publications - Array of publication objects with title and year properties
 * @returns {JSX.Element} Command palette page with filtered publications list
 *
 * @example
 * <PublicationsCmd
 *   setPage={setPage}
 *   search="machine learning"
 *   publications={[{id: 1, title: "ML Research Paper", year: 2023}]}
 * />
 */
function PublicationsCmd({ setPage, search, publications }) {

  const publicationItems = filterItems(
    [
      {
        'heading': 'Publications',
        'id': 'publications',
        'items': publications,
        'options': { 'filterOnListHeading': true }
      }
    ], search
  );

  return (
    <CommandPalette.Page id='publications' searchPrefix={ [ 'General', 'Publications' ] } onEscape={ () => {
      setPage('root');
    } }>

      {publicationItems.length ? (
        publicationItems.map((list) => (
          <CommandPalette.List key={ list.id } heading={ list.heading }>
            {list.items.map(({ id, title, year, ...rest }) => (
              <CommandPalette.ListItem
                key={ id }
                index={ getItemIndex(publicationItems, id) }
                { ...rest }
              >
                <CmdPublication title={ title } year={ year }/>
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

export default PublicationsCmd;
