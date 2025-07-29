/**
 * CmdPost
 *
 * @description Individual post item renderer for the command palette. This component displays
 * a blog post title alongside its category in a formatted layout. The category is displayed
 * as a colored badge with proper formatting (replacing hyphens with spaces and capitalizing).
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

/**
 * CmdPost component renders a blog post item within the command palette
 *
 * @param {Object} props - Component props
 * @param {string} props.title - The title of the blog post
 * @param {string} props.category - The category of the blog post (may contain hyphens)
 * @returns {JSX.Element} Formatted post item with title and category badge
 *
 * @example
 * <CmdPost
 *   title="Understanding React Hooks"
 *   category="web-development"
 * />
 */
function CmdPost({ title, category }) {

  return (
    <div className='contents w-full'>
      <div className='text-md w-[100%]'>{ title }</div>
      <span className='text-xs inline-flex items-center rounded bg-green-600 px-2 py-0.5 hover:bg-green-700 text-white font-medium transition-colors duration-200'>{ category.replace('-', ' ') }</span>
    </div>
  );
}

export default CmdPost;
