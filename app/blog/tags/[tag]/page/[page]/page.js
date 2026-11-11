import { POSTS_PER_PAGE } from '@gaudi/design-system';
import { notFound } from 'next/navigation';

import tags from '@/app/content/tags';
import { metadataGenerator } from '@/data/meta/generator/blog';
import ListLayout from '@/layouts/ListLayout';
import { allBlogDocuments } from '@/lib/contentLayer/collections';
import { getPublishedPosts, paginate, paginationPageNumbers } from '@/lib/utils/contentlayer';
import { handbookRowsForTag } from '@/lib/utils/handbooks';
import { safeDecodeURI, slugify } from '@/lib/utils/slugs.mjs';

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { 'page': pageParam, 'tag': tagParam } = await params;
  const slug = safeDecodeURI(tagParam);
  const tag = tags.find((entry) => entry.slug === slug);

  if (!tag || !/^[1-9]\d*$/.test(pageParam)) return { 'title': 'Page not found' };

  return metadataGenerator({ 'path': `${tag.href}/page/${pageParam}`, 'title': `Tag: ${tag.title} | Page ${pageParam}` });
}

const rowsForTag = (slug) => handbookRowsForTag(getPublishedPosts(allBlogDocuments), (post) => post.tags.some((name) => slugify(name) === slug));

// Page counts follow the listing rows: a handbook is one row however many of its chapters carry the tag.
export const generateStaticParams = () => tags.flatMap((tag) => paginationPageNumbers(rowsForTag(tag.slug).length, POSTS_PER_PAGE).map((page) => {
  return { 'page': String(page), 'tag': tag.slug };
}));

export default async function Page({ params }) {
  const { 'page': pageParam, 'tag': tagParam } = await params;
  const slug = safeDecodeURI(tagParam);
  const tag = tags.find((entry) => entry.slug === slug);

  if (!tag) notFound();

  const posts = rowsForTag(slug);
  const page = paginate(posts, pageParam, POSTS_PER_PAGE);

  if (!page) notFound();

  return <ListLayout posts={ page.pagePosts } listTitle={ `${tag.title} Posts` } currentPage={ page.currentPage } totalPages={ page.totalPages } paginationURL={ `blog/tags/${slug}/page` } baseURL={ `blog/tags/${slug}` } />;
}
