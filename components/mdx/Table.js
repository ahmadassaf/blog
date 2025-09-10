/**
 * Table Component for MDX
 *
 * @description A responsive table component that expands beyond the standard content width
 * to provide more space for tabular data. Features horizontal scrolling on mobile,
 * subtle shadows for depth, and proper styling for both light and dark themes.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

import { useEffect, useRef } from 'react';

/**
 * Enhanced table component that breaks out of content width constraints
 *
 * @description Creates a full-width responsive table that extends beyond the normal prose
 * width. On larger screens, it uses negative margins to expand into the available space.
 * On smaller screens, it provides horizontal scrolling with visual indicators.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Table content (thead, tbody, etc.)
 * @param {string} [props.className] - Additional CSS classes
 * @param {...Object} props.rest - Additional props passed to the table element
 *
 * @returns {JSX.Element} Enhanced responsive table component
 *
 * @example
 * <Table>
 *   <thead>
 *     <tr>
 *       <th>Column 1</th>
 *       <th>Column 2</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td>Data 1</td>
 *       <td>Data 2</td>
 *     </tr>
 *   </tbody>
 * </Table>
 */
const Table = ({ children, className = '', ...rest }) => {
  const scrollContainerRef = useRef(null);
  const leftShadowRef = useRef(null);
  const rightShadowRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const leftShadow = leftShadowRef.current;
    const rightShadow = rightShadowRef.current;

    if (!scrollContainer || !leftShadow || !rightShadow) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      const maxScroll = scrollWidth - clientWidth;

      // Show left shadow if scrolled right
      if (scrollLeft > 10) leftShadow.style.opacity = '1';
      else leftShadow.style.opacity = '0';

      // Show right shadow if not at the end
      if (scrollLeft < maxScroll - 10) rightShadow.style.opacity = '1';
      else rightShadow.style.opacity = '0';

    };

    // Initial check
    handleScroll();

    // Add scroll listener
    scrollContainer.addEventListener('scroll', handleScroll);

    // Check on resize
    const handleResize = () => setTimeout(handleScroll, 100);

    window.addEventListener('resize', handleResize);

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='not-prose my-8'>
      {/* Breakout container that expands beyond prose width while maintaining side gaps */}
      <div className='relative -mx-16 sm:-mx-24 md:-mx-40 lg:-mx-56 xl:-mx-80 2xl:-mx-96' style={{
        'marginLeft': 'max(-12rem, calc(-50vw + 50% + 0.125rem))',
        'marginRight': 'max(-12rem, calc(-50vw + 50% + 0.125rem))'
      }}>
        {/* Enhanced responsive table container with horizontal scroll */}
        <div
          ref={ scrollContainerRef }
          className='table-scroll'
        >
          {/* Scroll shadow indicators */}
          <div
            ref={ leftShadowRef }
            className='scroll-shadow-left'
          ></div>
          <div
            ref={ rightShadowRef }
            className='scroll-shadow-right opacity-1'
          ></div>

          <div className='inline-block min-w-full align-middle'>
            <table
              className={ `min-w-full table-fixed ${className}` }
              style={{ 'minWidth': '600px' }}
              { ...rest }
            >
              {children}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Enhanced table header component
 */
const TableHead = ({ children, className = '', ...rest }) => (
  <thead className={ `bg-gray-50 dark:bg-gray-800 ${className}` } { ...rest }>
    {children}
  </thead>
);

/**
 * Enhanced table body component
 */
const TableBody = ({ children, className = '', ...rest }) => (
  <tbody className={ `bg-white dark:bg-gray-900 ${className}` } { ...rest }>
    {children}
  </tbody>
);

/**
 * Enhanced table row component
 */
const TableRow = ({ children, className = '', ...rest }) => (
  <tr className={ `hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150 ${className}` } { ...rest }>
    {children}
  </tr>
);

/**
 * Enhanced table header cell component
 */
const TableHeaderCell = ({ children, className = '', width, ...rest }) => (
  <th
    className={ `table-cell-padding text-left text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider ${className}` }
    style={{ width, ...(rest.style || {}) }}
    { ...rest }
  >
    {children}
  </th>
);

/**
 * Enhanced table data cell component
 */
const TableCell = ({ children, className = '', width, ...rest }) => (
  <td
    className={ `table-cell-padding text-sm text-gray-900 dark:text-gray-100 align-top ${className}` }
    style={{ width, ...(rest.style || {}) }}
    { ...rest }
  >
    <div className='overflow-hidden'>
      {children}
    </div>
  </td>
);

// Export the main table component as default
export default Table;

// Export individual components for granular control
export { TableBody, TableCell, TableHead, TableHeaderCell, TableRow };
