/**
 * Post Layout Component
 *
 * @description The main layout component for individual blog post pages. Provides a structured layout
 * with post header, content area, table of contents, navigation, disclaimer, and comments section.
 * Supports responsive design with different layouts for mobile and desktop views.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import SectionContainer from '@/components/containers/SectionContainer';
import Disclaimer from '@/components/post/Disclaimer';
import PostComments from '@/components/post/PostComments';
import PostHeader from '@/components/post/PostHeader';
import PostNavigation from '@/components/post/PostNavigation';
import TableOfContents from '@/components/post/TableOfContents';
import siteMetadata from '@/data/meta/metadata';

/**
 * Post layout component for individual blog post pages
 *
 * @description Renders the complete layout for a blog post including header, content, table of contents,
 * navigation, and comments. The layout adapts based on whether a table of contents is present,
 * using a grid system for optimal content organization.
 *
 * @param {Object} props - Component props
 * @param {Object} props.content - The post content and metadata
 * @param {Object} [props.next] - Next post information for navigation
 * @param {Object} [props.prev] - Previous post information for navigation
 * @param {Array} props.toc - Table of contents entries
 * @param {React.ReactNode} props.children - The rendered post content (MDX)
 *
 * @returns {JSX.Element} The rendered post layout component
 *
 * @example
 * <PostLayout
 *   content={postData}
 *   next={nextPost}
 *   prev={previousPost}
 *   toc={tableOfContents}
 * >
 *   <MDXContent />
 * </PostLayout>
 */
export default function PostLayout({ content, next, prev, toc, children }) {

  return (
    <SectionContainer>
      <article>
        <div>
          <PostHeader frontMatter={ content } siteMetadata={ siteMetadata } toc={ toc }/>

          <div className={ `divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:gap-x-6 xl:divide-y-0 ${(toc.length > 3 && content.tableOfContents) ? 'xl:grid-cols-9' : 'xl:grid-cols-1'}` } style={{ 'gridTemplateRows': 'auto 1fr' }}>
            <div className={ `divide-y divide-gray-200 dark:divide-gray-700 xl:row-span-2 xl:pb-0 ${(toc.length > 3 && content.tableOfContents) && 'xl:col-span-6'}` }>
              <div className='prose max-w-none pt-8 pb-8 dark:prose-dark'>
                {children}
                <Disclaimer/>
              </div>
            </div>
            { (toc.length > 3 && content.tableOfContents) && <TableOfContents toc={ toc } />}
          </div>
          <PostNavigation next={ next } prev={ prev }></PostNavigation>
          { content.comments && (<PostComments/>)}
        </div>
      </article>
    </SectionContainer>
  );
}
