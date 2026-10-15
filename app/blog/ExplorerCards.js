/**
 * Explorer Card Components
 *
 * @description Presentational pieces shared by the categories and tags
 * explorers: the linked post summary (Gaudi's Item) and the short date
 * formatter it renders.
 *
 * @author Ahmad Assaf
 * @version 2.0.0
 */

import { Icon, Item, ItemContent, ItemDescription, ItemFooter, ItemTitle, Link } from '@gaudi/design-system';

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
 * A post as a linked Gaudi Item: title, clamped excerpt, date and a "Read" affordance
 *
 * @param {Object} props - Component props
 * @param {Object} props.post - Stripped post object with slug, title, summary/description and date
 * @param {'default'|'outline'} [props.variant='default'] - Item variant; outline for card grids
 * @param {Function} [props.onClick] - Called when the link is followed, such as closing a drawer
 * @returns {JSX.Element} Linked post summary
 */
export const PostSummary = ({ onClick, post, variant = 'default' }) => (
  <Item asChild variant={ variant } className={ variant === 'outline' ? 'h-full flex-col flex-nowrap items-stretch' : 'items-start' }>
    <Link href={ `/blog/${post.slug}` } variant='bare' onClick={ onClick }>
      <ItemContent>
        <ItemTitle className='line-clamp-2'>{post.title}</ItemTitle>
        {post.summary || post.description || post.subtitle ? <ItemDescription>{post.summary || post.description || post.subtitle}</ItemDescription> : null}
      </ItemContent>
      {/* In a stacked card the footer's full-width basis would be a height, so it sizes to content there */}
      <ItemFooter className={ variant === 'outline' ? 'mt-auto basis-auto pt-2 text-xs text-text-muted' : 'text-xs text-text-muted' }>
        <time dateTime={ post.date }>{formatShortDate(post.date)}</time>
        <span className='inline-flex items-center gap-1'>
          Read
          <Icon name='ChevronRight' size='xs' decorative />
        </span>
      </ItemFooter>
    </Link>
  </Item>
);
