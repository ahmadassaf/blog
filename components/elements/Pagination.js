import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';

const POSTS_PER_PAGE = 7;

const Pagination = ({ totalPages, currentPage, baseURL, paginationURL }) => {
  const prevPage = parseInt(currentPage) - 1 > 0;
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages);

  return (
    <nav className='flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 mt-4'>
      <div className='-mt-px flex w-0 flex-1 group'>
        {!prevPage && (
          <button rel='previous' className='cursor-auto disabled:opacity-50 inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500' disabled={ !prevPage }>Previous</button>
        )}
        {prevPage && (
          <a
            href={ currentPage - 1 === 1 ? `/${baseURL}/` : `/${paginationURL}/${currentPage - 1}` }
            className='inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-blue-700 hover:text-blue-700'
          >
            <ArrowLongLeftIcon aria-hidden='true' className='mr-3 h-5 w-5 text-gray-400 group-hover:fill-blue-700' />
        Previous
          </a>
        )}

      </div>
      <div className='hidden md:-mt-px md:flex'>
        <a
          href='#'
          aria-current='page'
          className='inline-flex items-center border-t-2 border-blue-500 px-4 pt-4 text-sm font-medium text-blue-700'
        >
          {currentPage} of {totalPages}
        </a>
      </div>
      <div className='-mt-px flex w-0 flex-1 justify-end group'>
        {!nextPage && (
          <button rel='previous' className='cursor-auto disabled:opacity-50 inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500' disabled={ !nextPage }>Next</button>
        )}
        {nextPage && (
          <a
            href={ `/${paginationURL}/${currentPage + 1}` }
            className='inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-blue-700 hover:text-blue-700'
          >
        Next
            <ArrowLongRightIcon aria-hidden='true' className='ml-3 h-5 w-5 text-gray-400 group-hover:fill-blue-700' />
          </a>
        )}

      </div>
    </nav>
  );
};

export { Pagination, POSTS_PER_PAGE };
