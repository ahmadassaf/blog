/**
 * Explorer Card Components
 *
 * @description Presentational pieces shared by the categories and tags
 * explorers: a linked post summary built with Gaudi's Item.
 *
 * @author Ahmad Assaf
 * @version 2.0.0
 */

import { Icon, Item, ItemContent, ItemDescription, ItemFooter, ItemTitle, Link } from '@gaudi/design-system';

import { formatShortDate } from '@/lib/utils/formatDate';

/**
 * A post as a linked Gaudi Item: title, clamped excerpt, date and a "Read" affordance
 *
 * @param {Object} props - Component props
 * @param {Object} props.post - Stripped post object with slug, title, summary/description and date
 * @param {Function} [props.onClick] - Called when the link is followed, such as closing a drawer
 * @returns {JSX.Element} Linked post summary
 */
export const PostSummary = ({ onClick, post }) => (
  <Item asChild className='items-start'>
    <Link href={ `/blog/${post.slug}` } variant='bare' onClick={ onClick }>
      <ItemContent>
        <ItemTitle className='line-clamp-2'>{post.title}</ItemTitle>
        {post.summary || post.description || post.subtitle ? <ItemDescription>{post.summary || post.description || post.subtitle}</ItemDescription> : null}
      </ItemContent>
      <ItemFooter className='text-xs text-text-muted'>
        <time dateTime={ post.date }>{formatShortDate(post.date)}</time>
        <span className='inline-flex items-center gap-1'>
          Read
          <Icon name='ChevronRight' size='xs' decorative />
        </span>
      </ItemFooter>
    </Link>
  </Item>
);
