import { useEffect, useRef, useState } from 'react';

import { colors, radii, shadows, tokens, Typography, typography } from '../../src/index';

import { HighlightedCode } from './HighlightedCode';

const scaleOrder = [ '50', '100', '200', '300', '500', '600', '700', '900' ];
const paletteFamilies = [ 'gray', 'neutral', 'blue', 'green', 'yellow', 'red', 'indigo' ];
const semanticGroups = [ 'accent', 'text', 'surface', 'border' ];

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
    return document.execCommand('copy');
  } finally {
    document.body.removeChild(textarea);
  }
};

const CopyableToken = ({ children, className = '', label, value, ...rest }) => {
  const [ copied, setCopied ] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const handleCopy = async() => {
    let didCopy = false;

    if (navigator.clipboard?.writeText)
      try {
        await navigator.clipboard.writeText(value);
        didCopy = true;
      } catch {
        didCopy = false;
      }

    if (!didCopy) copyWithTextArea(value);

    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button
      type='button'
      className={ `group relative cursor-copy rounded-md text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950 ${className}` }
      aria-label={ `Copy ${label || value}` }
      title={ `Copy ${label || value}` }
      onClick={ handleCopy }
      { ...rest }
    >
      {children}
      <span className={ `pointer-events-none absolute right-1.5 top-1.5 rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-gray-600 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 ${copied ? 'opacity-100' : 'opacity-0'}` }>
        {copied ? 'Copied' : 'Copy'}
      </span>
    </button>
  );
};

const Swatch = ({ name, value }) => (
  <CopyableToken value={ value } label={ name } className='block h-[128px] w-full overflow-hidden border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900'>
    <div className='h-16 border-b border-gray-100 dark:border-gray-800' style={{ 'backgroundColor': value }} />
    <div className='grid h-16 content-start gap-1 p-2'>
      <div className='truncate font-mono text-[11px] font-semibold leading-4 text-gray-900 dark:text-gray-100'>{name}</div>
      <div className='truncate font-mono text-[11px] leading-4 text-gray-500 dark:text-gray-400' title={ value }>{value}</div>
    </div>
  </CopyableToken>
);

const TokenValue = ({ children, name, value }) => (
  <CopyableToken value={ value } label={ name } className='w-full rounded-md border border-gray-100 bg-white p-3 dark:border-gray-700 dark:bg-gray-800'>
    {children}
  </CopyableToken>
);

const Section = ({ children, description, title }) => (
  <section className='space-y-4'>
    <div className='max-w-3xl space-y-2'>
      <Typography variant='heading-lg'>{title}</Typography>
      {description && <Typography variant='paragraph-md'>{description}</Typography>}
    </div>
    {children}
  </section>
);

export default {
  parameters: {
    docs: {
      description: {
        component: 'The color and token foundation for the blog design system. These values are exported from the package, mirrored into Tailwind, and exposed through CSS custom properties.'
      }
    }
  },
  tags: [ 'autodocs' ],
  title: 'Foundations/Colors & Tokens'
};

