/**
 * Post Layout Component
 *
 * @description The layout for individual post and project pages. Provides a structured
 * layout with post header, content area, table of contents, navigation, disclaimer, and
 * comments section. Projects get wider content padding and skip the disclaimer; posts and
 * projects both show comments.
 *
 * @author Ahmad Assaf
 * @version 2.0.0
 */

import { Link, PostNavigation } from '@gaudi/design-system';
import Callout from '@gaudi/design-system/mdx/Callout';

import siteMetadata from '@/data/meta/metadata';

import PostArticleFrame from './PostArticleFrame';
import PostComments from './PostComments';

import 'katex/dist/katex.css';

const disclaimer = 'The opinions and views expressed on this blog are solely my own and do not reflect the opinions, views, or positions of my employer or any affiliated organizations. All content provided on this blog is for informational purposes only.';

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
/** PostNavigation wants a ready href; the resolver hands back the neighbour's slug. */
const toNavigationTarget = (neighbour) => (neighbour?.slug ? { 'href': `/blog/${neighbour.slug}`, 'title': neighbour.title } : null);

export default function PostLayout({ content, next, prev, toc, children }) {
  const isProject = content.type === 'Project';

  return (
    <article>
      <PostArticleFrame content={ content } locale={ siteMetadata.locale } toc={ toc } padding={ isProject ? 'lg' : undefined }>
        {children}
        {!isProject && (
          <Callout type='info' className='mt-8' classNames={{ 'body': 'text-sm leading-7' }}>
            <p>{disclaimer}</p>
            <p>
              I also offer consulting and mentoring in AI strategy, engineering leadership, and scaling teams.{' '}
              <Link href={ `mailto:${siteMetadata.email}` } tone='blue'>Get in touch</Link> if I can help.
            </p>
          </Callout>
        )}
      </PostArticleFrame>
      <PostNavigation next={ toNavigationTarget(next) } prev={ toNavigationTarget(prev) } type={ content.type } />
      <PostComments/>
    </article>
  );
}
