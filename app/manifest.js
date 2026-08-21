/**
 * Web App Manifest Generator
 *
 * @description Generates the PWA manifest configuration for the website.
 * Defines app metadata, display preferences, and icon configurations
 * for Progressive Web App functionality.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import siteMetadata from '@/data/meta/siteMetadata';

/**
 * Generates PWA manifest configuration
 *
 * @returns {Object} Manifest configuration object with PWA settings
 *
 * @example
 * // Next.js will automatically serve this at /manifest.json
 * const manifestConfig = manifest();
 */
export default function manifest() {
  return {
    'background_color': '#fff',
    'description': siteMetadata.description,
    'display': 'standalone',
    'icons': [
      {
        'sizes': 'any',
        'src': '/static/favicons/favicon.ico',
        'type': 'image/x-icon'
      },
      {
        'sizes': '192x192',
        'src': '/static/favicons/android-chrome-192x192.png',
        'type': 'image/png'
      },
      {
        'sizes': '512x512',
        'src': '/static/favicons/android-chrome-512x512.png',
        'type': 'image/png'
      }
    ],
    'name': siteMetadata.title,
    'short_name': siteMetadata.shortname,
    'start_url': '/',
    'theme_color': '#fff'
  };
}
