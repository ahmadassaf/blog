'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export default function Gisqus() {
  const { 'theme': nextTheme, resolvedTheme } = useTheme();
  const commentsTheme = nextTheme === 'dark' || resolvedTheme === 'dark' ? 'dark' : 'light';

  return (
    <Giscus
      id='comments'
      repo='ahmadassaf/blog-posts'
      repoId='MDEwOlJlcG9zaXRvcnk2MzYyMjgxNw=='
      category='General'
      categoryId='DIC_kwDOA8rOoc4CZiQA-hVS'
      mapping='pathname'
      reactionsEnabled='1'
      emitMetadata='0'
      inputPosition='top'
      theme={ commentsTheme }
      lang='en'
      loading='lazy'
    />
  );
}
