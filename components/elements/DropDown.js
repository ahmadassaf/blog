/**
 * Menu Dropdown Component
 *
 * @description A reusable dropdown menu component that provides toggle functionality with outside click detection.
 * Features proper accessibility attributes and visual indicators for the dropdown state. Includes a custom hook
 * for handling clicks outside the component boundary.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import React from 'react';

/**
 * Dropdown menu component with outside click detection
 *
 * @description Renders a dropdown button with toggle functionality and automatic closing when clicking outside.
 * Uses a custom hook to detect outside clicks and manage the dropdown state.
 *
 * @param {Object} props - Component props
 * @param {string} props.name - The text to display on the dropdown button
 * @param {boolean} props.menuDropDownOpen - Whether the dropdown is currently open
 * @param {Function} props.setMenuDropDownOpen - Function to toggle the dropdown state
 *
 * @returns {JSX.Element} The rendered dropdown menu component
 *
 * @example
 * <MenuDropDown
 *   name="Menu Options"
 *   menuDropDownOpen={isOpen}
 *   setMenuDropDownOpen={setIsOpen}
 * />
 */
const MenuDropDown = ({ name, menuDropDownOpen, setMenuDropDownOpen }) => {

  /**
   * Handles toggling the dropdown open/closed state
   */
  const handlemenuDropDownOpen = () => {
    setMenuDropDownOpen(!menuDropDownOpen);
  };

  /**
   * Handles closing the dropdown when clicking outside
   */
  const handleClickOutside = () => {
    setMenuDropDownOpen(false);
  };

  /**
   * Custom hook for detecting clicks outside a component
   *
   * @param {Function} callback - Function to call when outside click is detected
   * @returns {React.RefObject} Ref to attach to the component
   */
  const useOutsideClick = (callback) => {
    const ref = React.useRef();

    React.useEffect(() => {
      const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) callback();
      };

      document.addEventListener('click', handleClick);

      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, [ callback, ref ]);

    return ref;
  };

  const ref = useOutsideClick(handleClickOutside);

  return (
    <button ref={ ref } href='#' className={ `flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-medium leading-7 text-gray-900 hover:bg-blue-50 dark:text-white dark:hover:bg-gray-700 cursor-pointer focus:outline-none ${menuDropDownOpen ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400' : ''}` } aria-controls='disclosure-1' aria-expanded={ menuDropDownOpen } onClick={ handlemenuDropDownOpen }>
      { name }
      <svg className={ `h-5 w-5 flex-none text-gray-400 transition-transform duration-200 ${menuDropDownOpen ? 'rotate-180' : ''}` } viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
        <path fillRule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z' clipRule='evenodd' />
      </svg>
    </button>
  );
};

export default MenuDropDown;

