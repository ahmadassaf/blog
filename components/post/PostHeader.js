import { BookOpenIcon, ClockIcon } from '@heroicons/react/20/solid';

import Pill from '@/components/elements/Pill';
import PostSeriesBox from '@/components/post/postSeriesBox';
import PostSharing from '@/components/post/PostSharing';

const postDateTemplate = { 'day': 'numeric', 'month': 'long', 'weekday': 'long', 'year': 'numeric' };

const PostHeader = ({ frontMatter, siteMetadata, toc }) => (
  <div className={ `pt-6 max-xl:w-[100%] border-b pb-5 ${(toc.length > 3 && frontMatter.tableOfContents) ? 'w-[60%]' : 'w-[100%]'}` }>

    {frontMatter.draft && <Pill text='Draft' color='yellow'/>}

    <Pill text={ frontMatter.category } link={ `/blog/categories/${frontMatter.category.replace(' ', '-').toLowerCase()}` } color='green'/>
    <div className='space-y-1 text-left'>
      <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 py-4'>
        {frontMatter.title}
      </h1>
      <h3 className='text-1xl sm:text-xl tracking-tight text-gray-600 dark:text-gray-100 sm:leading-10 md:text-2xl capitalize'>
        {frontMatter.subtitle}
      </h3>

      <PostSharing siteMetadata={ siteMetadata } slug={ frontMatter.slug } title={ frontMatter.title } fileName={ frontMatter.fileName } externalLink={ frontMatter.externalLink }></PostSharing>
      <PostTimestamps date={ frontMatter.updated || frontMatter.date } locale={ siteMetadata.locale } readingTime={ frontMatter.readingTime.text }/>

    </div>

    <div className={ `flex lg:items-center flex-col lg:justify-between lg:flex-row items-start ${frontMatter.tableOfContents ? '!flex-col !items-start' : ''}` }>

    </div>
    {frontMatter.seriesPosts && (
      <PostSeriesBox series={ frontMatter.seriesPosts } slug={ frontMatter.slug } />
    )}

  </div>
);

export default PostHeader;

export const PostTimestamps = ({ date, locale, readingTime }) => (
  <div className='flex items-baseline max-sm:text-xs text-sm'>
    <div className='flex items-center'>
      <ClockIcon aria-hidden='true' className='h-4 w-4 mr-2 flex-shrink-0 text-gray-400' />
      <dt className='sr-only'>Last Edited on</dt>
      <dd className='leading-6 text-gray-500 dark:text-gray-400'>
        <time dateTime={ date }>
          {new Date(date).toLocaleDateString(locale, postDateTemplate)}
        </time>
      </dd>
    </div>
    <div className='pt-2 flex items-center ml-4'>
      <BookOpenIcon aria-hidden='true' className='h-4 w-4 mr-2 flex-shrink-0 text-gray-400' />
      <h4 className='leading-6 text-gray-500 dark:text-gray-400'>{readingTime}</h4>
    </div>
  </div>
);
