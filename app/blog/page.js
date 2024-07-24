import { allPosts } from 'contentlayer/generated';

import FeaturedPostsLayout from '@/layouts/FeaturedLayout';
import ListLayout from '@/layouts/ListLayout';
import { sortPosts } from '@/lib/utils/contentlayer';

export async function generateMetadata() {
  return {
    'title': 'Blog'
  };
}

export default function Blog() {
  return (
    <>
      <FeaturedPostsLayout hideTitle={ true }/>
      <ListLayout posts={ sortPosts(allPosts, 'date') } paginationURL='blog/page' baseURL='blog'/>
    </>
  );
}
