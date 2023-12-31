import tags from '@/app/content/tags';
import Link from '@/components/elements/Link';
import Tag from '@/components/elements/Tag';

export async function generateMetadata() {
  return {
    'title': 'Tags'
  };
}

export default function Tags() {
  return (
    <>
      <div className='flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:space-x-6 md:divide-y-0'>
        <div className='space-x-2 pt-6 pb-8 md:space-y-5'>
          <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14'>
            Tags
          </h1>
        </div>
        <div className='flex flex-wrap'>
          {tags.length === 0 && 'No tags found.'}
          {tags.length && tags.map((_tag) => (
            <div key={ _tag.id } className='mt-2 mb-2 mr-5'>
              <Tag text={ _tag.display } slug={ _tag.slug } />
              <Link href={ `/blog/tag/${_tag.slug}` } className='-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300'>
                  &nbsp;{` (${_tag.count})`}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
