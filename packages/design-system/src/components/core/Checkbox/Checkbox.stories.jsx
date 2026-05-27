import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';

import Checkbox from './Checkbox';

const componentDocs = getComponentDocs('Core/Checkbox');

export default {
  component: Checkbox,
  parameters: {
    docs: {
      description: { component: componentDocs.description },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'Core/Checkbox'
};

export const Example = {
  render: () => <div className='p-6'><Checkbox label='Accept terms' defaultChecked /></div>
};

export const States = {
  render: () => (
    <div className='grid gap-4 p-6'>
      <Checkbox label='Unchecked option' />
      <Checkbox label='Checked option' defaultChecked />
      <Checkbox label='Disabled option' disabled />
      <Checkbox label='Disabled checked option' defaultChecked disabled />
    </div>
  )
};
