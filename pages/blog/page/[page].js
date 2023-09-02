import { allPosts } from 'contentlayer/generated';

import { POSTS_PER_PAGE } from '@/components/elements/Pagination';
import { PageSEO } from '@/components/utils/SEO';
import siteMetadata from '@/data/meta/metadata';
import ListLayout from '@/layouts/ListLayout';
import { coreContent, sortPosts } from '@/lib/utils/contentlayer';

export async function getStaticPaths() {
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const paths = Array.from({ 'length': totalPages }, (_, index) => {
    return { 'params': { 'page': (index + 1).toString() } };
  });

  return { 'fallback': false, paths };
}

export async function getStaticProps(context) {
  const { 'params': { page } } = context;

  const sortedPosts = coreContent(sortPosts(allPosts));
  const pageNumber = parseInt(page);
  const pagePosts = sortedPosts.slice(POSTS_PER_PAGE * (pageNumber - 1), POSTS_PER_PAGE * pageNumber);
  const pagination = {
    'currentPage': pageNumber,
    'totalPages': Math.ceil(sortedPosts.length / POSTS_PER_PAGE)
  };

  return { 'props': { pagePosts, pagination } };
}

export default function PostPage({ pagePosts, pagination }) {
  return (
    <>
      <PageSEO title={ siteMetadata.title } description={ siteMetadata.description } />
      <ListLayout posts={ pagePosts } listTitle='All Posts' currentPage={ pagination.currentPage } totalPages={ pagination.totalPages } paginationURL='blog/page' baseURL='blog'/>
    </>
  );
}
