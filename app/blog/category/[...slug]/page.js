import { allPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';

import { linkedDataGenerator, postMetadataGenerator } from '@/data/meta/generator/post';
import ContentDocument from '@/layouts/ContentDocument';
import { resolveContentDocument } from '@/lib/contentLayer/resolveContentDocument';
import { published } from '@/lib/utils/contentlayer';
import { safeDecodeURI } from '@/lib/utils/slugs.mjs';

export async function generateMetadata({ params }) {
  return postMetadataGenerator(await params, allPosts);
}

export const generateStaticParams = () => published(allPosts).map((post) => {
  return { 'slug': post.slug.replace(/^category\//, '').split('/') };
});

export default async function Page({ params }) {
  const { 'slug': segments } = await params;
  const slug = safeDecodeURI(segments.join('/'));

  if (slug === null) notFound();

  const resolved = resolveContentDocument(allPosts, (post) => post.slug === `category/${slug}`);

  if (!resolved) notFound();

  return <ContentDocument { ...resolved } structuredData={ linkedDataGenerator(resolved.document) } />;
}
