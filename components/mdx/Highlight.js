
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
  <strong className='highlight'>{children}</strong>
);

export default Highlight;

