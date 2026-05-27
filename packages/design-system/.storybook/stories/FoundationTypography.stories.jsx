import { useEffect, useRef, useState } from 'react';

import { Typography, typography, typographyVariants } from '../../src/index';

import { HighlightedCode } from './HighlightedCode';

const groups = [
  { 'label': 'Blog Posts', 'variants': [ 'post-title', 'post-subtitle', 'post-meta', 'prose-lead', 'paragraph-lg', 'paragraph-md' ] },
  { 'label': 'Headings', 'variants': [ 'heading-xl', 'heading-lg', 'heading-md', 'heading-sm' ] },
  { 'label': 'Display', 'variants': [ 'display-xl', 'display-lg', 'title-xl', 'title-lg', 'title-md' ] },
  { 'label': 'People & Cards', 'variants': [ 'author-name', 'author-role', 'card-title', 'card-subtitle', 'metadata', 'error-title' ] },
  { 'label': 'Supporting Text', 'variants': [ 'paragraph-sm', 'subtitle-xl', 'subtitle-lg', 'subtitle-md' ] }
];

const sampleText = {
  'author-name': 'Ahmad Assaf',
  'author-role': 'AI, data, and knowledge graph engineering',
  'card-subtitle': 'Compact supporting text for cards and previews.',
  'card-title': 'Design-system notes',
  'display-lg': 'Editorial systems need rhythm.',
  'display-xl': 'A blog should feel calm and readable.',
  'error-title': '404',
  'heading-lg': 'Section heading',
  'heading-md': 'Subsection heading',
  'heading-sm': 'Small heading',
  'heading-xl': 'Readable hierarchy for long-form writing',
  'metadata': 'Engineering / 8 min read',
  'paragraph-lg': 'Large body copy works for introductions and article summaries without becoming a marketing headline.',
  'paragraph-md': 'Default body text is tuned for blog posts: comfortable line-height, restrained measure, and predictable color in light and dark themes.',
  'paragraph-sm': 'Small supporting text for captions, descriptions, and metadata-adjacent copy.',
  'post-meta': 'May 20, 2026 · 8 min read',
  'post-subtitle': 'A supporting deck that gives context without overpowering the article title.',
  'post-title': 'Design systems keep editorial rhythm predictable',
  'prose-lead': 'A lead paragraph sets up the article with a slightly larger size, generous line-height, and readable contrast.',
  'subtitle-lg': 'Large supporting heading',
  'subtitle-md': 'Medium supporting heading',
  'subtitle-xl': 'Prominent supporting heading',
  'title-lg': 'Practical components for writing',
  'title-md': 'A compact page title',
  'title-xl': 'A stronger editorial title'
};

const copyWithTextArea = (value) => {
  const textarea = document.createElement('textarea');

  textarea.value = value;
  textarea.setAttribute('readonly', '');
  textarea.style.left = '-9999px';
  textarea.style.position = 'fixed';
  textarea.style.top = '0';

  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand('copy');
  } finally {
    document.body.removeChild(textarea);
  }
};

const Copyable = ({ children, className = '', label, value }) => {
  const [ copied, setCopied ] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const handleCopy = async() => {
    if (navigator.clipboard?.writeText)
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        copyWithTextArea(value);
      }
    else
      copyWithTextArea(value);

    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button
      type='button'
      className={ `group relative cursor-copy rounded-md text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950 ${className}` }
      aria-label={ `Copy ${label}` }
      title={ `Copy ${label}` }
      onClick={ handleCopy }
    >
      {children}
      <span className={ `pointer-events-none absolute right-2 top-2 rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-gray-600 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 ${copied ? 'opacity-100' : 'opacity-0'}` }>
        {copied ? 'Copied' : 'Copy'}
      </span>
    </button>
  );
};

