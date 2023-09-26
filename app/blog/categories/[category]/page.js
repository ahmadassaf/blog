import { allPosts } from 'contentlayer/generated';

import categories from '@/app/content/categories';
import ListLayout from '@/layouts/ListLayout';
import { coreContent, sortPosts } from '@/lib/utils/contentlayer';

export async function generateMetadata({ params }) {
  const category = decodeURI(params.category);
  const title = category.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return {
    'title': `Category: ${title}`
  };
}

export const generateStaticParams = async() => {

  const paths = categories.map((category) => {
    return {
      'category': category.slug
    };
  });

  return paths;
};

export default function Page({ params }) {
  const category = decodeURI(params.category);
  const title = category.replace('-', ' ');
  const sortedPosts = coreContent(sortPosts(allPosts));
  const filteredPosts = sortedPosts.filter((post) => post.category.replace(' ', '-').toLowerCase() === params.category);

  return (
    <>
      <div>
        <ListLayout className='capitalize' posts={ filteredPosts } listTitle={ `${title} Posts` } paginationURL={ `blog/categories/${category}/page` } baseURL={ `blog/categories/${category}` }/>
      </div>
    </>
  );
}
