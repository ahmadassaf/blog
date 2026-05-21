const sections = [
  {
    'items': [
      'Avatar',
      'Banner',
      'Button',
      'Card',
      'Grid',
      'GridItem',
      'Icon',
      'ImageFallback',
      'Kbd',
      'Link',
      'Pill',
      'TextHighlight',
      'Typography',
      'cn',
      'colors',
      'radii',
      'shadows',
      'typography tokens'
    ],
    'name': 'Design-system package'
  },
  {
    'items': [
      'Aurora',
      'DropDown',
      'ImageModal',
      'Pagination',
      'Search',
      'Aside',
      'Callout',
      'Details',
      'Faq',
      'FileTree',
      'Highlight',
      'LatexText',
      'PostImage',
      'Quote',
      'Stats',
      'Table',
      'Tooltip'
    ],
    'name': 'Blog and MDX UI'
  },
  {
    'items': [
      'Breadcrumbs',
      'Disclaimer',
      'PostHeader',
      'PostNavigation',
      'PostSharing',
      'PostSeriesBox',
      'PostTimestamps',
      'TableOfContents'
    ],
    'name': 'Post UI'
  },
  {
    'items': [
      'CmdIcon',
      'CmdItem',
      'CmdLauncherShortcut',
      'useCmdLauncher',
      'useCmdSearch'
    ],
    'name': 'Command palette and hooks'
  }
];

export default {
  tags: [ 'autodocs' ],
  title: 'Overview/Coverage Matrix'
};

export const CompleteCoverage = {
  render: () => (
    <div className='max-w-5xl space-y-8 p-6 text-gray-900 dark:bg-gray-900 dark:text-gray-100'>
      <section>
        <h1 className='text-3xl font-bold'>Design System Coverage</h1>
        <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
          This matrix tracks public design-system primitives plus reusable blog UI components covered by Storybook.
        </p>
      </section>

      <div className='grid gap-4 md:grid-cols-2'>
        {sections.map((section) => (
          <section key={ section.name } className='rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900'>
            <h2 className='text-lg font-semibold'>{section.name}</h2>
            <ul className='mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2'>
              {section.items.map((item) => (
                <li key={ item } className='flex items-center gap-2'>
                  <span className='h-2 w-2 rounded-full bg-green-500' />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
};
