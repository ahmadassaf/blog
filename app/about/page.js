/**
 * About Page Component
 *
 * @description Editorial profile page with a concise professional overview,
 * selected career history, and the ways Ahmad works with teams and leaders.
 *
 * @author Ahmad Assaf
 * @version 2.0.0
 */

import { Link, Typography } from '@gaudi/design-system';

import { metadataGenertaor } from '@/data/meta/generator/blog';

export const metadata = metadataGenertaor({ 'path': '/about', 'title': 'About' });

const roles = [
  {
    'company': 'Mav9',
    'href': 'https://mav9.com',
    'role': 'CTO'
  },
  {
    'company': 'Beamery',
    'href': 'https://beamery.com',
    'role': 'VP, AI and Data'
  },
  {
    'company': 'SAP',
    'href': 'https://sap.com',
    'role': 'Research Scientist'
  }
];

const services = [
  {
    'description': 'Strategic guidance for complex technology and business decisions.',
    'name': 'Advisory services'
  },
  {
    'description': 'Practical support for emerging leaders, senior practitioners, and teams.',
    'name': 'Mentorship'
  },
  {
    'description': 'Operating models and technical foundations that help organizations grow with less friction.',
    'name': 'Scaling and growth'
  },
  {
    'description': 'Clear direction, healthy engineering practice, and teams focused on meaningful outcomes.',
    'name': 'Technical leadership'
  },
  {
    'description': 'Technology choices and roadmaps aligned with product and business objectives.',
    'name': 'Technical strategy'
  },
  {
    'description': 'Independent assessment of AI products, technical systems, risks, and opportunities.',
    'name': 'AI and technology due diligence'
  }
];

/**
 * About page component displaying professional background and services.
 *
 * @returns {JSX.Element} Complete about page
 */
export default function About() {
  return (
    <main>
      <header className='border-b border-gray-200 py-10 dark:border-gray-800 md:py-14'>
        <Typography variant='title-md'>About</Typography>
        <Typography variant='author-role' className='mt-3 max-w-3xl'>
          AI and data leader, advisor, and mentor focused on building technology that works in the real world.
        </Typography>
        <Typography variant='index-feature-summary' className='mt-5 max-w-3xl text-pretty'>
          I am CTO at <Link href='https://mav9.com' tone='blue'>Mav9</Link>, with more than a decade of experience scaling SaaS and technology businesses across engineering, data, and AI. My work spans engineering leadership, innovation strategy, product development, and the systems that connect them.
        </Typography>
      </header>

      <section aria-labelledby='background-title' className='grid gap-10 border-b border-gray-200 py-10 dark:border-gray-800 md:py-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(16rem,0.65fr)]'>
        <div className='max-w-3xl'>
          <Typography id='background-title' variant='index-feature-title' as='h2'>
            Background
          </Typography>
          <Typography variant='paragraph-md' className='mt-4 max-w-[68ch] text-base leading-7'>
            At Mav9, I lead technology strategy across AI, data, knowledge graphs, and product engineering. Before that, I joined <Link href='https://beamery.com' tone='blue'>Beamery</Link> as a founding engineer and later led engineering, AI, and data teams as the company scaled.
          </Typography>
          <Typography variant='paragraph-md' className='mt-4 max-w-[68ch] text-base leading-7'>
            My research sits at the intersection of the Semantic Web, Information Retrieval, knowledge graphs, and data quality. I hold a PhD in Semantic Web and Information Retrieval, and continue to bring that research discipline to product and organizational problems.
          </Typography>
          <Typography variant='paragraph-md' className='mt-4 max-w-[68ch] text-base leading-7'>
            I enjoy collaborative environments, difficult problems, and helping people connect technical choices to product value. Coaching and continuous learning are central to how I lead.
          </Typography>
        </div>

        <div>
          <Typography variant='metadata' className='mb-3'>Selected experience</Typography>
          <dl className='divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-800 dark:border-gray-800'>
            {roles.map((role) => (
              <div key={ role.company } className='flex items-baseline justify-between gap-5 py-4'>
                <Typography as='dt' variant='paragraph-sm' className='font-semibold text-gray-900 dark:text-gray-100'>
                  {role.role}
                </Typography>
                <Typography as='dd' variant='paragraph-sm' className='text-right'>
                  <Link href={ role.href } tone='gray'>{role.company}</Link>
                </Typography>
              </div>
            ))}
          </dl>
          <Link href='/blog/publications' tone='blue' className='mt-4 inline-block'>
            View publications
          </Link>
        </div>
      </section>

      <section aria-labelledby='services-title' className='py-10 md:py-12'>
        <div className='max-w-3xl'>
          <Typography id='services-title' variant='index-feature-title' as='h2'>
            How I can help
          </Typography>
          <Typography variant='index-feature-summary' className='mt-3'>
            I work with individuals, startups, and established teams on the decisions and operating practices that turn ambitious technology into durable progress.
          </Typography>
        </div>

        <ul className='mt-7 grid border-t border-gray-200 dark:border-gray-800 md:grid-cols-2'>
          {services.map((service) => (
            <li key={ service.name } className='border-b border-gray-200 py-5 dark:border-gray-800 md:odd:pr-8 md:even:border-l md:even:pl-8'>
              <Typography variant='heading-sm' as='h3' className='text-lg'>
                {service.name}
              </Typography>
              <Typography variant='paragraph-sm' className='mt-2 max-w-xl'>
                {service.description}
              </Typography>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
