import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';
import { Button, Card, Pill } from '../../../index';

const componentDocs = getComponentDocs('Primitives/Card');

export default {
  argTypes: {
    'padding': {
      'control': 'select',
      'options': [ 'none', 'sm', 'md', 'lg' ]
    },
    'variant': {
      'control': 'select',
      'options': [ 'elevated', 'outline', 'soft', 'flat' ]
    }
  },
  component: Card,
  parameters: {
    docs: {
      description: {
        component: componentDocs.description
      },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'Primitives/Card'
};

export const Variants = {
  'render': () => (
    <div className='grid max-w-4xl gap-4 p-6 md:grid-cols-4'>
      {[ 'elevated', 'outline', 'soft', 'flat' ].map((variant) => (
        <Card key={ variant } title={ variant } subtitle='Reusable card style.' variant={ variant } />
      ))}
    </div>
  )
};

export const Default = {
  'args': {
    'subtitle': 'Reusable content frame with title, description, and optional actions.',
    title: 'Design System Card'
  }
};

export const WithContent = {
  'render': () => (
    <div className='max-w-md p-6'>
      <Card title='Building with tokens' subtitle='Cards should be plain containers, not layout decoration.'>
        <div className='mt-4 flex items-center gap-3'>
          <Pill tone='blue'>Foundations</Pill>
          <Button variant='outline' tone='gray' size='sm'>Open</Button>
        </div>
      </Card>
    </div>
  )
};
