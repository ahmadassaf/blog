import { createComponentDocsPage, getComponentDocs } from '../../../.storybook/stories/ComponentDocs';

import Aside from './Aside';
import Callout from './Callout';
import Details from './Details';
import Faq from './Faq';
import FileTree from './FileTree';
import HeroVideoDialog from './HeroVideoDialog';
import Highlight from './Highlight';
import LatexText from './LatexText';
import PostImage from './PostImage';
import Quote from './Quote';
import Stats from './Stats';
import Table, { TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from './Table';
import Tooltip from './Tooltip';

const componentDocs = getComponentDocs('MDX/Overview');

const fileTreeData = [
  {
    'childrenProp': [
      { 'name': 'Button.jsx' },
      { 'name': 'Typography.jsx' },
      { 'name': 'tokens.js' }
    ],
    'isFolder': true,
    'name': 'design-system'
  },
  { 'name': 'package.json' }
];

const stats = [
  { 'change': '12%', 'changeType': 'increase', 'name': 'Components', 'previousStat': '8', 'stat': '19' },
  { 'change': '4%', 'changeType': 'increase', 'name': 'Stories', 'previousStat': '24', 'stat': '40' },
  { 'change': '1%', 'changeType': 'decrease', 'name': 'Drift', 'previousStat': '9%', 'stat': '2%' }
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
  title: 'MDX/Overview'
};

export const ContentBlocks = {
  'render': () => (
    <div className='max-w-3xl space-y-8 p-6 text-gray-900 dark:bg-gray-900 dark:text-gray-100'>
      <Aside>Aside content for supporting context beside the main article.</Aside>
      <Callout type='info'>Info callout for useful context.</Callout>
      <Callout type='warning'>Warning callout for things worth checking twice.</Callout>
      <Callout type='error'>Error callout for risky or destructive actions.</Callout>
      <Details title='Expandable details'>Details now render children correctly.</Details>
      <Faq questions={ [
        { 'answer': 'It keeps long-running articles scannable.', 'question': 'Why use FAQ blocks?' },
        { 'answer': 'They are interactive and accessible through Headless UI.', 'question': 'Are they accessible?' }
      ] } />
      <HeroVideoDialog
        thumbnailSrc='/static/images/og-card.jpg'
        thumbnailAlt='Blog video preview'
        title='Article walkthrough'
        videoSrc='https://www.youtube.com/embed/qh3NGpYRG3I'
      />
    </div>
  )
};

export const RichContent = {
  'render': () => (
    <div className='max-w-4xl space-y-8 p-6 text-gray-900 dark:bg-gray-900 dark:text-gray-100'>
      <p>
        Inline <Highlight>highlight</Highlight> and <Tooltip message='Small explanatory text'>tooltip</Tooltip> examples.
      </p>
      <LatexText>11$^&#123;th&#125;$ International Conference</LatexText>
      <Quote text='Good component systems make product code calmer.' author='Design System' title='Internal principle' />
      <FileTree data={ fileTreeData } />
      <Stats text='Coverage snapshot' stats={ stats } />
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Area</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Owner</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Core</TableCell>
            <TableCell>Covered</TableCell>
            <TableCell>Design system</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>MDX</TableCell>
            <TableCell>Covered</TableCell>
            <TableCell>Blog UI</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
};

export const PostImageExample = {
  'render': () => (
    <div className='max-w-3xl p-6'>
      <PostImage title='gaudi' caption='Theme-aware post image with modal preview.' width={ 500 } height={ 300 } />
    </div>
  )
};
