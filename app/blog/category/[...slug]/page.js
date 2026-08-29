/**
 * Category Post Detail Page Component
 *
 * @description Dynamic route component for displaying individual blog posts within categories.
 * Renders full post content with MDX support, structured data, and series navigation.
 * Handles catch-all slug routing for nested category post paths.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import CitationPopover from '@gaudi/design-system/mdx/CitationPopover';
import Footnote from '@gaudi/design-system/mdx/Footnote';
import { allPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';

import MDXLayoutRenderer from '@/data/blog/visualisations/MDXLayoutRenderer';
import { linkedDataGenerator, postMetadataGenerator } from '@/data/meta/generator/post';
import PostLayout from '@/layouts/PostLayout';
import { resolveContentDocument } from '@/lib/contentLayer/resolveContentDocument';
import { published } from '@/lib/utils/contentlayer';
import { safeDecodeURI } from '@/lib/utils/slugs.mjs';

/**
 * Generates metadata for the category post page
 *
 * @description Creates comprehensive page metadata including title, description, and SEO data
 * for individual blog posts within categories using the metadata generator utility.
 *
 * @param {Object} props - Component props
 * @param {Object} props.params - Route parameters
 * @param {Array<string>} props.params.slug - Slug array from catch-all route
 *
 * @returns {Promise<Object>} Generated metadata object
 *
 * @example
 * // For slug ['technology', 'react-tutorial']
 * // Generates metadata for the React tutorial post in technology category
 */
export async function generateMetadata({ params }) {
  const resolvedParams = await params;

  return postMetadataGenerator(resolvedParams, published(allPosts));
}

/**
 * Generates static parameters for all category post pages
 *
 * @description Creates static paths for all blog posts to enable static generation
 * at build time. Splits post slugs into arrays for catch-all routing.
 *
 * @returns {Promise<Array<Object>>} Array of slug parameter objects
 *
 * @example
 * // Returns array like:
 * // [{ slug: ['category', 'post-slug'] }, { slug: ['category', 'another-post'] }]
 */
export const generateStaticParams = async() => {
  const paths = published(allPosts).map((post) => {
    return { 'slug': post.slug.replace('category/', '').split('/') };
  });

  return paths;
};

/**
 * Category post detail page component
 *
 * @description Renders the full content of a blog post within a category context.
 * Includes MDX rendering, structured data injection, series navigation, and
 * previous/next post navigation. Handles posts that are part of a series.
 *
 * @param {Object} props - Component props
 * @param {Object} props.params - Route parameters
 * @param {Array<string>} props.params.slug - Slug array from catch-all route
 *
 * @returns {Promise<JSX.Element>} Full blog post page with MDX content
 *
 * @example
 * // Rendered at /blog/category/technology/react-hooks-guide
 * // Shows full post content with navigation and series info
 */
export default async function Page({ params }) {
  const resolvedParams = await params;
  const slug = safeDecodeURI(resolvedParams.slug.join('/'));

  if (slug === null) notFound();

  const resolved = resolveContentDocument(
    allPosts, (post) => post.slug.replace('category/', '') === slug
  );

  if (!resolved) notFound();

  const { content, next, prev } = resolved;
  const post = resolved.document;

  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ '__html': JSON.stringify(linkedDataGenerator(post)) }} key='post-jsonld'/>

      <PostLayout content={ content } next={ next } prev={ prev } toc={ post.toc }>
        <MDXLayoutRenderer code={ post.body.code } />
        <CitationPopover />
        <Footnote />
      </PostLayout>
    </>
  );
}
