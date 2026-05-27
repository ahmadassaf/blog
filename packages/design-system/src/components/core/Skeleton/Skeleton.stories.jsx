import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';

import Skeleton from './Skeleton';

const componentDocs = getComponentDocs('Core/Skeleton');

export default {
  component: Skeleton,
  parameters: {
    docs: {
      description: { component: componentDocs.description },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'Core/Skeleton'
};

export const Example = {
  render: () => (
    <div className='max-w-sm space-y-3 p-6'>
      <Skeleton className='h-5 w-2/3' />
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-4 w-5/6' />
    </div>
  )
};

export const Loading = {
  name: 'Loading Skeletons',
  parameters: {
    chromatic: { disableSnapshot: false }
  },
  render: () => (
    <div className='grid gap-6 p-6 lg:grid-cols-2'>
      <section aria-label='Article card loading' className='space-y-4 rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950'>
        <div className='flex items-center gap-3'>
          <Skeleton className='h-10 w-10 rounded-full' />
          <div className='flex-1 space-y-2'>
            <Skeleton className='h-3 w-28' />
            <Skeleton className='h-3 w-40' />
          </div>
        </div>
        <Skeleton className='h-8 w-4/5' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-11/12' />
          <Skeleton className='h-4 w-2/3' />
        </div>
      </section>

      <section aria-label='Table loading' className='space-y-3 rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950'>
        <div className='grid grid-cols-[1.4fr_1fr_5rem] gap-3'>
          <Skeleton className='h-3 w-24' />
          <Skeleton className='h-3 w-20' />
          <Skeleton className='h-3 w-14' />
        </div>
        {[ 0, 1, 2, 3 ].map((row) => (
          <div key={ row } className='grid grid-cols-[1.4fr_1fr_5rem] gap-3 border-t border-gray-100 pt-3 dark:border-gray-800'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-6 w-14 rounded-full' />
          </div>
        ))}
      </section>

      <section aria-label='Navigation loading' className='space-y-4 rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950'>
        <div className='flex items-center justify-between gap-4'>
          <Skeleton className='h-9 w-9' />
          <div className='flex gap-3'>
            <Skeleton className='h-5 w-20' />
            <Skeleton className='h-5 w-16' />
            <Skeleton className='h-5 w-24' />
          </div>
        </div>
        <Skeleton className='h-10 w-full rounded-lg' />
      </section>

      <section aria-label='Media loading' className='space-y-4 rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950'>
        <Skeleton className='aspect-video w-full rounded-lg' />
        <div className='space-y-2'>
          <Skeleton className='h-5 w-3/4' />
          <Skeleton className='h-4 w-1/2' />
        </div>
      </section>
    </div>
  )
};
