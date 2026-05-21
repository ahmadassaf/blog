import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';
import { Pill, pillVariants } from '../../../index';

const componentDocs = getComponentDocs('Primitives/Pill');

export default {
  argTypes: {
    'size': {
      'control': 'select',
      'options': [ ...Object.keys(pillVariants.variants.size) ]
    },
    'tone': {
      'control': 'select',
      'options': [ ...Object.keys(pillVariants.variants.tone) ]
    },
    'variant': {
      'control': 'select',
      'options': [ ...Object.keys(pillVariants.variants.variant) ]
    }
  },
  component: Pill,
  parameters: {
    docs: {
      description: {
        component: componentDocs.description
      },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'Primitives/Pill'
};

export const Default = {
  'args': {
    'children': 'Engineering',
    'tone': 'blue',
    'variant': 'solid'
  }
};

export const Tones = {
  'render': () => (
    <div className='flex max-w-3xl flex-wrap gap-2 p-6'>
      {Object.keys(pillVariants.variants.tone).map((tone) => (
        <Pill key={ tone } tone={ tone }>{tone}</Pill>
      ))}
    </div>
  )
};

export const Variants = {
  'render': () => (
    <div className='flex max-w-3xl flex-wrap gap-2 p-6'>
      {Object.keys(pillVariants.variants.variant).map((variant) => (
        <Pill key={ variant } variant={ variant } tone='green'>{variant}</Pill>
      ))}
      <Pill tone='green' pulse>Live</Pill>
    </div>
  )
};
