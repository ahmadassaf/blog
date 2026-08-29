'use client';

import { Skeleton } from '@gaudi/design-system';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

const Giscus = dynamic(() => import('@giscus/react'), {
  'loading': () => <Skeleton className='h-32' />,
  'ssr': false
});

export default function PostComments() {
  const { resolvedTheme } = useTheme();
  const commentsTheme = resolvedTheme === 'dark' ? 'dark' : 'light';

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
