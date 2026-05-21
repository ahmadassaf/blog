import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';
import { Grid, GridItem } from '../../../index';

const componentDocs = getComponentDocs('Primitives/Grid');

export default {
  argTypes: {
    'columns': {
      'control': 'select',
      'options': [ '2', '3', '4' ]
    },
    'gap': {
      'control': 'select',
      'options': [ 'sm', 'md', 'lg' ]
    }
  },
  component: Grid,
  parameters: {
    docs: {
      description: {
        component: componentDocs.description
      },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'Primitives/Grid'
};

export const Default = {
  'render': () => (
    <div className='p-6'>
      <Grid columns='3' gap='md'>
        <GridItem title='Tokens' description='Color, type, spacing, and shape definitions.' />
        <GridItem title='Components' description='Reusable primitives for blog and content surfaces.' />
        <GridItem title='Storybook' description='Interactive documentation for every public export.' />
      </Grid>
    </div>
  )
};

export const ItemVariants = {
  'render': () => (
    <div className='p-6'>
      <Grid columns='3'>
        {[ 'elevated', 'outline', 'soft' ].map((variant) => (
          <GridItem key={ variant } variant={ variant } title={ variant } description='Grid item visual style.' />
        ))}
      </Grid>
    </div>
  )
};
