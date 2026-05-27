/**
 * ThemeSwitcher Component
 *
 * @description Theme toggle component that provides a button for switching between light and dark modes.
 * Features icon-based visual feedback and integrates with next-themes for consistent theme management.
 * Includes proper ARIA labeling for accessibility.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import Icon from '@/components/core/Icon';
import ThemeProvider from '@/components/utilities/ThemeProvider';
import siteMetadata from '@/data/meta/metadata';

/**
 * Internal provider component that renders the theme toggle button
 *
 * @description Core theme switcher logic that provides a clickable button with appropriate
 * icons (sun for light mode, moon for dark mode). Handles theme state management and
 * visual feedback for the current theme selection.
 *
 * @returns {JSX.Element} Theme toggle button with icon
 */
function Provider() {
  const { setTheme, theme } = useTheme();
  const [ mounted, setMounted ] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering theme-dependent content until mounted
  if (!mounted) return (
    <button
      aria-label='Toggle Dark Mode'
      type='button'
      style={{ 'outline': 'none' }}
      className='inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-gray-950 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-gray-100 dark:hover:bg-gray-800'
    >
      <Icon name='SunFill' decorative className='h-5 w-5' />
    </button>
  );

  return (
    <button
      aria-label='Toggle Dark Mode'
      type='button'
      style={{ 'outline': 'none' }}
      className='inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-gray-950 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-gray-100 dark:hover:bg-gray-800'
      onClick={ () => setTheme(theme === 'dark' ? 'light' : 'dark') }
    >
      {theme === 'dark' ? <Icon name='MoonFill' decorative className='h-5 w-5' /> : <Icon name='SunFill' decorative className='h-5 w-5' />}
    </button>
  );
}

/**
 * Main theme switcher component with provider wrapper
 *
 * @description Public component that wraps the theme toggle button with the necessary
 * ThemeProvider context. Configures theme attributes and default settings based on
 * site metadata configuration.
 *
 * @returns {JSX.Element} Complete theme switcher with provider context
 *
 * @example
 * // Basic usage in navigation header
 * <ThemeSwitch />
 *
 * @example
 * // Used in navigation bar or header
 * <nav>
 *   <Logo />
 *   <NavigationLinks />
 *   <ThemeSwitch />
 * </nav>
 */
function ThemeSwitch() {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme={ siteMetadata.theme }
      enableSystem
    >
      <Provider />
    </ThemeProvider>
  );
}

export default ThemeSwitch;
