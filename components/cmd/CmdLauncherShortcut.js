/**
 * Command Launcher Shortcut Component
 *
 * @description A visual indicator component that displays the keyboard shortcut for opening the command launcher.
 * Shows the "⌘ + K" key combination with styled key badges and descriptive text. Provides users with
 * a clear visual cue on how to access the command palette functionality.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

/**
 * Component displaying the keyboard shortcut for command launcher
 *
 * @description Renders a formatted display of the "⌘ + K" keyboard shortcut with styled key badges.
 * The component uses theme-aware styling for both light and dark modes.
 *
 * @returns {JSX.Element} The rendered shortcut display component
 *
 * @example
 * <LauncherShortcut />
 */
const LauncherShortcut = () => (
  <div className='mt-8 text-slate-600 dark:text-slate-400'>
    <span className='text-sm'>Press</span>{' '}
    <span className=' bg-gray-300 p-1 text-sm text-gray-900 dark:bg-gray-400'>
        ⌘
    </span>{' '}
    <span className='text-sm'>+ </span>
    <span className=' bg-gray-300 p-1 text-sm text-gray-900 dark:bg-gray-400'>
        K
    </span>{' '}
    <span className='text-sm'>to start</span>
  </div>
);

export default LauncherShortcut;
