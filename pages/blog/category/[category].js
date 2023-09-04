import { allPosts } from 'contentlayer/generated';

import categories from '@/app/content/categories';
import { TagSEO } from '@/components/utils/SEO';
import siteMetadata from '@/data/meta/metadata';
import ListLayout from '@/layouts/ListLayout';
import { coreContent, sortPosts } from '@/lib/utils/contentlayer';

export async function getStaticPaths() {
  return {
    'fallback': false,
    'paths': categories.map((category) => {
      return {
        'params': {
          'category': category.slug
        }
      };
    })
  };
}

export async function getStaticProps({ params }) {
  const sortedPosts = coreContent(sortPosts(allPosts));
  const filteredPosts = sortedPosts.filter((post) => post.category.replace(' ', '-').toLowerCase() === params.category);

  return { 'props': { 'category': params.category, 'posts': filteredPosts } };
}

export default function Category({ posts, category }) {
  const title = category.replace('-', ' ');

  return (
    <>
      <TagSEO title={ `Category:${category} | ${siteMetadata.title}` } description={ `Category:${category} | ${category.description}` }/>
      <ListLayout className='capitalize' posts={ posts } listTitle={ `${title} Posts` } paginationURL={ `blog/category/${category}/page` } baseURL={ `blog/category/${category}` }/>
    </>
  );
}
