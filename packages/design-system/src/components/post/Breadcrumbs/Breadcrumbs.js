/**
 * Breadcrumbs Component
 *
 * @description Navigation breadcrumb component that displays the current page's location
 * within the site hierarchy. Features a home icon as the root element and chevron separators
 * between each breadcrumb level. Provides proper accessibility attributes and semantic markup.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import BreadcrumbTrail from '@/components/core/Breadcrumb';

/**
 * Renders a breadcrumb navigation trail
 *
 * @description Hierarchical navigation component that shows the user's current location
 * within the site structure. Features a home icon as the starting point, followed by
 * page links separated by chevron icons. The current page is indicated with aria-current
 * and styled differently from clickable links.
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.pages - Array of breadcrumb page objects
 * @param {boolean} props.pages[].current - Whether this is the current page
 * @param {string} props.pages[].href - URL for the breadcrumb link
 * @param {string} props.pages[].name - Display name for the breadcrumb
 *
 * @returns {JSX.Element} Breadcrumb navigation with home icon and page links
 *
 * @example
 * // Basic usage with multiple levels
 * const pages = [
 *   { current: false, href: '/projects', name: 'Projects' },
 *   { current: true, href: '/projects/nero', name: 'Project Nero' }
 * ];
 * <Breadcrumbs pages={pages} />
 *
 * @example
 * // Renders as: Home > Projects > Project Nero
 * // Where 'Project Nero' is not clickable (current page)
 */
export default function Breadcrumbs({ pages }) {
  const items = [
    { 'href': '/', 'label': 'Home' },
    ...pages.map((page) => {
      return {
        'current': page.current,
        'href': page.href,
        'label': page.name
      };
    })
  ];

  return <BreadcrumbTrail items={ items } />;
}
