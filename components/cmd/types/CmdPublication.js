/**
 * CmdPublication
 *
 * @description Individual publication item renderer for the command palette. This component
 * displays an academic publication title alongside its publication year in a formatted layout.
 * The year is displayed as a yellow badge to distinguish publications from other content types.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

/**
 * CmdPublication component renders a publication item within the command palette
 *
 * @param {Object} props - Component props
 * @param {string} props.title - The title of the academic publication
 * @param {number|string} props.year - The publication year
 * @returns {JSX.Element} Formatted publication item with title and year badge
 *
 * @example
 * <CmdPublication
 *   title="Machine Learning Approaches to Data Analysis"
 *   year={2023}
 * />
 */
function CmdPublication({ title, year }) {

  return (
    <div className='flex justify-between w-full items-center'>
      <div className='text-sm font-medium'>{ title }</div>
      <span className='text-xs text-gray-500 dark:text-gray-400'>
        { year }
      </span>
    </div>
  );
}

export default CmdPublication;

