import { allPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';

import { metadataGenerator } from '@/data/meta/generator/blog';
import { HandbookUpdates } from '@/layouts/HandbookOverview';
import { getHandbook } from '@/lib/utils/handbooks';

export const metadata = metadataGenerator({ 'description': 'The change history of The CTO Handbook: new chapters, revised practices and ongoing updates.', 'path': '/blog/handbook/updates', 'title': 'Handbook updates' });

export default function HandbookUpdatesPage() {
  const handbook = getHandbook(allPosts);

  if (!handbook) notFound();

  return <HandbookUpdates handbook={ handbook } />;
}
