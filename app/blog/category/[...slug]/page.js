import { notFound } from 'next/navigation';

import { linkedDataGenerator, postMetadataGenerator } from '@/data/meta/generator/post';
import ContentDocument from '@/layouts/ContentDocument';
import { allBlogDocuments } from '@/lib/contentLayer/collections';
import { resolveContentDocument } from '@/lib/contentLayer/resolveContentDocument';
import { published } from '@/lib/utils/contentlayer';
import { safeDecodeURI } from '@/lib/utils/slugs.mjs';

export async function generateMetadata({ params }) {
  return postMetadataGenerator(await params, allBlogDocuments);
}

export const generateStaticParams = () => published(allBlogDocuments).map((post) => {
  return { 'slug': post.slug.replace(/^category\//, '').split('/') };
});

export default async function Page({ params }) {
  const { 'slug': segments } = await params;
  const slug = safeDecodeURI(segments.join('/'));

  if (slug === null) notFound();

  const resolved = resolveContentDocument(allBlogDocuments, (post) => post.slug === `category/${slug}`);

  if (!resolved) notFound();

  return <ContentDocument { ...resolved } structuredData={ linkedDataGenerator(resolved.document) } />;
}
