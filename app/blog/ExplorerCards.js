/**
 * Explorer Card Components
 *
 * @description Presentational pieces shared by the categories and tags
 * explorers: a compact post summary and short-date formatter.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { Icon, Typography } from '@gaudi/design-system';

const SHORT_DATE_FORMAT = new Intl.DateTimeFormat('en-US', {
  'day': 'numeric',
  'month': 'short',
  'year': 'numeric'
});

/**
 * Formats a post date in the explorers' short form (e.g. "Jan 5, 2026")
 *
 * @param {string|Date} date - The date to format
 * @returns {string} Short formatted date string
 */
export const formatShortDate = (date) => SHORT_DATE_FORMAT.format(new Date(date));

/**
 * Post summary row with title, excerpt, date, and a "Read" affordance
 *
 * @param {Object} props - Component props
 * @param {Object} props.post - Stripped post object with title, summary/description, and date
 * @param {string} [props.summaryClamp='line-clamp-2'] - Line-clamp class for the excerpt
 * @returns {JSX.Element} Post summary article
 */
export const PostSummary = ({ post, summaryClamp = 'line-clamp-2' }) => (
  <article>
    <Typography variant='heading-sm' as='h3' className='mb-2 line-clamp-2'>
      {post.title}
    </Typography>
    <Typography variant='paragraph-sm' className={ `mb-3 ${summaryClamp}` }>
      {post.summary || post.description}
    </Typography>
    <div className='flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between'>
      <Typography as='time' variant='metadata'>
        {formatShortDate(post.date)}
      </Typography>
      <Typography as='span' variant='metadata' className='inline-flex items-center gap-1'>
        Read
        <Icon name='ChevronRight' size='xs' decorative />
      </Typography>
    </div>
  </article>
);
