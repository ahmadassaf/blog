import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';

import Switch from './Switch';

const componentDocs = getComponentDocs('Core/Switch');

export default {
  component: Switch,
  parameters: {
    docs: {
      description: { component: componentDocs.description },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'Core/Switch'
};

export const Example = {
  render: () => <div className='flex items-center p-6'><Switch label='Email notifications' defaultChecked /></div>
};

export const States = {
  render: () => (
    <div className='grid gap-4 p-6'>
      <Switch label='Off preference' />
      <Switch label='On preference' defaultChecked />
      <Switch label='Disabled preference' disabled />
      <Switch label='Disabled enabled preference' defaultChecked disabled />
    </div>
  )
};

export const Sizes = {
  render: () => (
    <div className='grid gap-4 p-6'>
      <Switch label='Small switch' size='sm' defaultChecked />
      <Switch label='Medium switch' size='md' defaultChecked />
      <Switch label='Large switch' size='lg' defaultChecked />
    </div>
  )
};
