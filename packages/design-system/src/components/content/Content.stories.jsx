import { useState } from 'react';

import { createComponentDocsPage, getComponentDocs } from '../../../.storybook/stories/ComponentDocs';
import Button from '../core/Button';
import PaginationBar from '../core/Pagination';

import Aurora from './Aurora';
import MenuDropDown from './DropDown';
import ImageModal from './ImageModal';
import Search from './Search';

const componentDocs = getComponentDocs('Content/Overview');

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
  title: 'Content/Overview'
};

export const SearchInput = {
  'render': () => {
    const [ value, setValue ] = useState('');

    return (
      <div className='max-w-xl p-6'>
        <Search setSearchValue={ setValue } />
        <p className='mt-4 text-sm text-gray-600 dark:text-gray-300'>Value: {value || 'empty'}</p>
      </div>
    );
  }
};

export const Dropdown = {
  'render': () => {
    const [ open, setOpen ] = useState(false);

    return (
      <div className='max-w-sm p-6'>
        <MenuDropDown name='Content sections' menuDropDownOpen={ open } setMenuDropDownOpen={ setOpen } />
        {open && (
          <div className='mt-2 rounded-lg border border-gray-200 p-3 text-sm text-gray-700 dark:border-gray-700 dark:text-gray-200'>
            Dropdown content container
          </div>
        )}
      </div>
    );
  }
};

export const PaginationStates = {
  'render': () => (
    <div className='max-w-3xl space-y-10 p-6'>
      <PaginationBar totalPages={ 5 } currentPage={ 1 } getHref={ () => '' } />
      <PaginationBar totalPages={ 5 } currentPage={ 3 } getHref={ () => '' } />
      <PaginationBar totalPages={ 5 } currentPage={ 5 } getHref={ () => '' } />
    </div>
  )
};

export const ModalOpen = {
  'render': () => {
    const [ open, setOpen ] = useState(true);

    return (
      <div className='p-6'>
        <Button onClick={ () => setOpen(true) }>
          Open modal
        </Button>
        <ImageModal
          isOpen={ open }
          onClose={ () => setOpen(false) }
          src='/static/images/logo.svg'
          alt='Site logo'
          caption='Image modal preview'
        />
      </div>
    );
  }
};

export const AuroraBackground = {
  'render': () => (
    <Aurora className='min-h-[360px] overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700'>
      <div className='relative z-10 max-w-xl p-8 text-center'>
        <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>Aurora surface</h2>
        <p className='mt-3 text-gray-600 dark:text-gray-300'>Decorative page background with theme-aware gradients.</p>
      </div>
    </Aurora>
  )
};
