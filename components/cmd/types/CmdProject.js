/**
 * CmdProject
 *
 * @description Individual project item renderer for the command palette. This component displays
 * a project title with its subtitle/description in a formatted layout. It can optionally
 * show a "Project" type badge when used in mixed content contexts like search results.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

/**
 * CmdProject component renders a project item within the command palette
 *
 * @param {Object} props - Component props
 * @param {string} props.title - The title/name of the project
 * @param {string} props.subtitle - The description or subtitle of the project
 * @param {boolean} props.showType - Whether to display the "Project" type badge
 * @returns {JSX.Element} Formatted project item with title, subtitle, and optional type badge
 *
 * @example
 * <CmdProject
 *   title="React Component Library"
 *   subtitle="Reusable UI components for React applications"
 *   showType={true}
 * />
 */
function CmdProject({ title, subtitle, showType }) {
  return (
    <div className='flex w-full justify-between items-center'>
      <div>
        <div className='text-md font-medium'>{ title }</div>
        <div className='text-xs text-gray-600 dark:text-white dark:font-light'>{ subtitle }</div>
      </div>
      {showType && (
        <div className='text-xs inline-flex items-center rounded-xs bg-blue-600 px-2.5 py-0.5 hover:bg-blue-700 uppercase text-white font-medium transition-colors duration-200 h-fit'>Project</div>
      )}
    </div>
  );
}

export default CmdProject;
