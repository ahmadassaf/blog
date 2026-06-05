/**
 * Project Layout Component
 *
 * @description A specialized layout component for project pages that displays project details, content,
 * and related information. Similar to PostLayout but optimized for project-specific content with
 * appropriate styling and structure for showcasing development projects and portfolio items.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { PostNavigation } from '@gaudi/design-system';

import siteMetadata from '@/data/meta/metadata';

import PostArticleFrame from './PostArticleFrame';
import PostComments from './PostComments';

/**
 * Project layout component for individual project pages
 *
 * @description Renders the complete layout for a project page including header, content, table of contents,
 * and navigation. The layout is optimized for project showcases and portfolio items, providing
 * a clean structure for presenting project details, documentation, and related information.
 *
 * @param {Object} props - Component props
 * @param {Object} props.content - The project content and metadata
 * @param {Object} [props.next] - Next project information for navigation
 * @param {Object} [props.prev] - Previous project information for navigation
 * @param {Array} props.toc - Table of contents entries
 * @param {React.ReactNode} props.children - The rendered project content (MDX)
 *
 * @returns {JSX.Element} The rendered project layout component
 *
 * @example
 * <ProjectLayout
 *   content={projectData}
 *   next={nextProject}
 *   prev={previousProject}
 *   toc={tableOfContents}
 * >
 *   <MDXContent />
 * </ProjectLayout>
 */
export default function PostLayout({ content, next, prev, toc, children }) {
  return (
    <div>
      <article>
        <div>
          <PostArticleFrame content={ content } siteMetadata={ siteMetadata } toc={ toc } padding='lg'>
            {children}
          </PostArticleFrame>
          <PostNavigation next={ next } prev={ prev }></PostNavigation>
          <PostComments/>
        </div>
      </article>
    </div>
  );
}
