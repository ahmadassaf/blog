'use client';

import { useEffect, useRef, useState } from 'react';

const TableOfContents = ({ toc, indentDepth = 3, fromHeading = 1, toHeading = 6, exclude = '' }) => {
  const [ activeSlug, setActiveSlug ] = useState('');
  const isTableOfContentsLoaded = useRef(false);
  const re = Array.isArray(exclude) ? new RegExp(`^(${exclude.join('|')})$`, 'i') : new RegExp(`^(${exclude})$`, 'i');

  const filteredToc = toc.filter(
    (heading) => heading.depth >= fromHeading && heading.depth <= toHeading && !re.test(heading.value)
  );

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

    filteredToc.forEach((heading) => {
      const element = document.getElementById(heading.id);

      if (element) observer.observe(element);

    });

    return () => observer.disconnect();
  }, [ filteredToc ]);

  const tocList = (
    <ul className='list-none'>
      {filteredToc.map((heading) => (
        <li key={ heading.value } className={ `dark:text-white text-sm py-1 ${activeSlug === heading.id && 'text-blue-600'} ${heading.depth === 1 && '!font-bold'} ${heading.depth === 2 && '!ml-3'} ${heading.depth > 2 ? 'font-light' : 'font-medium'} ${heading.depth >= indentDepth && 'ml-6'}` }>
          <a href={ heading.url } onClick={ () => setActiveSlug(heading.id) }>{heading.value}</a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div className='rounded p-4 sticky top-10 text-gray-800 col-span-3 max-xl:hidden !border mt-[-350px] max-h-[850px] overflow-y-scroll'>
        <h1 className='pt-2 pb-2 text-xl font-bold dark:text-white'>Table of Contents</h1>
        <div>{tocList}</div>
      </div>
    </>
  );
};

export default TableOfContents;
