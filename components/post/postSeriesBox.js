/**
 * PostSeriesBox Component
 *
 * @description Series navigation component that displays related posts in a blog post series.
 * Shows the series title and lists all posts with the current post highlighted.
 * Provides easy navigation between posts in the same series.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

// External libraries
import { Square3Stack3DIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

/**
 * Renders a series navigation box with related posts
 *
 * @description Displays a bordered box containing the series name and all posts within that series.
 * The current post is highlighted in blue, while other posts are rendered as clickable links.
 * Features a stack icon to indicate the series nature.
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.series - Array of posts in the series
 * @param {string} props.series[].slug - URL slug for the post
 * @param {string} props.series[].title - Title of the post
 * @param {string} props.series[].series - Name of the series (same for all posts)
 * @param {string} props.slug - Current post's slug for highlighting
 *
 * @returns {JSX.Element} Series navigation box with post list
 *
 * @example
 * // Basic usage with series data
 * const seriesPosts = [
 *   { slug: 'post-1', title: 'Part 1: Introduction', series: 'React Tutorial' },
 *   { slug: 'post-2', title: 'Part 2: Components', series: 'React Tutorial' }
 * ];
 * <PostSeriesBox series={seriesPosts} slug="post-1" />
 *
 * @example
 * // Current post will be highlighted, others will be links
 * <PostSeriesBox series={reactSeries} slug={currentPostSlug} />
 */
const PostSeriesBox = ({ series, slug }) => (
  <div className='mb-4 p-3 my-4 bg-white dark:bg-gray-800 dark:text-white border border-gray-200 rounded-md ring-gray-200'>
    <div className='flex items-center'>
      <Square3Stack3DIcon className='h-4 w-4 text-gray-400 mr-2' />
      <h3 className='text-sm text-gray-500'>This post is part of</h3>
    </div>
    <h1 className='lg:text-lg text-md font-bold my-2'>{series[0].series}</h1>
    <ul className='flex flex-col'>
      {series.map((_post, index) => (
        slug === _post.slug ? <li key={ index } className='text-blue-700 p-1'>
          {_post.title}
        </li> : <li key={ index } className='p-1'>
          <Link className='hover:text-blue-700' href={ `/blog/${_post.slug}` }>
            {_post.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default PostSeriesBox;
