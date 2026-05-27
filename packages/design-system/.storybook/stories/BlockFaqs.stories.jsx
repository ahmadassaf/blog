import Faq from '../../src/components/mdx/Faq';
import { Card, Icon, Link, Pill, Typography } from '../../src/index';

import { Page, pageParameters, Section } from './StoryDocs';

const questions = [
  {
    'answer': 'Reusable UI belongs in the Gaudi package with colocated styles, stories, and contract tests. Route-only composition can stay app-specific.',
    'question': 'What belongs in the design system?'
  },
  {
    'answer': 'Use the package exports first. Add root className or documented classNames slots only when a consuming surface needs layout-specific adjustment.',
    'question': 'How should blog pages customize components?'
  },
  {
    'answer': 'Every public component should have a realistic story, concise docs, keyboard-accessible behavior, and no hidden dependency on global override CSS.',
    'question': 'What makes a component ready for use?'
  },
  {
    'answer': 'Foundations define colors, typography, icons, indicators, and accessibility expectations. Components should consume those contracts rather than inventing local values.',
    'question': 'Where do tokens and accessibility rules live?'
  }
];

const columns = [
  [ 'Component ownership', 'Move reusable UI into package folders with stories and tests.' ],
  [ 'Styling contract', 'Prefer variants, className, and documented classNames slots.' ],
  [ 'Docs quality', 'Examples must match the component being documented.' ],
  [ 'Accessibility', 'Native elements, visible focus, readable contrast, and useful labels.' ]
];

const AccordionFaq = () => (
  <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950'>
    <Faq questions={ questions } />
  </div>
);

const GridFaq = () => (
  <div className='grid gap-px overflow-hidden rounded-lg border border-gray-200 bg-gray-200 dark:border-gray-800 dark:bg-gray-800 md:grid-cols-2'>
    {questions.map((item) => (
      <article key={ item.question } className='bg-white p-6 dark:bg-gray-950'>
        <Typography variant='heading-sm'>{item.question}</Typography>
        <p className='mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300'>{item.answer}</p>
      </article>
    ))}
  </div>
);

const SidebarFaq = () => (
  <div className='grid gap-8 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950 lg:grid-cols-[18rem_1fr]'>
    <aside>
      <Pill tone='blue' variant='soft'>help</Pill>
      <Typography variant='heading-lg' className='mt-4'>Design-system questions</Typography>
      <p className='mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300'>Use this layout when the FAQ needs supporting context or a contact path.</p>
      <Link href='' className='mt-4 inline-flex items-center gap-2' variant='inline'>
        Ask a question
        <Icon name='ArrowRight' decorative size='sm' />
      </Link>
    </aside>
    <div className='divide-y divide-gray-100 dark:divide-gray-800'>
      {questions.map((item) => (
        <details key={ item.question } className='group py-4 first:pt-0 last:pb-0'>
          <summary className='flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-gray-950 dark:text-white'>
            {item.question}
            <Icon name='ChevronDown' decorative className='transition-transform group-open:rotate-180' />
          </summary>
          <p className='mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300'>{item.answer}</p>
        </details>
      ))}
    </div>
  </div>
);

const CardsFaq = () => (
  <div className='grid gap-4 md:grid-cols-4'>
    {columns.map(([ title, body ]) => (
      <Card key={ title } variant='outline'>
        <Icon name='Info' decorative className='text-blue-600 dark:text-blue-400' />
        <Typography variant='heading-sm' className='mt-4'>{title}</Typography>
        <p className='mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300'>{body}</p>
      </Card>
    ))}
  </div>
);

export default {
  parameters: pageParameters,
  title: 'Blocks/FAQs'
};

export const Default = {
  'name': 'FAQ Blocks',
  'render': () => (
    <Page
      title='FAQ Blocks'
      intro='FAQ patterns for docs, content pages, and support sections. The examples use Gaudi typography, cards, icons, and the existing MDX FAQ component.'
      kicker='Blocks'
    >
      <Section title='Accordion FAQ' description='Use when users are scanning a compact list of questions.'>
        <AccordionFaq />
      </Section>
      <Section title='Grid FAQ' description='Use when all answers should be visible at once.'>
        <GridFaq />
      </Section>
      <Section title='FAQ With Sidebar' description='Use when an FAQ needs a contact path or framing copy.'>
        <SidebarFaq />
      </Section>
      <Section title='FAQ Cards' description='Use for short policy or component-author guidance.'>
        <CardsFaq />
      </Section>
    </Page>
  )
};
