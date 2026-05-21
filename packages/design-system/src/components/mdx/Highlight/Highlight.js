
/**
 * Highlight Component
 *
 * @description A simple text highlighting component that wraps content in a styled strong element.
 * Used within MDX content to emphasize important text with visual highlighting styles.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

/**
 * Renders highlighted text within MDX content
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The text content to be highlighted
 * @returns {JSX.Element} A strong element with highlight styling
 *
 * @example
 * // In MDX content:
 * <Highlight>This text will be highlighted</Highlight>
 */
const Highlight = ({ children }) => (
  <strong className='font-bold rounded-[3px] -mx-1.5 -my-0.5 px-1.5 py-0.5 bg-gradient-to-r from-blue-500/30 to-blue-500/70 dark:from-blue-300/20 dark:to-blue-300/40 dark:text-blue-300 [box-decoration-break:clone] [-webkit-box-decoration-break:clone]'>
    {children}
  </strong>
);

export default Highlight;
