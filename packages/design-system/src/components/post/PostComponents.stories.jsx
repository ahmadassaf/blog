import { createComponentDocsPage, getComponentDocs } from '../../../.storybook/stories/ComponentDocs';

import Breadcrumbs from './Breadcrumbs';
import Disclaimer from './Disclaimer';
import PostHeader, { PostTimestamps } from './PostHeader';
import PostNavigation from './PostNavigation';
import PostSeriesBox from './PostSeriesBox';
import PostSharing from './PostSharing';
import TableOfContents from './TableOfContents';

const componentDocs = getComponentDocs('Post/Overview');

const siteMetadata = {
  'github': 'https://github.com/ahmadassaf/blog',
  'locale': 'en-GB',
  'postsRepo': 'https://github.com/ahmadassaf/blog-posts',
  'siteUrl': 'https://ahmadassaf.com'
};

const series = [
  { 'order': 1, 'series': 'Design Systems', 'slug': 'foundations', title: 'Foundations' },
  { 'order': 2, 'series': 'Design Systems', 'slug': 'components', title: 'Components' },
  { 'order': 3, 'series': 'Design Systems', 'slug': 'documentation', title: 'Documentation' }
];

const frontMatter = {
  'category': 'engineering',
  'date': '2026-05-20',
  'externalLink': 'engineering/design-systems',
  'fileName': 'design-systems.mdx',
  'readingTime': { 'text': '6 min read' },
  'seriesPosts': series,
  'slug': 'components',
  'subtitle': 'A practical structure for local package-driven UI.',
  'tableOfContents': true,
  tags: [ 'design systems', 'react', 'storybook' ],
  title: 'Building a Complete Blog Design System'
};

const toc = [
  {
    'children': [
      { 'children': [], 'depth': 2, 'id': 'tokens', 'url': '#tokens', 'value': 'Tokens' },
      { 'children': [], 'depth': 2, 'id': 'components', 'url': '#components', 'value': 'Components' }
    ],
    'depth': 1,
    'id': 'foundations',
    'url': '#foundations',
    'value': 'Foundations'
  }
];

export default {
  parameters: {
    docs: {
      description: {
        component: componentDocs.description
      },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'Post/Overview'
};

export const Header = {
  'render': () => (
    <div className='max-w-4xl p-6'>
      <PostHeader frontMatter={ frontMatter } siteMetadata={ siteMetadata } toc={ toc } />
    </div>
  )
};

export const NavigationAndSharing = {
  'render': () => (
    <div className='max-w-4xl space-y-8 p-6'>
      <Breadcrumbs pages={ [
        { 'current': false, 'href': '/blog', 'name': 'Blog' },
        { 'current': true, 'href': '/blog/design-system', 'name': 'Design System' }
      ] } />
      <PostTimestamps date='2026-05-20' locale='en-GB' readingTime='6 min read' />
      <PostSharing
        siteMetadata={ siteMetadata }
        slug='design-system'
        title='Building a Complete Blog Design System'
        tags={ [ 'design systems', 'react' ] }
        externalLink='engineering/design-system'
      />
      <PostNavigation
        prev={{ 'slug': 'previous-post', title: 'Previous post title' }}
        next={{ 'slug': 'next-post', title: 'Next post title' }}
      />
      <Disclaimer />
    </div>
  )
};

export const SeriesAndToc = {
  'render': () => (
    <div className='grid max-w-5xl grid-cols-1 gap-8 p-6 xl:grid-cols-4'>
      <div className='xl:col-span-3'>
        <PostSeriesBox series={ series } slug='components' />
      </div>
      <TableOfContents toc={ toc } />
      <div className='hidden'>
        <h2 id='foundations'>Foundations</h2>
        <h3 id='tokens'>Tokens</h3>
        <h3 id='components'>Components</h3>
      </div>
    </div>
  )
};
