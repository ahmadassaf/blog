import fs from 'fs';
import globby from 'globby';
import matter from 'gray-matter';
import prettier from 'prettier';

import siteMetadata from '../data/meta/metadata';

(async() => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const pages = await globby([ 'pages/*.js', 'pages/*.tsx', 'data/blog/**/*.mdx', 'data/blog/**/*.md', 'public/tags/**/*.xml', '!pages/_*.js', '!pages/_*.tsx', '!pages/api' ]);

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages.map((page) => {

    if (page.search('.md') >= 1 && fs.existsSync(page)) {
      const source = fs.readFileSync(page, 'utf8');
      const fm = matter(source);

      if (fm.data.draft) return false;
      if (fm.data.canonicalUrl) return false;

    }
    const path = page.replace('pages/', '/').replace('data/blog', '/blog')
      .replace('public/', '/')
      .replace('.js', '')
      .replace('.tsx', '')
      .replace('.mdx', '')
      .replace('.md', '')
      .replace('/feed.xml', '');
    const route = path === '/index' ? '' : path;

    if (page.search('pages/404.') > -1 || page.search('pages/blog/[...slug].') > -1) return false;

    return `<url>
              <loc>${siteMetadata.siteUrl}${route}</loc>
            </url>`;
  })
    .join('')}
        </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    'parser': 'html'
  });

  fs.writeFileSync('public/sitemap.xml', formatted);
})();
