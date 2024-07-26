import { allPosts } from 'contentlayer/generated';

import LauncherShortcut from '@/components/cmd/CmdLauncherShortcut';
import { TextHighlight } from '@/components/elements/TextHighlight';
import siteMetadata from '@/data/meta/metadata';
import FeaturedPostsLayout from '@/layouts/FeaturedLayout';
import ListLayout from '@/layouts/ListLayout';
import { sortPosts } from '@/lib/utils/contentlayer';

export async function generateMetadata() {
  return {
    'title': 'Blog'
  };
}

export default function Blog() {
  return (
    <div className=''>
      <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
        <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
                Hi, I'm{' '}
          <span className='text-primary-color-500 dark:text-primary-color-dark-500'>
            {siteMetadata.author}
          </span>
        </h1>
        <h1 className='text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-xl sm:leading-10 md:text-2xl md:leading-14'>
          <TextHighlight className='text-black dark:text-white'>
              AI and Machine Learning Leader, Mentor and Advisor
          </TextHighlight>
        </h1>
      </div>
      <h2 className='text-xl leading-8 max-sm:py-4'>{`${siteMetadata.description}`}</h2>
      <LauncherShortcut />
      <FeaturedPostsLayout className='border-t pt-8'/>
      <ListLayout posts={ sortPosts(allPosts, 'date') } paginationURL='blog/page' baseURL='blog'/>
    </div>
  );
}
