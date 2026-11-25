/**
 * About Page Component
 *
 * @description Main about page showcasing professional background, experience,
 * and speaking topics. Features responsive design with hero section, career history,
 * and service offerings.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { Icon, Link, Typography } from '@gaudi/design-system';
import Preview from '@gaudi/design-system/mdx/Preview';

import { metadataGenerator } from '@/data/meta/generator/blog';
import siteMetadata from '@/data/meta/metadata';
import PageBackdrop from '@/layouts/PageBackdrop';

export const metadata = metadataGenerator({
  'description': "I'm Ahmad Assaf, CTO at Mav9. I write and speak about AI, knowledge graphs, engineering leadership, and building teams.",
  'path': '/about',
  'title': 'About'
});

/**
 * About page component displaying professional background and speaking topics
 *
 * @returns {JSX.Element} Complete about page with hero section, history, and speaking topics
 *
 * @example
 * // Rendered at /about route
 * <About />
 */
export default function About() {

  const values = [
    {
      'description': 'Where AI is useful in a product, how a team adopts it, and what still needs a person to judge.',
      'icon': <Icon name='ChessKnight' decorative />,
      'name': 'AI in Products and Teams'
    },
    {
      'description': 'RDF, the Semantic Web, and data quality, from research to systems running in production.',
      'icon': <Icon name='HandshakeLine' decorative />,
      'name': 'Knowledge Graphs and Data'
    },
    {
      'description': 'Hiring a first team, trust and ownership, and what changes between founding engineer and CTO.',
      'icon': <Icon name='ChartArea' decorative />,
      'name': 'Engineering Leadership'
    },
    {
      'description': 'Ten years from sixth employee to co-founder: growth, layoffs, equity, and starting again.',
      'icon': <Icon name='Cubes' decorative />,
      'name': 'Startups from the Inside'
    },
    {
      'description': 'Planning with a small team, keeping work visible, and deciding what to leave out.',
      'icon': <Icon name='Codepen' decorative />,
      'name': 'Planning and Delivery'
    },
    {
      'description': 'How review, release, and ownership change when most code is written with an assistant.',
      'icon': <Icon name='Robot' decorative />,
      'name': 'AI-Assisted Engineering'
    }
  ];

  return (
    <article className='about-grid relative isolate mx-auto max-w-6xl pb-6'>
      <PageBackdrop className='about-backdrop' intensity={ 0.6 }>
        <header className='about-intro pt-5 sm:pt-8'>
          <div>
            <Typography variant='title-xl' className='wrap-anywhere text-4xl leading-[1.05] sm:text-5xl md:text-6xl md:leading-[1.02] lg:text-6xl'>
              CTO, AI &amp; Engineering Leader
            </Typography>
            <Typography variant='paragraph-md' className='mt-5 max-w-[68ch] text-pretty'>
              I'm Ahmad Assaf, CTO at Mav9. I've spent more than a decade building and scaling SaaS businesses across engineering, data, and AI. My work spans technology strategy, engineering leadership, and product development.
            </Typography>
            <Typography variant='paragraph-md' className='mt-4 max-w-[68ch] text-pretty'>
              My full-time work is building Mav9. I write about what I learn along the way, and I'm glad to speak at events or join a panel or a podcast.
            </Typography>
            <Link href='#speaking' tone='blue' className='mt-6 inline-flex min-h-11 max-w-full items-center gap-2'>
              Invite me to speak
              <Icon name='ArrowRight' decorative size='xs' />
            </Link>
          </div>
        </header>
      </PageBackdrop>

      <section className='pt-16 sm:pt-20'>
        <Typography variant='heading-lg' as='h2'>A Brief History</Typography>
        <div className='mt-6 flex flex-col gap-8 lg:flex-row lg:gap-16'>
          <div className='max-w-[68ch] flex-1 space-y-6'>
            <Typography variant='paragraph-md'>
              At <Preview url='https://mav9.com' title='Mav9' />, I lead AI strategy and engineering as CTO. I hired our initial team, bringing together people I'd worked with before, and helped shape a product built around data and knowledge graphs. As we grow, I focus on where AI can be useful and on giving people clear priorities, ownership, and room to develop.
            </Typography>
            <Typography variant='paragraph-md'>
              I joined <Preview url='https://beamery.com' title='Beamery' /> in 2015 as its sixth employee and one of its founding engineers. Over the next decade, I became Head of Engineering and then VP of AI and Data, building and scaling the AI and Data Science teams as the company grew to more than four hundred people. That work took me from writing code and exploring research questions to leading teams that brought machine learning into the product.
            </Typography>
            <Typography variant='paragraph-md'>
              Earlier, I worked in applied research and business intelligence at <Preview url='https://www.sap.com' title='SAP Labs' /> while completing my PhD in Semantic Web and Information Retrieval at <Preview url='https://www.telecom-paris.fr/' title='Télécom ParisTech' />. My research explored how to help people find relevant data, assess its quality, and use it in their own reports. That included work on data integration, dataset profiles, and tools for evaluating linked data quality.
            </Typography>
          </div>

          <div className='pt-2 lg:w-72 lg:pl-8 lg:pt-0'>
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
                  <Preview url='https://www.sap.com' title='SAP' />
                </Typography>
              </div>
              <div className='space-y-1.5'>
                <Typography as='dt' variant='heading-sm'>PhD</Typography>
                <Typography as='dd' variant='paragraph-sm'>
                  Semantic Web and Information Retrieval
                </Typography>
                <Typography as='dd' variant='paragraph-sm'>
                  <Preview url='https://www.telecom-paris.fr/' title='Télécom ParisTech' />
                </Typography>
              </div>
              <div className='space-y-1.5'>
                <Typography as='dt' variant='heading-sm'>MSc</Typography>
                <Typography as='dd' variant='paragraph-sm'>
                  Advanced Software Engineering
                </Typography>
                <Typography as='dd' variant='paragraph-sm'>
                  <Preview url='https://www.st-andrews.ac.uk/' title='University of St Andrews' />
                </Typography>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section id='speaking' aria-labelledby='speaking-heading' className='scroll-mt-24 pt-16 sm:pt-20'>
        <div>
          <Typography variant='heading-lg' as='h2' id='speaking-heading' className='wrap-anywhere'>Speaking and Conversations</Typography>
          <Typography variant='paragraph-md' className='mt-5 max-w-[68ch] text-pretty'>
            I'm open to conference and meetup talks, panels, podcasts, and guest lectures. Tell me about the event and its audience, and we can find a topic that fits. These are the subjects I know best.
          </Typography>
          <Link href={ `mailto:${siteMetadata.email}` } tone='blue' className='mt-5 inline-flex min-h-11 max-w-full items-center gap-2'>
            Get in touch about a talk
            <Icon name='ArrowRight' decorative size='xs' />
          </Link>
        </div>

        <div className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {values.map((value) => (
            <section key={ value.name }>
              <div className='flex items-center gap-3'>
                <span className='inline-flex shrink-0 text-text-muted'>{value.icon}</span>
                <Typography variant='heading-sm' as='h3' className='min-w-0'>
                  {value.name}
                </Typography>
              </div>
              <Typography variant='paragraph-sm' className='mt-2'>
                {value.description}
              </Typography>
            </section>
          ))}
        </div>
      </section>
    </article>
  );
}
