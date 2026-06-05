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

import { AccordionGroup, Card, Grid, Link, Pill, Typography } from '@gaudi/design-system';

import publications from '@/app/content/publications.json';

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
          <Typography variant='title-xl'>
            Publications
          </Typography>
          <Typography variant='subtitle-md'>
            A list of papers I contributed to/authored. The papers span the fields of Semantic Web, Information Retrieval, and Natural Language Processing
          </Typography>
        </div>
        <AccordionGroup
          className='mt-6'
          defaultValue={ Object.keys(publicationsGroups).reverse()[0] }
          items={ Object.keys(publicationsGroups).reverse().map((publicationsGroup) => {
            return {
              'content': (
                <Grid columns='3' gap='md' className={ className }>
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
export const PublicationCard = ({ publication }) => (
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
    <Pill tone='indigo' variant='soft' size='xs'>{year}</Pill>
    {type && (
      <Pill tone='yellow' variant='soft' size='xs'>{type}</Pill>
    )}
  </div>
);
