/**
 * Keyboard Key Component
 *
 * @description A styled keyboard key component that displays keyboard shortcuts with
 * consistent styling across the application. Inspired by HeroUI's kbd component design.
 *
 * @author Ahmad Assaf
 * @version 2.0.0
 */

/**
 * Map of special keys to their display symbols
 */
const keyMap = {
  'alt': '⌥',
  'backspace': '⌫',
  'capslock': '⇪',
  'cmd': '⌘',
  'command': '⌘',
  'control': '⌃',
  'ctrl': '⌃',
  'delete': '⌫',
  'down': '↓',
  'end': 'End',
  'enter': '↵',
  'esc': 'esc',
  'escape': 'esc',
  'fn': 'fn',
  'help': '?',
  'home': 'Home',
  'left': '←',
  'meta': '⌘',
  'option': '⌥',
  'pagedown': 'PgDn',
  'pageup': 'PgUp',
  'return': '↵',
  'right': '→',
  'shift': '⇧',
  'space': '␣',
  'tab': '⇥',
  'up': '↑',
  'win': '⊞',
  'windows': '⊞'
};

/**
 * Renders a styled keyboard key
 *
 * @description Displays keyboard keys with proper styling including shadows, borders,
 * and theme-aware colors. Supports both single keys and special key types.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The key content to display
 * @param {string} [props.keys] - Special key type(s) to render (can be comma-separated)
 * @param {string} [props.className] - Additional CSS classes
 *
 * @returns {JSX.Element} Styled keyboard key element
 *
 * @example
 * // Single key
 * <Kbd>K</Kbd>
 *
 * // Special keys
 * <Kbd keys="command">⌘</Kbd>
 * <Kbd keys="enter" />
 *
 * // Multiple keys
 * <Kbd keys="command,shift" />
 */
const Kbd = ({ children, keys, className = '' }) => {
  let content = children;

  // If keys prop is provided, map them to symbols
  if (keys) {
    const keyList = keys.split(',').map((key) => key.trim().toLowerCase());
    const symbols = keyList.map((key) => keyMap[key] || key.toUpperCase());

    // If multiple keys, render them separately
    if (symbols.length > 1)
      return (
        <span className='inline-flex items-center gap-0.5'>
          {symbols.map((symbol, index) => (
            <kbd
              key={ index }
              className={ `inline-flex items-center justify-center px-2 py-1 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-gradient-to-t from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-[0_2px_0_0_rgba(0,0,0,0.08)] dark:shadow-[0_2px_0_0_rgba(0,0,0,0.5)] min-w-[24px] ${className}` }
            >
              {symbol}
            </kbd>
          ))}
        </span>
      );

    // Single key
    content = symbols[0];
  }

  return (
    <kbd className={ `inline-flex items-center justify-center px-2 py-1 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-gradient-to-t from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-[0_2px_0_0_rgba(0,0,0,0.08)] dark:shadow-[0_2px_0_0_rgba(0,0,0,0.5)] min-w-[24px] ${className}` }>
      {content}
    </kbd>
  );
};

export default Kbd;
