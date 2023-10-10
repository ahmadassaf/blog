import { allProjects } from 'contentlayer/generated';

import { MDXComponents, MDXLayoutRenderer } from '@/components/mdx';
import { linkedDataGenerator, metadataGenertaor } from '@/data/meta/generator/post';
import ProjectLayout from '@/layouts/ProjectLayout';
import { coreContent, sortPosts } from '@/lib/utils/contentlayer';

export async function generateMetadata({ params }) {
  return metadataGenertaor(params, allProjects);
}

export const generateStaticParams = async() => {
  const paths = allProjects.map((post) => {
    return { 'slug': post.slug.split('/') };
  });

  return paths;
};

export default async function Page({ params }) {
  const slug = decodeURI(params.slug.join('/'));
  const posts = coreContent(sortPosts(allProjects));
  const postIndex = posts.findIndex((_post) => _post.externalLink === `projects/${slug}`);
  const post = allProjects[postIndex];

  if (post?.series) {
    const seriesPosts = allProjects
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

      <script type='application/ld+json' dangerouslySetInnerHTML={{ '__html': JSON.stringify(linkedDataGenerator(post)) }} key='post-jsonld'/>

      <ProjectLayout content={ coreContent(post) } next={ posts[postIndex - 1] || null } prev={ posts[postIndex + 1] || null } toc={ post.toc }>
        <MDXLayoutRenderer code={ post.body.code } components={ MDXComponents } />
      </ProjectLayout>
    </>
  ) : <></>;
}
