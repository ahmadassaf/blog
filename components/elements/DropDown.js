import React from 'react';

const MenuDropDown = ({ name, menuDropDownOpen, setMenuDropDownOpen }) => {

  const handlemenuDropDownOpen = () => {
    setMenuDropDownOpen(!menuDropDownOpen);
  };

  const handleClickOutside = () => {
    setMenuDropDownOpen(false);
  };
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
    <button ref={ ref } href='#' className='flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-medium leading-7 text-gray-900 hover:bg-blue-50 dark:text-white dark:hover:text-gray-900' aria-controls='disclosure-1' aria-expanded='false' onClick={ handlemenuDropDownOpen }>
      { name }
      <svg className='h-5 w-5 flex-none text-gray-400' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
        <path fillRule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z' clipRule='evenodd' />
      </svg>
    </button>
  );
};

export default MenuDropDown;

