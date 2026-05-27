/**
 * Command Launcher Shortcut Component
 *
 * @description A visual indicator component that displays the keyboard shortcut for opening the command launcher.
 * Shows the "⌘ + K" key combination with styled key badges and descriptive text. Provides users with
 * a clear visual cue on how to access the command palette functionality.
 *
 * @author Ahmad Assaf
 * @version 2.0.0
 */

import Kbd from '@/components/core/Kbd';

/**
 * Component displaying the keyboard shortcut for command launcher
 *
 * @description Renders a formatted display of the "⌘ + K" keyboard shortcut with styled key badges.
 * The component uses theme-aware styling for both light and dark modes with enhanced visual design.
 *
 * @returns {JSX.Element} The rendered shortcut display component
 *
 * @example
 * <LauncherShortcut />
 */
const LauncherShortcut = () => (
  <div className='mt-8 text-slate-600 dark:text-slate-400 flex items-center gap-1.5'>
    <span className='text-sm'>Press</span>
    <Kbd>⌘</Kbd>
    <span className='text-xs'>+</span>
    <Kbd>K</Kbd>
    <span className='text-sm'>to start</span>
  </div>
);

export default LauncherShortcut;
