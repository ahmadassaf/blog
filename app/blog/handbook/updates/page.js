import { allPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';

import { metadataGenerator } from '@/data/meta/generator/blog';
import { HandbookUpdates } from '@/layouts/HandbookOverview';
import { getHandbook } from '@/lib/utils/handbooks';

export function generateMetadata() {
  const handbook = getHandbook(allPosts);

  return metadataGenerator({ 'description': `The change history of ${handbook?.index.title || 'the handbook'}: new chapters, revised practices and ongoing updates.`, 'path': '/blog/handbook/updates', 'title': 'Handbook updates' });
}

export default function HandbookUpdatesPage() {
  const handbook = getHandbook(allPosts);

  if (!handbook) notFound();

  return <HandbookUpdates handbook={ handbook } />;
}
