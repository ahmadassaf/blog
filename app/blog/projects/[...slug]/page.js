/**
 * Project Detail Page Component
 *
 * @description Dynamic route component for displaying individual project details.
 * Renders full project content with MDX support, structured data, and series navigation.
 * Handles catch-all slug routing for nested project paths.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { CitationPopover, Footnote } from '@gaudi/design-system/mdx';
import { allProjects } from 'contentlayer/generated';
import { notFound } from 'next/navigation';

import MDXLayoutRenderer from '@/data/blog/visualisations/MDXLayoutRenderer';
import { linkedDataGenerator, metadataGenertaor } from '@/data/meta/generator/post';
import ProjectLayout from '@/layouts/ProjectLayout';
import { coreContent, published, sortPosts } from '@/lib/utils/contentlayer';
import { safeDecodeURI } from '@/lib/utils/slugs.mjs';

/**
 * Generates metadata for the project detail page
 *
 * @description Creates comprehensive page metadata including title, description, and SEO data
 * for individual projects using the metadata generator utility.
 *
 * @param {Object} props - Component props
 * @param {Object} props.params - Route parameters
 * @param {Array<string>} props.params.slug - Slug array from catch-all route
 *
 * @returns {Promise<Object>} Generated metadata object
 *
 * @example
 * // For slug ['web-app', 'portfolio-redesign']
 * // Generates metadata for the portfolio redesign project
 */
export async function generateMetadata({ params }) {
  const resolvedParams = await params;

  return metadataGenertaor({ 'slug': [ 'projects', ...resolvedParams.slug ] }, published(allProjects));
}

/**
 * Generates static parameters for all project detail pages
 *
 * @description Creates static paths for all projects to enable static generation
 * at build time. Splits project slugs into arrays for catch-all routing.
 *
 * @returns {Promise<Array<Object>>} Array of slug parameter objects
 *
 * @example
 * // Returns array like:
 * // [{ slug: ['project-type', 'project-name'] }, { slug: ['another-project'] }]
 */
export const generateStaticParams = async() => {
  const paths = published(allProjects).map((post) => {
    return { 'slug': post.externalLink.replace('projects/', '').split('/') };
  });

  return paths;
};

/**
 * Project detail page component
 *
 * @description Renders the full content of a project with detailed information.
 * Includes MDX rendering, structured data injection, series navigation, and
 * previous/next project navigation. Handles projects that are part of a series.
 *
 * @param {Object} props - Component props
 * @param {Object} props.params - Route parameters
 * @param {Array<string>} props.params.slug - Slug array from catch-all route
 *
 * @returns {Promise<JSX.Element>} Full project detail page with MDX content
 *
 * @example
 * // Rendered at /blog/projects/web-development/portfolio-site
 * // Shows full project details with navigation and series info
 */
export default async function Page({ params }) {
  const resolvedParams = await params;
  const slug = safeDecodeURI(resolvedParams.slug.join('/'));

  if (slug === null) notFound();

  const sortedProjects = sortPosts(published(allProjects));
  const posts = coreContent(sortedProjects);
  const postIndex = posts.findIndex((_post) => _post.externalLink === `projects/${slug}`);
  const post = sortedProjects[postIndex];

  if (!post) notFound();

  if (post?.series) {
    const seriesPosts = sortedProjects
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

  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ '__html': JSON.stringify(linkedDataGenerator(post)) }} key='post-jsonld'/>

      <ProjectLayout content={ coreContent(post) } next={ posts[postIndex - 1] || null } prev={ posts[postIndex + 1] || null } toc={ post.toc }>
        <MDXLayoutRenderer code={ post.body.code } />
        <CitationPopover />
        <Footnote />
      </ProjectLayout>
    </>
  );
}
