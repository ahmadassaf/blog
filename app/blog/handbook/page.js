import { notFound } from 'next/navigation';

import { metadataGenerator } from '@/data/meta/generator/blog';
import HandbookOverview from '@/layouts/HandbookOverview';
import { allBlogDocuments } from '@/lib/contentLayer/collections';
import { getHandbook } from '@/lib/utils/handbooks';

export function generateMetadata() {
  const handbook = getHandbook(allBlogDocuments);

  return metadataGenerator({ 'description': handbook?.index.summary, 'path': '/blog/handbook', 'title': handbook?.index.title || 'Handbook' });
}

export default function HandbookPage() {
  const handbook = getHandbook(allBlogDocuments);

  if (!handbook) notFound();

  return <HandbookOverview handbook={ handbook } />;
}
