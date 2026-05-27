import ArticleContentLayout from './ArticleContentLayout';

export default {
  component: ArticleContentLayout,
  title: 'Layout/ArticleContentLayout'
};

export const Default = {
  render: () => (
    <ArticleContentLayout
      aside={ <aside className='hidden xl:block xl:col-span-3'>Table of contents</aside> }
      hasAside
    >
      <h2>Article body</h2>
      <p>Long-form content keeps the same body and optional side rail layout across posts and projects.</p>
    </ArticleContentLayout>
  )
};
