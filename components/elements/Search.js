/**
 * Search Component
 *
 * @description Input field component for filtering/searching articles with
 * integrated search icon and dark mode support. Provides real-time search
 * functionality through callback function.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

/**
 * Search input component for article filtering
 *
 * @param {Object} props - Component props
 * @param {Function} props.setSearchValue - Callback function to handle search value changes
 * @returns {JSX.Element} Search input with icon
 *
 * @example
 * const [searchTerm, setSearchTerm] = useState('');
 * <Search setSearchValue={setSearchTerm} />
 */
const Search = ({ setSearchValue }) => (
  <div className='relative mt-8 border-none'>
    <input
      aria-label='Search articles'
      type='text'
      onChange={ (error) => setSearchValue(error.target.value) }
      placeholder='Filter articles'
      className='block w-full border-0 border-b border-gray-300 bg-transparent px-0 py-2 text-gray-900 focus:border-b-2 focus:border-blue-500 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-transparent dark:text-gray-100 dark:focus:border-blue-400'
    />
    <svg className='absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={ 2 } d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
    </svg>
  </div>
);

export default Search;
