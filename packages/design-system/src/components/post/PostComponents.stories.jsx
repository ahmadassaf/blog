import { createComponentDocsPage, getComponentDocs } from '../../../.storybook/stories/ComponentDocs';

import Breadcrumbs from './Breadcrumbs';
import Disclaimer from './Disclaimer';
import PostHeader, { PostTimestamps } from './PostHeader';
import PostNavigation from './PostNavigation';
import PostSharing from './PostSharing';

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
      { 'children': [], 'depth': 2, 'id': 'design-tokens', 'url': '#design-tokens', 'value': 'Design tokens' },
      { 'children': [], 'depth': 2, 'id': 'semantic-scales', 'url': '#semantic-scales', 'value': 'Semantic scales' }
    ],
    'depth': 1,
    'id': 'foundations',
    'url': '#foundations',
    'value': 'Foundations'
  },
  {
    'children': [
      { 'children': [], 'depth': 2, 'id': 'component-contracts', 'url': '#component-contracts', 'value': 'Component contracts' },
      { 'children': [], 'depth': 2, 'id': 'composition-rules', 'url': '#composition-rules', 'value': 'Composition rules' }
    ],
    'depth': 1,
    'id': 'components',
    'url': '#components',
    'value': 'Components'
  },
  {
    'children': [
      { 'children': [], 'depth': 2, 'id': 'keyboard-flow', 'url': '#keyboard-flow', 'value': 'Keyboard flow' },
      { 'children': [], 'depth': 2, 'id': 'semantic-html', 'url': '#semantic-html', 'value': 'Semantic HTML' }
    ],
    'depth': 1,
    'id': 'accessibility',
    'url': '#accessibility',
    'value': 'Accessibility'
  },
  {
    'children': [
      { 'children': [], 'depth': 2, 'id': 'mdx-registry', 'url': '#mdx-registry', 'value': 'MDX registry' },
      { 'children': [], 'depth': 2, 'id': 'storybook-coverage', 'url': '#storybook-coverage', 'value': 'Storybook coverage' },
      { 'children': [], 'depth': 2, 'id': 'release-checks', 'url': '#release-checks', 'value': 'Release checks' },
      { 'children': [], 'depth': 2, 'id': 'documentation', 'url': '#documentation', 'value': 'Documentation' }
    ],
    'depth': 1,
    'id': 'implementation',
    'url': '#implementation',
    'value': 'Implementation'
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
    <div className='max-w-5xl p-6'>
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
