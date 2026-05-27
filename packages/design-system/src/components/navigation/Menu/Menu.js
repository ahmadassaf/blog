/**
 * Main Navigation Menu Component
 *
 * @description The primary navigation component that renders the main menu bar with logo, navigation links,
 * theme switcher, search functionality, and mobile menu. Adapts its content based on the current route
 * and provides access to the command launcher interface.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

import { React, useMemo, useState } from 'react';
import { allPosts, allProjects, allThoughts } from 'contentlayer/generated';
import { usePathname } from 'next/navigation';

import categories from '@/app/content/categories';
import publications from '@/app/content/publications';
import tags from '@/app/content/tags';
import CommandLauncher from '@/components/command/CmdLauncher';
import Button from '@/components/core/Button';
import Icon from '@/components/core/Icon';
import Link from '@/components/core/Link';
import MenuBlog from '@/components/navigation/MenuBlog';
import ThemeLogo from '@/components/navigation/MenuLogo';
import MenuMain from '@/components/navigation/MenuMain';
import MenuMobile from '@/components/navigation/MenuMobile';
import MenuSearch from '@/components/navigation/MenuSearch';
import ThemeSwitch from '@/components/utilities/ThemeSwitcher';
import siteMetadata from '@/data/meta/metadata';
import NavigationMetadata from '@/data/meta/navigationMetadata';
import { coreContent, sortPosts } from '@/lib/utils/contentlayer';

/**
 * Main navigation menu component
 *
 * @description Renders the primary navigation bar with responsive design, including logo, navigation links,
 * theme switcher, search functionality, and mobile menu. The component adapts its menu items based on
 * the current route and integrates with the command launcher for enhanced navigation.
 *
 * @returns {JSX.Element} The rendered navigation menu component
 *
 * @example
 * <Menu />
 */
const Menu = () => {
  const path = usePathname();

  // Memoize expensive operations
  const posts = useMemo(() => {
    const sortedPosts = sortPosts(allPosts);

    return coreContent(sortedPosts);
  }, []);

  const projects = useMemo(() => coreContent(sortPosts(allProjects)), []);
  const thoughts = useMemo(() => coreContent(sortPosts(allThoughts)), []);

  const [ mobileMenuOpen, setMobileMenuOpen ] = useState(false);
  const [ LauncherOpen, LauncherSetOpen ] = useState(false);

  return (<nav className='flex min-h-20 items-center justify-between gap-5 py-6'>

    <Link href='/' aria-label={ siteMetadata.author.name } variant='bare' className='shrink-0 text-gray-950 dark:text-white'>
      <ThemeLogo />
    </Link>

    <div className='flex min-w-0 items-center gap-3 lg:gap-5'>
      <ul className='hidden items-center gap-5 lg:flex xl:gap-7'>
        {NavigationMetadata.links.map((link) => {
          if (
            (link.hideInPath === '*' && !path.includes(link.showInPath)) || path.includes(link.hideInPath)) return null;

          return (
            <li key={ link.href }>
              <Link href={ link.href } className='whitespace-nowrap px-1 py-2 text-sm font-medium lg:text-base'>
                {link.title}
              </Link>
            </li>
          );
        })}

        { !path.includes('/blog') && (<MenuMain categories={ categories } allPosts={ posts }></MenuMain>) }
        { path.includes('/blog') && (<MenuBlog categories={ categories }></MenuBlog>) }
      </ul>

      <MenuSearch className='hidden lg:block' setOpen={ LauncherSetOpen }></MenuSearch>

      <ThemeSwitch />

      <div className='flex lg:hidden'>
        <Button variant='ghost' tone='gray' size='sm' className='h-10 w-10 p-0' onClick={ () => setMobileMenuOpen(true) }>
          <span className='sr-only'>Open main menu</span>
          <Icon name='Menu' decorative size='md' />
        </Button>
      </div>

      {mobileMenuOpen ? (<MenuMobile categories={ categories } links={ NavigationMetadata.links } setMobileMenuOpen={ setMobileMenuOpen } setLauncherOpen={ LauncherSetOpen } />) : null}
      <CommandLauncher
        tags={ tags }
        projects={ projects }
        posts={ posts }
        thoughts={ thoughts }
        publications={ publications }
        open={ LauncherOpen }
        setOpen={ LauncherSetOpen }
      />
    </div>
  </nav>
  );
};

export default Menu;
