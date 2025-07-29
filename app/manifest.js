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

// Internal imports
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
        'src': '/favicon.ico',
        'type': 'image/x-icon'
      }
    ],
    'name': siteMetadata.title,
    'short_name': siteMetadata.shortname,
    'start_url': '/',
    'theme_color': '#fff'
  };
}
