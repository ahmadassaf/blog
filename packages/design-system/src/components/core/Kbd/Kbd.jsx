import { cn } from '@/components/utilities/cn';
import { createVariants } from '@/components/utilities/variants';

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

const keyLabelMap = {
  'cmd': 'Command',
  'command': 'Command',
  'ctrl': 'Control',
  'esc': 'Escape',
  'meta': 'Command',
  'option': 'Option',
  'return': 'Enter',
  'win': 'Windows'
};

export const kbdVariants = createVariants({
  'base': 'inline-flex min-w-[1.5rem] items-center justify-center border font-semibold shadow-[0_2px_0_0_rgba(0,0,0,0.08)] dark:shadow-[0_2px_0_0_rgba(0,0,0,0.5)]',
  'defaultVariants': {
    'size': 'md',
    'variant': 'raised'
  },
  'variants': {
    'size': {
      'lg': 'px-2.5 py-1.5 text-sm',
      'md': 'px-2 py-1 text-xs',
      'sm': 'px-1.5 py-0.5 text-[11px]',
      'xs': 'px-1 py-0.5 text-[10px]'
    },
    'variant': {
      'flat': 'rounded-md border-gray-200 bg-gray-50 text-gray-800 shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200',
      'outline': 'rounded-md border-gray-300 bg-transparent text-gray-800 shadow-none dark:border-gray-600 dark:text-gray-200',
      'raised': 'rounded-md border-gray-300 bg-gradient-to-t from-gray-100 to-gray-50 text-gray-800 dark:border-gray-600 dark:from-gray-800 dark:to-gray-700 dark:text-gray-200'
    }
  }
});

const Kbd = ({ children, className, keys, size, variant }) => {
  let content = children;
  let accessibleLabel;
  const classes = kbdVariants({ className, size, variant });

  if (keys) {
    const keyList = keys.split(',').map((key) => key.trim().toLowerCase());
    const symbols = keyList.map((key) => keyMap[key] || key.toUpperCase());
    const labels = keyList.map((key) => keyLabelMap[key] || key.charAt(0).toUpperCase() + key.slice(1));

    accessibleLabel = labels.join(' plus ');

    if (symbols.length > 1)
      return (
        <span className='inline-flex items-center gap-0.5' aria-label={ accessibleLabel } role='img'>
          {symbols.map((symbol, index) => (
            <kbd key={ `${symbol}-${index}` } className={ classes } aria-hidden='true'>
              {symbol}
            </kbd>
          ))}
        </span>
      );

    [ content ] = symbols;
  }

  return (
    <kbd className={ cn(classes) } aria-label={ accessibleLabel }>
      {content}
    </kbd>
  );
};

export default Kbd;
