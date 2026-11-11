import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { coreContent, sortPosts } from '@gaudi/design-system/utilities/content';
import { transform } from 'esbuild';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

const require = createRequire(import.meta.url);
const source = await readFile(new URL('../../node_modules/@gaudi/design-system/src/components/blocks/Navigation/Menu.jsx', import.meta.url), 'utf8');
const { code } = await transform(source, { 'format': 'cjs', 'jsx': 'automatic', 'loader': 'jsx' });
const article = { 'date': '2026-11-10', 'href': '/blog/article', 'slug': 'article', 'title': 'An article', 'type': 'Post' };
const chapter = { 'body': { 'raw': 'Full chapter body' }, 'date': '2026-11-11', 'href': '/blog/chapter', 'slug': 'chapter', 'title': 'A handbook chapter', 'type': 'HandbookChapter' };

/** Render the installed Menu while isolating routing and unrelated interactive primitives. */
const renderMenu = (props) => {
  let launcherPosts;
  const Empty = () => null;
  const Link = ({ children, href }) => createElement('a', { href }, children);
  const Container = ({ children, aside }) => createElement('div', null, children, aside);
  const CommandLauncher = ({ posts }) => {
    launcherPosts = posts;

    return null;
  };
  const dependencies = {
    '../../../context': { 'useSiteConfig': () => {
      return { 'metadata': {}, 'navigation': { 'links': [] } };
    } },
    '../../../hooks/environment/use-media-query.js': { 'useMediaQuery': () => true },
    '../../../utilities/content': { coreContent, sortPosts },
    '../../core/Button': Container,
    '../../core/Commander': CommandLauncher,
    '../../core/Icon': Empty,
    '../../core/Link': Link,
    '../../core/NavigationMenu': {
      'NavigationMenu': Container,
      'NavigationMenuAside': Container,
      'NavigationMenuDropdown': Container,
      'NavigationMenuLink': Link,
      'NavigationMenuList': Container
    },
    './BrandMark.jsx': Empty,
    './MenuMobile.jsx': Empty,
    './MenuSearch.jsx': Empty,
    './ThemeSwitch.jsx': Empty,
    'next/navigation': { 'usePathname': () => '/' }
  };
  const componentModule = { 'exports': {} };

  runInNewContext(code, {
    'exports': componentModule.exports,
    'module': componentModule,
    'require': (specifier) => dependencies[specifier] ?? require(specifier)
  });

  const html = renderToStaticMarkup(createElement(componentModule.exports.default, {
    'blogLink': { 'href': '/blog', 'title': 'Blog' },
    'posts': [ article ],
    ...props
  }));

  return { html, launcherPosts };
};

test('chapters remain searchable without entering the recent-posts panel', () => {
  const { html, launcherPosts } = renderMenu({ 'searchPosts': [ article, chapter ] });

  assert.match(html, /aria-label="Recent posts"/);
  assert.match(html, /An article/);
  assert.doesNotMatch(html, /A handbook chapter/);
  assert.deepEqual(launcherPosts.map((post) => post.slug), [ 'chapter', 'article' ]);
  assert.equal(launcherPosts[0].type, 'HandbookChapter');
  assert.equal(launcherPosts[0].body, undefined);
});

test('omitting a search collection preserves the existing recent-post collection in search', () => {
  const { launcherPosts } = renderMenu({});

  assert.deepEqual(launcherPosts.map((post) => post.slug), [ 'article' ]);
});

test('an explicitly empty search collection does not fall back to recent posts', () => {
  const { html, launcherPosts } = renderMenu({ 'searchPosts': [] });

  assert.match(html, /An article/);
  assert.equal(launcherPosts.length, 0);
});
