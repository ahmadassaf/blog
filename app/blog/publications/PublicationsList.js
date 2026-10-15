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

import { AccordionGroup, Item, ItemContent, ItemDescription, ItemFooter, ItemHeader, ItemTitle, Link, Pill } from '@gaudi/design-system';
import PageHeader from '@gaudi/design-system/layout/PageHeader';

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
      <div className='mx-auto max-w-6xl'>
        <PageHeader title='Publications' divider className='pt-2 pb-6' />
        <AccordionGroup
          className='mt-5'
          defaultValue={ years[0] }
          items={ years.map((publicationsGroup) => {
            return {
              'content': (
                <div className='mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 pb-3'>
                  {publicationsGroups[publicationsGroup].map((publication) => <PublicationCard key={ publication.href } publication={ publication } />)}
                </div>
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
 * A publication as a linked, outlined Gaudi Item: venue type and award, title, venue and authors
 *
 * @param {Object} props - Component props
 * @param {Object} props.publication - Publication data object
 * @returns {JSX.Element} Linked publication card
 */
const PublicationCard = ({ publication }) => (
  <Item asChild variant='outline' className='h-full flex-col flex-nowrap items-stretch'>
    <Link href={ publication.href } variant='bare'>
      {publication.venueType || publication.award ? (
        <ItemHeader className='basis-auto justify-start'>
          {publication.venueType && <Pill tone='yellow' variant='soft' size='xs'>{publication.venueType}</Pill>}
          {publication.award && <Pill tone='green' variant='soft' size='xs'>{publication.award}</Pill>}
        </ItemHeader>
      ) : null}
      <ItemContent>
        <ItemTitle>{publication.title}</ItemTitle>
        <ItemDescription>{publication.venue}</ItemDescription>
      </ItemContent>
      <ItemFooter className='mt-auto basis-auto pt-2 text-xs text-text-muted'>{publication.authors}</ItemFooter>
    </Link>
  </Item>
);
