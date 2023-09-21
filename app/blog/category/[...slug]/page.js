import { allPosts } from 'contentlayer/generated';

import { MDXComponents, MDXLayoutRenderer } from '@/components/mdx';
import PostLayout from '@/layouts/PostLayout';
import { coreContent, sortPosts } from '@/lib/utils/contentlayer';

export const generateStaticParams = async() => {
  const paths = allPosts.map((post) => {
    return { 'slug': post.slug.split('/') };
  });

  return paths;
};

export default async function Page({ params }) {
  const slug = decodeURI(params.slug.join('/'));
  const posts = coreContent(sortPosts(allPosts));
  const postIndex = posts.findIndex((_post) => _post.slug.replace('category/', '') === slug);
  const post = allPosts[postIndex];

  if (post?.series) {
    const seriesPosts = allPosts
      .filter((_post) => _post.series?.title === post.series?.title)
      .sort((a, b) => Number(a.series.order) - Number(b.series.order))
      .map((_post) => {
        return {
          'isCurrent': _post.slug === post.slug,
          'series': post.series.title,
          'slug': _post.slug,
          'title': _post.title
        };
      });

    post.seriesPosts = seriesPosts;
  }

  return post ? (
    <>
      <PostLayout content={ coreContent(post) } next={ posts[postIndex - 1] || null } prev={ posts[postIndex + 1] || null } toc={ post.toc }>
        <MDXLayoutRenderer code={ post.body.code } components={ MDXComponents } />
      </PostLayout>
    </>
  ) : <></>;
}
