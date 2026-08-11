/**
 * Code-native article registry.
 *
 * Content files keep ownership of metadata and discovery. Posts that set
 * `engine: custom` resolve their authored React document here instead of using
 * the shared MDX renderer.
 */

const articleLoaders = {
  'engineering/custom-html-blog-engine': () => import('@/app/blog/_articles/custom-html-blog-engine/CustomHtmlBlogArticle')
};

export const resolveCustomArticle = async(post) => {
  if (post.engine === 'mdx') return null;
  if (post.engine !== 'custom') throw new Error(`Unsupported article engine "${post.engine}" for "${post.externalLink}"`);

  const loader = articleLoaders[post.externalLink];

  if (!loader)
    throw new Error(`Custom article "${post.externalLink}" is not registered in lib/blog-engine/registry.js`);

  const articleModule = await loader();

  return articleModule.default;
};

export const registeredCustomArticles = Object.freeze(Object.keys(articleLoaders));