const VariantPreview = ({ variant }) => {
  const config = typographyVariants[variant];
  const copyValue = `variant: ${variant}\nelement: ${config.element}\nclassName: ${config.className}`;

  return (
    <Copyable value={ copyValue } label={ `${variant} typography token` } className='block w-full rounded-none p-4 hover:bg-gray-50 dark:hover:bg-gray-800/60'>
      <div className='grid gap-4 lg:grid-cols-[180px_minmax(0,1fr)]'>
        <div>
          <div className='font-mono text-xs font-semibold text-gray-700 dark:text-gray-300'>{variant}</div>
          <div className='mt-1 font-mono text-[11px] text-gray-500'>{config.element}</div>
        </div>
        <div className='min-w-0 overflow-hidden'>
          <Typography variant={ variant }>
            {sampleText[variant] || 'The design system keeps editorial rhythm predictable.'}
          </Typography>
        </div>
      </div>
    </Copyable>
  );
};

const TokenCard = ({ children, label, value }) => (
  <Copyable value={ value } label={ label } className='block h-full w-full rounded-md border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900'>
    {children}
  </Copyable>
);

const TokenLine = ({ label, value }) => (
  <div className='rounded-md bg-gray-50 px-3 py-2 dark:bg-gray-800'>
    <div className='font-mono text-[11px] font-semibold text-gray-500 dark:text-gray-400'>{label}</div>
    <div className='mt-1 break-words font-mono text-xs leading-5 text-gray-700 dark:text-gray-200'>{value}</div>
  </div>
);

const apiProps = [
  [ 'variant', 'keyof typographyVariants', 'paragraph-md', 'Chooses the editorial, prose, metadata, card, or display style.' ],
  [ 'as', 'ElementType', 'variant.element', 'Overrides the semantic element while keeping the selected typography style.' ],
  [ 'className', 'string', '-', 'Appended with cn for layout spacing or minor contextual adjustments.' ],
  [ 'children', 'ReactNode', '-', 'The visible text or inline content rendered inside the element.' ]
];

const exportedApis = [
  [ 'Typography', 'React component used by blog posts, cards, metadata, and Gaudi examples.' ],
  [ 'typographyVariants', 'Variant map containing each element and className contract.' ],
  [ 'TypographyVariants', 'Backwards-compatible alias for typographyVariants.' ],
  [ 'typography', 'Token object for font family and line-height values.' ]
];

export default {
  tags: [ '!autodocs' ],
  title: 'Overview/Typography'
};

