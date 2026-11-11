import { notFound } from 'next/navigation';

import { metadataGenerator } from '@/data/meta/generator/blog';
import { HandbookUpdates } from '@/layouts/HandbookOverview';
import { allBlogDocuments } from '@/lib/contentLayer/collections';
import { getHandbook } from '@/lib/utils/handbooks';

export function generateMetadata() {
  const handbook = getHandbook(allBlogDocuments);

  return metadataGenerator({ 'description': `The change history of ${handbook?.index.title || 'the handbook'}: new chapters, revised practices and ongoing updates.`, 'path': '/blog/handbook/updates', 'title': 'Handbook updates' });
}

export default function HandbookUpdatesPage() {
  const handbook = getHandbook(allBlogDocuments);

  if (!handbook) notFound();

  return <HandbookUpdates handbook={ handbook } />;
}
