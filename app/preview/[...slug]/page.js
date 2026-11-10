import { allPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';

import ContentDocument from '@/layouts/ContentDocument';
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

  return <ContentDocument content={ coreContent(post) } document={ post } />;
}
