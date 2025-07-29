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

import SectionContainer from '@/components/containers/SectionContainer';
import PostComments from '@/components/post/PostComments';
import PostHeader from '@/components/post/PostHeader';
import PostNavigation from '@/components/post/PostNavigation';
import TableOfContents from '@/components/post/TableOfContents';
import siteMetadata from '@/data/meta/metadata';

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
    <SectionContainer>
      <article>
        <div>
          <PostHeader frontMatter={ content } siteMetadata={ siteMetadata } toc={ toc }/>
          <div className={ `divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:gap-x-6 xl:divide-y-0 ${(toc.length > 3 && content.tableOfContents) ? 'xl:grid-cols-9' : 'xl:grid-cols-1'}` } style={{ 'gridTemplateRows': 'auto 1fr' }}>
            <div className={ `divide-y divide-gray-200 dark:divide-gray-700 xl:row-span-2 xl:pb-0 ${(toc.length > 3 && content.tableOfContents) && 'xl:col-span-6'}` }>
              <div className='prose max-w-none pt-10 pb-8 dark:prose-dark '>
                {children}
              </div>
            </div>
            { (toc.length > 3 && content.tableOfContents) && <TableOfContents toc={ toc } />}
          </div>
          <PostNavigation next={ next } prev={ prev }></PostNavigation>
          <PostComments/>
        </div>
      </article>
    </SectionContainer>
  );
}
