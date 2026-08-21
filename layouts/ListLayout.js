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
 * @param {boolean} [props.scrollableList=false] - Whether the post list should scroll inside a bounded viewport
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
export default function ListLayout({ beforeList, posts, listTitle, listTitleVariant = 'index-feature-title', pageDescription, pageTitle, pageTitleVariant, paginate = true, scrollableList = false, titleAs = 'h1', className, baseURL, paginationURL, currentPage = 1, totalPages }) {

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

  // Build crawlable pagination hrefs: page 1 maps to the base URL, later pages to the pagination URL
  const getPageHref = (page) => (page === 1 ? `/${baseURL}` : `/${paginationURL}/${page}`);

  return (
    <div>
      {topTitle ? (
        <header className='pb-5'>
          <Typography id={ topTitleId } variant={ topTitleVariant } as={ topTitleAs } className={ `${topTitleAs === 'h1' ? 'leading-9 sm:leading-10' : ''} ${className || ''}` }>
            {topTitle}
          </Typography>
          {pageDescription ? (
            <Typography variant='paragraph-md' className='mt-2 max-w-2xl text-base leading-7'>
              {pageDescription}
            </Typography>
          ) : null}
        </header>
      ) : null}

      {beforeList ? <div>{beforeList}</div> : null}

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
        <ul
          aria-label={ scrollableList ? `${listTitle} archive` : undefined }
          tabIndex={ scrollableList ? 0 : undefined }
          className={ scrollableList ? 'max-h-[38rem] overflow-y-auto overscroll-contain pr-3 pt-2 [scrollbar-gutter:stable] sm:max-h-[42rem] sm:pr-5' : 'pt-2' }
        >
          {!posts.length && (
            <li className='py-12 text-center'>
              <Typography variant='heading-sm' as='p' className='mb-2'>
                No posts found
              </Typography>
              <Typography variant='paragraph-sm'>
                There is nothing published here yet — new writing will land soon.
              </Typography>
            </li>
          )}
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
    </div>
  );
}