export const Default = {
  'render': () => (
    <div className='space-y-10 p-6 text-gray-900 dark:bg-gray-950 dark:text-gray-100'>
      <Section
        title='Color System'
        description='The DS palette is intentionally small: gray, neutral, blue, green, yellow, red, and indigo. Each family exposes eight useful shades only, keeping choices clear and repeatable. Click any token to copy its value.'
      >
        <div className='grid gap-5'>
          {paletteFamilies.map((family) => (
            <div key={ family } className='space-y-2'>
              <div className='font-mono text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400'>{family}</div>
              <div className='grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-8'>
                {scaleOrder.filter((step) => colors[family]?.[step]).map((step) => (
                  <Swatch key={ `${family}-${step}` } name={ `${family}.${step}` } value={ colors[family][step] } />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title='Semantic Tokens'
        description='Semantic names are the stable contract for product UI. Components should consume these instead of hard-coding palette names when the intent is surface, text, border, or accent.'
      >
        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
          {semanticGroups.map((group) => (
            <div key={ group } className='rounded-md border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900'>
              <div className='mb-3 font-mono text-sm font-semibold'>{group}</div>
              <div className='grid gap-2'>
                {Object.entries(colors[group]).map(([ name, value ]) => (
                  <Swatch key={ `${group}-${name}` } name={ `${group}.${name}` } value={ value } />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title='Radii, Shadows, Type Tokens'
        description='Non-color values are kept small and deliberate. They describe product primitives rather than one-off page decoration.'
      >
        <div className='grid gap-4 lg:grid-cols-3'>
          <div className='rounded-md border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900'>
            <div className='mb-3 font-semibold'>Radius</div>
            <div className='space-y-3'>
              {Object.entries(radii).map(([ name, value ]) => (
                <CopyableToken key={ name } value={ value } label={ `radii.${name}` } className='flex w-full items-center justify-between gap-4 rounded-md p-2 hover:bg-gray-50 dark:hover:bg-gray-800'>
                  <div className='font-mono text-xs'>{name}</div>
                  <div className='h-10 w-24 border border-blue-500 bg-blue-50 dark:bg-blue-950' style={{ 'borderRadius': value }} />
                </CopyableToken>
              ))}
            </div>
          </div>
          <div className='rounded-md border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900'>
            <div className='mb-3 font-semibold'>Shadow</div>
            <div className='grid gap-3'>
              {Object.entries(shadows).map(([ name, value ]) => (
                <CopyableToken key={ name } value={ value } label={ `shadows.${name}` } className='block rounded-md border border-gray-100 bg-white p-4 text-sm dark:border-gray-700 dark:bg-gray-800' style={{ 'boxShadow': value }}>
                  <div className='font-mono text-xs'>{name}</div>
                </CopyableToken>
              ))}
            </div>
          </div>
          <div className='rounded-md border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900'>
            <div className='mb-3 font-semibold'>Typography Tokens</div>
            <div className='grid gap-3'>
              {Object.entries(typography.fontFamily).map(([ name, value ]) => (
                <TokenValue key={ `font-${name}` } name={ `typography.fontFamily.${name}` } value={ value.join(', ') }>
                  <div className='font-mono text-xs text-gray-900 dark:text-gray-100'>fontFamily.{name}</div>
                  <div className='mt-1 break-words font-mono text-[11px] text-gray-500 dark:text-gray-400'>{value.join(', ')}</div>
                </TokenValue>
              ))}
              {Object.entries(typography.lineHeight).map(([ name, value ]) => (
                <TokenValue key={ `line-${name}` } name={ `typography.lineHeight.${name}` } value={ value }>
                  <div className='font-mono text-xs text-gray-900 dark:text-gray-100'>lineHeight.{name}</div>
                  <div className='mt-1 font-mono text-[11px] text-gray-500 dark:text-gray-400'>{value}</div>
                </TokenValue>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section
        title='Package Contract'
        description='Consumers can import tokens directly from the package today. The same contract remains valid if the design system is later published to npm.'
      >
        <CopyableToken
          value={ `import { colors, radii, shadows, tokens, typography } from '@ahmadassaf/design-system';\n\nconst accent = colors.accent.DEFAULT;\nconst cardRadius = radii.card;\nconst tokenSnapshot = ${JSON.stringify(Object.keys(tokens), null, 2)};` }
          label='package token import example'
          className='block w-full'
        >
          <HighlightedCode
            code={ `import { colors, radii, shadows, tokens, typography } from '@ahmadassaf/design-system';\n\nconst accent = colors.accent.DEFAULT;\nconst cardRadius = radii.card;\nconst tokenSnapshot = ${JSON.stringify(Object.keys(tokens), null, 2)};` }
            language='js'
          />
        </CopyableToken>
      </Section>

      <Section
        title='Implementation Alignment'
        description='These docs are generated from the DS token exports. The blog consumes the same package through Tailwind, CSS variables, and package imports.'
      >
        <div className='grid gap-4 md:grid-cols-2'>
          <div className='rounded-md border border-gray-200 bg-white p-4 text-sm leading-7 dark:border-gray-700 dark:bg-gray-900'>
            <div className='mb-2 font-semibold'>What The Blog Uses</div>
            <ul className='list-disc space-y-1 pl-5 text-gray-600 dark:text-gray-300'>
              <li><code>tailwind.config.js</code> extends the DS Tailwind preset.</li>
              <li><code>app/layout.js</code> imports <code>@ahmadassaf/design-system/global.css</code> once.</li>
              <li><code>global.css</code> imports <code>styles.css</code>, so CSS variables and base rules come from the package.</li>
              <li>The dynamic Tailwind safelist is limited to these seven palette families and eight shades.</li>
            </ul>
          </div>
          <div className='rounded-md border border-gray-200 bg-white p-4 text-sm leading-7 dark:border-gray-700 dark:bg-gray-900'>
            <div className='mb-2 font-semibold'>What Stays Out</div>
            <ul className='list-disc space-y-1 pl-5 text-gray-600 dark:text-gray-300'>
              <li>No app-root <code>css/overrides.css</code>.</li>
              <li>No app-root component directory.</li>
              <li>No extra palette families such as purple, amber, orange, cyan, or rose.</li>
              <li>Raw color values are reserved for token definitions and external data visualization values.</li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  )
};
