/**
 * ClientReload Component
 *
 * @description Development utility component that enables hot reloading functionality
 * through WebSocket connection. Automatically refreshes the page when file changes
 * are detected during development, maintaining scroll position for better UX.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { useEffect } from 'react';
import Router from 'next/router';

/**
 * Enables client-side hot reloading via WebSocket connection
 *
 * @description Development component that establishes a socket.io connection to listen
 * for reload events. When a reload event is received, it refreshes the current page
 * while preserving scroll position for better development experience.
 *
 * @returns {null} This component renders nothing to the DOM
 *
 * @example
 * // Basic usage in development layout
 * {process.env.NODE_ENV === 'development' && <ClientReload />}
 *
 * @example
 * // Typically used in root layout or _app.js
 * <Layout>
 *   <ClientReload />
 *   {children}
 * </Layout>
 */
export const ClientReload = () => {
  useEffect(() => {
    import('socket.io-client').then((module) => {
      const socket = module.io();

      socket.on('reload', (data) => {
        Router.replace(Router.asPath, undefined, {
          'scroll': false
        });
      });
    });
  }, []);

  return null;
};
