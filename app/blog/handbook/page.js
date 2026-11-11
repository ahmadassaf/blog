import { allPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';

import { metadataGenerator } from '@/data/meta/generator/blog';
import HandbookOverview from '@/layouts/HandbookOverview';
import { getHandbook } from '@/lib/utils/handbooks';

export function generateMetadata() {
  const handbook = getHandbook(allPosts);

  return metadataGenerator({ 'description': handbook?.index.summary, 'path': '/blog/handbook', 'title': handbook?.index.title || 'Handbook' });
}

export default function HandbookPage() {
  const handbook = getHandbook(allPosts);

  if (!handbook) notFound();

  return <HandbookOverview handbook={ handbook } />;
}
