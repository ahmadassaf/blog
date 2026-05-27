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

import { Disclaimer,
  PostComments,
  PostNavigation,
  SectionContainer } from '@gaudi/design-system';

import siteMetadata from '@/data/meta/metadata';

import PostArticleFrame from './PostArticleFrame';

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
          <PostArticleFrame content={ content } siteMetadata={ siteMetadata } toc={ toc }>
            {children}
            <Disclaimer/>
          </PostArticleFrame>
          <PostNavigation next={ next } prev={ prev } type={ content.type }></PostNavigation>
          { content.comments && (<PostComments/>)}
        </div>
      </article>
    </SectionContainer>
  );
}
