import ArticleContentLayout from './ArticleContentLayout';

const toc = (
  <aside className='mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm dark:border-gray-800 dark:bg-gray-900'>
    <p className='mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400'>Contents</p>
    <nav className='space-y-2 text-gray-600 dark:text-gray-300' aria-label='Article sections'>
      <a href='#opening' className='block font-medium text-gray-950 dark:text-white'>Opening</a>
      <a href='#structure' className='block pl-3'>Structure</a>
      <a href='#decisions' className='block pl-3'>Decisions</a>
      <a href='#release' className='block font-medium text-gray-950 dark:text-white'>Release notes</a>
    </nav>
  </aside>
);

export default {
  component: ArticleContentLayout,
  title: 'Layout/ArticleContentLayout'
};

export const Default = {
  render: () => (
    <div className='mx-auto max-w-5xl rounded-lg border border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-gray-950'>
      <ArticleContentLayout
        aside={ toc }
        collapsibleAside
        contentClassName='max-w-none'
        hasAside
        padding='lg'
      >
        <h1 className='mb-3 text-3xl font-bold leading-tight text-gray-950 dark:text-white'>Article content layout</h1>
        <p className='my-0 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300'>
          Long-form content uses the same body column and optional side rail across posts and projects.
          The side rail can collapse while the article keeps its reading width.
        </p>
        <h2 id='opening' className='mb-3 mt-8 text-xl font-semibold text-gray-950 dark:text-white'>Opening</h2>
        <p className='my-0 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300'>
          The layout keeps prose in the primary column and reserves the side rail for table of contents,
          series context, or related metadata.
        </p>
        <h2 id='structure' className='mb-3 mt-8 text-xl font-semibold text-gray-950 dark:text-white'>Structure</h2>
        <p className='my-0 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300'>
          The article column remains first in source order, while the side rail moves above it on smaller screens.
          That keeps navigation reachable without changing the content model.
        </p>
        <h3 id='decisions' className='mb-2 mt-6 text-lg font-semibold text-gray-900 dark:text-gray-100'>Decisions</h3>
        <p className='my-0 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300'>
          The component owns the grid and aside visibility. The page owns the prose, headings, and side rail content.
        </p>
        <h2 id='release' className='mb-3 mt-8 text-xl font-semibold text-gray-950 dark:text-white'>Release notes</h2>
        <p className='my-0 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300'>
          This story mirrors the production article shell closely enough to catch spacing and collapse regressions.
        </p>
      </ArticleContentLayout>
    </div>
  )
};
