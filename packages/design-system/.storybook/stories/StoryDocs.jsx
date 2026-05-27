import { Button, Card, Typography } from '../../src/index';

import { HighlightedCode } from './HighlightedCode';

export const pageParameters = {
  'layout': 'fullscreen',
  'options': {
    'showPanel': false
  }
};

export const Page = ({ children, intro, kicker, title }) => (
  <div className='min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100'>
    <div className='mx-auto max-w-7xl space-y-14 px-6 py-8'>
      <header className='max-w-3xl space-y-4'>
        {kicker ? <div className='inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300'>{kicker}</div> : null}
        <Typography variant='heading-xl'>{title}</Typography>
        {intro ? <p className='text-sm leading-7 text-gray-600 dark:text-gray-300'>{intro}</p> : null}
      </header>
      {children}
    </div>
  </div>
);

export const Section = ({ children, description, title }) => (
  <section className='space-y-4'>
    <div className='max-w-3xl space-y-2'>
      <Typography variant='heading-lg'>{title}</Typography>
      {description ? <p className='text-sm leading-7 text-gray-600 dark:text-gray-300'>{description}</p> : null}
    </div>
    {children}
  </section>
);

export const CodeBlock = ({ code, language = 'jsx' }) => <HighlightedCode code={ code } language={ language } />;

export const InlineCode = ({ children }) => (
  <code className='rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.8em] text-gray-800 dark:bg-gray-800 dark:text-gray-100'>{children}</code>
);

export const Stat = ({ label, value }) => (
  <div className='rounded-lg border border-gray-200 bg-white p-4 text-center dark:border-gray-800 dark:bg-gray-900'>
    <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>{value}</div>
    <div className='mt-1 text-xs text-gray-500 dark:text-gray-400'>{label}</div>
  </div>
);

export const PrincipleCard = ({ description, number, title }) => (
  <div className='space-y-3 rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900'>
    <div className='flex items-center gap-3'>
      <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300'>{number}</span>
      <h3 className='text-sm font-bold text-gray-900 dark:text-white'>{title}</h3>
    </div>
    <p className='text-xs leading-6 text-gray-600 dark:text-gray-300'>{description}</p>
  </div>
);

export const QuickLink = ({ description, storyId, title }) => (
  <a
    href={ `?path=/story/${storyId}` }
    className='block rounded-lg border border-gray-200 bg-white p-4 text-left transition-colors hover:border-blue-300 hover:no-underline dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-700'
  >
    <p className='mb-1 text-sm font-semibold text-gray-950 dark:text-white'>{title}</p>
    <p className='text-xs leading-5 text-gray-500 dark:text-gray-400'>{description}</p>
  </a>
);

export const Badge = ({ children, tone = 'gray' }) => {
  const tones = {
    'blue': 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
    'gray': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    'green': 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300',
    'red': 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300',
    'yellow': 'bg-yellow-50 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300'
  };

  return <span className={ `inline-flex rounded px-2 py-0.5 text-[11px] font-semibold ${tones[tone] || tones.gray}` }>{children}</span>;
};

export const Table = ({ children }) => (
  <div className='overflow-x-auto rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900'>
    <table className='w-full min-w-[720px] border-collapse text-left'>{children}</table>
  </div>
);

export const Th = ({ children }) => (
  <th scope='col' className='border-b border-gray-200 bg-gray-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300'>{children}</th>
);

export const Td = ({ children, mono = false }) => (
  <td className={ `border-b border-gray-100 px-4 py-3 text-xs leading-6 text-gray-600 last:border-b-0 dark:border-gray-800 dark:text-gray-300 ${mono ? 'font-mono text-blue-600 dark:text-blue-300' : ''}` }>{children}</td>
);

export const CheckList = ({ items }) => (
  <ul className='grid gap-2'>
    {items.map((item) => (
      <li key={ item } className='flex items-start gap-2 text-xs leading-6 text-gray-600 dark:text-gray-300'>
        <span className='mt-1 text-green-600 dark:text-green-400' aria-hidden='true'>✓</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export const CommandButton = ({ children }) => (
  <Button variant='outline' tone='gray' size='sm' as='button' type='button'>{children}</Button>
);

export const DocCard = Card;
