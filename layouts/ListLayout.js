/**
 * List Layout Component
 *
 * @description A flexible layout component for displaying lists of blog posts with pagination functionality.
 * Supports pagination controls and responsive design. Used across
 * various blog listing pages including main blog page, category pages, and tag pages.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { PaginationBar,
  POSTS_PER_PAGE,
  Typography } from '@gaudi/design-system';

import PostPreview from '@/layouts/PostPreview';

/**
 * List layout component for displaying blog posts with pagination
 *
 * @description Renders a list of blog posts with pagination controls.
 * When `paginationURL` and `baseURL` are provided, pagination renders real links so every page is
 * crawlable (page 1 resolves to the base URL, subsequent pages to the pagination URL). When
 * `currentPage`/`totalPages` are provided the posts are treated as a pre-sliced page; otherwise the
 * component slices the first page itself.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.beforeList] - Curated content shown between retrieval and the chronological list
 * @param {string} [props.listTitle] - Optional page heading rendered above the list
 * @param {string} [props.listTitleVariant='index-feature-title'] - Typography variant used for the list heading
 * @param {string} [props.pageDescription] - Optional introductory copy paired with pageTitle
 * @param {string} [props.pageTitle] - Optional page-level heading rendered before retrieval
 * @param {string} [props.pageTitleVariant] - Optional Typography variant override for the page title
 * @param {boolean} [props.paginate=true] - Whether to paginate the post collection
 * @param {Array} props.posts - Array of post objects to display
 * @param {boolean} [props.archive=false] - Whether the post list renders as an archive: a sticky title bar
 *   that pins to the viewport while the posts (grouped by year) scroll past with the page
 * @param {string} [props.titleAs='h1'] - Heading element for the list title (pass 'h2' when composed under a page h1)
 * @param {string} [props.className] - Additional CSS classes applied to the list title
 * @param {string} [props.baseURL] - Base URL for page 1 of the pagination links
 * @param {string} [props.paginationURL] - URL prefix for pagination links (pages 2+)
 * @param {number} [props.currentPage] - Current page number for pre-sliced posts
 * @param {number} [props.totalPages] - Total number of pages for pre-sliced posts
 *
 * @returns {JSX.Element} The rendered list layout component
 *
 * @example
 * <ListLayout
 *   posts={pagePosts}
 *   listTitle="Machine Learning Posts"
 *   baseURL="blog"
 *   paginationURL="blog/page"
 *   currentPage={1}
 *   totalPages={5}
 * />
 */
