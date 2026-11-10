/**
 * Legacy category pagination URLs redirect to the complete category archive.
 * Bookmarks keep working even if a category's post count changes.
 */

import { notFound, permanentRedirect } from 'next/navigation';

import categories from '@/app/content/categories';
import { safeDecodeURI } from '@/lib/utils/slugs.mjs';

export const dynamicParams = true;

export default async function Page({ params }) {
  const { 'category': categoryParam, 'page': pageParam } = await params;
  const category = safeDecodeURI(categoryParam);

  if (category === null || !categories.some((entry) => entry.slug === category)) notFound();

  if (!/^[1-9]\d*$/.test(pageParam) || !Number.isSafeInteger(Number(pageParam))) notFound();

  permanentRedirect(`/blog/categories/${category}`);
}
