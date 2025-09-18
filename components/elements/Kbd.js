/**
 * Keyboard Key Component
 *
 * @description A styled keyboard key component that displays keyboard shortcuts with
 * consistent styling across the application. Inspired by HeroUI's kbd component design.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

/**
 * Renders a styled keyboard key
 *
 * @description Displays keyboard keys with proper styling including shadows, borders,
 * and theme-aware colors. Supports both single keys and key combinations.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The key content to display
 * @param {string} [props.className] - Additional CSS classes
 *
 * @returns {JSX.Element} Styled keyboard key element
 *
 * @example
 * // Single key
 * <Kbd>K</Kbd>
 *
 * // Key combination
 * <div className="flex items-center gap-1">
 *   <Kbd>⌘</Kbd>
 *   <span>+</span>
 *   <Kbd>K</Kbd>
 * </div>
 */
const Kbd = ({ children, className = '' }) => (
  <kbd className={ `inline-flex items-center justify-center px-2 py-1 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-gradient-to-t from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-[0_2px_0_0_rgba(0,0,0,0.08)] dark:shadow-[0_2px_0_0_rgba(0,0,0,0.5)] min-w-[24px] ${className}` }>
    {children}
  </kbd>
);

export default Kbd;
