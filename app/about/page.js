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

import { Grid, Icon, Typography } from '@gaudi/design-system';
import Preview from '@gaudi/design-system/mdx/Preview';

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
      'description': 'Providing strategic guidance to help you navigate complex business challenges and make informed decisions.',
      'icon': <Icon name='ChessKnight' decorative />,
      'name': 'Advisory Services'
    },
    {
      'description': 'Offering personalized mentorship to emerging leaders and teams, fostering growth and development.',
      'icon': <Icon name='HandshakeLine' decorative />,
      'name': 'Mentorship'
    },
    {
      'description': 'Assisting in scaling operations and accelerating growth through proven strategies and industry insights.',
      'icon': <Icon name='ChartArea' decorative />,
      'name': 'Scaling and Growth'
    },
    {
      'description': 'Leading technical teams with a focus on innovation, efficiency, and achieving business goals.',
      'icon': <Icon name='Cubes' decorative />,
      'name': 'Technical Leadership'
    },
    {
      'description': 'Developing and implementing robust technical strategies that align with your business objectives and drive competitive advantage.',
      'icon': <Icon name='Codepen' decorative />,
      'name': 'Technical Strategy'
    },
    {
      'description': 'Conducting thorough assessments of AI and technology systems to ensure they meet industry standards and support business growth, while identifying potential risks and opportunities.',
      'icon': <Icon name='Robot' decorative />,
      'name': 'AI and Tech Due Diligence'
    }
  ];

  return (
    <article className='about-grid mx-auto max-w-6xl pb-6'>
      <header className='pb-14 pt-5 sm:pb-20 sm:pt-8'>
        <div className='max-w-2xl'>
          <Typography variant='title-xl' className='text-4xl leading-[1.05] sm:text-5xl md:text-6xl md:leading-[1.02] lg:text-6xl'>
            Artificial Intelligence Leader, Advisor and Mentor
          </Typography>
          <Typography variant='paragraph-md' className='mt-5 max-w-[68ch] text-base leading-7 md:text-lg md:leading-8'>
          Ahmad is CTO at Mav9 and a seasoned AI and data leader with more than a decade of experience scaling SaaS and technology businesses across engineering, data, and AI. He has a proven track record in engineering leadership, encompassing engineering operations, innovation strategy, and product development.
          </Typography>
        </div>
      </header>

      <section className='pt-12 sm:pt-14'>
        <Typography variant='heading-xl' as='h2' className='text-3xl leading-tight sm:text-4xl'>A Brief History</Typography>
        <div className='mt-6 flex flex-col gap-8 lg:flex-row lg:gap-16'>
          <div className='max-w-[68ch] flex-1 space-y-6'>
            <Typography variant='paragraph-md' className='text-base leading-7 md:text-lg md:leading-8'>
              I am currently CTO at <Preview url='https://mav9.com' title='Mav9' />, where I lead technology strategy across AI, data, knowledge graphs, and product engineering. Before Mav9, as a founding engineer at <Preview url='https://beamery.com' title='Beamery' />, I had the unique opportunity to shape the company's technological journey from its inception. Starting with a hands-on approach, I transitioned into leadership roles, serving as Head of Engineering and VP of AI and Data, building the AI and Data Science functions at the core of Beamery's R&D and innovation efforts.
            </Typography>
            <Typography variant='paragraph-md' className='text-base leading-7 md:text-base'>
              As a continuous learner, I love working in collaborative environments, tackling challenging problems with my team and providing strategic leadership to achieve product-market fit and growth. I have vast expertise at aligning technology with business objectives and effectively communicating transformative and innovative strategies to the market.
            </Typography>
            <Typography variant='paragraph-md' className='text-base leading-7 md:text-base'>
              In addition to my technical and leadership roles, I am deeply committed to fostering a culture of growth and continuous learning. As a coach and mentor, I provide guidance on AI, growth strategies, and productivity, helping both individuals and teams to unlock their full potential.
            </Typography>
          </div>

          <aside className='pt-2 lg:w-72 lg:pl-8 lg:pt-0'>
            <dl className='space-y-7'>
              <div className='space-y-1.5'>
                <Typography as='dt' variant='heading-sm' className='text-lg leading-6 md:text-lg'>CTO</Typography>
                <Typography as='dd' variant='paragraph-sm'>
                  <Preview url='https://mav9.com' title='Mav9' />
                </Typography>
              </div>
              <div className='space-y-1.5'>
                <Typography as='dt' variant='heading-sm' className='text-lg leading-6 md:text-lg'>VP AI and Data</Typography>
                <Typography as='dd' variant='paragraph-sm'>
                  <Preview url='https://beamery.com' title='Beamery' />
                </Typography>
              </div>
              <div className='space-y-1.5'>
                <Typography as='dt' variant='heading-sm' className='text-lg leading-6 md:text-lg'>Research Scientist</Typography>
                <Typography as='dd' variant='paragraph-sm'>
                  <Preview url='https://sap.com' title='SAP' />
                </Typography>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className='mt-16 pt-12 sm:mt-20 sm:pt-14'>
        <div className='max-w-2xl'>
          <Typography variant='heading-xl' as='h2' className='text-3xl leading-tight sm:text-4xl'>How Can I Help?</Typography>
          <Typography variant='paragraph-md' className='mt-5 text-base leading-7 md:text-lg md:leading-8'>
            As an experienced leader in the technology and SaaS industry, I am committed to helping businesses achieve their full potential. My approach is grounded in core values of collaboration, innovation, and integrity, which guide all aspects of my work. Whether you're an individual, a startup looking to scale or an established company seeking to refine your strategy, I can provide the expertise and guidance you need to succeed.
          </Typography>
        </div>

        <Grid columns='3' gap='lg' className='mt-10'>
          {values.map((value) => (
            <section key={ value.name }>
              <div className='mb-3 text-gray-700 dark:text-gray-300'>
                <span className='inline-flex rounded-lg border border-gray-200 p-2 dark:border-gray-700'>
                  {value.icon}
                </span>
              </div>
              <Typography variant='heading-sm' as='h3' className='text-lg leading-6 md:text-lg'>
                {value.name}
              </Typography>
              <Typography variant='paragraph-sm' className='mt-2 max-w-sm'>
                {value.description}
              </Typography>
            </section>
          ))}
        </Grid>
      </section>
    </article>
  );
}
