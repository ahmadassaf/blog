'use client';

import { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { Disclosure } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

import publications from '@/app/content/publications.json';
import { cn } from '@/components/utils/TailwindUtils';

export default function Projects({ className }) {
  const [ hoveredIndex, setHoveredIndex ] = useState(null);

  const publicationsGroups = {};

  publications.forEach((publication) => {
    const { year } = publication;

    if (publicationsGroups[year]) publicationsGroups[year].push(publication);
    else publicationsGroups[year] = [ publication ];

  });
  console.log(publicationsGroups);

  return (
    <>
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
          <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
            Publications
          </h1>
          <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
            A list of all the papers where I am the main author/contributor. The papers span the fields of Semantic Web, Information Retrieval, and Natural Language Processing
          </h2>
        </div>
        <div>
          {Object.keys(publicationsGroups).reverse().map((publicationsGroup, index) => (
            <Disclosure as='div' key={ publicationsGroup } className='pt-6' defaultOpen={ index < 2 }>
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className='flex w-full items-start justify-between text-left text-gray-900 dark:text-white'>
                      <span className='text-base font-semibold leading-7'>{publicationsGroup}</span>
                      <span className='ml-6 flex h-7 items-center'>
                        {open ? (
                          <FaMinus className='h-4 w-4' aria-hidden='true' />
                        ) : (
                          <FaPlus className='h-4 w-4' aria-hidden='true' />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as='dd' className='mt-2'>
                    <div className={ cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3', className) }>
                      {publicationsGroups[publicationsGroup].map((publication, idx) => (
                        <Link
                          href={ `${publication.href}` }
                          key={ publication?.href }
                          className='relative group block p-2 h-full w-full'
                          onMouseEnter={ () => setHoveredIndex(idx) }
                          onMouseLeave={ () => setHoveredIndex(null) }
                        >
                          <AnimatePresence>
                            {hoveredIndex === idx && (
                              <motion.span
                                className='absolute inset-0 h-full w-full bg-blue-700/[0.4] dark:bg-white/[0.8] block rounded-3xl'
                                layoutId='hoverBackground'
                                initial={{ 'opacity': 0 }}
                                animate={{ 'opacity': 1, 'transition': { 'duration': 0.15 } }}
                                exit={{ 'opacity': 0, 'transition': { 'delay': 0.2, 'duration': 0.15 } }}
                              />
                            )}
                          </AnimatePresence>
                          <Card>
                            <CardTitle>{publication.title}</CardTitle>
                            <CardDescription>{publication.venue}</CardDescription>
                            <CardMeta year={ publication.year } type={ publication.venueType }></CardMeta>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </>
  );
}

export const Card = ({ className, children }) => (
  <div
    className={ cn(
      'rounded-2xl h-full w-full p-2 overflow-hidden bg-white border dark:bg-gray-900 border-grey-400 dark:border-white/[0.2] group-hover:border-grey-700 relative z-20', className
    ) }
  >
    <div className='relative z-50'>
      <div className='p-2'>{children}</div>
    </div>
  </div>
);
export const CardTitle = ({ className, children }) => (
  <h4 className={ cn('text-black dark:text-white font-bold tracking-wide mt-4', className) }>
    {children}
  </h4>
);
export const CardDescription = ({ className, children }) => (
  <p
    className={ cn(
      'mt-8 text-black dark:text-white tracking-wide leading-relaxed text-sm', className
    ) }
  >
    {children}
  </p>
);

export const CardMeta = ({ year, type }) => (
  <div className='flex mt-4 gap-2'>
    <span class='inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10'>{year}</span>
    <span class='inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20'>{type}</span>
  </div>
);
