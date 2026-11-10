import { allProjects } from 'contentlayer/generated';
import { notFound } from 'next/navigation';

import { linkedDataGenerator, postMetadataGenerator } from '@/data/meta/generator/post';
import ContentDocument from '@/layouts/ContentDocument';
import { resolveContentDocument } from '@/lib/contentLayer/resolveContentDocument';
import { published } from '@/lib/utils/contentlayer';
import { safeDecodeURI } from '@/lib/utils/slugs.mjs';

export async function generateMetadata({ params }) {
  const { slug } = await params;

  return postMetadataGenerator({ 'slug': [ 'projects', ...slug ] }, allProjects);
}

export const generateStaticParams = () => published(allProjects).map((project) => {
  return { 'slug': project.externalLink.replace(/^projects\//, '').split('/') };
});

export default async function Page({ params }) {
  const { 'slug': segments } = await params;
  const slug = safeDecodeURI(segments.join('/'));

  if (slug === null) notFound();

  const resolved = resolveContentDocument(
    allProjects, (project) => project.externalLink === `projects/${slug}`, (project) => project.externalLink
  );

  if (!resolved) notFound();

  return <ContentDocument { ...resolved } structuredData={ linkedDataGenerator(resolved.document) } />;
}
