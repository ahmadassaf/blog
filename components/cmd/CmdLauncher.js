/**
 * Command Launcher Component
 *
 * @description A powerful command palette interface that provides keyboard-driven navigation and search functionality
 * across the entire website. Users can quickly access posts, projects, publications, tags, and various site features
 * using keyboard shortcuts (Cmd/Ctrl + K) or through a searchable interface.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import React, { useState } from 'react';
import CommandPalette, { filterItems, getItemIndex } from '@tmikeladze/react-cmdk';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

import CmdItem from '@/components/cmd/CmdItem';
import { omit } from '@/lib/utils/contentlayer';

// Dynamically import heavy components to reduce initial bundle size
const CmdFooter = dynamic(() => import('@/components/cmd/CmdLauncherFooter'));
const PostsCmd = dynamic(() => import('@/components/cmd/CmdLauncherPosts'));
const PublicationsCmd = dynamic(() => import('@/components/cmd/CmdLauncherPublications'));
const SearchCmd = dynamic(() => import('@/components/cmd/CmdLauncherSearch'));
const SocialCmd = dynamic(() => import('@/components/cmd/CmdLauncherSocial'));
const TagsCmd = dynamic(() => import('@/components/cmd/CmdLauncherTags'));
const ProjectsCmd = dynamic(() => import('@/components/cmd/CmdLaunherProjects'));

import '@tmikeladze/react-cmdk/dist/cmdk.css';

/**
 * Command launcher component that provides a keyboard-driven command palette interface
 *
 * @description Creates a searchable command palette that allows users to quickly navigate to different
 * sections of the website, search through content, and perform various actions. The component supports
 * keyboard shortcuts, theme switching, and contextual search across posts, projects, publications, and tags.
 *
 * @param {Object} props - Component props
 * @param {Array} props.projects - Array of project objects to be searchable
 * @param {Array} props.posts - Array of post objects to be searchable
 * @param {Array} props.publications - Array of publication objects to be searchable
 * @param {Array} props.tags - Array of tag objects to be searchable
 * @param {boolean} props.open - Whether the command palette is currently open
 * @param {Function} props.setOpen - Function to control the open/closed state of the palette
 *
 * @returns {JSX.Element} The rendered command launcher component
 *
 * @example
 * <CommandLauncher
 *   projects={allProjects}
 *   posts={allPosts}
 *   publications={allPublications}
 *   tags={allTags}
 *   open={isOpen}
 *   setOpen={setIsOpen}
 * />
 */
