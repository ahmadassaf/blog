import Link from 'next/link';

const Category = ({ text, slug }) => (
  <Link href={ `/blog/categories/${slug || text.replace(' ', '-').toLowerCase()}` } className='font-small mr-2 inline-flex items-center rounded-sm bg-green-600 px-2.5 py-0.5 text-sm max-sm:text-xs hover:cursor-pointer hover:bg-green-200 uppercase text-white hover:text-black dark:hover:text-black' >
    {text}
  </Link>
);

export default Category;
