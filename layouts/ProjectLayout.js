import SectionContainer from '@/components/containers/SectionContainer';
import Link from '@/components/elements/Link';
import Comments from '@/components/post/comments';
import { BlogSEO } from '@/components/utils/SEO';
import siteMetadata from '@/data/meta/metadata';
import formatDate from '@/lib/utils/formatDate';

export default function PostLayout({ content, next, prev, children }) {
  const { date, title } = content;

  return (
    <SectionContainer>
      <BlogSEO url={ `${siteMetadata.siteUrl}/blog/${content.slug}` } { ...content } />
      <article>
        <div>
          <header>
            <div className='space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700'>
              <dl>
                <div>
                  <dt className='sr-only'>Published on</dt>
                  <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
                    <time dateTime={ date }>{formatDate(date)}</time>
                  </dd>
                </div>
              </dl>
              <div>
                <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14'>
                  {title}
                </h1>
              </div>
            </div>
          </header>
          <div
            className='divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0 '
            style={{ 'gridTemplateRows': 'auto 1fr' }}
          >
            <div className='divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0'>
              <div className='prose max-w-none pt-10 pb-8 dark:prose-dark'>{children}</div>
            </div>
            <Comments content={ content } />
            <footer>
              <div className='flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base'>
                {prev && (
                  <div className='pt-4 xl:pt-8'>
                    <Link
                      href={ `/blog/${prev.slug}` }
                      className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                    >
                      &larr; {prev.title}
                    </Link>
                  </div>
                )}
                {next && (
                  <div className='pt-4 xl:pt-8'>
                    <Link
                      href={ `/blog/${next.slug}` }
                      className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                    >
                      {next.title} &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  );
}