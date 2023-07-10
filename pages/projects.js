import Card from '@/components/blocks/Card';
import { PageSEO } from '@/components/utils/SEO';
import projectsData from '@/data/meta/projects';
import siteMetadata from '@/data/meta/site';

export default function Projects() {
  return (
    <>
      <PageSEO title={ `Projects - ${siteMetadata.author}` } description={ siteMetadata.description } />
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
          <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
            Projects
          </h1>
        </div>
        <div className='py-12'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            {projectsData.map((d) => (
              <Card key={ d.title } title={ d.title } subtitle={ d.subtitle } description={ d.description } href={ d.href } />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
