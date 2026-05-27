import Post from '../../src/components/post/Post';
import { Card, Grid, GridItem, Icon, Link, Pill, Typography } from '../../src/index';

import { Page, pageParameters, Section } from './StoryDocs';

const posts = [
  {
    'category': 'data',
    'date': '2024-11-29',
    'readingTime': { 'text': '35 min read' },
    'slug': 'knowledge-graphs-introduction',
    'subtitle': 'A comprehensive guide to knowledge graphs and their applications.',
    'tags': [ 'Semantic Web', 'Knowledge Graphs', 'Linked Data' ],
    'title': 'An Introduction to Knowledge Graphs',
    'type': 'Post'
  },
  {
    'category': 'engineering',
    'date': '2026-05-20',
    'readingTime': { 'text': '8 min read' },
    'slug': 'design-systems-editorial-rhythm',
    'subtitle': 'Reusable tokens and components make article templates easier to maintain.',
    'tags': [ 'Design Systems', 'Components' ],
    'title': 'Design systems keep editorial rhythm predictable',
    'type': 'Post'
  },
  {
    'category': 'productivity',
    'date': '2026-01-14',
    'readingTime': { 'text': '6 min read' },
    'slug': 'notes-for-focused-work',
    'subtitle': 'A practical pattern for collecting decisions and keeping context close.',
    'tags': [ 'Notes', 'Workflows' ],
    'title': 'Project notes for engineering work',
    'type': 'Post'
  }
];

const FeaturedBlog = () => {
  const [ featured, ...rest ] = posts;

  return (
    <div className='grid gap-6 lg:grid-cols-[1.35fr_1fr]'>
      <Card variant='outline' padding='lg'>
        <Pill tone='green' variant='subtle' size='sm'>Data</Pill>
        <Typography variant='heading-xl' className='mt-4'>{featured.title}</Typography>
        <p className='mt-4 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300'>{featured.subtitle}</p>
        <div className='mt-5 flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400'>
          <time dateTime={ featured.date }>Nov 29, 2024</time>
          <Icon name='BookOpen' decorative size='xs' className='text-gray-400' />
          <span>{featured.readingTime.text}</span>
        </div>
        <div className='mt-6 flex flex-wrap gap-2'>
          {featured.tags.map((tag) => <Pill key={ tag } tone='gray' variant='soft' size='sm' className='my-0 mr-0 normal-case tracking-normal'>{tag}</Pill>)}
        </div>
      </Card>
      <div className='grid content-start gap-4'>
        {rest.map((post) => (
          <Card key={ post.slug } variant='outline' interactive className='h-auto'>
            <Pill tone='blue' variant='subtle' size='xs' className='my-0 mr-0 normal-case tracking-normal capitalize'>{post.category}</Pill>
            <Typography variant='heading-sm' className='mt-3'>{post.title}</Typography>
            <p className='mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300'>{post.subtitle}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

const ListBlog = () => (
  <ul className='rounded-lg border border-gray-200 bg-white px-5 dark:border-gray-800 dark:bg-gray-950'>
    {posts.map((post) => <Post key={ post.slug } frontMatter={ post } />)}
  </ul>
);

const CardBlog = () => (
  <div className='grid gap-4 md:grid-cols-3'>
    {posts.map((post) => (
      <Card key={ post.slug } variant='outline' interactive className='group'>
        <div className='flex items-center justify-between gap-3'>
          <Pill tone='blue' variant='soft' size='xs' className='my-0 mr-0 normal-case tracking-normal capitalize'>{post.category}</Pill>
          <span className='text-xs text-gray-500 dark:text-gray-400'>{post.readingTime.text}</span>
        </div>
        <Typography variant='heading-sm' className='mt-4 group-hover:text-blue-600 dark:group-hover:text-blue-400'>{post.title}</Typography>
        <p className='mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300'>{post.subtitle}</p>
        <Link href='' className='mt-5 inline-flex items-center gap-2 text-sm font-semibold' variant='inline'>
          Read article
          <Icon name='ArrowRight' decorative size='sm' />
        </Link>
      </Card>
    ))}
  </div>
);

const ArchiveBlog = () => (
  <div className='rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950'>
    {posts.map((post) => (
      <Link key={ post.slug } href='' className='grid gap-3 border-b border-gray-100 p-4 last:border-b-0 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900 md:grid-cols-[8rem_1fr_auto]'>
        <time className='text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400'>{post.date.slice(0, 4)}</time>
        <span className='text-sm font-semibold text-gray-950 dark:text-white'>{post.title}</span>
        <span className='text-xs capitalize text-gray-500 dark:text-gray-400'>{post.category}</span>
      </Link>
    ))}
  </div>
);

const BlogSectionVariants = () => (
  <Grid columns='4' gap='md'>
    <GridItem variant='soft' title='Featured Lead' description='One article anchors an index or topic page.' icon={ <Icon name='NewspaperIcon' decorative className='text-blue-600 dark:text-blue-400' /> } />
    <GridItem variant='soft' title='Current List' description='The production post preview used in blog listings.' icon={ <Icon name='List' decorative className='text-green-600 dark:text-green-400' /> } />
    <GridItem variant='soft' title='Card Grid' description='Three-column browsing when summaries need stronger separation.' icon={ <Icon name='Grid' decorative className='text-indigo-600 dark:text-indigo-400' /> } />
    <GridItem variant='soft' title='Archive Rows' description='Dense year/category/tag views with compact metadata.' icon={ <Icon name='Calendar' decorative className='text-gray-600 dark:text-gray-400' /> } />
  </Grid>
);

export default {
  parameters: pageParameters,
  title: 'Blocks/Blog Sections'
};

export const Default = {
  'name': 'Blog Sections',
  'render': () => (
    <Page
      title='Blog Sections'
      intro='Blog-listing blocks that match the current editorial system: feature lead, compact list, cards, and archive treatments.'
      kicker='Blocks'
    >
      <Section title='Available Variants' description='The block shapes currently documented for blog listing pages.'>
        <BlogSectionVariants />
      </Section>
      <Section title='Featured Lead' description='Use for index pages where one article should lead the page.'>
        <FeaturedBlog />
      </Section>
      <Section title='Current Blog List' description='Uses the actual Post preview component.'>
        <ListBlog />
      </Section>
      <Section title='Card Grid' description='Use when posts need stronger visual separation.'>
        <CardBlog />
      </Section>
      <Section title='Archive Rows' description='Use for dense category, tag, or year archive pages.'>
        <ArchiveBlog />
      </Section>
    </Page>
  )
};
