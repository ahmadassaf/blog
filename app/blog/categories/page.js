/**
 * Categories Page
 *
 * @description Server page for the categories explorer. Filters out draft posts,
 * strips sample posts down to the fields the client needs, computes category stats,
 * and passes plain props to the interactive CategoriesExplorer client component.
 *
 * @author Ahmad Assaf
 * @version 9.0.0
 */

import { allPosts } from 'contentlayer/generated';

import CategoriesExplorer from '@/app/blog/categories/CategoriesExplorer';
import categories from '@/app/content/categories';
import { metadataGenertaor } from '@/data/meta/generator/blog';
import { pick, published, sortPosts } from '@/lib/utils/contentlayer';
import { slugify } from '@/lib/utils/slugs';

export const metadata = metadataGenertaor({ 'path': '/blog/categories', 'title': 'Categories' });

/**
 * Categories page component
 *
 * @description Prepares the published (non-draft) posts per category as plain objects
 * and renders the interactive categories explorer.
 *
 * @returns {JSX.Element} Categories page with interactive explorer
 *
 * @example
 * // Rendered at /blog/categories route
 * <Categories />
 */
export default function Categories() {

  // Sort categories by count
  const sortedCategories = [ ...categories ].sort((a, b) => b.count - a.count);

  // Get all published posts for categories
  const posts = sortPosts(published(allPosts));

  // Get sample posts for each category, stripped to the fields the client needs
  const categoriesWithPosts = sortedCategories.map((category) => {
    const categoryPosts = posts.filter((post) => post.category && slugify(post.category) === category.slug);

    return {
      ...category,
      'samplePosts': categoryPosts.slice(0, 3).map((post) => pick(post, [ 'date', 'description', 'slug', 'subtitle', 'summary', 'title' ]))
    };
  });

  return <CategoriesExplorer categoriesWithPosts={ categoriesWithPosts } />;
}
