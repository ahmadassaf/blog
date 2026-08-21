/**
 * Publications List Component
 *
 * @description Publications page body. Displays academic publications organized
 * by year with collapsible sections (interactivity lives in the design-system
 * AccordionGroup) and responsive grid layout. Each publication shows title,
 * venue, authors, and venue type.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { AccordionGroup, Card, Grid, Link, Pill, Typography } from '@gaudi/design-system';

/**
 * Publications list with year-based grouping and interactive disclosure panels
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.publications - Publication objects with title, venue, year, and authors
 * @returns {JSX.Element} Publications grouped by year in collapsible sections
 *
 * @example
 * <PublicationsList publications={publications} />
 */
export default function PublicationsList({ publications }) {
  const publicationsGroups = {};

  publications.forEach((publication) => {
    const { year } = publication;

    if (publicationsGroups[year]) publicationsGroups[year].push(publication);
    else publicationsGroups[year] = [ publication ];

  });

  // Newest year first
  const years = Object.keys(publicationsGroups).reverse();

  return (
    <>
      <div className='mx-auto max-w-6xl divide-y divide-gray-200 dark:divide-gray-700'>
        <header className='pt-2 pb-6'>
          <Typography variant='title-md'>
            Publications
          </Typography>
        </header>
        <AccordionGroup
          className='mt-5'
          defaultValue={ years[0] }
          items={ years.map((publicationsGroup) => {
            return {
              'content': (
                <Grid columns='3' gap='sm' className='pb-3'>
                  {publicationsGroups[publicationsGroup].map((publication) => (
                    <Link href={ publication.href } key={ publication.href } variant='bare' className='block h-full'>
                      <PublicationCard publication={ publication } />
                    </Link>
                  ))}
                </Grid>
              ),
              'title': publicationsGroup,
              'value': publicationsGroup
            };
          }) }
          type='single'
          variant='flush'
        />
      </div>
    </>
  );
}

/**
 * Compact publication card following the established Publications layout
 *
 * @param {Object} props - Component props
 * @param {Object} props.publication - Publication data object
 * @returns {JSX.Element} Compact publication card
 */
const PublicationCard = ({ publication }) => (
  <Card interactive className='h-full' padding='sm' variant='outline'>
    <article className='flex h-full flex-col'>
      <div className='mb-2 flex flex-wrap items-center gap-2'>
        {publication.venueType && (
          <Pill tone='yellow' variant='soft' size='xs' className='my-0 px-1.5 py-0 text-[10px] leading-4'>
            {publication.venueType}
          </Pill>
        )}
        {publication.award && (
          <Pill tone='green' variant='soft' size='xs' className='my-0 px-1.5 py-0 text-[10px] leading-4'>
            {publication.award}
          </Pill>
        )}
      </div>

      <Typography variant='heading-sm' as='h3' className='mb-1.5 text-sm leading-5 md:text-base md:leading-5'>
        {publication.title}
      </Typography>

      <Typography variant='paragraph-sm' className='mb-2 flex-grow text-xs leading-4'>
        {publication.venue}
      </Typography>

      <Typography variant='post-meta' className='text-[11px] leading-4 normal-case'>
        {publication.authors}
      </Typography>
    </article>
  </Card>
);
