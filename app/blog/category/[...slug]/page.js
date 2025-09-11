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

// External libraries
import { allPosts } from 'contentlayer/generated';

// Internal components and utilities
import { MDXComponents, MDXLayoutRenderer } from '@/components/mdx';
import FootnotePopover from '@/components/mdx/FootnotePopover';
import ReferencePopover from '@/components/mdx/ReferencePopover';
import { linkedDataGenerator, metadataGenertaor } from '@/data/meta/generator/post';
import PostLayout from '@/layouts/PostLayout';
import { coreContent, sortPosts } from '@/lib/utils/contentlayer';

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

  return metadataGenertaor(resolvedParams, allPosts);
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
  const paths = allPosts.map((post) => {
    return { 'slug': post.slug.split('/') };
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
  const slug = decodeURI(resolvedParams.slug.join('/'));
  const posts = coreContent(sortPosts(allPosts));
  const postIndex = posts.findIndex((_post) => _post.slug.replace('category/', '') === slug);
  const post = allPosts[postIndex];

  if (post?.series) {
    const seriesPosts = allPosts
      .filter((_post) => _post.series?.title === post.series?.title)
      .sort((a, b) => Number(a.series.order) - Number(b.series.order))
      .map((_post) => {
        return {
          'isCurrent': _post.slug === post.slug,
          'series': post.series.title,
          'slug': _post.slug,
          'title': _post.title
        };
      });

    post.seriesPosts = seriesPosts;
  }

  return post ? (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ '__html': JSON.stringify(linkedDataGenerator(post)) }} key='post-jsonld'/>

      <PostLayout content={ coreContent(post) } next={ posts[postIndex - 1] || null } prev={ posts[postIndex + 1] || null } toc={ post.toc }>
        <MDXLayoutRenderer code={ post.body.code } components={ MDXComponents } />
        <ReferencePopover />
        <FootnotePopover />
      </PostLayout>
    </>
  ) : <></>;
}
