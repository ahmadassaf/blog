/**
 * Post Component
 *
 * @description Individual blog post preview component that displays post metadata and title
 * in a structured list format. Features responsive design, draft indication, and hover effects.
 * Used in blog listings to provide a consistent post preview experience.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import Link from '@/components/elements/Link';
import formatDate from '@/lib/utils/formatDate';

/**
 * Renders a single blog post preview item
 *
 * @description Post preview component that displays the post title, subtitle, publication date,
 * and draft status (if applicable). Features responsive layout that adapts to different screen
 * sizes and includes hover effects for better user interaction.
 *
 * @param {Object} props - Component props
 * @param {Object} props.frontMatter - Blog post metadata object
 * @param {string} props.frontMatter.slug - URL slug for the post
 * @param {string} props.frontMatter.title - Post title
 * @param {string} props.frontMatter.subtitle - Post subtitle/description
 * @param {string} props.frontMatter.date - Publication date (ISO format)
 * @param {boolean} [props.frontMatter.draft] - Whether the post is a draft
 *
 * @returns {JSX.Element} Post preview list item with metadata and link
 *
 * @example
 * // Basic usage in blog listing
 * const postData = {
 *   slug: 'my-blog-post',
 *   title: 'My Blog Post',
 *   subtitle: 'A great post about coding',
 *   date: '2024-01-01',
 *   draft: false
 * };
 * <Post frontMatter={postData} />
 *
 * @example
 * // Draft posts show a yellow "DRAFT" badge
 * const draftPost = { ...postData, draft: true };
 * <Post frontMatter={draftPost} />
 */
const Post = ({ frontMatter }) => (
  <li key={ frontMatter.slug } className='py-4'>
    <article className='group space-y-2 xl:grid xl:grid-cols-2 xl:items-baseline xl:space-y-0 cursor-pointer'>
      <div className='space-y-3 xl:col-span-3'>
        <Link href={ `/blog/${frontMatter.slug}` } className='text-gray-900 dark:text-gray-100 group-hover:text-blue-700'>
          <div className='flex flex-row justify-between max-md:flex-col items-top'>
            <div>
              <h3 className='text-2xl font-bold leading-8 tracking-tight max-sm:text-lg'>
                {frontMatter.title}
                {frontMatter.draft && <span className='bg-yellow-500 text-white p-1 text-[12px] align-middle mx-2 uppercase rounded-xs'>Draft</span>}
              </h3>
              <h4 className='group-hover:text-blue-700 text-gray-500 dark:text-gray-300'>{frontMatter.subtitle}</h4>
            </div>
            <dd className='text-xs leading-6 text-gray-400 dark:text-gray-300 group-hover:text-blue-400 mt-2'>
              <time dateTime={ frontMatter.date }>{formatDate(frontMatter.date)}</time>
            </dd>
          </div>
        </Link>
      </div>
    </article>
  </li>
);

export default Post;

