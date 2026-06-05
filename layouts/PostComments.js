'use client';

import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

const Giscus = dynamic(() => import('@giscus/react'), {
  'loading': () => <div className='h-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800' />,
  'ssr': false
});

export default function PostComments() {
  const { 'theme': nextTheme, resolvedTheme } = useTheme();
  const commentsTheme = nextTheme === 'dark' || resolvedTheme === 'dark' ? 'dark' : 'light';

  return (
    <Giscus
      id='comments'
      repo='ahmadassaf/blog-posts'
      repoId='MDEwOlJlcG9zaXRvcnk2MzYyMjgxNw=='
      category='Announcements'
      categoryId='DIC_kwDOA8rOoc4CZiP_'
      mapping='og:title'
      reactionsEnabled='1'
      emitMetadata='0'
      inputPosition='top'
      theme={ commentsTheme }
      lang='en'
      loading='lazy'
    />
  );
}
