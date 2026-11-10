import { Icon, Link, Pill, Typography } from '@gaudi/design-system';

import formatDate from '@/lib/utils/formatDate';
import { slugify, titleFromSlug } from '@/lib/utils/slugs.mjs';

const PostMetaRow = ({ post, leading }) => (
  <div className='mb-2 flex flex-wrap items-center gap-x-3 gap-y-2'>
    {leading}
    <Typography as='time' variant='post-meta' dateTime={ post.date }>
      {formatDate(post.date)}
    </Typography>
    {post.category && (
      <>
        <Typography as='span' variant='post-meta' aria-hidden='true'>·</Typography>
        <Pill href={ `/blog/categories/${slugify(post.category)}` } tone='blue' variant='subtle' size='xs' radius='md'>
          {titleFromSlug(post.category)}
        </Pill>
      </>
    )}
  </div>
);

/** Shared homepage/blog feature: a lead article and one supporting post. */
export default function FeaturedLayout({ posts, showArchiveLink = false }) {
  const featuredPosts = posts.filter((post) => post.featured)
    .sort((first, second) => second.date.localeCompare(first.date));
  const featuredPost = featuredPosts[0] || posts[0];
  const featuredLabel = featuredPosts.length ? 'Featured' : 'Latest';
  const supportingPost = featuredPosts[1];
  const titleElement = showArchiveLink ? 'h3' : 'h2';

  if (!featuredPost) return null;

  return (
    <section id='featured-writing' aria-label='Featured writing' className='pb-6'>
      {showArchiveLink && (
        <div className='mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2'>
          <Typography as='h2' variant='heading-sm' className='text-xl font-semibold'>Featured writing</Typography>
          <Link href='/blog' tone='blue' className='inline-flex min-h-11 items-center gap-2 text-sm font-semibold'>
            View all posts
            <Icon name='ArrowRight' decorative size='sm' />
          </Link>
        </div>
      )}
      <article className='w-full group'>
        <PostMetaRow post={ featuredPost } leading={ <Pill tone='blue' variant='solid' radius='full' size='sm'>{featuredLabel}</Pill> } />
        <Typography variant='index-hero-title' as={ titleElement } className='mb-3 max-w-none tracking-[-0.02em] sm:text-4xl sm:leading-[1.12]'>
          <Link href={ `/blog/${featuredPost.slug}` } tone='neutral' className='font-bold'>
            {featuredPost.title}
          </Link>
        </Typography>
        <Typography variant='index-hero-summary' className='mb-5 w-full max-w-none text-pretty leading-[1.7] md:leading-[1.7]'>
          {featuredPost.summary}
        </Typography>
        <Link href={ `/blog/${featuredPost.slug}` } tone='blue' className='inline-flex max-w-full items-center gap-2'>
          Read Full Article
          <Icon name='ArrowRight' decorative size='xs' />
        </Link>
      </article>

      {supportingPost && (
        <div className='mt-6 w-full border-t border-border-muted pt-6'>
          <article className='group min-w-0'>
            <PostMetaRow post={ supportingPost } />
            <Typography variant='index-feature-title' as={ titleElement } className='mb-2'>
              <Link href={ `/blog/${supportingPost.slug}` } tone='neutral' className='font-bold'>
                {supportingPost.title}
              </Link>
            </Typography>
            <Typography variant='index-feature-summary' className='max-w-none text-pretty'>
              {supportingPost.summary}
            </Typography>
          </article>
        </div>
      )}
    </section>
  );
}
