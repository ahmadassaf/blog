import CitationPopover from '@gaudi/design-system/mdx/CitationPopover';
import Footnote from '@gaudi/design-system/mdx/Footnote';

import MDXLayoutRenderer from '@/data/blog/visualisations/MDXLayoutRenderer';
import PostLayout from '@/layouts/PostLayout';
import { serializeJsonLd } from '@/lib/utils/serializeJsonLd.mjs';

/** Shared rendering for published articles, projects, and local article previews. */
export default function ContentDocument({ content, document, next, prev, structuredData }) {
  return (
    <>
      {structuredData && <script type='application/ld+json' dangerouslySetInnerHTML={{ '__html': serializeJsonLd(structuredData) }} />}
      <PostLayout content={ content } next={ next } prev={ prev } toc={ document.toc }>
        <MDXLayoutRenderer code={ document.body.code } />
        <CitationPopover />
        <Footnote />
      </PostLayout>
    </>
  );
}
