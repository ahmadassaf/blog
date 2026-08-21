/**
 * Date Formatting Utility
 *
 * @description Formats dates with the site's configured locale. The formatting
 * implementation lives in the design system; this wrapper binds it to the
 * blog's `siteMetadata.locale` so call sites stay one-argument.
 *
 * @author Ahmad Assaf
 * @version 2.0.0
 */

import baseFormatDate from '@gaudi/design-system/utilities/formatDate';

import siteMetadata from '@/data/meta/metadata';

/**
 * Formats a date according to the site's locale settings
 *
 * @param {string|Date} date - The date to format
 * @returns {string} The formatted date string (e.g. "December 25, 2023")
 */
const formatDate = (date) => baseFormatDate(date, siteMetadata.locale || 'en-US');

export default formatDate;
