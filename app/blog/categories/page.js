import categories from '@/app/content/categories';
import Category from '@/components/elements/Category';
import Link from '@/components/elements/Link';

export async function generateMetadata() {

  return {
    'title': `Categories`
  };
}

export default function Categories() {
  return (
    <>
      <div className='flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:space-x-6 md:divide-y-0'>
        <div className='space-x-2 pt-6 pb-8 md:space-y-5'>
          <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14'>
            Categories
          </h1>
        </div>
        <div className='flex flex-wrap'>
          {categories.length === 0 && 'No Categories found'}
          {categories.map((category) => (
            <div key={ category.id } className='mt-2 mb-2 mr-5'>
              <Category text={ category.title } slug={ category.slug } />
              <Link
                href={ `blog/categories/${category.slug}` }
                className='-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300'
              >
                  &nbsp;{` (${category.count})`}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
