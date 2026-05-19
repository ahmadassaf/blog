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

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) return;

    // Enhanced column highlighting
    const table = scrollContainer.querySelector('table');

    if (table) {
      const handleCellHover = (event) => {
        if (event.target.tagName === 'TD' || event.target.tagName === 'TH') {
          const cellIndex = Array.from(event.target.parentNode.children).indexOf(event.target);
          const rows = table.querySelectorAll('tr');

          rows.forEach((row) => {
            const cell = row.children[cellIndex];

            if (cell) if (event.type === 'mouseover') cell.classList.add('column-hover');
            else cell.classList.remove('column-hover');

          });
        }
      };

      table.addEventListener('mouseover', handleCellHover);
      table.addEventListener('mouseout', handleCellHover);

      return () => {
        table.removeEventListener('mouseover', handleCellHover);
        table.removeEventListener('mouseout', handleCellHover);
      };
    }
  }, []);

  return (
    <div className='not-prose my-8'>
      {/* Breakout container that expands beyond prose width while maintaining side gaps */}
      <div className='table-breakout relative -mx-16 sm:-mx-24 md:-mx-40 lg:-mx-56 xl:-mx-80 2xl:-mx-96'>
        {/* Enhanced responsive table container with horizontal scroll */}
        <div
          ref={ scrollContainerRef }
          className='table-scroll table-frame'
        >
          <div className='inline-block min-w-full align-middle'>
            <table
              className={ `w-full table-auto ${className}` }
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
const TableHeaderCell = ({ children, className = '', ...rest }) => (
  <th
    className={ `table-cell-padding text-left text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider ${className}` }
    { ...rest }
  >
    {children}
  </th>
);

/**
 * Enhanced table data cell component
 */
const TableCell = ({ children, className = '', ...rest }) => (
  <td
    className={ `table-cell-padding text-sm text-gray-900 dark:text-gray-100 align-top ${className}` }
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
