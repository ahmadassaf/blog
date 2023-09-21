/* eslint-disable no-nested-ternary */
import Link from 'next/link';

const PostSeriesBox = ({ series, slug }) => {
  console.log('series', series);
  console.log('slug', slug);

  return (
    <div className='mb-4 px-5 py-3 my-4 bg-blue-200 dark:text-gray-800 rounded'>
      <h1 className='text-lg font-bold my-4'>{series[0].series}</h1>
      <ul className='flex flex-col'>
        {series.map((_post) => (
          <Link className={ `my-1 ${slug === _post.slug && 'text-blue-600'}` } key={ _post.slug } href={ `/blog/${_post.slug}` }>{_post.title}</Link>
        ))}
      </ul>
    </div>
  );
};

export default PostSeriesBox;
