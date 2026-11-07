/**
 * About Page Component
 *
 * @description Main about page showcasing professional background, experience,
 * and services offered. Features responsive design with hero section, career history,
 * and service offerings.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { Icon, IconTile, Link, Typography } from '@gaudi/design-system';
import PageChrome from '@gaudi/design-system/layout/PageChrome';
import Preview from '@gaudi/design-system/mdx/Preview';

import { metadataGenerator } from '@/data/meta/generator/blog';
import siteMetadata from '@/data/meta/metadata';
import PageBackdrop from '@/layouts/PageBackdrop';

export const metadata = metadataGenerator({
  'description': "I'm Ahmad Assaf, CTO at Mav9. I offer consulting, advisory support, and mentoring in AI strategy, engineering leadership, and scaling teams.",
  'path': '/about',
  'title': 'About'
});

/**
 * About page component displaying professional background and services
 *
 * @returns {JSX.Element} Complete about page with hero section, history, and services
 *
 * @example
 * // Rendered at /about route
 * <About />
 */
export default function About() {

  const values = [
    {
      'description': 'I help you identify where AI can be useful, assess opportunities, and turn ideas into a practical plan for your product and team.',
      'icon': <Icon name='ChessKnight' decorative />,
      'name': 'AI Strategy and Consulting'
    },
    {
      'description': 'I work with emerging leaders and teams on leadership, career decisions, AI, and productivity.',
      'icon': <Icon name='HandshakeLine' decorative />,
      'name': 'Mentorship'
    },
    {
      'description': 'I help you plan the team structure, engineering practices, and technical changes your next stage of growth needs.',
      'icon': <Icon name='ChartArea' decorative />,
      'name': 'Scaling Teams and Systems'
    },
    {
      'description': 'I help founders and engineering leaders clarify priorities, improve how teams work, and connect technical decisions to product goals.',
      'icon': <Icon name='Cubes' decorative />,
      'name': 'Technical Leadership'
    },
    {
      'description': 'I help you shape technical roadmaps, weigh trade-offs, and decide where to invest based on your business goals.',
      'icon': <Icon name='Codepen' decorative />,
      'name': 'Technical Strategy'
    },
    {
      'description': 'I assess AI capabilities, architecture, and engineering practices to identify technical risks, gaps, and opportunities.',
      'icon': <Icon name='Robot' decorative />,
      'name': 'AI and Tech Due Diligence'
    }
  ];

  return (
    <article className='about-grid mx-auto max-w-6xl pb-6'>
      {/* About has its own PixelBlast header, so the site's aurora band steps aside */}
      <PageChrome background={ false } />
      <PageBackdrop className='about-backdrop' intensity={ 0.6 }>
        <header className='pb-24 pt-5 sm:pb-32 sm:pt-8'>
          <div className='max-w-2xl'>
            <Typography variant='title-xl' className='text-4xl leading-[1.05] sm:text-5xl md:text-6xl md:leading-[1.02] lg:text-6xl'>
              AI &amp; Engineering Leader, Consultant and Mentor
            </Typography>
            <Typography variant='paragraph-md' className='mt-5 max-w-[68ch]'>
              I'm Ahmad Assaf, CTO at Mav9. I've spent more than a decade building and scaling SaaS businesses across engineering, data, and AI. My work spans technology strategy, engineering leadership, and product development.
            </Typography>
            <Typography variant='paragraph-md' className='mt-4 max-w-[68ch]'>
              I offer consulting, advisory support, and mentoring to founders, technology leaders, and teams.
            </Typography>
            <Link href='#work-with-me' tone='blue' className='mt-6 inline-flex max-w-full items-center gap-2'>
              Work with me
              <Icon name='ArrowRight' decorative size='xs' />
            </Link>
          </div>
        </header>
      </PageBackdrop>

      <section className='pt-12 sm:pt-14'>
        <Typography variant='heading-lg' as='h2'>A Brief History</Typography>
        <div className='mt-6 flex flex-col gap-8 lg:flex-row lg:gap-16'>
          <div className='max-w-[68ch] flex-1 space-y-6'>
            <Typography variant='paragraph-md'>
              At <Preview url='https://mav9.com' title='Mav9' />, I lead technology strategy across AI, data, knowledge graphs, and product engineering. My work connects technical decisions with the products we build and the people who use them.
            </Typography>
            <Typography variant='paragraph-md'>
              Before Mav9, I was a founding engineer at <Preview url='https://beamery.com' title='Beamery' />, then Head of Engineering and VP of AI and Data. I built its AI and Data Science functions as the company grew, moving from hands-on engineering into leading teams.
            </Typography>
            <Typography variant='paragraph-md'>
              My background combines research, hands-on engineering, and team leadership. It shapes how I work: connect technical decisions to product goals, make trade-offs clear, and help people grow. As a coach and mentor, I also provide guidance on AI, leadership, and productivity.
            </Typography>
          </div>

          <aside className='pt-2 lg:w-72 lg:pl-8 lg:pt-0'>
            <dl className='space-y-7'>
              <div className='space-y-1.5'>
                <Typography as='dt' variant='heading-sm'>CTO</Typography>
                <Typography as='dd' variant='paragraph-sm'>
                  <Preview url='https://mav9.com' title='Mav9' />
                </Typography>
              </div>
              <div className='space-y-1.5'>
                <Typography as='dt' variant='heading-sm'>VP AI and Data</Typography>
                <Typography as='dd' variant='paragraph-sm'>
                  <Preview url='https://beamery.com' title='Beamery' />
                </Typography>
              </div>
              <div className='space-y-1.5'>
                <Typography as='dt' variant='heading-sm'>Research Scientist</Typography>
                <Typography as='dd' variant='paragraph-sm'>
                  <Preview url='https://sap.com' title='SAP' />
                </Typography>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section id='work-with-me' aria-labelledby='services-heading' className='mt-16 scroll-mt-24 pt-12 sm:mt-20 sm:pt-14'>
        <div className='max-w-2xl'>
          <Typography variant='heading-lg' as='h2' id='services-heading'>Consulting, Advisory and Mentoring</Typography>
          <Typography variant='paragraph-md' className='mt-5'>
            I can help you shape your AI strategy, strengthen engineering leadership, scale your team, or assess technical risks. Tell me what you're working on and where you need support, and we can discuss how I can help.
          </Typography>
          <Link href={ `mailto:${siteMetadata.email}` } tone='blue' className='mt-5 inline-flex max-w-full items-center gap-2'>
            Get in touch to discuss working together
            <Icon name='ArrowRight' decorative size='xs' />
          </Link>
        </div>

        <div className='mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-10'>
          {values.map((value) => (
            <section key={ value.name }>
              <IconTile variant='outline' className='mb-3 text-text-muted'>{value.icon}</IconTile>
              <Typography variant='heading-sm' as='h3'>
                {value.name}
              </Typography>
              <Typography variant='paragraph-sm' className='mt-2 max-w-sm'>
                {value.description}
              </Typography>
            </section>
          ))}
        </div>
      </section>
    </article>
  );
}
