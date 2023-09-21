import Category from '@/components/elements/Category';
import Tag from '@/components/elements/Tag';
import PostSeriesBox from '@/components/post/postSeriesBox';
import PostSharing from '@/components/post/PostSharing';

const postDateTemplate = { 'day': 'numeric', 'month': 'long', 'weekday': 'long', 'year': 'numeric' };

const PostHeader = ({ frontMatter, siteMetadata, toc }) => (
  <div className={ `pt-6 xl:pb-6 max-xl:w-[100%] ${toc.length <= 3 ? 'w-[100%]' : 'w-[60%]'}` }>
    <Category text={ frontMatter.category }></Category>
    <div className='py-4 xl:py-4'>
      <dt className='sr-only'>Published on</dt>
      <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
        <time dateTime={ frontMatter.date }>
          {new Date(frontMatter.date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
        </time>
      </dd>
    </div>
    <div className='space-y-1 text-left'>
      <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14'>
        {frontMatter.title}
      </h1>
      <h3 className='text-1xl sm:text-1xl leading-9 tracking-tight text-gray-600 dark:text-gray-100 sm:leading-10 md:text-2xl md:leading-14 capitalize'>
        {frontMatter.subtitle}
      </h3>

    </div>
    <h4 className='text-gray-500'>{frontMatter.readingTime.text}</h4>
    {frontMatter.seriesPosts && (
      <PostSeriesBox series={ frontMatter.seriesPosts } slug={ frontMatter.slug } />
    )}
    {frontMatter.tags && (
      <div className='my-4 flex flex-wrap'>
        {frontMatter.tags.map((tag) => (
          <Tag key={ tag } text={ tag } />
        ))}
      </div>
    )}
    <PostSharing siteMetadata={ siteMetadata } slug={ frontMatter.slug } title={ frontMatter.title } fileName={ frontMatter.fileName } externalLink={ frontMatter.externalLink }></PostSharing>
  </div>
);

export default PostHeader;
