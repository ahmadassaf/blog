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

import Link from '@/components/core/Link';
import Pill from '@/components/core/Pill';
import formatDate from '@/lib/utils/formatDate';

/**
 * Enhanced clean post component
 *
 * @description Clean, typography-focused post preview with subtle improvements
 * while maintaining the minimal aesthetic. Enhanced spacing, hover states, and metadata display.
 */
const Post = ({ frontMatter }) => {
  const baseUrl = frontMatter.type === 'Thought' ? '/thoughts' : '/blog';

  return (
    <li key={ frontMatter.slug } className='group'>
      <article className='py-3 border-b border-gray-100 dark:border-border-dark last:border-b-0 '>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-4'>

          {/* Main content */}
          <div className='flex-1 min-w-0'>
            <div className='flex items-center gap-2 mb-1 text-sm'>
              <time
                dateTime={ frontMatter.date }
                className='font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 '
              >
                {formatDate(frontMatter.date)}
              </time>

              {frontMatter.category && (
                <>
                  <span className='text-gray-300 dark:text-gray-600'>·</span>
                  <Pill href={ `/blog/categories/${frontMatter.category.replace(' ', '-').toLowerCase()}` } tone='blue' variant='subtle' size='xs' radius='md' className='my-0 mr-0 normal-case tracking-normal capitalize'>
                    {frontMatter.category}
                  </Pill>
                </>
              )}

              {frontMatter.draft && (
                <>
                  <span className='text-gray-300 dark:text-gray-600'>·</span>
                  <span className='w-2 h-2 bg-yellow-500 rounded-full'></span>
                  <span className='text-xs font-medium text-yellow-600 dark:text-yellow-400'>Draft</span>
                </>
              )}
            </div>

            <h3 className='text-lg md:text-xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400  mb-1'>
              <Link href={ `${baseUrl}/${frontMatter.slug}` }>
                {frontMatter.title}
              </Link>
            </h3>

            {frontMatter.subtitle && (
              <p className='text-gray-600 dark:text-gray-300 leading-snug line-clamp-1 text-sm'>
                {frontMatter.subtitle}
              </p>
            )}
          </div>
        </div>
      </article>
    </li>
  );
};

export default Post;
