import { allPosts } from 'contentlayer/generated';

import ListLayout from '@/layouts/ListLayout';
import { sortPosts } from '@/lib/utils/contentlayer';

export default function Blog() {
  return (
    <>
      <ListLayout posts={ sortPosts(allPosts, 'date') } listTitle='Blog Posts' paginationURL='blog/page' baseURL='blog'/>
    </>
  );
}
