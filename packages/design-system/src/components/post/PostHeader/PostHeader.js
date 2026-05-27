/**
 * PostHeader Component
 *
 * @description Comprehensive blog post header component that displays all post metadata,
 * including title, subtitle, category, tags, publication date, reading time, and sharing options.
 * Features responsive design and conditional rendering based on table of contents presence.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import Icon from '@/components/core/Icon';
import Link from '@/components/core/Link';
import Pill from '@/components/core/Pill';
import PostSeriesBox from '@/components/post/PostSeriesBox';
import Typography from '@/components/primitives/Typography';
import { cn } from '@/components/utilities/cn';

/**
 * Renders the complete blog post header with metadata and navigation
 *
 * @description Full-featured post header that adapts its width based on table of contents presence.
 * Displays category pills, draft indicators, title/subtitle, timestamps, tags, sharing options,
 * and series information when available. Features responsive design for different screen sizes.
 *
 * @param {Object} props - Component props
 * @param {Object} props.frontMatter - Post metadata object
 * @param {string} props.frontMatter.title - Post title
 * @param {string} props.frontMatter.subtitle - Post subtitle
 * @param {string} props.frontMatter.category - Post category
 * @param {string} props.frontMatter.date - Publication date
 * @param {string} [props.frontMatter.updated] - Last updated date
 * @param {boolean} [props.frontMatter.draft] - Draft status
 * @param {boolean} [props.frontMatter.tableOfContents] - Whether to show TOC
 * @param {Array<string>} [props.frontMatter.tags] - Post tags
 * @param {string} props.frontMatter.slug - Post URL slug
 * @param {Object} props.frontMatter.readingTime - Reading time object
 * @param {string} props.frontMatter.readingTime.text - Formatted reading time
 * @param {string} props.frontMatter.fileName - Source file name
 * @param {string} [props.frontMatter.externalLink] - External link for source
 * @param {Array} [props.frontMatter.seriesPosts] - Related series posts
 * @param {Object} props.siteMetadata - Site configuration object
 * @param {string} props.siteMetadata.locale - Site locale for date formatting
 * @param {Array} props.toc - Table of contents array
 *
 * @returns {JSX.Element} Complete post header with all metadata
 *
 * @example
 * // Basic usage with post data
 * <PostHeader
 *   frontMatter={postMetadata}
 *   siteMetadata={siteConfig}
 *   toc={tableOfContents}
 * />
 */
const PostHeader = ({ className, classNames = {}, frontMatter, siteMetadata, toc, tocControl }) => (
  <div className={ cn('w-full pt-10 max-xl:w-full sm:pt-12 lg:pt-14', className, classNames.root) }>

    <div className={ cn('mb-2 flex flex-wrap items-center gap-3', classNames.meta) }>
      {frontMatter.category && (
        <Link
          href={ `/blog/categories/${frontMatter.category.replace(' ', '-').toLowerCase()}` }
          className={ cn('flex w-fit cursor-pointer items-center gap-2 text-xs text-gray-600 hover:text-gray-800 sm:text-sm dark:text-gray-400 dark:hover:text-gray-200', classNames.category) }
        >
          <div className='size-2 flex-shrink-0 rounded-full bg-green-500'></div>
          {frontMatter.category.charAt(0).toUpperCase() + frontMatter.category.slice(1)}
        </Link>
      )}
      {frontMatter.draft && (
        <div className='flex items-center gap-1.5'>
          <div className='w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0'></div>
          <span className='text-xs font-medium text-yellow-700 dark:text-yellow-300'>Draft</span>
        </div>
      )}
    </div>
    <div className={ cn('text-left', classNames.body) }>
      <Typography variant='post-title' className={ cn('pb-3', classNames.title) }>
        {frontMatter.title}
      </Typography>
      <Typography variant='post-subtitle' className={ classNames.subtitle }>
        {frontMatter.subtitle}
      </Typography>

      <PostTimestamps
        action={ tocControl }
        className={ classNames.timestamps }
        date={ frontMatter.updated || frontMatter.date }
        locale={ siteMetadata.locale }
        readingTime={ frontMatter.readingTime.text }
      />

    </div>

    {frontMatter.tags ? (
      <div className={ cn('my-4 flex w-full flex-wrap items-center gap-3', classNames.actions) }>
        {frontMatter.tags && (
          <div className={ cn('flex flex-wrap gap-2', classNames.tags) }>
            {frontMatter.tags.map((tag) => (
              <Pill key={ tag } href={ `/blog/tags/${tag.replace(' ', '-').toLowerCase()}` } tone='gray' variant='soft' size='sm' radius='md' className={ cn('my-0 mr-0 normal-case tracking-normal capitalize', classNames.tag) }>
                {tag}
              </Pill>
            ))}
          </div>
        )}
      </div>
    ) : null}
    {frontMatter.seriesPosts && (
      <PostSeriesBox series={ frontMatter.seriesPosts } slug={ frontMatter.slug } className={ classNames.series } />
    )}

  </div>
);

export default PostHeader;

/**
 * Renders post timestamps including publication date and reading time
 *
 * @description Displays the post's publication/update date and estimated reading time
 * with appropriate icons. Features semantic markup and accessibility attributes.
 *
 * @param {Object} props - Component props
 * @param {string} props.date - Publication or update date (ISO format)
 * @param {string} props.locale - Locale for date formatting
 * @param {string} props.readingTime - Formatted reading time string
 *
 * @returns {JSX.Element} Timestamp display with icons and formatted date
 *
 * @example
 * // Basic usage
 * <PostTimestamps
 *   date="2024-01-01"
 *   locale="en-US"
 *   readingTime="5 min read"
 * />
 */
export const PostTimestamps = ({ action, className, date, locale, readingTime }) => {
  const postDate = new Date(date);
  const formattedDate = postDate.toLocaleDateString(locale, {
    'day': 'numeric',
    'month': 'short',
    'year': 'numeric'
  });

  return (
    <div className={ cn('mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600 dark:text-gray-400', className) }>
      <time dateTime={ date } className='font-medium'>
        {formattedDate}
      </time>
      {action || null}
      <div className='flex items-center gap-1.5'>
        <Icon name='BookOpen' decorative className='h-3.5 w-3.5 text-gray-400' />
        <span>{readingTime}</span>
      </div>
    </div>
  );
};
