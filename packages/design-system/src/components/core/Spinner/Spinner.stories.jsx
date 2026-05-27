import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';

import Spinner from './Spinner';

const componentDocs = getComponentDocs('Core/Spinner');

export default {
  component: Spinner,
  parameters: {
    docs: {
      description: { component: componentDocs.description },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'Core/Spinner'
};

export const Example = {
  render: () => <div className='flex items-center gap-4 p-6'><Spinner size='xs' /><Spinner size='sm' /><Spinner /><Spinner size='lg' /></div>
};

export const WithLabels = {
  render: () => (
    <div className='flex flex-wrap items-center gap-6 p-6'>
      <span className='inline-flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300'>
        <Spinner label='Loading posts' size='sm' />
        Loading posts
      </span>
      <span className='inline-flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300'>
        <Spinner label='Saving preferences' />
        Saving preferences
      </span>
    </div>
  )
};
