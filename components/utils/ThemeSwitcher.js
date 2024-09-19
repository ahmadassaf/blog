'use client';

import { RiMoonClearFill, RiSunFill } from 'react-icons/ri';
import { useTheme } from 'next-themes';

import ThemeProvider from '@/components/utils/ThemeProvider';
import siteMetadata from '@/data/meta/metadata';

function Provider() {
  const { setTheme, theme } = useTheme();

  return (
    <button aria-label='Toggle Dark Mode' type='button' style={{ 'outline': 'none' }} className='mx-4 h-8 w-8 rounded p-1' onClick={ () => setTheme(theme === 'dark' ? 'light' : 'dark') }>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='text-gray-900 dark:text-gray-100'>
        {theme === 'dark' ? (<RiMoonClearFill />) : (<RiSunFill />)}
      </svg>
    </button>
  );
}

function ThemeSwitch() {
  return (
    <ThemeProvider attribute='class' defaultTheme={ siteMetadata.theme } enableSystem>
      <Provider />
    </ThemeProvider>
  );
}

export default ThemeSwitch;
