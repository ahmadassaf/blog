/**
 * MenuSearch Component
 *
 * @description Search functionality component for the navigation menu that provides a clickable search input
 * with keyboard shortcut indicator. This component opens a command palette/search modal when clicked or
 * when the Cmd+K keyboard shortcut is used. Features responsive design for mobile and desktop layouts.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

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
    <label htmlFor='search' className='sr-only'>Search</label>
    <button className='relative w-full' onClick={ () => setOpen(true) }>
      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 right-0'>
        <kbd className='absolute right-1.5 top-1.5 h-6 select-none items-center bg-gray-300 gap-1 rounded-sm border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 flex'>
          <span className='text-xs font-white'>⌘</span>K
        </kbd>
      </div>
      <input id='search' name='search' className='outline-hidden! ring-1 ring-gray-300 cursor-pointer block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6' placeholder='Search' type='search'/>
    </button>
  </div>

);

export default MenuSearch;
