import CitationPopover from '@gaudi/design-system/mdx/CitationPopover';
import Footnote from '@gaudi/design-system/mdx/Footnote';
import { allPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';

import MDXLayoutRenderer from '@/data/blog/visualisations/MDXLayoutRenderer';
import PostLayout from '@/layouts/PostLayout';
import { coreContent } from '@/lib/utils/contentlayer';
import { safeDecodeURI } from '@/lib/utils/slugs.mjs';

export const dynamic = 'force-dynamic';
export const metadata = {
  'robots': { 'follow': false, 'index': false },
  'title': 'Local article preview'
};

export default async function PreviewPage({ params }) {
  if (process.env.NODE_ENV !== 'development') notFound();

  const { 'slug': segments } = await params;
  const slug = safeDecodeURI(segments.join('/'));

  if (slug === null) notFound();

  const post = allPosts.find((candidate) => candidate.slug === `category/${slug}`);

  if (!post) notFound();

  return (
    <PostLayout content={ coreContent(post) } toc={ post.toc }>
      <MDXLayoutRenderer code={ post.body.code } />
      <CitationPopover />
      <Footnote />
    </PostLayout>
  );
}
