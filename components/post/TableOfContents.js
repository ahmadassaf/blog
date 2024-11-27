'use client';

import { useEffect, useRef, useState } from 'react';

const TableOfContents = ({ toc }) => {
  const [ activeSlug, setActiveSlug ] = useState('');
  const isTableOfContentsLoaded = useRef(false);

  const observeHeadings = (headings, observer) => {
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);

      if (element) observer.observe(element);
      if (heading.children.length > 0) observeHeadings(heading.children, observer);

    });
  };

  useEffect(() => {
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
  }, [ toc, observeHeadings ]);

  const isDescendantActive = (heading) => {
    if (heading.id === activeSlug) return true;

    return heading.children.some((child) => isDescendantActive(child));
  };

  const renderToc = (_toc, parentActive = false) => (
    <ul>
      {_toc.map((heading) => {
        const isActive = activeSlug === heading.id;
        const shouldShowChildren = isActive || parentActive || isDescendantActive(heading);

        return (
          <li key={ heading.value } className={ `flex flex-col py-[7px] dark:text-white ${activeSlug === heading.id && '!text-blue-600'} ${heading.depth === 1 && '!font-bold'} ${heading.depth === 2 && '!ml-3'} ${heading.depth > 2 ? 'font-light text-gray-500 !ml-5' : 'font-medium text-gray-600'} ` }>
            <a className='flex text-[15px]' href={ heading.url } onClick={ () => setActiveSlug(heading.id) }>{heading.value}</a>
            {heading.children.length > 0 && shouldShowChildren && renderToc(heading.children, shouldShowChildren)}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className='p-4 sticky top-20 text-gray-800 col-span-3 max-xl:hidden mt-[-250px] max-h-[750px] overflow-y-scroll'>
      <div>{renderToc(toc)}</div>
    </div>
  );
};

export default TableOfContents;
