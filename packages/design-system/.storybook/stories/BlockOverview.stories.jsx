import { Card, Grid, GridItem, Icon, Pill, Typography } from '../../src/index';

import { Page, pageParameters, Section } from './StoryDocs';

const blockGroups = [
  {
    'description': 'Listing pages, featured leads, card grids, and archive rows for blog browsing.',
    'icon': 'NewspaperIcon',
    'title': 'Blog Sections',
    'variants': [ 'featured lead', 'current list', 'card grid', 'archive rows' ]
  },
  {
    'description': 'Article-level compositions with header metadata, series navigation, table of contents, body content, and FAQs.',
    'icon': 'BookOpen',
    'title': 'Blog Content Sections',
    'variants': [ 'full article', 'without TOC', 'series only', 'parts map' ]
  },
  {
    'description': 'Metrics for release notes, migration summaries, system health, and compact documentation stats.',
    'icon': 'ChartArea',
    'title': 'Stats Sections',
    'variants': [ 'metric grid', 'changelog', 'dark summary', 'compact inline' ]
  },
  {
    'description': 'Question-answer patterns for docs, support surfaces, and component author guidance.',
    'icon': 'Info',
    'title': 'FAQs',
    'variants': [ 'accordion', 'grid', 'sidebar', 'cards' ]
  },
  {
    'description': 'Footer compositions for the production blog, editorial sitemap pages, newsletters, and utility pages.',
    'icon': 'Panels',
    'title': 'Footers',
    'variants': [ 'current footer', 'editorial', 'newsletter', 'compact' ]
  },
  {
    'description': 'Homepage thoughts feed composition used to surface short-form writing.',
    'icon': 'MessageSquare',
    'title': 'Thoughts',
    'variants': [ 'homepage feed' ]
  }
];

const BlockGroupCard = ({ description, icon, title, variants }) => (
  <GridItem
    variant='soft'
    title={ title }
    description={ description }
    icon={ <Icon name={ icon } decorative className='text-blue-600 dark:text-blue-400' /> }
    header={ <div className='flex flex-wrap gap-2'>
      {variants.map((variant) => (
        <Pill key={ variant } tone='gray' variant='soft' size='xs' className='my-0 mr-0 normal-case tracking-normal'>
          {variant}
        </Pill>
      ))}
    </div> }
  />
);

export default {
  parameters: pageParameters,
  title: 'Blocks/Overview'
};

export const Default = {
  'name': 'Overview',
  'render': () => (
    <Page
      title='Blocks'
      intro='Blocks are full-section compositions built from Gaudi Core, Post, MDX, Content, and Layout components. They document realistic page shapes rather than isolated primitives.'
      kicker='Blocks'
    >
      <Section title='Block Families' description='Each family documents the useful variants for the blog and design-system documentation surfaces.'>
        <Grid columns='3' gap='md'>
          {blockGroups.map((group) => <BlockGroupCard key={ group.title } { ...group } />)}
        </Grid>
      </Section>
      <Section title='Composition Rules' description='The same rules apply across every block: use package components, keep examples realistic, and expose only useful variants.'>
        <div className='grid gap-4 md:grid-cols-3'>
          <Card variant='outline' padding='lg'>
            <Typography variant='heading-sm'>Built From Gaudi</Typography>
            <p className='mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300'>Blocks compose Core primitives and domain components instead of introducing one-off controls or styles.</p>
          </Card>
          <Card variant='outline' padding='lg'>
            <Typography variant='heading-sm'>Real Content Shape</Typography>
            <p className='mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300'>Examples use blog-like metadata, headings, summaries, tags, series boxes, and readable article sections.</p>
          </Card>
          <Card variant='outline' padding='lg'>
            <Typography variant='heading-sm'>Variants With Purpose</Typography>
            <p className='mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300'>A block variant exists only when it maps to a real page need: browsing, reading, explaining, subscribing, or navigating.</p>
          </Card>
        </div>
      </Section>
    </Page>
  )
};
