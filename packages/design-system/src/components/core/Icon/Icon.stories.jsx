import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';
import { Icon } from '../../../index';

const componentDocs = getComponentDocs('Core/Icon');

export default {
  argTypes: {
    'color': {
      'control': 'select',
      'options': [ undefined, 'neutral', 'muted', 'primary', 'blue', 'green', 'yellow', 'red', 'danger', 'warning', 'dim' ]
    },
    'name': {
      'control': 'select',
      'options': [ 'Search', 'BookOpen', 'Github', 'Linkedin', 'Twitter', 'Mail', 'Info', 'Warning', 'CopyIcon', 'CheckIcon', 'FolderOpen', 'javascript' ]
    },
    'size': {
      'control': 'select',
      'options': [ 'xs', 'sm', 'md', 'lg', 'xl', '2xl' ]
    }
  },
  component: Icon,
  parameters: {
    docs: {
      description: {
        component: componentDocs.description
      },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'Core/Icon'
};

export const RegistryIcon = {
  'args': {
    'decorative': true,
    'name': 'Search',
    'size': 'md'
  }
};

export const SocialLink = {
  'render': () => (
    <div className='flex items-center gap-4 p-6'>
      <Icon kind='github' href='https://github.com/ahmadassaf' />
      <Icon kind='linkedin' href='https://www.linkedin.com' />
      <Icon kind='twitter' href='https://x.com' />
      <Icon kind='youtube' href='https://youtube.com' />
      <Icon kind='mail' href='mailto:hello@example.com' />
    </div>
  )
};

export const LabeledIcon = {
  'render': () => (
    <div className='p-6'>
      <Icon name='Info' label='More information' color='primary' size='lg' />
    </div>
  )
};

export const Sizes = {
  'render': () => (
    <div className='flex items-center gap-4 p-6'>
      {[ 'xs', 'sm', 'md', 'lg', 'xl', '2xl' ].map((size) => (
        <Icon key={ size } name='Search' decorative size={ size } />
      ))}
    </div>
  )
};

export const Colors = {
  'render': () => (
    <div className='flex flex-wrap items-center gap-4 p-6'>
      {[ 'neutral', 'muted', 'primary', 'blue', 'green', 'yellow', 'red', 'danger', 'warning', 'dim' ].map((color) => (
        <Icon key={ color } name='Info' label={ `${color} information icon` } color={ color } size='lg' />
      ))}
    </div>
  )
};

export const StrokeWidths = {
  'render': () => (
    <div className='flex items-center gap-4 p-6'>
      {[ 1, 1.5, 2, 2.5, 3 ].map((strokeWidth) => (
        <Icon key={ strokeWidth } name='BookOpen' decorative size='lg' strokeWidth={ strokeWidth } />
      ))}
    </div>
  )
};
