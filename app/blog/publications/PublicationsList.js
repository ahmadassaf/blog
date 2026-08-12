/**
 * Publications List Component
 *
 * @description Chronological academic publication index grouped by year. All
 * entries remain visible for fast scanning and direct access to the source paper.
 *
 * @author Ahmad Assaf
 * @version 2.0.0
 */

import { Icon, Link, Pill, Typography } from '@gaudi/design-system';

/**
 * Publications grouped by year.
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.publications - Publication objects with title, venue, year, and authors
 * @returns {JSX.Element} Chronological publications index
 */
export default function PublicationsList({ publications }) {
  const publicationsByYear = publications.reduce((groups, publication) => {
    if (!groups[publication.year]) groups[publication.year] = [];

    groups[publication.year].push(publication);

    return groups;
  }, {});
  const years = Object.keys(publicationsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div>
      <header className='border-b border-gray-200 py-10 dark:border-gray-800 md:py-12'>
        <Typography variant='title-md'>Publications</Typography>
        <Typography variant='index-feature-summary' className='mt-3 max-w-2xl'>
          Research across the Semantic Web, Information Retrieval, knowledge graphs, data quality, and natural language processing.
        </Typography>
        <div className='mt-4 flex flex-wrap gap-x-5 gap-y-2'>
          <Typography variant='metadata'>{publications.length} papers</Typography>
          <Typography variant='metadata'>{years.length} years</Typography>
        </div>
      </header>

      {years.map((year) => (
        <section key={ year } aria-labelledby={ `publications-${year}` } className='grid gap-4 border-b border-gray-200 py-8 dark:border-gray-800 md:grid-cols-[7rem_minmax(0,1fr)] md:gap-10 md:py-10'>
          <Typography id={ `publications-${year}` } variant='heading-md' as='h2' className='text-xl'>
            {year}
          </Typography>

          <ul className='divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-800 dark:border-gray-800 md:border-t-0 md:first:border-t'>
            {publicationsByYear[year].map((publication) => (
              <li key={ publication.href }>
                <Link
                  href={ publication.href }
                  variant='bare'
                  className='group block py-5'
                >
                  <article>
                    <div className='mb-2 flex flex-wrap items-center gap-2'>
                      {publication.venueType && (
                        <Pill tone='gray' variant='soft' size='xs'>
                          {publication.venueType}
                        </Pill>
                      )}
                      {publication.award && (
                        <Pill tone='green' variant='soft' size='xs'>
                          {publication.award}
                        </Pill>
                      )}
                    </div>
                    <div className='flex items-start justify-between gap-5'>
                      <Typography variant='index-feature-title' as='h3' className='transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400'>
                        {publication.title}
                      </Typography>
                      <Icon name='ExternalLink' size='xs' decorative className='mt-1 shrink-0 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400' />
                    </div>
                    <Typography variant='paragraph-sm' className='mt-2 text-gray-700 dark:text-gray-300'>
                      {publication.venue}
                    </Typography>
                    <Typography variant='post-meta' className='mt-2 normal-case'>
                      {publication.authors}
                    </Typography>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {publications.length === 0 && (
        <div className='py-12 text-center'>
          <Typography variant='paragraph-sm'>No publications listed yet.</Typography>
        </div>
      )}
    </div>
  );
}
