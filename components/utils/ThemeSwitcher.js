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

import { RiMoonClearFill, RiSunFill } from 'react-icons/ri';
import { useTheme } from 'next-themes';

import ThemeProvider from '@/components/utils/ThemeProvider';
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

  return (
    <button
      aria-label='Toggle Dark Mode'
      type='button'
      style={{ 'outline': 'none' }}
      className='mx-4 h-8 w-8 rounded-sm p-1'
      onClick={ () => setTheme(theme === 'dark' ? 'light' : 'dark') }
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 20 20'
        fill='currentColor'
        className='text-gray-900 dark:text-gray-100'
      >
        {theme === 'dark' ? <RiMoonClearFill /> : <RiSunFill />}
      </svg>
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
