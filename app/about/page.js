import { allAuthors } from 'contentlayer/generated';

import { MDXComponents, MDXLayoutRenderer } from '@/components/mdx';
import AuthorLayout from '@/layouts/AuthorLayout';

export async function generateMetadata() {

  return {
    'title': `About me`
  };
}

export default function About() {
  return (
    <AuthorLayout content={ allAuthors[0] }>
      <MDXLayoutRenderer code={ allAuthors[0].body.code } components={ MDXComponents } />
    </AuthorLayout>
  );
}