export default function ListLayout({ beforeList, posts, listTitle, listTitleVariant = 'index-feature-title', pageDescription, pageTitle, pageTitleVariant, paginate = true, archive = false, titleAs = 'h1', className, baseURL, paginationURL, currentPage = 1, totalPages }) {

  const listTitleId = 'article-list-title';
  const topTitleId = 'article-page-title';

  const isPreSliced = totalPages !== undefined;
  const activePage = currentPage;
  const pageCount = paginate ? totalPages ?? Math.ceil(posts.length / POSTS_PER_PAGE) : 1;
  const displayPosts = !paginate || isPreSliced ? posts : posts.slice(0, POSTS_PER_PAGE);
  const topTitle = pageTitle || listTitle;
  const topTitleAs = pageTitle ? 'h1' : titleAs;
  const topTitleVariant = pageTitleVariant || (topTitleAs === 'h1' ? 'title-md' : 'index-feature-title');
  const showListTitle = Boolean(pageTitle && listTitle);
  const postTitleAs = topTitleAs === 'h1' && !showListTitle ? 'h2' : 'h3';
  let resultsLabelledBy;

  if (topTitle) resultsLabelledBy = showListTitle ? listTitleId : topTitleId;

  // The fixed line height only suits the compact default h1; display variants carry their own leading
  const topTitleLeading = topTitleAs === 'h1' && topTitleVariant === 'title-md' ? 'leading-9 sm:leading-10' : '';

  /*
   * Year markers give the archive a typographic rhythm and make long lists scannable at a glance.
   * The shared sort key is `updated || date`, but the archive labels rows by publication date, so
   * it re-sorts on `date` locally to keep every post under the year marker its metadata shows.
   */
  const archiveRows = [];

  if (archive) {
    const archivePosts = [ ...displayPosts ].sort((a, b) => (a.date > b.date ? -1 : 1));
    let lastYear = null;

    for (const frontMatter of archivePosts) {
      const year = new Date(frontMatter.date).getFullYear();

      if (year !== lastYear) {
        archiveRows.push({ 'type': 'year', year });
        lastYear = year;
      }

      archiveRows.push({ frontMatter, 'type': 'post' });
    }
  }

  // Build crawlable pagination hrefs: page 1 maps to the base URL, later pages to the pagination URL
  const getPageHref = (page) => (page === 1 ? `/${baseURL}` : `/${paginationURL}/${page}`);

  const emptyState = !posts.length && (
    <li className='py-12 text-center'>
      <Typography variant='heading-sm' as='p' className='mb-2'>
        No posts found
      </Typography>
      <Typography variant='paragraph-sm'>
        There is nothing published here yet. New writing will land soon.
      </Typography>
    </li>
  );

  return (
    <div>
      {topTitle ? (
        <header className='pb-4'>
          <Typography id={ topTitleId } variant={ topTitleVariant } as={ topTitleAs } className={ `${topTitleLeading} ${className || ''}` }>
            {topTitle}
          </Typography>
          {pageDescription ? (
            <Typography variant='paragraph-md' className='mt-2 max-w-2xl text-lg leading-8 text-pretty'>
              {pageDescription}
            </Typography>
          ) : null}
        </header>
      ) : null}

      {beforeList ? <div>{beforeList}</div> : null}

      {archive ? (
        <section
          aria-label={ topTitle ? undefined : 'Articles' }
          aria-labelledby={ resultsLabelledBy }
        >
          {showListTitle ? (
            <div className='sticky top-0 z-10 bg-background'>
              <div className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border-muted pb-4 pt-2 dark:border-border-dark'>
                <Typography id={ listTitleId } variant={ listTitleVariant } as={ titleAs } className={ className }>
                  {listTitle}
                </Typography>
                <Typography as='span' variant='post-meta' className='shrink-0 font-medium'>
                  {`${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`}
                </Typography>
              </div>
            </div>
          ) : null}

          <ul aria-label={ listTitle ? `${listTitle} archive` : undefined } className='pt-2'>
            {emptyState}
            {archiveRows.map((row) => (row.type === 'year' ? (
              <li key={ `year-${row.year}` } role='presentation' className='pb-2 pt-8 first:pt-2'>
                <span className='block text-3xl font-extrabold leading-none tracking-tighter tabular-nums text-gray-300 dark:text-gray-600'>
                  {row.year}
                </span>
              </li>
            ) : (
              <PostPreview key={ row.frontMatter.slug } frontMatter={ row.frontMatter } titleAs={ postTitleAs } />
            )))}
          </ul>

          {pageCount > 1 && (
            <PaginationBar
              currentPage={ activePage }
              totalPages={ pageCount }
              getHref={ getPageHref }
            />
          )}
        </section>
      ) : (
        <>
          {showListTitle ? (
            <div className='pb-3'>
              <Typography id={ listTitleId } variant={ listTitleVariant } as={ titleAs } className={ className }>
                {listTitle}
              </Typography>
            </div>
          ) : null}

          <section
            aria-label={ topTitle ? undefined : 'Articles' }
            aria-labelledby={ resultsLabelledBy }
          >
            <ul className='pt-2'>
              {emptyState}
              {displayPosts.map((frontMatter) => (
                <PostPreview key={ frontMatter.slug } frontMatter={ frontMatter } titleAs={ postTitleAs } />
              ))}
            </ul>

            {pageCount > 1 && (
              <PaginationBar
                currentPage={ activePage }
                totalPages={ pageCount }
                getHref={ getPageHref }
              />
            )}
          </section>
        </>
      )}
    </div>
  );
}
