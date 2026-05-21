/**
 * Publications Page Component
 *
 * @description Displays academic publications organized by year with collapsible sections,
 * animated hover effects, and responsive grid layout. Each publication shows title,
 * venue, year, and venue type.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

import { Icon } from '@ahmadassaf/design-system';
import { Disclosure } from '@headlessui/react';
import Link from 'next/link';

import publications from '@/app/content/publications.json';
import { cn } from '@/components/utilities/TailwindUtils';

/**
 * Publications page component with year-based grouping and interactive disclosure panels
 *
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes for styling
 * @returns {JSX.Element} Publications page with grouped publications by year
 *
 * @example
 * <Projects className="custom-spacing" />
 */
export default function Projects({ className }) {
  const publicationsGroups = {};

  publications.forEach((publication) => {
    const { year } = publication;

    if (publicationsGroups[year]) publicationsGroups[year].push(publication);
    else publicationsGroups[year] = [ publication ];

  });

  return (
    <>
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
          <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
            Publications
          </h1>
          <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
            A list of papers I contributed to/authored. The papers span the fields of Semantic Web, Information Retrieval, and Natural Language Processing
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
                          <Icon name='Minus' size='sm' decorative />
                        ) : (
                          <Icon name='Plus' size='sm' decorative />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as='dd' className='mt-2'>
                    <div className={ cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4', className) }>
                      {publicationsGroups[publicationsGroup].map((publication) => (
                        <Link href={ `${publication.href}` } key={ publication?.href } className='block h-full w-full' target='_blank' rel='noopener noreferrer' >
                          <PublicationCard publication={ publication } />
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

/**
 * Clean publication card component following blog design patterns
 *
 * @param {Object} props - Component props
 * @param {Object} props.publication - Publication data object
 * @returns {JSX.Element} Clean publication card with typography-focused design
 */
export const PublicationCard = ({ publication }) => (
  <article className='group block p-4 border border-gray-200 dark:border-border-dark rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 h-full bg-white dark:bg-gray-900'>
    <div className='flex flex-col h-full'>
      {/* Metadata */}
      <div className='flex items-center gap-2 mb-3 text-sm'>
        {publication.venueType && (
          <span className='px-2 py-1 text-xs font-medium text-yellow-800 dark:text-yellow-200 bg-yellow-50 dark:bg-yellow-900/30 rounded-md'>
            {publication.venueType}
          </span>
        )}
        {publication.award && (
          <>
            <span className='px-2 py-1 text-xs font-medium text-green-800 dark:text-green-200 bg-green-50 dark:bg-green-900/30 rounded-md'>
              {publication.award}
            </span>
          </>
        )}
      </div>

      {/* Title */}
      <h3 className='text-lg font-semibold leading-tight tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 mb-2'>
        {publication.title}
      </h3>

      {/* Venue */}
      <p className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3 flex-grow'>
        {publication.venue}
      </p>

      {/* Authors */}
      <p className='text-xs text-gray-500 dark:text-gray-400 leading-relaxed'>
        {publication.authors}
      </p>
    </div>
  </article>
);

/**
 * Publication metadata component displaying year and venue type
 *
 * @param {Object} props - Component props
 * @param {string} props.year - Publication year
 * @param {string} props.type - Venue type (e.g., 'Conference', 'Journal')
 * @returns {JSX.Element} Metadata badges for publication
 *
 * @example
 * <CardMeta year="2023" type="Conference" />
 */
export const CardMeta = ({ year, type }) => (
  <div className='flex mt-4 gap-2'>
    <span className='inline-flex items-center rounded-md bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-200 ring-1 ring-inset ring-indigo-700/10 dark:ring-indigo-300/20'>{year}</span>
    {type && (
      <span className='inline-flex items-center rounded-md bg-yellow-50 dark:bg-yellow-900/30 px-2 py-1 text-xs font-medium text-yellow-800 dark:text-yellow-200 ring-1 ring-inset ring-yellow-600/20 dark:ring-yellow-400/20'>{type}</span>
    )}
  </div>
);
