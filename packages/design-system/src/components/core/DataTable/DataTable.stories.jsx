import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';

import DataTable from './DataTable';

const componentDocs = getComponentDocs('Core/DataTable');

export default {
  component: DataTable,
  parameters: {
    docs: {
      description: { component: componentDocs.description },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'Core/DataTable'
};

export const Example = {
  render: () => (
    <div className='p-6'>
      <DataTable
        columns={ [
          { header: 'Component', key: 'component' },
          { header: 'Layer', key: 'layer' },
          { header: 'Status', key: 'status' }
        ] }
        rows={ [
          { component: 'Button', layer: 'Core', status: 'Ready' },
          { component: 'DataTable', layer: 'Core', status: 'Ready' }
        ] }
      />
    </div>
  )
};

export const WithCaptionAndCustomCells = {
  render: () => (
    <div className='p-6'>
      <DataTable
        caption='Core component status'
        columns={ [
          { header: 'Component', key: 'component' },
          { header: 'Owner', key: 'owner' },
          {
            header: 'Status',
            key: 'status',
            render: (row) => <span className='rounded-sm bg-green-50 px-2 py-1 text-xs font-semibold text-green-700'>{row.status}</span>
          }
        ] }
        rows={ [
          { component: 'Button', id: 'button', owner: 'Core', status: 'Ready' },
          { component: 'DataTable', id: 'data-table', owner: 'Core', status: 'Ready' }
        ] }
      />
    </div>
  )
};
