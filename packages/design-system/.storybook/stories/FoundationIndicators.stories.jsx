import { Pill, Typography } from '../../src/index';

const statuses = [
  { 'color': 'green', 'description': 'Available, published, complete, or healthy.', 'label': 'Published', 'tone': 'bg-green-500' },
  { 'color': 'yellow', 'description': 'Draft, pending, queued, or needs review.', 'label': 'Pending', 'tone': 'bg-yellow-500' },
  { 'color': 'blue', 'description': 'Active, selected, informational, or in progress.', 'label': 'Active', 'tone': 'bg-blue-500' },
  { 'color': 'red', 'description': 'Error, failed, blocked, or needs attention.', 'label': 'Blocked', 'tone': 'bg-red-500' },
  { 'color': 'gray', 'description': 'Inactive, archived, unavailable, or neutral.', 'label': 'Inactive', 'tone': 'bg-gray-400' }
];

const StatusDot = ({ label, tone }) => (
  <span className='inline-flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-100'>
    <span className={ `h-2.5 w-2.5 rounded-full ${tone}` } aria-hidden='true' />
    <span>{label}</span>
  </span>
);

const PulsingStatusDot = ({ label, tone }) => (
  <span className='inline-flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-100'>
    <span className='relative flex h-2.5 w-2.5' aria-hidden='true'>
      <span className={ `absolute inline-flex h-full w-full rounded-full opacity-60 motion-safe:animate-ping ${tone}` } />
      <span className={ `relative inline-flex h-2.5 w-2.5 rounded-full ${tone}` } />
    </span>
    <span>{label}</span>
  </span>
);

export default {
  parameters: {
    docs: {
      description: {
        component: 'Accessible status indicators for dots, labels, pills, and compact state messaging.'
      }
    },
    layout: 'fullscreen',
    options: { 'showPanel': false }
  },
  tags: [ 'autodocs' ],
  title: 'Foundations/Indicators'
};

export const Default = {
  'name': 'Indicators',
  'render': () => (
    <div className='max-w-5xl space-y-8 p-6 text-gray-900 dark:bg-gray-950 dark:text-gray-100'>
      <section className='max-w-3xl space-y-3'>
        <Typography variant='heading-xl'>Indicators</Typography>
        <Typography variant='paragraph-lg'>
          Indicators communicate status. Text carries the meaning; color supports quick scanning.
        </Typography>
      </section>

      <section className='rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900'>
        <div className='grid grid-cols-[160px_160px_1fr] gap-4 border-b border-gray-200 bg-gray-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300'>
          <div>Dot</div>
          <div>Pill</div>
          <div>Use</div>
        </div>
        {statuses.map((status) => (
          <div key={ status.label } className='grid grid-cols-[160px_160px_1fr] gap-4 border-b border-gray-100 px-4 py-4 text-sm last:border-b-0 dark:border-gray-800'>
            <StatusDot label={ status.label } tone={ status.tone } />
            <div><Pill tone={ status.color }>{status.label}</Pill></div>
            <p className='text-gray-600 dark:text-gray-300'>{status.description}</p>
          </div>
        ))}
      </section>

      <section className='rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'>
        <Typography variant='heading-md'>Pulsing Dot</Typography>
        <p className='mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300'>
          Use only for live, active, or transient states. The pulse is decorative; the text still carries the status.
        </p>
        <div className='mt-4 flex flex-wrap gap-5'>
          <PulsingStatusDot label='Live' tone='bg-green-500' />
          <PulsingStatusDot label='Syncing' tone='bg-blue-500' />
          <PulsingStatusDot label='Needs review' tone='bg-yellow-500' />
        </div>
      </section>

      <section className='grid gap-4 md:grid-cols-3'>
        <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'>
          <Typography variant='heading-md'>Dot + Text</Typography>
          <p className='mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300'>Use for dense lists, tables, metadata rows, and compact status summaries.</p>
        </div>
        <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'>
          <Typography variant='heading-md'>Pill</Typography>
          <p className='mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300'>Use when the status is a primary scannable attribute, such as post state or release state.</p>
        </div>
        <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'>
          <Typography variant='heading-md'>Accessibility</Typography>
          <p className='mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300'>Never rely on the dot color alone. Always include visible text or an accessible label.</p>
        </div>
      </section>

      <section className='rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'>
        <Typography variant='heading-md'>Implementation Alignment</Typography>
        <p className='mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300'>
          Indicators are intentionally small: visible text plus an approved DS palette color. The reusable pill is
          <code> Pill</code> from the package; dots are lightweight status patterns for docs, tables, and metadata.
          Pulsing dots use <code>motion-safe:animate-ping</code> so reduced-motion users do not receive decorative animation.
        </p>
      </section>
    </div>
  )
};
