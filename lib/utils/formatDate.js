import siteMetadata from '../../data/meta/metadata.js';

// Publication dates are calendar dates; keep them stable across server and reader time zones.
const dateOptions = { 'day': 'numeric', 'timeZone': 'UTC', 'year': 'numeric' };
const locale = siteMetadata.locale || 'en-US';
const longDateFormat = new Intl.DateTimeFormat(locale, { ...dateOptions, 'month': 'long' });
const shortDateFormat = new Intl.DateTimeFormat(locale, { ...dateOptions, 'month': 'short' });

export const formatShortDate = (date) => shortDateFormat.format(new Date(date));

const formatDate = (date) => longDateFormat.format(new Date(date));

export default formatDate;
