/**
 * Post Layout Component
 *
 * @description The layout for individual post and project pages. Provides a structured
 * layout with post header, content area, table of contents, navigation, disclaimer, and
 * comments section. Projects get wider content padding, skip the disclaimer, and always
 * show comments; posts gate comments on their frontmatter flag.
 *
 * @author Ahmad Assaf
 * @version 2.0.0
 */

import { Disclaimer,
  PostNavigation } from '@gaudi/design-system';

import siteMetadata from '@/data/meta/metadata';

import PostArticleFrame from './PostArticleFrame';
import PostComments from './PostComments';

import 'katex/dist/katex.css';

/**
 * Post layout component for individual post and project pages
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
 * <PostLayout content={postData} next={nextPost} prev={previousPost} toc={tableOfContents}>
 *   <MDXContent />
 * </PostLayout>
 */
export default function PostLayout({ content, next, prev, toc, children }) {
  const isProject = content.type === 'Project';

  return (
    <article>
      <PostArticleFrame content={ content } locale={ siteMetadata.locale } toc={ toc } padding={ isProject ? 'lg' : undefined }>
        {children}
        {!isProject && <Disclaimer className='mt-8'/>}
      </PostArticleFrame>
      <PostNavigation next={ next } prev={ prev } type={ content.type }></PostNavigation>
      {(isProject || content.comments) && <PostComments/>}
    </article>
  );
}
