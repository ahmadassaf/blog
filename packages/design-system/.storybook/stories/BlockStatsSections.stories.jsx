import { Card, Icon, Pill, Typography } from '../../src/index';

import { Page, pageParameters, Section } from './StoryDocs';

const metricStats = [
  [ '86', 'component contracts', 'Folder-level ownership checks across the Gaudi package.' ],
  [ '7', 'token families', 'Gray, neutral, blue, green, yellow, red, and indigo.' ],
  [ '0', 'local component dirs', 'Reusable UI now resolves from the Gaudi package.' ]
];

const changelog = [
  [ 'May 2026', 'Gaudi package boundary', 'Components, tokens, icons, docs, and Storybook share one package surface.' ],
  [ 'May 2026', 'Primitive API cleanup', 'Button, Pill, Card, Avatar, Carousel, and Terminal expose named customization props.' ],
  [ 'May 2026', 'A11y documentation pass', 'Overview docs now describe screen reader, keyboard, contrast, and testing expectations.' ]
];

const healthStats = [
  { 'change': '+18', 'label': 'documented stories', 'tone': 'green', 'value': '142' },
  { 'change': '+2', 'label': 'new Core components', 'tone': 'blue', 'value': '2' },
  { 'change': '0', 'label': 'fake links', 'tone': 'gray', 'value': '0' },
  { 'change': 'AA', 'label': 'contrast target', 'tone': 'indigo', 'value': '4.5:1' }
];

const toneClasses = {
  'blue': 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  'gray': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  'green': 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300',
  'indigo': 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
};

const MetricGrid = () => (
  <div className='grid gap-px overflow-hidden rounded-lg border border-gray-200 bg-gray-200 dark:border-gray-800 dark:bg-gray-800 md:grid-cols-3'>
    {metricStats.map(([ value, label, description ]) => (
      <div key={ label } className='bg-white p-6 dark:bg-gray-950'>
        <dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>{label}</dt>
        <dd className='mt-3 text-4xl font-extrabold tracking-tight text-gray-950 dark:text-white'>{value}</dd>
        <p className='mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300'>{description}</p>
      </div>
    ))}
  </div>
);

const ChangelogStats = () => (
  <div className='overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950'>
    {changelog.map(([ date, title, body ], index) => (
      <article key={ title } className='grid gap-4 border-b border-gray-100 p-5 last:border-b-0 dark:border-gray-800 md:grid-cols-[9rem_1fr]'>
        <time className='text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400'>{date}</time>
        <div>
          <div className='flex flex-wrap items-center gap-2'>
            <Typography variant='heading-sm'>{title}</Typography>
            {index === 0 ? <Pill size='xs' tone='green' variant='soft'>current</Pill> : null}
          </div>
          <p className='mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300'>{body}</p>
        </div>
      </article>
    ))}
  </div>
);

const GradientStats = () => (
  <section className='overflow-hidden rounded-lg bg-gray-950 p-8 text-white'>
    <div className='max-w-2xl'>
      <Pill tone='blue' variant='soft'>system health</Pill>
      <h3 className='mt-4 text-3xl font-extrabold tracking-tight'>Design-system coverage without local overrides.</h3>
      <p className='mt-3 text-sm leading-6 text-white/80'>Use this treatment when numbers need to anchor a release note, migration recap, or quality report.</p>
    </div>
    <div className='mt-8 grid gap-4 md:grid-cols-4'>
      {healthStats.map((item) => (
        <Card key={ item.label } variant='flat' className='border-white/10 bg-white/5 text-white'>
          <div className='flex items-start justify-between gap-4'>
            <div>
              <p className='text-3xl font-extrabold tracking-tight'>{item.value}</p>
              <p className='mt-2 text-xs leading-5 text-white/70'>{item.label}</p>
            </div>
            <span className={ `rounded px-2 py-1 text-xs font-semibold ${toneClasses[item.tone]}` }>{item.change}</span>
          </div>
        </Card>
      ))}
    </div>
  </section>
);

const CompactStats = () => (
  <div className='grid gap-4 md:grid-cols-3'>
    {metricStats.map(([ value, label, description ]) => (
      <div key={ label } className='flex gap-4 rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950'>
        <Icon name='Check' decorative className='mt-1 text-green-600 dark:text-green-400' />
        <div>
          <p className='text-2xl font-bold text-gray-950 dark:text-white'>{value}</p>
          <p className='text-sm font-semibold text-gray-800 dark:text-gray-100'>{label}</p>
          <p className='mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400'>{description}</p>
        </div>
      </div>
    ))}
  </div>
);

export default {
  parameters: pageParameters,
  title: 'Blocks/Stats Sections'
};

export const Default = {
  'name': 'Stats Sections',
  'render': () => (
    <Page
      title='Stats Sections'
      intro='Composable stats blocks for release notes, migration summaries, system-health snapshots, and compact editorial metrics.'
      kicker='Blocks'
    >
      <Section title='Metric Grid' description='Use for clear top-level Gaudi or blog metrics.'>
        <MetricGrid />
      </Section>
      <Section title='Changelog Stats' description='Use when the numbers are attached to release history.'>
        <ChangelogStats />
      </Section>
      <Section title='Dark Summary' description='Use sparingly for high-contrast summary panels.'>
        <GradientStats />
      </Section>
      <Section title='Compact Inline Stats' description='Use inside docs pages where space is limited.'>
        <CompactStats />
      </Section>
    </Page>
  )
};
