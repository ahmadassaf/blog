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

// External libraries
import { BookOpenIcon, ClockIcon } from '@heroicons/react/20/solid';

// Internal components
import Pill from '@/components/elements/Pill';
import PostSeriesBox from '@/components/post/postSeriesBox';
import PostSharing from '@/components/post/PostSharing';

const postDateTemplate = { 'day': 'numeric', 'month': 'long', 'weekday': 'long', 'year': 'numeric' };

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
  <div className={ `pt-6 max-xl:w-[100%] pb-5 ${(toc.length > 3 && frontMatter.tableOfContents) ? 'w-[60%]' : 'w-[100%]'}` }>

    {frontMatter.draft && <Pill text='Draft' color='yellow' />}

    <Pill
      text={ frontMatter.category }
      link={ `/blog/categories/${frontMatter.category.replace(' ', '-').toLowerCase()}` }
      color='green'
    />
    <div className='space-y-1 text-left'>
      <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 py-4'>
        {frontMatter.title}
      </h1>
      <h3 className='text-1xl sm:text-xl tracking-tight text-gray-600 dark:text-gray-100 sm:leading-10 md:text-2xl capitalize'>
        {frontMatter.subtitle}
      </h3>

      <PostTimestamps
        date={ frontMatter.updated || frontMatter.date }
        locale={ siteMetadata.locale }
        readingTime={ frontMatter.readingTime.text }
      />

    </div>

    <div className={ `flex lg:items-center flex-col lg:justify-between lg:flex-row items-start ${frontMatter.tableOfContents ? 'flex-col! items-start!' : ''}` }>
      {frontMatter.tags && (
        <div className='my-4 flex flex-wrap'>
          {frontMatter.tags.map((tag) => (
            <Pill
              key={ tag }
              text={ tag }
              link={ `/blog/tags/${tag.replace(' ', '-').toLowerCase()}` }
              color='blue'
            />
          ))}
        </div>
      )}
      <PostSharing
        siteMetadata={ siteMetadata }
        slug={ frontMatter.slug }
        title={ frontMatter.title }
        tags={ frontMatter.tags }
        fileName={ frontMatter.fileName }
        externalLink={ frontMatter.externalLink }
      />
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
export const PostTimestamps = ({ date, locale, readingTime }) => (
  <div className='flex items-baseline max-sm:text-xs text-sm'>
    <div className='flex items-center'>
      <ClockIcon aria-hidden='true' className='h-4 w-4 mr-2 shrink-0 text-gray-400' />
      <dt className='sr-only'>Last Edited on</dt>
      <dd className='leading-6 text-gray-500 dark:text-gray-400'>
        <time dateTime={ date }>
          {new Date(date).toLocaleDateString(locale, postDateTemplate)}
        </time>
      </dd>
    </div>
    <div className='pt-2 flex items-center ml-4'>
      <BookOpenIcon aria-hidden='true' className='h-4 w-4 mr-2 shrink-0 text-gray-400' />
      <h4 className='leading-6 text-gray-500 dark:text-gray-400'>{readingTime}</h4>
    </div>
  </div>
);
