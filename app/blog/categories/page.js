/**
 * Categories Page
 *
 * @description Server page for the categories directory. Filters out draft posts,
 * strips sample posts down to the fields the directory needs, and passes plain props
 * to the category presentation component.
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
 * and renders the category directory.
 *
 * @returns {JSX.Element} Categories page with editorial directory
 *
 * @example
 * // Rendered at /blog/categories route
 * <Categories />
 */
export default function Categories() {

  // Get all published posts for categories
  const posts = sortPosts(published(allPosts));

  // Get sample posts for each category, stripped to the fields the client needs
  const categoriesWithPosts = categories.map((category) => {
    const categoryPosts = posts.filter((post) => post.category && slugify(post.category) === category.slug);

    return {
      ...category,
      'count': categoryPosts.length,
      'samplePosts': categoryPosts.slice(0, 3).map((post) => pick(post, [ 'date', 'description', 'slug', 'subtitle', 'summary', 'title' ]))
    };
  }).filter((category) => category.count > 0).sort((a, b) => b.count - a.count);

  return <CategoriesExplorer categoriesWithPosts={ categoriesWithPosts } />;
}
