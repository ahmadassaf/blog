import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';
import { Kbd } from '../../../index';

const componentDocs = getComponentDocs('Primitives/Kbd');

export default {
  argTypes: {
    'size': {
      'control': 'select',
      'options': [ 'xs', 'sm', 'md', 'lg' ]
    },
    'variant': {
      'control': 'select',
      'options': [ 'raised', 'outline', 'flat' ]
    }
  },
  component: Kbd,
  parameters: {
    docs: {
      description: {
        component: componentDocs.description
      },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'Primitives/Kbd'
};

export const SingleKey = {
  'args': {
    'children': 'K'
  }
};

export const Shortcut = {
  'args': {
    'keys': 'command,shift,k'
  }
};

export const KeySet = {
  'render': () => (
    <div className='flex flex-wrap items-center gap-3 p-6'>
      {[ 'command,k', 'escape', 'enter', 'shift,tab', 'option' ].map((keys) => (
        <Kbd key={ keys } keys={ keys } />
      ))}
    </div>
  )
};

export const Variants = {
  'render': () => (
    <div className='flex flex-wrap items-center gap-3 p-6'>
      {[ 'raised', 'outline', 'flat' ].map((variant) => (
        <Kbd key={ variant } keys='command,k' variant={ variant } />
      ))}
    </div>
  )
};
