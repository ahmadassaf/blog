/**
 * MenuSearch Component
 *
 * @description Search functionality component for the navigation menu that provides a clickable search input
 * with keyboard shortcut indicator. This component opens a command palette/search modal when clicked or
 * when the Cmd+K keyboard shortcut is used. Features responsive design for mobile and desktop layouts.
 *
 * @author Ahmad Assaf
 * @version 2.0.0
 */

import Kbd from '@/components/primitives/Kbd';

/**
 * Renders a search input button that opens the command palette
 *
 * @description Interactive search component that displays a styled input field with a Cmd+K keyboard
 * shortcut indicator. When clicked, it triggers the search/command launcher modal. The component
 * is fully responsive and adapts its width based on screen size.
 *
 * @param {Object} props - Component props
 * @param {Function} props.setOpen - Function to open the search/command launcher modal
 *
 * @returns {JSX.Element} Search input button with keyboard shortcut indicator
 *
 * @example
 * // Basic usage in navigation
 * const [isLauncherOpen, setIsLauncherOpen] = useState(false);
 * <MenuSearch setOpen={setIsLauncherOpen} />
 *
 * @example
 * // Used within mobile menu
 * <MenuSearch setOpen={setLauncherOpen} />
 */
const MenuSearch = ({ setOpen }) => (

  <div className='w-full lg:max-w-xs max-sm:w-[95%]'>
    <button className='relative w-full' type='button' onClick={ () => setOpen(true) } aria-label='Open search'>
      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 right-0'>
        <div className='absolute right-1.5 top-1.5 flex items-center gap-0.5'>
          <Kbd keys='command' className='!py-0.5 !text-[10px] !min-w-[20px]' />
          <Kbd keys='k' className='!py-0.5 !text-[10px] !min-w-[20px]' />
        </div>
      </div>
      <span className='outline-hidden! ring-1 ring-gray-300 cursor-pointer block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-left text-gray-400 sm:text-sm sm:leading-6'>
        Search
      </span>
    </button>
  </div>

);

export default MenuSearch;
