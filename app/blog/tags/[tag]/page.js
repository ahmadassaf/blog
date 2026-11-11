import { notFound } from 'next/navigation';

import tags from '@/app/content/tags';
import { metadataGenerator } from '@/data/meta/generator/blog';
import ListLayout from '@/layouts/ListLayout';
import { allBlogDocuments } from '@/lib/contentLayer/collections';
import { getPublishedPosts } from '@/lib/utils/contentlayer';
import { handbookRowsForTag } from '@/lib/utils/handbooks';
import { safeDecodeURI, slugify } from '@/lib/utils/slugs.mjs';

export const dynamicParams = false;

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

  const posts = handbookRowsForTag(getPublishedPosts(allBlogDocuments), (post) => post.tags.some((name) => slugify(name) === slug));

  return <ListLayout posts={ posts } listTitle={ `${tag.title} Posts` } paginationURL={ `blog/tags/${slug}/page` } baseURL={ `blog/tags/${slug}` } />;
}
