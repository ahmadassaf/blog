/**
 * CmdTag
 *
 * @description Individual tag item renderer for the command palette. This component displays
 * a tag title alongside its post count in a formatted layout. The post count is shown as
 * a blue badge indicating how many posts are associated with this tag.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

/**
 * CmdTag component renders a tag item within the command palette
 *
 * @param {Object} props - Component props
 * @param {string} props.title - The name/title of the tag
 * @param {number} props.count - The number of posts associated with this tag
 * @returns {JSX.Element} Formatted tag item with title and post count badge
 *
 * @example
 * <CmdTag
 *   title="JavaScript"
 *   count={12}
 * />
 */
function CmdTag({ title, count }) {

  return (
    <div className='flex justify-between w-full'>
      <div className='text-md'>{ title }</div>
      <span className='text-xs inline-flex items-center rounded-md bg-blue-600 px-2 py-1 hover:bg-blue-700 text-white font-medium transition-colors duration-200'>{ count }</span>
    </div>
  );
}

export default CmdTag;

