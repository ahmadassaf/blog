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
    <div className='flex justify-between w-full items-center'>
      <div className='text-sm font-medium'>{ title }</div>
      <span className='text-xs text-gray-500 dark:text-gray-400'>
        { count } {count === 1 ? 'post' : 'posts'}
      </span>
    </div>
  );
}

export default CmdTag;

