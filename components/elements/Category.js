import Link from 'next/link';

import kebabCase from '@/lib/utils/kebabCase';

const Category = ({ text, slug }) => (
  <Link href={ `/blog/category/${slug || kebabCase(text)}` } className='font-small mr-2 inline-flex items-center rounded-sm bg-green-600 px-2.5 py-0.5 text-sm hover:cursor-pointer hover:bg-green-200 uppercase text-white hover:text-black dark:hover:text-black' >
    {text}
  </Link>
);

export default Category;