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
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
          <Typography variant='title-xl'>
            Publications
          </Typography>
          <Typography variant='subtitle-md' as='h2'>
            A list of papers I contributed to/authored. The papers span the fields of Semantic Web, Information Retrieval, and Natural Language Processing
          </Typography>
        </div>
        <AccordionGroup
          className='mt-6'
          defaultValue={ years[0] }
          items={ years.map((publicationsGroup) => {
            return {
              'content': (
                <Grid columns='3' gap='md'>
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
        />
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
const PublicationCard = ({ publication }) => (
  <Card interactive className='h-full' variant='outline'>
    <article className='flex h-full flex-col'>
      <div className='flex items-center gap-2 mb-3'>
        {publication.venueType && (
          <Pill tone='yellow' variant='soft' size='xs'>
            {publication.venueType}
          </Pill>
        )}
        {publication.award && (
          <Pill tone='green' variant='soft' size='xs'>
            {publication.award}
          </Pill>
        )}
      </div>

      <Typography variant='heading-sm' as='h3' className='mb-2'>
        {publication.title}
      </Typography>

      <Typography variant='paragraph-sm' className='mb-3 flex-grow'>
        {publication.venue}
      </Typography>

      <Typography variant='paragraph-sm'>
        {publication.authors}
      </Typography>
    </article>
  </Card>
);
