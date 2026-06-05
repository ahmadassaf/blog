'use client';

import { useEffect, useMemo, useState } from 'react';
import CommandPaletteModule, { filterItems, getItemIndex } from '@tmikeladze/react-cmdk';
import { useTheme } from 'next-themes';

import Icon, { getIcon } from '@/components/core/Icon';
import Kbd from '@/components/core/Kbd';
import { cn } from '@/components/utilities/cn';

import '@tmikeladze/react-cmdk/dist/cmdk.css';
import styles from './CommandLauncher.module.css';

const CommandPalette = CommandPaletteModule?.default || CommandPaletteModule;

const omit = (item, keys) => {
  const result = { ...item };

  keys.forEach((key) => {
    delete result[key];
  });

  return result;
};

const normalizeSlug = (value = '') => String(value).replace(/^\//, '');

const commandItemProps = ({ closeOnSelect, href, onClick }) => {
  return {
    ...(typeof closeOnSelect === 'boolean' ? { closeOnSelect } : {}),
    ...(href ? { href } : {}),
    ...(onClick ? { onClick } : {})
  };
};

const itemConfig = {
  'navigation': { 'iconColor': 'text-gray-500 dark:text-gray-400' },
  'post': { 'iconColor': 'text-green-600 dark:text-green-400', 'showCategory': true },
  'project': { 'iconColor': 'text-blue-600 dark:text-blue-400', 'showSubtitle': true },
  'publication': { 'iconColor': 'text-yellow-700 dark:text-yellow-300', 'showSubtitle': true },
  'tag': { 'iconColor': 'text-blue-600 dark:text-blue-400', 'showCount': true },
  'thought': { 'iconColor': 'text-indigo-600 dark:text-indigo-400', 'showSubtitle': true }
};

const CmdItem = ({ category, children, count, icon, subtitle, title, type = 'navigation' }) => {
  const config = itemConfig[type] || itemConfig.navigation;
  const IconComponent = icon && getIcon(icon);

  return (
    <div className='group flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/70'>
      {IconComponent ? (
        <Icon name={ icon } size='md' decorative className={ cn('shrink-0', config.iconColor) } />
      ) : null}
      <div className='min-w-0 flex-1'>
        <div className='truncate text-sm font-medium text-gray-950 dark:text-gray-100'>{title || children}</div>
        {config.showSubtitle && subtitle ? (
          <div className='mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400'>{subtitle}</div>
        ) : null}
      </div>
      <div className='flex shrink-0 items-center gap-3 text-xs text-gray-500 dark:text-gray-400'>
        {config.showCategory && category ? <span className='capitalize'>{category.replace(/[-_]/g, ' ')}</span> : null}
        {config.showCount && typeof count !== 'undefined' ? <span>{count} {count === 1 ? 'post' : 'posts'}</span> : null}
        {type === 'project' || type === 'publication' ? <span className='capitalize'>{type}</span> : null}
      </div>
    </div>
  );
};

const LauncherFooter = () => (
  <div className='border-t border-gray-200 bg-white px-3 py-2 dark:border-gray-800 dark:bg-gray-900'>
    <div className='flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400'>
      <span className='hidden items-center gap-1 sm:flex'><Kbd keys='enter' size='xs' /> to select</span>
      <span className='flex items-center gap-1'><Kbd keys='down' size='xs' /><Kbd keys='up' size='xs' /> to navigate</span>
      <span className='flex items-center gap-1'><Kbd keys='escape' size='xs' /> to close / go back</span>
    </div>
  </div>
);

const prepareCollection = (collection, type) => (collection || []).map((item) => {
  const base = {
    ...item,
    'children': item.title || item.display || item.name,
    'id': type === 'publication' ? item.id : item.slug,
    'showType': false,
    'title': item.title || item.display || item.name,
    type
  };

  if (type === 'post')
    return omit({ ...base, 'href': `/blog/${normalizeSlug(item.slug)}` }, [ 'draft', 'externalLink', 'featured', 'filePath', 'readingTime', 'sameAs', 'tableOfContents', 'venueType' ]);

  if (type === 'project')
    return omit({ ...base, 'href': `/blog/projects/${normalizeSlug(item.slug)}`, 'subtitle': item.description || item.summary }, [ 'draft', 'externalLink', 'featured', 'filePath' ]);

  if (type === 'thought')
    return omit({ ...base, 'href': `/thoughts/${normalizeSlug(item.slug)}`, 'subtitle': item.summary || item.description }, [ 'draft', 'featured', 'filePath' ]);

  if (type === 'publication')
    return omit({ ...base, 'href': item.href, 'subtitle': item.venue || item.year }, [ 'sameAs', 'venueType' ]);

  return base;
});

const prepareTags = (tags = []) => tags.map((tag) => {
  return {
    'children': tag.title || tag.display || tag.name,
    'count': tag.count,
    'href': tag.href || `/blog/tags/${normalizeSlug(tag.slug || tag.id)}`,
    'id': tag.slug || tag.id,
    'showType': false,
    'title': tag.title || tag.display || tag.name,
    'type': 'tag'
  };
});

const collectionPageConfig = {
  'posts': { 'heading': 'Posts', 'icon': 'BookOpenIcon', 'label': 'Posts', 'type': 'post' },
  'projects': { 'heading': 'Projects', 'icon': 'RectangleGroupIcon', 'label': 'Projects', 'type': 'project' },
  'publications': { 'heading': 'Publications', 'icon': 'NewspaperIcon', 'label': 'Publications', 'type': 'publication' },
  'tags': { 'heading': 'Tags', 'icon': 'TagIcon', 'label': 'Tags', 'type': 'tag' },
  'thoughts': { 'heading': 'Thoughts', 'icon': 'LightBulbIcon', 'label': 'Thoughts', 'type': 'thought' }
};

const CollectionPage = ({ id, items, search, setPage }) => {
  const config = collectionPageConfig[id];
  const filtered = filterItems([{ 'heading': config.heading, id, items, 'options': { 'filterOnListHeading': true } }], search);

  return (
    <CommandPalette.Page id={ id } searchPrefix={ [ 'General', config.label ] } onEscape={ () => setPage('root') }>
      {filtered.length ? filtered.map((list) => (
        <CommandPalette.List key={ list.id } heading={ list.heading }>
          {list.items.map(({ category, children, count, 'id': itemId, subtitle, title, type, ...rest }) => (
            <CommandPalette.ListItem key={ itemId } index={ getItemIndex(filtered, itemId) } { ...commandItemProps(rest) }>
              <CmdItem title={ title } subtitle={ subtitle } category={ category } count={ count } type={ type || config.type } icon={ config.icon }>
                {children}
              </CmdItem>
            </CommandPalette.ListItem>
          ))}
        </CommandPalette.List>
      )) : <CommandPalette.FreeSearchAction />}
    </CommandPalette.Page>
  );
};

const SocialPage = ({ search, setPage }) => {
  const socialItems = filterItems([
    {
      'heading': 'Contact',
      'id': 'contact',
      'items': [
        { 'children': 'LinkedIn', 'closeOnSelect': false, 'icon': 'UserGroupIcon', 'id': 'linkedin', 'onClick': () => window.open('https://linkedin.com/in/ahmadassaf', '_blank', 'noopener,noreferrer')?.focus(), 'title': 'LinkedIn profile' },
        { 'children': 'Twitter', 'closeOnSelect': false, 'icon': 'ChatBubbleLeftRightIcon', 'id': 'twitter', 'onClick': () => window.open('https://twitter.com/ahmadaassaf', '_blank', 'noopener,noreferrer')?.focus(), 'title': 'Twitter profile' },
        { 'children': 'GitHub', 'closeOnSelect': false, 'icon': 'CodeBracketIcon', 'id': 'github', 'onClick': () => window.open('https://github.com/ahmadassaf', '_blank', 'noopener,noreferrer')?.focus(), 'title': 'GitHub profile' },
        { 'children': 'Mail', 'closeOnSelect': false, 'icon': 'EnvelopeIcon', 'id': 'mail', 'onClick': () => window.open('mailto:ahmad@assaf.website', '_blank', 'noopener,noreferrer')?.focus(), 'title': 'Email Ahmad' }
      ]
    }
  ], search);

  return (
    <CommandPalette.Page id='contact' searchPrefix={ [ 'General', 'Contact' ] } onEscape={ () => setPage('root') }>
      {socialItems.length ? socialItems.map((list) => (
        <CommandPalette.List key={ list.id } heading={ list.heading }>
          {list.items.map(({ children, icon, id, title, ...rest }) => (
            <CommandPalette.ListItem key={ id } index={ getItemIndex(socialItems, id) } { ...commandItemProps(rest) }>
              <CmdItem title={ title } icon={ icon }>{children}</CmdItem>
            </CommandPalette.ListItem>
          ))}
        </CommandPalette.List>
      )) : <CommandPalette.FreeSearchAction />}
    </CommandPalette.Page>
  );
};

const NoResults = ({ search }) => (
  <div className='flex items-center gap-3 p-5 text-sm text-gray-500 dark:text-gray-400'>
    <Icon name='FaceIdError' decorative size='md' />
    <span>No results for “{search}”.</span>
  </div>
);

const CommandLauncher = ({
  open,
  posts = [],
  projects = [],
  publications = [],
  setOpen,
  tags = [],
  thoughts = []
}) => {
  const [ page, setPage ] = useState('root');
  const [ search, setSearch ] = useState('');
  const [ selected, setSelected ] = useState(0);
  const [ isKeyboardMode, setIsKeyboardMode ] = useState(true);
  const { resolvedTheme, setTheme, theme } = useTheme();

  const collections = useMemo(() => {
    return {
      'posts': prepareCollection(posts, 'post'),
      'projects': prepareCollection(projects, 'project'),
      'publications': prepareCollection(publications, 'publication'),
      'tags': prepareTags(tags),
      'thoughts': prepareCollection(thoughts, 'thought')
    };
  }, [ posts, projects, publications, tags, thoughts ]);

  const rootItems = useMemo(() => filterItems([
    {
      'heading': 'Explore content',
      'id': 'cmdLauncher',
      'items': [
        { 'children': 'Home', 'cmdIcon': 'HomeIcon', 'href': '/', 'id': 'home' },
        { 'children': 'Blog', 'cmdIcon': 'BookOpenIcon', 'href': '/blog', 'id': 'blog' },
        { 'children': 'Projects', 'closeOnSelect': false, 'cmdIcon': 'RectangleGroupIcon', 'id': 'projects', 'onClick': () => {
          setPage('projects'); setSearch('');
        } },
        { 'children': 'Posts', 'closeOnSelect': false, 'cmdIcon': 'RectangleStackIcon', 'id': 'posts_list', 'onClick': () => {
          setPage('posts'); setSearch('');
        } },
        { 'children': 'Thoughts', 'closeOnSelect': false, 'cmdIcon': 'LightBulbIcon', 'id': 'thoughts', 'onClick': () => {
          setPage('thoughts'); setSearch('');
        } },
        { 'children': 'Publications', 'closeOnSelect': false, 'cmdIcon': 'NewspaperIcon', 'id': 'publications', 'onClick': () => {
          setPage('publications'); setSearch('');
        } },
        { 'children': 'Tags', 'closeOnSelect': false, 'cmdIcon': 'TagIcon', 'id': 'tags', 'onClick': () => {
          setPage('tags'); setSearch('');
        } }
      ]
    },
    {
      'heading': 'Other',
      'id': 'other',
      'items': [
        { 'children': 'About me', 'cmdIcon': 'FingerPrintIcon', 'href': '/about', 'id': 'about_me' },
        { 'children': 'Reach out', 'closeOnSelect': false, 'cmdIcon': 'IdentificationIcon', 'id': 'reach_out', 'onClick': () => {
          setPage('contact'); setSearch('');
        } },
        { 'children': 'Switch theme', 'closeOnSelect': false, 'cmdIcon': 'ArrowRightOnRectangleIcon', 'id': 'switch_theme', 'onClick': () => setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark') }
      ]
    },
    { 'heading': 'Posts', 'hidden': true, 'id': 'posts_fullTextSearch', 'items': collections.posts, 'options': { 'filterOnListHeading': true } },
    { 'heading': 'Projects', 'hidden': true, 'id': 'projects_fullTextSearch', 'items': collections.projects, 'options': { 'filterOnListHeading': true } },
    { 'heading': 'Thoughts', 'hidden': true, 'id': 'thoughts_fullTextSearch', 'items': collections.thoughts, 'options': { 'filterOnListHeading': true } },
    { 'heading': 'Publications', 'hidden': true, 'id': 'publications_fullTextSearch', 'items': collections.publications, 'options': { 'filterOnListHeading': true } },
    { 'heading': 'Tags', 'hidden': true, 'id': 'tags_fullTextSearch', 'items': collections.tags, 'options': { 'filterOnListHeading': true } }
  ], search), [ collections, resolvedTheme, search, setTheme, theme ]);

  useEffect(() => {
    const down = (event) => {
      if (event.key !== 'k' || (!event.metaKey && !event.ctrlKey)) return;

      event.preventDefault();
      setOpen((currentOpen) => !currentOpen);
      setPage('root');
    };

    document.addEventListener('keydown', down);

    return () => document.removeEventListener('keydown', down);
  }, [ setOpen ]);

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if ([ 'ArrowDown', 'ArrowUp', 'Enter', 'Escape' ].includes(event.key)) setIsKeyboardMode(true);
    };
    const handleMouseMove = () => setIsKeyboardMode(false);

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [ open ]);

  return (
    <div className={ cn(styles.root, resolvedTheme === 'dark' && styles.dark, isKeyboardMode && styles.keyboardMode) }>
      <CommandPalette
        footer={ <LauncherFooter /> }
        isOpen={ open }
        onChangeOpen={ setOpen }
        onChangeSearch={ setSearch }
        onChangeSelected={ setSelected }
        page={ page }
        search={ search }
        selected={ selected }
        showType={ false }
      >
        <CommandPalette.Page id='root' searchPrefix={ [ 'General' ] }>
          {rootItems.length ? rootItems.map((list) => (
            <div key={ `cmd-${list.id}` } className={ search.toLowerCase() === list.heading.toLowerCase() ? 'hidden' : '' }>
              <div className={ list.hidden && !search.length ? 'hidden' : 'visible' }>
                <CommandPalette.List key={ `cmdPalette-${list.id}` } heading={ list.heading }>
                  {list.items.map(({ category, children, cmdIcon, count, id, subtitle, title, type, ...rest }) => (
                    <CommandPalette.ListItem key={ `cmdPaletteItem-${list.id}-${id}` } index={ getItemIndex(rootItems, id) } { ...commandItemProps(rest) }>
                      <CmdItem title={ title } subtitle={ subtitle } category={ category } count={ count } type={ type || 'navigation' } icon={ cmdIcon }>
                        {children}
                      </CmdItem>
                    </CommandPalette.ListItem>
                  ))}
                </CommandPalette.List>
              </div>
            </div>
          )) : <NoResults search={ search } />}
        </CommandPalette.Page>
        <CollectionPage id='projects' setPage={ setPage } search={ search } items={ collections.projects } />
        <CollectionPage id='posts' setPage={ setPage } search={ search } items={ collections.posts } />
        <CollectionPage id='thoughts' setPage={ setPage } search={ search } items={ collections.thoughts } />
        <CollectionPage id='publications' setPage={ setPage } search={ search } items={ collections.publications } />
        <CollectionPage id='tags' setPage={ setPage } search={ search } items={ collections.tags } />
        <SocialPage setPage={ setPage } search={ search } />
      </CommandPalette>
    </div>
  );
};

export default CommandLauncher;
