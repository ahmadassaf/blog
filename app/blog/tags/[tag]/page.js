import { notFound } from 'next/navigation';

import tags from '@/app/content/tags';
import { metadataGenerator } from '@/data/meta/generator/blog';
import ArchiveLayout from '@/layouts/ArchiveLayout';
import { allBlogDocuments } from '@/lib/contentLayer/collections';
import { getBlogListing } from '@/lib/utils/blogListing';
import { safeDecodeURI, slugify } from '@/lib/utils/slugs.mjs';

export const dynamicParams = false;

// Keep rolling year groups in sync with the blog and category archives.
export const revalidate = 86400;

export async function generateMetadata({ params }) {
  const { 'tag': tagParam } = await params;
  const slug = safeDecodeURI(tagParam);
  const tag = tags.find((entry) => entry.slug === slug);

  if (!tag) return { 'title': 'Tag not found' };

  return metadataGenerator({ 'path': tag.href, 'title': `Tag: ${tag.title}` });
}

export const generateStaticParams = () => tags.map((tag) => {
  return { 'tag': tag.slug };
});

export default async function Page({ params }) {
  const { 'tag': tagParam } = await params;
  const slug = safeDecodeURI(tagParam);
  const tag = tags.find((entry) => entry.slug === slug);

  if (!tag) notFound();

  const { posts } = getBlogListing(allBlogDocuments, (post) => post.tags.some((name) => slugify(name) === slug));

  return <ArchiveLayout posts={ posts } tagSlug={ slug } title={ `${tag.title} Posts` } />;
}
