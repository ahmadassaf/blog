import SectionContainer from '@/components/containers/SectionContainer';
import Disclaimer from '@/components/post/Disclaimer';
import PostComments from '@/components/post/PostComments';
import PostHeader from '@/components/post/PostHeader';
import PostNavigation from '@/components/post/PostNavigation';
import TableOfContents from '@/components/post/TableOfContents';
import siteMetadata from '@/data/meta/metadata';

export default function PostLayout({ content, next, prev, toc, children }) {

  return (
    <SectionContainer>
      <article>
        <div>
          <PostHeader frontMatter={ content } siteMetadata={ siteMetadata } toc={ toc }/>

          <div className={ `divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:gap-x-6 xl:divide-y-0 ${(toc.length > 3 && content.tableOfContents) ? 'xl:grid-cols-9' : 'xl:grid-cols-1'}` } style={{ 'gridTemplateRows': 'auto 1fr' }}>
            <div className={ `divide-y divide-gray-200 dark:divide-gray-700 xl:row-span-2 xl:pb-0 ${(toc.length > 3 && content.tableOfContents) && 'xl:col-span-6'}` }>
              <div className='prose max-w-none pt-8 pb-8 dark:prose-dark'>
                {children}
                <Disclaimer/>
              </div>
            </div>
            { (toc.length > 3 && content.tableOfContents) && <TableOfContents toc={ toc } />}
          </div>
          <PostNavigation next={ next } prev={ prev }></PostNavigation>
          { content.comments && (<PostComments/>)}
        </div>
      </article>
    </SectionContainer>
  );
}
