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

import { BookOpenIcon } from '@heroicons/react/20/solid';

import Link from '@/components/elements/Link';
import PostSeriesBox from '@/components/post/postSeriesBox';
import { Typography } from '@/components/ui';

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
const PostHeader = ({ frontMatter, siteMetadata, toc }) => (
  <div className={ `pt-6 w-full max-xl:w-full pb-5 w-full'}` }>

    <div className='flex items-center gap-3 mb-2 flex-wrap'>
      <Link
        href={ `/blog/categories/${frontMatter.category.replace(' ', '-').toLowerCase()}` }
        className='flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 w-fit cursor-pointer'
      >
        <div className='w-2 h-2 bg-green-500 rounded-full flex-shrink-0'></div>
        {frontMatter.category.charAt(0).toUpperCase() + frontMatter.category.slice(1)}
      </Link>
      {frontMatter.draft && (
        <div className='flex items-center gap-1.5'>
          <div className='w-2 h-2 bg-amber-500 rounded-full flex-shrink-0'></div>
          <span className='text-xs font-medium text-amber-600 dark:text-amber-400'>Draft</span>
        </div>
      )}
    </div>
    <div className='text-left'>
      <Typography variant='post-title' className='pb-3'>
        {frontMatter.title}
      </Typography>
      <Typography variant='post-subtitle'>
        {frontMatter.subtitle}
      </Typography>

      <PostTimestamps
        date={ frontMatter.updated || frontMatter.date }
        locale={ siteMetadata.locale }
        readingTime={ frontMatter.readingTime.text }
      />

    </div>

    <div className={ `flex lg:items-center flex-col lg:justify-between lg:flex-row items-start ${frontMatter.tableOfContents ? 'flex-col! items-start!' : ''}` }>
      {frontMatter.tags && (
        <div className='my-4 flex flex-wrap gap-2'>
          {frontMatter.tags.map((tag) => (
            <Link key={ tag } href={ `/blog/tags/${tag.replace(' ', '-').toLowerCase()}` } className='inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer'>
              {tag}
            </Link>
          ))}
        </div>
      )}

    </div>
    {frontMatter.seriesPosts && (
      <PostSeriesBox series={ frontMatter.seriesPosts } slug={ frontMatter.slug } />
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
export const PostTimestamps = ({ date, locale, readingTime }) => {
  const postDate = new Date(date);
  const formattedDate = postDate.toLocaleDateString(locale, {
    'day': 'numeric',
    'month': 'short',
    'year': 'numeric'
  });

  return (
    <div className='flex items-center gap-3 mt-4 text-sm text-gray-600 dark:text-gray-400'>
      <time dateTime={ date } className='font-medium'>
        {formattedDate}
      </time>
      <span className='text-gray-400 dark:text-gray-600'>•</span>
      <div className='flex items-center gap-1.5'>
        <BookOpenIcon aria-hidden='true' className='h-3.5 w-3.5 text-gray-400' />
        <span>{readingTime}</span>
      </div>
    </div>
  );
};
