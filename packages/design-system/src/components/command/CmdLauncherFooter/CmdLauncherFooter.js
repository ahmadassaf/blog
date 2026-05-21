/**
 * CmdLauncherFooter
 *
 * @description Footer component for the command palette that displays keyboard shortcuts and
 * navigation instructions. This component provides visual cues for users on how to interact
 * with the command palette, including selection (Enter), navigation (Arrow keys), and
 * closing/going back (Escape). It's responsive and hides some elements on small screens.
 *
 * @author Ahmad Assaf
 * @version 2.0.0
 */

import Kbd from '@/components/primitives/Kbd';

/**
 * CmdLauncherFooter component renders the footer with keyboard shortcuts guide
 *
 * @returns {JSX.Element} Footer with keyboard navigation instructions and icons
 *
 * @example
 * <CmdLauncherFooter />
 */
const CmdLauncherFooter = () => (
  <div className='px-3 py-2 border-t border-gray-200 dark:border-border-dark bg-white dark:bg-gray-800'>
    <div className='flex items-center text-xs text-gray-500 dark:text-gray-400 gap-4'>
      <span className='hidden sm:flex items-center gap-1'>
        <Kbd keys='enter' className='!text-xs !py-0.5' />
        to select
      </span>
      <span className='flex items-center gap-1'>
        <Kbd keys='down' className='!text-xs !py-0.5' />
        <Kbd keys='up' className='!text-xs !py-0.5' />
        to navigate
      </span>
      <span className='flex items-center gap-1'>
        <Kbd keys='escape' className='!text-xs !py-0.5 !px-2' />
        to close / go back
      </span>
    </div>
  </div>
);

export default CmdLauncherFooter;
