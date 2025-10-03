/**
 * Thought Detail Page Component
 *
 * @description Dynamic route component for displaying individual thoughts.
 * Renders full thought content with MDX support and structured data.
 * Handles catch-all slug routing for nested thought paths.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { allThoughts } from 'contentlayer/generated';

import { MDXComponents, MDXLayoutRenderer } from '@/components/mdx';
import CitationPopover from '@/components/mdx/CitationPopover';
import FootnotePopover from '@/components/mdx/FootnotePopover';
import { linkedDataGenerator, metadataGenertaor } from '@/data/meta/generator/post';
import PostLayout from '@/layouts/PostLayout';
import { coreContent, sortPosts } from '@/lib/utils/contentlayer';

/**
 * Generates metadata for the thought detail page
 *
 * @param {Object} props - Component props
 * @param {Object} props.params - Route parameters
 * @param {Array<string>} props.params.slug - Slug array from catch-all route
 *
 * @returns {Promise<Object>} Generated metadata object
 */
export async function generateMetadata({ params }) {
  const resolvedParams = await params;

  return metadataGenertaor(resolvedParams, allThoughts);
}

/**
 * Generates static parameters for all thought detail pages
 *
 * @returns {Promise<Array<Object>>} Array of slug parameter objects
 */
export const generateStaticParams = async() => {
  const paths = allThoughts.map((thought) => {
    return { 'slug': thought.slug.split('/') };
  });

  return paths;
};

/**
 * Thought detail page component
 *
 * @param {Object} props - Component props
 * @param {Object} props.params - Route parameters
 * @param {Array<string>} props.params.slug - Slug array from catch-all route
 *
 * @returns {Promise<JSX.Element>} Full thought page with MDX content
 */
export default async function Page({ params }) {
  const resolvedParams = await params;
  const slug = decodeURI(resolvedParams.slug.join('/'));
  const thoughts = coreContent(sortPosts(allThoughts));
  const thoughtIndex = thoughts.findIndex((_thought) => _thought.slug === slug);
  const thought = allThoughts[thoughtIndex];

  return thought ? (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ '__html': JSON.stringify(linkedDataGenerator(thought)) }} key='thought-jsonld'/>

      <PostLayout content={ coreContent(thought) } next={ thoughts[thoughtIndex - 1] || null } prev={ thoughts[thoughtIndex + 1] || null } toc={ thought.toc }>
        <MDXLayoutRenderer code={ thought.body.code } components={ MDXComponents } />
        <CitationPopover />
        <FootnotePopover />
      </PostLayout>
    </>
  ) : <></>;
}
