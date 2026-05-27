import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';
import { Link } from '../../../index';

const componentDocs = getComponentDocs('Core/Link');

export default {
  argTypes: {
    'tone': {
      'control': 'select',
      'options': [ 'gray', 'neutral', 'blue', 'green', 'yellow', 'red', 'indigo' ]
    },
    'variant': {
      'control': 'select',
      'options': [ 'inline', 'muted', 'nav', 'bare' ]
    }
  },
  component: Link,
  parameters: {
    docs: {
      description: {
        component: componentDocs.description
      },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'Core/Link'
};

export const Internal = {
  'args': {
    'children': 'Read the blog',
    'href': '/blog',
    'tone': 'blue',
    'variant': 'inline'
  }
};

export const External = {
  'args': {
    'children': 'Visit GitHub',
    'href': 'https://github.com/ahmadassaf',
    'tone': 'blue',
    'variant': 'inline'
  }
};

export const Variants = {
  'render': () => (
    <div className='flex flex-wrap items-center gap-4 p-6'>
      {[ 'inline', 'muted', 'nav', 'bare' ].map((variant) => (
        <Link key={ variant } href='/blog' variant={ variant }>{variant}</Link>
      ))}
    </div>
  )
};

export const Tones = {
  'render': () => (
    <div className='flex flex-wrap items-center gap-4 p-6'>
      {[ 'gray', 'neutral', 'blue', 'green', 'yellow', 'red', 'indigo' ].map((tone) => (
        <Link key={ tone } href='/blog' tone={ tone }>{tone}</Link>
      ))}
    </div>
  )
};

export const LinkTypes = {
  'render': () => (
    <div className='grid gap-3 p-6'>
      <Link href='/blog'>Internal blog link</Link>
      <Link href='#examples'>Anchor link</Link>
      <Link href='https://example.com'>External documentation link</Link>
      <Link>Non-link fallback text</Link>
    </div>
  )
};
