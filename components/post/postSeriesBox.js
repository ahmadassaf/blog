/* eslint-disable no-nested-ternary */
import { Square3Stack3DIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

const PostSeriesBox = ({ series, slug }) => (
  <div className='mb-4 p-3 my-4 bg-white dark:bg-gray-800 dark:text-white border-2 border-gray-200 rounded-md ring-gray-200'>
    <div className='flex items-center'>
      <Square3Stack3DIcon className='h-4 w-4 text-gray-400 mr-2'/>
      <h3 className='text-sm text-gray-500'>This post is part of</h3>
    </div>
    <h1 className='lg:text-lg text-md font-bold my-2'>{series[0].series}</h1>
    <ul className='flex flex-col'>
      {series.map((_post, index) => (
        slug === _post.slug ? <li key={ index } className=' text-blue-700 p-1 my-1'>{_post.title}</li> : <li key={ index }>
          <Link className={ `p-1 hover:text-blue-700` } href={ `/blog/${_post.slug}` }>{_post.title}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default PostSeriesBox;