const CommandLauncher = ({ projects, posts, publications, tags, open, setOpen }) => {
  const [ page, setPage ] = useState('root');
  const [ search, setSearch ] = useState('');
  const [ showType ] = useState(false);
  const [ selected, setSelected ] = useState(0);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Prepare collections for launcher
  const prepareLauncherCollection = (collection, type) => {
    collection.forEach((item, key) => {
      if (type !== 'publication') {
        item.id = item.slug;
        item.href = `/blog/${item.slug}`;
      }
      item.type = type;
      item.showType = false;
      item.children = item.title;

      collection[key] = omit(item, [ 'featured', 'filePath', 'readingTime', 'venueType', 'tableOfContents', 'externalLink', 'sameAs', 'draft' ]);
    });
  };

  prepareLauncherCollection(posts, 'post');
  prepareLauncherCollection(projects, 'project');
  prepareLauncherCollection(publications, 'publication');

  React.useEffect(() => {
    const down = (event) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen(!open);
        setPage('root');
      }
    };

    document.addEventListener('keydown', down);

    return () => document.removeEventListener('keydown', down);
  }, [ open, setOpen ]);

  const filteredItems = filterItems(
    [
      {
        'heading': 'Explore content',
        'id': 'cmdLauncher',
        'items': [
          {
            'children': 'Home',
            'cmdIcon': 'HomeIcon',
            'href': '/',
            'id': 'home'
          },
          {
            'children': 'Blog',
            'cmdIcon': 'BookOpenIcon',
            'href': '/blog',
            'id': 'blog'
          },
          {
            'children': 'Projects',
            'closeOnSelect': false,
            'cmdIcon': 'RectangleGroupIcon',
            'id': 'projects',
            'onClick': () => {
              setPage('projects');
              setSearch('');
            }
          },
          {
            'children': 'Posts',
            'closeOnSelect': false,
            'cmdIcon': 'RectangleStackIcon',
            'id': 'posts_list',
            'onClick': () => {
              setPage('posts');
              setSearch('');
            }
          },
          {
            'children': 'Publications',
            'closeOnSelect': false,
            'cmdIcon': 'NewspaperIcon',
            'id': 'publications',
            'onClick': () => {
              setPage('publications');
              setSearch('');
            }
          },
          {
            'children': 'Tags',
            'closeOnSelect': false,
            'cmdIcon': 'TagIcon',
            'id': 'tags',
            'onClick': () => {
              setPage('tags');
              setSearch('');
            }
          }
        ]
      },
      {
        'heading': 'Other',
        'id': 'other',
        'items': [
          {
            'children': 'About me',
            'cmdIcon': 'FingerPrintIcon',
            'href': '/about',
            'id': 'about_me'
          },
          {
            'children': 'Reach out',
            'closeOnSelect': false,
            'cmdIcon': 'IdentificationIcon',
            'id': 'reach_out',
            'onClick': () => {
              setPage('contact');
              setSearch('');
            }
          },
          {
            'children': 'Switch Theme',
            'closeOnSelect': false,
            'cmdIcon': 'ArrowRightOnRectangleIcon',
            'id': 'switch_theme',
            'onClick': () => {
              setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark');
            }
          }
        ]
      },
      {
        'heading': 'Posts',
        'hidden': true,
        'id': 'posts_fullTextSearch',
        'items': posts,
        'options': { 'filterOnListHeading': true }
      },
      {
        'heading': 'Projects',
        'hidden': true,
        'id': 'projects_fullTextSearch',
        'items': projects,
        'options': { 'filterOnListHeading': true }
      },
      {
        'heading': 'Publications',
        'hidden': true,
        'id': 'publications_fullTextSearch',
        'items': publications,
        'options': { 'filterOnListHeading': true }
      },
      {
        'heading': 'Tags',
        'hidden': true,
        'id': 'tags_fullTextSearch',
        'items': tags,
        'options': { 'filterOnListHeading': true }
      }
    ], search
  );

  return (
    <div className={ resolvedTheme === 'dark' ? 'dark' : '' }>
      <CommandPalette
        onChangeSelected={ setSelected }
        onChangeSearch={ setSearch }
        onChangeOpen={ setOpen }
        selected={ selected }
        search={ search }
        showType={ showType }
        isOpen={ open }
        page={ page }
        footer={ <CmdFooter /> }
      >
        <CommandPalette.Page id='root' searchPrefix={ [ 'General' ] }>
          {filteredItems.length ? (
            filteredItems.map((list) => (
              <div key={ `cmd-${list.id}` } className={ search.toLowerCase() === list.heading.toLowerCase() ? 'hidden' : '' }>
                <div className={ list.hidden && !search.length ? 'hidden' : 'visible' }>
                  <CommandPalette.List key={ `cmdPalette-${list.id}` } heading={ list.heading } >
                    {list.items.map(({ id, title, subtitle, category, count, type, children, cmdIcon, ...rest }) => (
                      <CommandPalette.ListItem key={ `cmdPaletteItem-${list.id}-${id}` } index={ getItemIndex(filteredItems, id) } { ...rest }>
                        <CmdItem
                          title={ title }
                          subtitle={ subtitle }
                          category={ category }
                          count={ count }
                          type={ type || 'navigation' }
                          icon={ cmdIcon }
                        >
                          {children}
                        </CmdItem>

                      </CommandPalette.ListItem>
                    ))}
                  </CommandPalette.List>
                </div>
              </div>
            ))
          ) : (<SearchCmd search={ search } content={ [ ...posts, ...projects ] } />)}
        </CommandPalette.Page>

        <ProjectsCmd setPage={ setPage } search={ search } setSearch={ setSearch } projects= { projects } />
        <PostsCmd setPage={ setPage } search={ search } setSearch={ setSearch } posts= { posts } />
        <TagsCmd setPage={ setPage } search={ search } setSearch={ setSearch } tags= { tags } />
        <SocialCmd setPage={ setPage } search={ search } setSearch={ setSearch } />
        <PublicationsCmd setPage={ setPage } search={ search } setSearch={ setSearch } publications= { publications } />

      </CommandPalette>
    </div>
  );
};

export default CommandLauncher;
