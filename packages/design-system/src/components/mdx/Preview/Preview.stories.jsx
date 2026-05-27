import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';
import { renderComponentExample } from '../../../../.storybook/stories/ComponentExamples';

import * as componentModule from './index';

const componentDocs = getComponentDocs('MDX/Preview');

export default {
  parameters: {
    docs: {
      description: {
        component: componentDocs.description
      },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'MDX/Preview'
};

export const Example = {
  'render': () => renderComponentExample('MDX/Preview', componentModule)
};

export const Loading = {
  name: 'Loading',
  parameters: {
    chromatic: { disableSnapshot: false }
  },
  render: () => (
    <div className='p-6'>
      <componentModule.PreviewLoadingSkeleton />
    </div>
  )
};
