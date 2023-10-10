import { allProjects } from 'contentlayer/generated';

import Card from '@/components/elements/Card';

export async function generateMetadata() {

  return {
    'title': `Projects`
  };
}

export default function Projects() {
  return (
    <>
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
          <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
            Projects
          </h1>
        </div>
        <div className='py-12'>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
            {allProjects.map((project) => (
              <Card key={ project.title } title={ project.title } subtitle={ project.subtitle } href={ `/blog/${project.externalLink}` } meta={ project.meta } />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
