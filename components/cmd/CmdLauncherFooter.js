const CmdLauncherFooter = () => (
  <div className='text-sm p-2 flex flex-row'>
    <span className='flex items-center mx-2 max-sm:!hidden'>
      <svg version='1.0' className='bg-gray-200 px-1 py-1 w-4 h-4 rounded mx-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1280 1280'>
        <path d='M1013 376c0 73.4-.4 113.3-1.1 120.2a159.9 159.9 0 0 1-90.2 127.3c-20 9.6-36.7 14-59.2 15.5-7.1.5-121.9.9-255 1h-242l95.5-95.5 95.5-95.5-38.3-38.2-38.2-38.3-160 160c-88 88-160 160.4-160 161 0 .6 72 73 160 161l160 160 38.2-38.3 38.3-38.2-95.5-95.5-95.5-95.5h251.1c252.9 0 259.8-.1 281.4-3.6 72.1-11.8 136.9-54.1 178.5-116.4 8.6-12.9 22.6-40.5 28-55.4 4.4-12 10.7-36.1 13.1-50.6 1.6-9.6 1.8-21 2.1-132.8l.4-122.2H1013v110z'/></svg>
         to select
    </span>
    <span className='flex items-center mx-2'>
      <svg xmlns='http://www.w3.org/2000/svg' className='bg-gray-200 px-1 py-1 w-4 h-4 rounded mx-1' viewBox='0 0 24 24'>
        <path d='M0 0h24v24H0V0z' fill='none' />
        <path d='M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z'/>
      </svg>
      <svg
        xmlns='http://www.w3.org/2000/svg' className='bg-gray-200 px-1 py-1 w-4 h-4 rounded mx-1' viewBox='0 0 24 24'>
        <path d='M0 0h24v24H0V0z' fill='none' />
        <path d='M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z' />
      </svg>
        to navigate
    </span>
    <span className='flex items-center mx-2'>
      <span className='bg-gray-200 px-1 py-1 rounded mx-1 text-xs dark:text-gray-800'>esc</span>to close / go back
    </span>
  </div>
);

export default CmdLauncherFooter;