export const Default = {
  'render': () => (
    <div className='max-w-6xl space-y-10 p-6 text-gray-900 dark:bg-gray-950 dark:text-gray-100'>
      <section className='max-w-3xl space-y-3'>
        <Typography variant='heading-xl'>Typography</Typography>
        <Typography variant='paragraph-lg'>
          The Gaudi typography scale is optimized for blog posts first: readable titles, calm subtitles, generous prose line-height, metadata that stays quiet, and compact UI text for cards.
        </Typography>
      </section>

      <section className='grid gap-4 lg:grid-cols-3'>
        <TokenCard label='sans font family' value={ typography.fontFamily.sans.join(', ') }>
          <div className='mb-4 font-semibold'>Sans</div>
          <div className='space-y-2'>
            {typography.fontFamily.sans.map((font) => (
              <TokenLine key={ font } label='font' value={ font } />
            ))}
          </div>
        </TokenCard>
        <TokenCard label='mono font family' value={ typography.fontFamily.mono.join(', ') }>
          <div className='mb-4 font-semibold'>Mono</div>
          <div className='space-y-2'>
            {typography.fontFamily.mono.map((font) => (
              <TokenLine key={ font } label='font' value={ font } />
            ))}
          </div>
        </TokenCard>
        <TokenCard label='line height tokens' value={ JSON.stringify(typography.lineHeight, null, 2) }>
          <div className='mb-4 font-semibold'>Line Height</div>
          <div className='space-y-2'>
            {Object.entries(typography.lineHeight).map(([ name, value ]) => (
              <TokenLine key={ name } label={ name } value={ value } />
            ))}
          </div>
        </TokenCard>
      </section>

      <section className='rounded-md border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900 md:p-8'>
        <div className='mb-8 max-w-3xl space-y-4'>
          <Typography variant='metadata'>Blog Post Composition</Typography>
          <Typography variant='post-title'>Design systems keep editorial rhythm predictable</Typography>
          <Typography variant='post-subtitle'>A focused typography stack makes articles easier to scan, read, and maintain across every post template.</Typography>
          <Typography variant='post-meta'>May 20, 2026 · 8 min read · Design Systems</Typography>
        </div>
        <div className='max-w-3xl space-y-6'>
          <Typography variant='prose-lead'>This is the lead paragraph pattern for article introductions. It should feel editorial, not oversized.</Typography>
          <Typography variant='paragraph-md'>The default paragraph rhythm uses a comfortable line-height for long-form reading. It is intentionally quieter than headings and works well with MDX prose.</Typography>
        </div>
      </section>

      {groups.map((group) => (
        <section key={ group.label } className='space-y-3'>
          <Typography variant='heading-lg'>{group.label}</Typography>
          <div className='divide-y divide-gray-200 overflow-hidden rounded-md border border-gray-200 bg-white dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900'>
            {group.variants.filter((variant) => typographyVariants[variant]).map((variant) => (
              <VariantPreview key={ variant } variant={ variant } />
            ))}
          </div>
        </section>
      ))}

      <section className='space-y-6 rounded-md border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900'>
        <div className='max-w-3xl space-y-3'>
          <Typography variant='heading-lg'>Typography Component API</Typography>
          <Typography variant='paragraph-md'>
            Typography is documented as a foundation because it defines the blog reading system. The importable primitive remains the public rendering API, and this page is the single Storybook source for its variants, tokens, usage, and accessibility expectations.
          </Typography>
        </div>

        <div className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]'>
          <HighlightedCode
            language='jsx'
            code={ `import { Typography, typographyVariants } from '@gaudi/design-system';

<Typography variant='heading-xl'>
  Design systems make product code boring in the right way.
</Typography>

<Typography as='p' variant='paragraph-lg'>
  Reusable typography variants keep headings, prose, and metadata consistent across the blog.
</Typography>` }
          />

          <div className='space-y-4'>
            <div className='rounded-md border border-gray-200 dark:border-gray-700'>
              <div className='border-b border-gray-200 px-4 py-3 text-xs font-semibold uppercase text-gray-500 dark:border-gray-700 dark:text-gray-400'>
                Exports
              </div>
              <div className='divide-y divide-gray-200 dark:divide-gray-700'>
                {exportedApis.map(([ name, description ]) => (
                  <Copyable key={ name } value={ name } label={ `${name} export` } className='block w-full rounded-none px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/60'>
                    <div className='font-mono text-xs font-semibold text-gray-900 dark:text-gray-100'>{name}</div>
                    <div className='mt-1 text-xs leading-5 text-gray-600 dark:text-gray-300'>{description}</div>
                  </Copyable>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='overflow-hidden rounded-md border border-gray-200 dark:border-gray-700'>
          <table className='w-full border-collapse text-left text-sm'>
            <thead className='bg-gray-50 text-xs uppercase text-gray-500 dark:bg-gray-800 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-4 py-3 font-semibold'>Prop</th>
                <th scope='col' className='px-4 py-3 font-semibold'>Type</th>
                <th scope='col' className='px-4 py-3 font-semibold'>Default</th>
                <th scope='col' className='px-4 py-3 font-semibold'>Contract</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
              {apiProps.map(([ name, type, defaultValue, description ]) => (
                <tr key={ name }>
                  <td className='px-4 py-3 font-mono text-xs font-semibold text-gray-900 dark:text-gray-100'>{name}</td>
                  <td className='px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-300'>{type}</td>
                  <td className='px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-300'>{defaultValue}</td>
                  <td className='px-4 py-3 text-xs leading-5 text-gray-600 dark:text-gray-300'>{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className='rounded-md border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900'>
        <Typography variant='heading-lg'>Implementation Alignment</Typography>
        <div className='mt-4 grid gap-4 text-sm leading-7 text-gray-600 dark:text-gray-300 md:grid-cols-2'>
          <div>
            Typography variants on this page render through the exported <code>Typography</code> component and
            <code>typographyVariants</code> object. Blog post titles, subtitles, metadata, author headers, cards, and
            long-form prose should use those variants instead of one-off heading styles.
          </div>
          <div>
            Font families and line-height tokens come from <code>packages/design-system/src/tokens/index.js</code>
            and are mirrored through the Gaudi Tailwind preset and CSS variables.
          </div>
        </div>
      </section>
    </div>
  )
};
