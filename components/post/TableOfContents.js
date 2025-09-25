/**
 * TableOfContents Component
 *
 * @description Interactive table of contents component that tracks user scroll position
 * and highlights the currently active section. Features automatic expansion/collapse logic,
 * smooth scrolling navigation, and responsive design that hides on mobile screens.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Renders an interactive table of contents with scroll tracking
 *
 * @description Sidebar table of contents that observes heading visibility using Intersection Observer.
 * Automatically highlights the current section, handles URL hash navigation, and provides
 * expandable/collapsible nested structure based on heading hierarchy.
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.toc - Table of contents data structure
 * @param {string} props.toc[].id - Heading element ID for navigation
 * @param {string} props.toc[].value - Heading text content
 * @param {string} props.toc[].url - Hash URL for the heading
 * @param {number} props.toc[].depth - Heading level (1-6)
 * @param {Array<Object>} props.toc[].children - Nested child headings
 *
 * @returns {JSX.Element} Interactive table of contents sidebar
 *
 * @example
 * // Basic usage with TOC data
 * const tocData = [{
 *   id: 'heading-1',
 *   value: 'Introduction',
 *   url: '#heading-1',
 *   depth: 1,
 *   children: []
 * }];
 * <TableOfContents toc={tocData} />
 *
 * @example
 * // TOC automatically expands when there are 4 or fewer level-1 headings
 * <TableOfContents toc={smallTocData} />
 */
const TableOfContents = ({ toc }) => {
  const [ activeSlug, setActiveSlug ] = useState('');
  const isTableOfContentsLoaded = useRef(false);

  useEffect(() => {
    const observeHeadings = (headings, observer) => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);

        if (element) observer.observe(element);
        if (heading.children.length > 0) observeHeadings(heading.children, observer);
      });
    };

    if (location.hash && !isTableOfContentsLoaded.current) {
      setActiveSlug(location.hash.replace('#', ''));
      isTableOfContentsLoaded.current = true;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry?.isIntersecting) setActiveSlug(entry.target.id);
        });
      }, {
        'rootMargin': '-25% 0px -75% 0px'
      }
    );

    observeHeadings(toc, observer);

    return () => observer.disconnect();
  }, [ toc ]);

  /**
   * Checks if any descendant heading is currently active
   *
   * @description Recursively checks if the current heading or any of its children
   * match the active slug, used for determining expansion state.
   *
   * @param {Object} heading - Heading object to check
   * @returns {boolean} True if heading or descendants are active
   */
  const isDescendantActive = (heading) => {
    if (heading.id === activeSlug) return true;

    return heading.children.some((child) => isDescendantActive(child));
  };

  /**
   * Recursively renders the table of contents structure
   *
   * @description Renders nested TOC structure with proper indentation and styling.
   * Handles active states, expansion logic, and depth-based styling.
   *
   * @param {Array<Object>} _toc - TOC data to render
   * @param {boolean} [parentActive=false] - Whether parent is active
   * @param {boolean} [expandAll=false] - Whether to expand all sections
   * @returns {JSX.Element} Rendered TOC structure
   */
  const renderToc = (_toc, parentActive = false, expandAll = false) => (
    <ul>
      {_toc.map((heading) => {
        const isActive = activeSlug === heading.id;
        const shouldShowChildren = expandAll || isActive || parentActive || isDescendantActive(heading);

        return (
          <li
            key={ heading.value }
            className={ `flex flex-col py-[7px] dark:text-white ${isActive && 'text-blue-600!'} ${heading.depth === 1 && 'font-bold!'} ${heading.depth === 2 && 'ml-3!'} ${heading.depth > 2 ? 'font-light text-gray-500 ml-5!' : 'font-medium text-gray-600'}` }
          >
            <a
              className='flex text-[15px]'
              href={ heading.url }
              onClick={ () => setActiveSlug(heading.id) }
            >
              {heading.value}
            </a>
            {heading.children.length > 0 && shouldShowChildren &&
              renderToc(heading.children, shouldShowChildren, expandAll)}
          </li>
        );
      })}
    </ul>
  );

  const level1HeadingsCount = toc.filter((heading) => heading.depth === 1).length;
  const expandAll = level1HeadingsCount <= 4;

  return (
    <div className='p-4 sticky top-20 text-gray-800 col-span-3 max-xl:hidden max-h-[calc(100vh-5rem)] overflow-y-auto'>
      {renderToc(toc, false, expandAll)}
    </div>
  );
};

export default TableOfContents;
