/**
 * Legacy tag pagination URLs redirect to the complete tag archive.
 * Bookmarks keep working even if a tag's post count changes.
 */

import { notFound, permanentRedirect } from 'next/navigation';

import tags from '@/app/content/tags';
import { safeDecodeURI } from '@/lib/utils/slugs.mjs';

export const dynamicParams = true;

export default async function Page({ params }) {
  const { 'page': pageParam, 'tag': tagParam } = await params;
  const slug = safeDecodeURI(tagParam);
  const tag = tags.find((entry) => entry.slug === slug);

  if (!tag) notFound();

  if (!/^[1-9]\d*$/.test(pageParam) || !Number.isSafeInteger(Number(pageParam))) notFound();

  permanentRedirect(tag.href);
}
