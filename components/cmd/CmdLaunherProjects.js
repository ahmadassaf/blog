/**
 * CmdLauncherProjects
 *
 * @description Command palette page component for displaying and filtering projects. This component
 * renders a searchable list of projects within the command palette interface, allowing users to
 * browse and navigate to specific projects. It handles filtering based on search input and
 * provides keyboard navigation support.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import CommandPalette, { filterItems, getItemIndex } from '@tmikeladze/react-cmdk';

import CmdProject from '@/components/cmd/types/CmdProject';

import '@tmikeladze/react-cmdk/dist/cmdk.css';

/**
 * ProjectsCmd component renders the projects page within the command palette
 *
 * @param {Object} props - Component props
 * @param {Function} props.setPage - Function to navigate between command palette pages
 * @param {string} props.search - Current search query for filtering projects
 * @param {Array} props.projects - Array of project objects to display
 * @returns {JSX.Element} Command palette page with filtered project list
 *
 * @example
 * <ProjectsCmd
 *   setPage={setPage}
 *   search="react"
 *   projects={[{id: 1, title: "React App", subtitle: "Web application"}]}
 * />
 */
function ProjectsCmd({ setPage, search, projects }) {

  const projectItems = filterItems(
    [
      {
        'heading': 'Projects',
        'id': 'projects',
        'items': projects,
        'options': { 'filterOnListHeading': true }
      }
    ], search
  );

  return (
    <CommandPalette.Page id='projects' searchPrefix={ [ 'General', 'Projects' ] } onEscape={ () => {
      setPage('root');
    } }>

      {projectItems.length ? (
        projectItems.map((list) => (
          <CommandPalette.List key={ list.id } heading={ list.heading }>
            {list.items.map(({ id, title, subtitle, ...rest }) => (
              <CommandPalette.ListItem
                key={ id }
                index={ getItemIndex(projectItems, id) }
                { ...rest }
              >
                <CmdProject title={ title } subtitle={ subtitle }/>
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

export default ProjectsCmd;
