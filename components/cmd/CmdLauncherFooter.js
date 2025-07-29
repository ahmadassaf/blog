/**
 * CmdLauncherFooter
 *
 * @description Footer component for the command palette that displays keyboard shortcuts and
 * navigation instructions. This component provides visual cues for users on how to interact
 * with the command palette, including selection (Enter), navigation (Arrow keys), and
 * closing/going back (Escape). It's responsive and hides some elements on small screens.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

/**
 * CmdLauncherFooter component renders the footer with keyboard shortcuts guide
 *
 * @returns {JSX.Element} Footer with keyboard navigation instructions and icons
 *
 * @example
 * <CmdLauncherFooter />
 */
const CmdLauncherFooter = () => (
  <div className='px-3 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'>
    <div className='flex items-center text-xs text-gray-500 dark:text-gray-400 gap-4'>
      <span className='hidden sm:flex items-center gap-1'>
        <kbd className='px-2 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded min-w-[24px] text-center'>↵</kbd>
        to select
      </span>
      <span className='flex items-center gap-1'>
        <kbd className='px-2 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded min-w-[24px] text-center'>↓</kbd>
        <kbd className='px-2 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded min-w-[24px] text-center'>↑</kbd>
        to navigate
      </span>
      <span className='flex items-center gap-1'>
        <kbd className='px-2 py-1 text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded min-w-[28px] text-center'>esc</kbd>
        to close / go back
      </span>
    </div>
  </div>
);

export default CmdLauncherFooter;
