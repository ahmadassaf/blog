import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';

import { Pagination,
  PaginationBar,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationStatus } from './Pagination';

const componentDocs = getComponentDocs('Core/Pagination');

export default {
  component: PaginationBar,
  parameters: {
    docs: {
      description: { component: componentDocs.description },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'Core/Pagination'
};

export const Example = {
  render: () => <div className='p-6'><PaginationBar currentPage={ 1 } getHref={ () => '' } totalPages={ 4 } /></div>
};

export const MiddlePage = {
  render: () => <div className='p-6'><PaginationBar currentPage={ 3 } getHref={ () => '' } totalPages={ 5 } /></div>
};

export const Numbered = {
  render: () => (
    <div className='p-6'>
      <Pagination label='Numbered pages'>
        <PaginationContent className='rounded-2xl border border-gray-200 bg-white p-2 shadow-lg shadow-gray-950/10 dark:border-gray-800 dark:bg-gray-950'>
          {[ 1, 2, 3, 4 ].map((page) => (
            <PaginationItem key={ page }>
              <PaginationLink href='' isActive={ page === 3 }>{page}</PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </div>
  )
};

export const Composed = {
  render: () => (
    <div className='p-6'>
      <Pagination label='Blog pages' className='border-t border-gray-200 pt-6'>
        <div className='grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4'>
          <div className='flex justify-start'>
            <PaginationPrevious href='' />
          </div>
          <PaginationStatus currentPage={ 3 } getHref={ () => '' } totalPages={ 5 } />
          <div className='flex justify-end'>
            <PaginationNext href='' />
          </div>
        </div>
      </Pagination>
      <Pagination label='Numbered pages' className='mt-8'>
        <PaginationContent className='rounded-2xl border border-gray-200 bg-white p-2 shadow-lg shadow-gray-950/10'>
          <PaginationItem><PaginationLink href=''>1</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href=''>2</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href='' isActive>3</PaginationLink></PaginationItem>
          <PaginationItem><PaginationEllipsis /></PaginationItem>
          <PaginationItem><PaginationLink href=''>8</PaginationLink></PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
};
