/**
 * Author Layout Component
 *
 * @description Layout component for author pages with name, occupation display,
 * and content area. Provides structured layout with typography styling
 * and dark mode support.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { ArticleContentLayout, Typography } from '@gaudi/design-system';

/**
 * Author page layout with header and content sections
 *
 * @param {Object} props - Component props
 * @param {Object} props.content - Author content with name and occupation
 * @param {string} props.content.name - Author's full name
 * @param {string} props.content.occupation - Author's occupation/title
 * @param {React.ReactNode} props.children - Author content/biography
 * @returns {JSX.Element} Author layout with header and content
 *
 * @example
 * <AuthorLayout content={{name: "John Doe", occupation: "Developer"}}>
 *   <p>Author biography content</p>
 * </AuthorLayout>
 */
export default function AuthorLayout({ content, children }) {
  const { name, occupation } = content;

  return (
    <>
      <div>
        <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
          <Typography variant='author-name'>{name}</Typography>
          <Typography variant='author-role'>{occupation}</Typography>
        </div>
        <ArticleContentLayout>
          {children}
        </ArticleContentLayout>
      </div>
    </>
  );
}
