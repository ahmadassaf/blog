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

import { Card, Grid, Icon, Typography } from '@gaudi/design-system';
import { Preview } from '@gaudi/design-system/mdx';

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
      'description': 'Offering personalized mentorship to emerging leaders and teams, fostering growth and development',
      'icon': <Icon name='HandshakeLine' decorative />,
      'name': 'Mentorship'
    },
    {
      'description': 'Asisting in scaling operations and accelerating growth through proven strategies and industry insights',
      'icon': <Icon name='ChartArea' decorative />,
      'name': 'Scaling and Growth'
    },
    {
      'description': 'Leading technical teams with a focus on innovation, efficiency, and achieving business goals',
      'icon': <Icon name='Cubes' decorative />,
      'name': 'Technical Leadership'
    },
    {
      'description': 'Developing and implementing robust technical strategies that align with your business objectives and drive competitive advantage',
      'icon': <Icon name='Codepen' decorative />,
      'name': 'Technical Strategy'
    },
    {
      'description': 'Conducting thorough assessments of AI and technology systems to ensure they meet industry standards and support business growth, while identifying potential risks and opportunities',
      'icon': <Icon name='Robot' decorative />,
      'name': 'AI and Tech Due Diligence'
    }
  ];

  return (
    <div>

      <main className='isolate'>

        <div className='relative isolate -z-10 max-md:hidden'>
          <svg aria-hidden='true' className='absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 max-lg:stroke-gray-200/20 dark:stroke-gray-800 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]'>
            <defs>
              <pattern x='50%' y={ -1 } id='1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84' width={ 200 } height={ 200 } patternUnits='userSpaceOnUse'>
                <path d='M.5 200V.5H200' fill='none' />
              </pattern>
            </defs>
            <svg x='50%' y={ -1 } className='overflow-visible fill-blue-100 dark:fill-gray-800 max-lg:hidden'>
              <path d='M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z' strokeWidth={ 0 } />
            </svg>
            <rect fill='url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)' width='100%' height='100%' strokeWidth={ 0 } />
          </svg>
          <div
            aria-hidden='true'
            className='absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48'
          >
            <div
              style={{
                'clipPath':
                  'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)'
              }}
              className='aspect-801/1036 w-[50.0625rem] bg-linear-to-tr from-blue-300 to-indigo-300 opacity-30'
            />
          </div>
          <div className='overflow-hidden'>
            <div className='pb-32 pt-8'>
              <div className='max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center'>
                <div className='w-full max-w-xl lg:shrink-0 xl:max-w-2xl'>
                  <Typography variant='title-xl'>
                    Artificial Intelligence Leader, Advisor and Mentor
                  </Typography>
                  <Typography variant='paragraph-lg' className='relative mt-6 sm:max-w-md lg:max-w-none'>
                   Ahmad is CTO at Mav9 and a seasoned AI and data leader with more than a decade of experience scaling SaaS and technology businesses across engineering, data, and AI. He has a proven track record in engineering leadership, encompassing engineering operations, innovation strategy, and product development.
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-12 sm:mt-0 xl:-mt-8'>
          <div className='max-w-2xl lg:mx-0 lg:max-w-none'>
            <Typography variant='heading-xl' as='h2'>A Brief History</Typography>
            <div className='mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row'>
              <div className='lg:w-full lg:max-w-2xl lg:flex-auto'>
                <Typography variant='paragraph-lg'>
                I am currently CTO at <Preview url='https://mav9.com' title='Mav9' />, where I lead technology strategy across AI, data, knowledge graphs, and product engineering. Before Mav9, as a founding engineer at <Preview url='https://beamery.com' title='Beamery' />, I had the unique opportunity to shape the company's technological journey from its inception. Starting with a hands-on approach, I transitioned into leadership roles, serving as Head of Engineering and VP of AI and Data, building the AI and Data Science functions at the core of Beamery's R&D and innovation efforts.
                </Typography>
                <div className='mt-10 max-w-xl text-base leading-7 text-gray-700 dark:text-white'>
                  <Typography variant='paragraph-md'>
                  As a continuous learner, I love working in collaborative environments, tackling challenging problems with my team and providing strategic leadership to achieve product-market fit and growth. I have vast expertise at aligning technology with business objectives and effectively communicating transformative and innovative strategies to the market.
                  </Typography>
                  <Typography variant='paragraph-md' className='mt-10'>
                  In addition to my technical and leadership roles, I am deeply committed to fostering a culture of growth and continuous learning. As a coach and mentor, I provide guidance on AI, growth strategies, and productivity, helping both individuals and teams to unlock their full potential.
                  </Typography>
                </div>
              </div>
              <div className='lg:flex lg:flex-auto lg:justify-center'>
                <dl className='w-auto space-y-6 xl:w-72'>
                  <div className='flex flex-col-reverse gap-y-4'>
                    <dt className='text-base leading-7 text-gray-600 dark:text-gray-300'>
                      <Preview url='https://mav9.com' title='Mav9' className='text-lg'/>
                    </dt>
                    <Typography as='dd' variant='heading-sm'>CTO</Typography>
                  </div>
                  <div className='flex flex-col-reverse gap-y-4'>
                    <dt className='text-base leading-7 text-gray-600 dark:text-gray-300'>
                      <Preview url='https://beamery.com' title='Beamery' className='text-lg'/>
                    </dt>
                    <Typography as='dd' variant='heading-sm'>VP AI and Data</Typography>
                  </div>
                  <div className='flex flex-col-reverse gap-y-4'>
                    <dt className='text-base leading-7 text-gray-600 dark:text-gray-300'>
                      <Preview url='https://sap.com' title='SAP' className='text-lg' />
                    </dt>
                    <Typography as='dd' variant='heading-sm'>Research Scientist</Typography>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-32 sm:mt-40 py-2'>
          <div className='max-w-2xl lg:mx-0'>
            <Typography variant='heading-xl' as='h2'>How Can I Help?</Typography>
            <Typography variant='paragraph-lg' className='mt-6'>
            As an experienced leader in the technology and SaaS industry, I am committed to helping businesses achieve their full potential. My approach is grounded in core values of collaboration, innovation, and integrity, which guide all aspects of my work. Whether you're an individual, a startup looking to scale or an established company seeking to refine your strategy, I can provide the expertise and guidance you need to succeed.
            </Typography>
          </div>
          <Grid columns='3' gap='lg' className='my-16 max-w-2xl lg:mx-0 lg:max-w-none'>
            {values.map((value) => (
              <Card
                key={ value.name }
                title={ (
                  <>
                    {value.icon}
                    {value.name}
                  </>
                ) }
                subtitle={ value.description }
                variant='flat'
                padding='none'
                classNames={{
                  'body': 'space-y-2',
                  'subtitle': 'text-base',
                  'title': 'flex items-center gap-2 text-xl'
                }}
              />
            ))}
          </Grid>
        </div>
      </main>
    </div>
  );
}
