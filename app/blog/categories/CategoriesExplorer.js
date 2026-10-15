/**
 * Categories Explorer Component
 *
 * @description The categories page body: a grid with one Gaudi card per category, each with
 * its description, article count, latest posts as compact rows, and a link to the full listing.
 * Receives plain, pre-computed data from the server page.
 *
 * @author Ahmad Assaf
 * @version 11.0.0
 */

import { CardContent, CardDescription, CardFooter, CardHeader, CardRoot, CardTitle, EmptyState, Icon, Link } from '@gaudi/design-system';
import PageHeader from '@gaudi/design-system/layout/PageHeader';

import { formatShortDate } from '@/app/blog/ExplorerCards';
import { titleFromSlug } from '@/lib/utils/slugs.mjs';

const articleCount = (count) => `${count} ${count === 1 ? 'article' : 'articles'}`;

/**
 * Categories grid
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.categoriesWithPosts - Categories (sorted by article count) enriched with stripped sample posts
 * @returns {JSX.Element} Page header and category cards
 *
 * @example
 * <CategoriesExplorer categoriesWithPosts={categoriesWithPosts} />
 */
export default function CategoriesExplorer({ categoriesWithPosts }) {
  const totalArticles = categoriesWithPosts.reduce((sum, category) => sum + category.count, 0);

  return (
    <div className='mx-auto max-w-6xl'>
      <PageHeader
        title='Categories'
        description={ `${totalArticles} articles across ${categoriesWithPosts.length} categories` }
        divider
        className='pt-2 pb-6'
      />

      {categoriesWithPosts.length === 0 ? <EmptyState compact title='No categories yet' /> : (
        <div className='grid grid-cols-1 gap-4 pt-8 md:grid-cols-2'>
          {categoriesWithPosts.map((category) => <CategoryCard key={ category.id } category={ category } />)}
        </div>
      )}
    </div>
  );
}

/**
 * One category: name and count, description, its latest posts, and a link to all of them
 *
 * @param {Object} props - Component props
 * @param {Object} props.category - Category with slug, title, description, count and samplePosts
 * @returns {JSX.Element} Category card
 */
const CategoryCard = ({ category }) => {
  const href = `/blog/categories/${category.slug}`;

  return (
    <CardRoot as='section' aria-labelledby={ `category-${category.slug}` } className='h-full'>
      <CardHeader>
        <CardTitle as='h2' id={ `category-${category.slug}` } className='flex items-baseline justify-between gap-3 text-lg font-semibold'>
          <Link href={ href } tone='neutral' className='font-semibold'>{titleFromSlug(category.title)}</Link>
          <span className='shrink-0 text-sm font-normal tabular-nums text-text-muted'>{articleCount(category.count)}</span>
        </CardTitle>
        {category.description ? <CardDescription>{category.description}</CardDescription> : null}
      </CardHeader>

      <CardContent className='flex-1'>
        {category.samplePosts.length === 0 ? <EmptyState compact title='No articles yet' /> : (
          <ul aria-label={ `Latest in ${titleFromSlug(category.title)}` } className='-mx-2 flex flex-col'>
            {category.samplePosts.map((post) => (
              <li key={ post.slug }>
                <Link href={ `/blog/${post.slug}` } variant='bare' className='flex items-baseline justify-between gap-4 rounded-md px-2 py-2 text-sm hover:bg-surface-muted'>
                  <span className='line-clamp-1 font-medium text-text'>{post.title}</span>
                  <time dateTime={ post.date } className='shrink-0 text-xs tabular-nums text-text-muted'>{formatShortDate(post.date)}</time>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>

      <CardFooter className='border-t border-border-muted'>
        <Link href={ href } tone='accent' className='inline-flex items-center gap-1 text-sm'>
          View all {articleCount(category.count)}
          <Icon name='ArrowRight' size='xs' decorative />
        </Link>
      </CardFooter>
    </CardRoot>
  );
};
