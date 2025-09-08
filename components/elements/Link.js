/**
 * Custom Link Component
 *
 * @description A smart link component that automatically handles different types of links:
 * internal links (using Next.js Link), anchor links, and external links with appropriate
 * security attributes. Provides consistent link behavior across the application.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import Link from 'next/link';

/**
 * Smart link component that handles internal, anchor, and external links
 *
 * @description Automatically determines the link type and renders the appropriate component:
 * - Internal links: Uses Next.js Link for client-side navigation
 * - Anchor links: Uses standard anchor tag for same-page navigation
 * - External links: Uses anchor tag with security attributes (target="_blank", rel="noopener noreferrer")
 *
 * @param {Object} props - Component props
 * @param {string} props.href - The URL or path to link to
 * @param {...Object} props.rest - Additional props passed to the underlying link component
 *
 * @returns {JSX.Element} The appropriate link component
 *
 * @example
 * <CustomLink href="/about">Internal Link</CustomLink>
 * <CustomLink href="#section">Anchor Link</CustomLink>
 * <CustomLink href="https://example.com">External Link</CustomLink>
 */
const CustomLink = ({ href, ...rest }) => {
  const isInternalLink = href && href.startsWith('/');
  const isAnchorLink = href && href.startsWith('#');

  if (isInternalLink) return (
    <Link href={ href } prefetch={ true } { ...rest }/>
  );

  if (isAnchorLink) return <a href={ href } { ...rest } />;

  return <a className='no-underline' target='_blank' rel='noopener noreferrer' href={ href } { ...rest } />;
};

export default CustomLink;
