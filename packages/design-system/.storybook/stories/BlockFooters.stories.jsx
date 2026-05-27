import Footer from '../../src/components/content/Footer';
import { Button, Field, FieldInput, Icon, Link, Pill, Typography } from '../../src/index';

import { Page, pageParameters, Section } from './StoryDocs';

const footerLinks = {
  'About': [
    [ 'Summary', '' ],
    [ 'Publications', '' ],
    [ 'Projects', '' ]
  ],
  'Blog': [
    [ 'Engineering', '' ],
    [ 'Data', '' ],
    [ 'Productivity', '' ]
  ],
  'Social': [
    [ 'GitHub', '' ],
    [ 'LinkedIn', '' ],
    [ 'X', '' ]
  ]
};

const FooterLinkGroup = ({ links, title }) => (
  <div>
    <h3 className='text-sm font-semibold text-gray-950 dark:text-white'>{title}</h3>
    <ul className='mt-4 space-y-3'>
      {links.map(([ label, href ]) => (
        <li key={ label }>
          <Link href={ href } tone='gray' variant='muted' className='text-sm font-normal'>{label}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const CurrentFooter = () => (
  <div className='rounded-lg border border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-gray-950'>
    <Footer />
  </div>
);

const EditorialFooter = () => (
  <footer className='rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-950'>
    <div className='grid gap-10 lg:grid-cols-[1.4fr_2fr]'>
      <div>
        <Typography variant='heading-lg'>Ahmad Assaf</Typography>
        <p className='mt-3 max-w-md text-sm leading-6 text-gray-600 dark:text-gray-300'>Writing about AI, semantic systems, data products, and engineering practice.</p>
        <div className='mt-6 flex gap-3'>
          <Icon kind='github' href='' />
          <Icon kind='linkedin' href='' />
          <Icon kind='twitter' href='' />
        </div>
      </div>
      <nav className='grid gap-8 sm:grid-cols-3' aria-label='Footer navigation'>
        {Object.entries(footerLinks).map(([ title, links ]) => <FooterLinkGroup key={ title } title={ title } links={ links } />)}
      </nav>
    </div>
    <div className='mt-10 border-t border-gray-100 pt-6 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400'>
      &copy; 2026 Ahmad Assaf. All rights reserved.
    </div>
  </footer>
);

const NewsletterFooter = () => (
  <footer className='overflow-hidden rounded-lg bg-gray-950 text-white'>
    <div className='grid gap-8 p-8 lg:grid-cols-[1.2fr_1fr]'>
      <div>
        <Pill tone='blue' variant='soft'>newsletter</Pill>
        <h3 className='mt-4 text-3xl font-extrabold tracking-tight'>Notes on AI, data, and engineering systems.</h3>
        <p className='mt-3 text-sm leading-6 text-white/75'>A footer treatment for pages where subscription is the primary secondary action.</p>
      </div>
      <form className='flex flex-col gap-3 self-end sm:flex-row'>
        <Field className='flex-1'>
          <label className='sr-only' htmlFor='footer-email'>Email address</label>
          <FieldInput id='footer-email' type='email' placeholder='you@example.com' className='min-h-11 border-white/10 bg-white/10 text-white placeholder:text-white/50 focus:ring-blue-500' />
        </Field>
        <Button type='submit' tone='blue' variant='solid'>Subscribe</Button>
      </form>
    </div>
    <div className='border-t border-white/10 px-8 py-5 text-sm text-white/60'>No spam. No fake urgency. Just useful notes.</div>
  </footer>
);

const CompactFooter = () => (
  <footer className='flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950 sm:flex-row sm:items-center sm:justify-between'>
    <p className='text-sm text-gray-500 dark:text-gray-400'>&copy; 2026 Ahmad Assaf</p>
    <nav className='flex flex-wrap gap-4' aria-label='Compact footer navigation'>
      <Link href='' tone='gray' variant='muted' className='font-normal'>Blog</Link>
      <Link href='' tone='gray' variant='muted' className='font-normal'>Projects</Link>
      <Link href='' tone='gray' variant='muted' className='font-normal'>About</Link>
    </nav>
  </footer>
);

export default {
  parameters: pageParameters,
  title: 'Blocks/Footers'
};

export const Default = {
  'name': 'Footer Blocks',
  'render': () => (
    <Page
      title='Footer Blocks'
      intro='Footer compositions for the current blog footer, editorial sitemap footers, newsletter-first pages, and compact utility pages.'
      kicker='Blocks'
    >
      <Section title='Current Blog Footer' description='Uses the actual Footer component used by the blog layout.'>
        <CurrentFooter />
      </Section>
      <Section title='Editorial Footer' description='Use for content-heavy pages with sitemap navigation.'>
        <EditorialFooter />
      </Section>
      <Section title='Newsletter Footer' description='Use where the subscription action is the main footer goal.'>
        <NewsletterFooter />
      </Section>
      <Section title='Compact Footer' description='Use for focused pages with minimal navigation needs.'>
        <CompactFooter />
      </Section>
    </Page>
  )
};
