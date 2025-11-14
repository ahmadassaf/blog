/**
 * Callout Component
 *
 * @description Simple callout boxes for highlighting different types of content.
 * Supports three types: info (blue), warning (yellow), and error (red).
 * Clean design without icons. Used within MDX content to draw attention to important information.
 *
 * @author Ahmad Assaf
 * @version 2.0.0
 */

/**
 * Renders a styled callout box with type-specific styling
 *
 * @param {Object} props - Component props
 * @param {('info'|'warning'|'error')} props.type - The callout type that determines styling (default: 'info')
 * @param {React.ReactNode} props.children - The content to display within the callout
 * @returns {JSX.Element} A div containing the styled callout
 *
 * @example
 * // In MDX content - Info callout:
 * <Callout type="info">
 *   This is important information for readers to note.
 * </Callout>
 *
 * @example
 * // In MDX content - Warning callout:
 * <Callout type="warning">
 *   Be careful when following these steps!
 * </Callout>
 *
 * @example
 * // In MDX content - Error callout:
 * <Callout type="error">
 *   This action cannot be undone!
 * </Callout>
 */
const Callout = ({ type = 'info', children }) => {
  let calloutStyles;

  switch (type) {
  case 'warning':
    calloutStyles = {
      'background': 'bg-gradient-to-br from-white to-yellow-50 dark:from-gray-900 dark:to-yellow-950/30',
      'border': 'border-yellow-200 dark:border-yellow-800',
      'text': 'text-yellow-800 dark:text-yellow-200'
    };
    break;
  case 'error':
    calloutStyles = {
      'background': 'bg-gradient-to-br from-white to-red-50 dark:from-gray-900 dark:to-red-950/30',
      'border': 'border-red-200 dark:border-red-800',
      'text': 'text-red-800 dark:text-red-200'
    };
    break;
  case 'info':
  default:
    calloutStyles = {
      'background': 'bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950/30',
      'border': 'border-blue-200 dark:border-blue-800',
      'text': 'text-blue-800 dark:text-blue-200'
    };
    break;
  }

  return (
    <div className={ `px-6 py-4 mb-6 rounded-lg border text-md ${calloutStyles.background} ${calloutStyles.border}` }>
      <div className={ `${calloutStyles.text} [&>p]:m-0 [&>p:not(:last-child)]:mb-2` }>
        {children}
      </div>
    </div>
  );
};

export default Callout;
