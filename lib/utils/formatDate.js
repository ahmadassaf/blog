/**
 * Date Formatting Utility
 *
 * @description Utility function for formatting dates according to the site's locale settings.
 * Provides consistent date formatting across the entire application using the configured
 * locale from site metadata.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import siteMetadata from '@/data/meta/metadata';

/**
 * Formats a date according to the site's locale settings
 *
 * @description Converts a date to a localized string format using the site's configured locale.
 * Returns a formatted date string with full month name, day, and year.
 *
 * @param {string|Date} date - The date to format (can be a Date object or date string)
 * @returns {string} The formatted date string
 *
 * @example
 * formatDate('2023-12-25') // Returns "December 25, 2023" (for en-US locale)
 * formatDate(new Date()) // Returns formatted current date
 */
const formatDate = (date) => {
  const options = {
    'day': 'numeric',
    'month': 'long',
    'year': 'numeric'
  };
  const now = new Date(date).toLocaleDateString(siteMetadata.locale, options);

  return now;
};

export default formatDate;
