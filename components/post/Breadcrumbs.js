import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';

/*
 * Breadcrumbs component
 * Used to display the current page's location in the site's hierarchy
 * pages: array of objects with the following properties:
 *  - current: boolean
 *  - href: string
 *  - name: string
 *
 *  Example:
 *  const pages = [
 *    { current: false, href: '#', name: 'Projects' },
 *    { current: true, href: '#', name: 'Project Nero' }
 *  ];
 *  <Breadcrumbs pages={ pages } />
 *
 * This will render a breadcrumb trail like this:
 * Home > Projects > Project Nero
 *
 * The current page will not be a link, and will be styled differently
 *
 * The Home icon will always be present at the start of the trail
 * The ChevronRight icon will be present between each breadcrumb
 */
export default function Breadcrumbs({ pages }) {
  return (
    <nav aria-label='Breadcrumb' className='flex'>
      <ol role='list' className='flex items-center space-x-4'>
        <li>
          <div>
            <a href='#' className='text-gray-400 hover:text-gray-500'>
              <HomeIcon aria-hidden='true' className='h-5 w-5 shrink-0' />
              <span className='sr-only'>Home</span>
            </a>
          </div>
        </li>
        {pages.map((page) => (
          <li key={ page.name }>
            <div className='flex items-center'>
              <ChevronRightIcon aria-hidden='true' className='h-5 w-5 shrink-0 text-gray-400' />
              <a
                href={ page.href }
                aria-current={ page.current ? 'page' : undefined }
                className='ml-4 text-sm font-medium text-gray-500 hover:text-gray-700'
              >
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
