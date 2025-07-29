/**
 * AppThemeProvider Component
 *
 * @description Theme provider wrapper that enhances next-themes with cookie persistence.
 * Automatically saves theme preferences to cookies for consistent theme experience
 * across sessions and server-side rendering compatibility.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

// External libraries
import { useEffect } from 'react';
import { setCookie } from 'cookies-next';
import { ThemeProvider, useTheme } from 'next-themes';

/**
 * Main theme provider component with cookie persistence
 *
 * @description Wraps the next-themes ThemeProvider and adds automatic cookie storage
 * for theme preferences. Enables color scheme detection and passes through all props
 * to the underlying ThemeProvider.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap with theme context
 * @returns {JSX.Element} Theme provider with cookie persistence
 * @param {...any} props.props - Additional props passed to ThemeProvider
 *
 *
 * @example
 * // Basic usage in app root
 * <AppThemeProvider attribute="class" defaultTheme="system">
 *   <App />
 * </AppThemeProvider>
 *
 * @example
 * // With custom configuration
 * <AppThemeProvider
 *   attribute="class"
 *   defaultTheme="light"
 *   enableSystem={false}
 * >
 *   {children}
 * </AppThemeProvider>
 */
function AppThemeProvider({ children, ...props }) {
  return (
    <ThemeProvider enableColorScheme { ...props }>
      <AppThemeProviderHelper />
      {children}
    </ThemeProvider>
  );
}

/**
 * Helper component that persists theme selection to cookies
 *
 * @description Internal helper component that monitors theme changes and automatically
 * saves the current theme to a cookie with a 1-year expiration. This ensures theme
 * persistence across browser sessions and enables SSR theme consistency.
 *
 * @returns {null} This component renders nothing to the DOM
 */
function AppThemeProviderHelper() {
  const { theme } = useTheme();

  useEffect(() => {
    setCookie('__theme__', theme, {
      'expires': new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      'path': '/'
    });
  }, [ theme ]);

  return null;
}

export default AppThemeProvider;
