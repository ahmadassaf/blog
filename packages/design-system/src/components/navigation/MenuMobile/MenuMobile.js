/**
 * MenuMobile Component
 *
 * @description Mobile responsive navigation menu component that provides a full-screen overlay
 * navigation experience for mobile devices. Features categories, navigation links, search functionality,
 * and newsletter signup. Includes proper accessibility attributes and smooth animations.
 * Only visible on mobile/tablet devices (hidden on desktop).
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import React from 'react';

import Button from '@/components/core/Button';
import Icon from '@/components/core/Icon';
import Link from '@/components/core/Link';
import NewsletterForm from '@/components/forms/NewsletterForm';
import MenuSearch from '@/components/navigation/MenuSearch';

/**
 * Renders a full-screen mobile navigation menu
 *
 * @description Comprehensive mobile menu that overlays the entire screen when opened.
 * Features a search bar (on small screens), close button, blog categories with descriptions,
 * main navigation links, and a newsletter signup form. The menu uses proper semantic HTML
 * with ARIA attributes for accessibility and includes dark mode support.
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.categories - Array of blog category objects
 * @param {string} props.categories[].id - Unique identifier for the category
 * @param {string} props.categories[].title - Display title of the category
 * @param {string} props.categories[].description - Brief description of the category
 * @param {Array<Object>} props.links - Array of main navigation link objects
 * @param {string} props.links[].href - URL for the navigation link
 * @param {string} props.links[].title - Display text for the navigation link
 * @param {Function} props.setMobileMenuOpen - Function to close the mobile menu
 * @param {Function} props.setLauncherOpen - Function to open the search/command launcher
 *
 * @returns {JSX.Element} Full-screen mobile navigation menu overlay
 *
 * @example
 * // Basic usage in mobile navigation
 * const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 * const [isLauncherOpen, setIsLauncherOpen] = useState(false);
 *
 * <MenuMobile
 *   categories={blogCategories}
 *   links={navigationLinks}
 *   setMobileMenuOpen={setIsMobileMenuOpen}
 *   setLauncherOpen={setIsLauncherOpen}
 * />
 *
 * @example
 * // Menu automatically hides on desktop (lg:hidden class)
 * // and provides full navigation for mobile users
 */
const MenuMobile = ({ categories, links, setMobileMenuOpen, setLauncherOpen }) => {
  const dialogRef = React.useRef(null);
  const closeButtonRef = React.useRef(null);
  const previouslyFocusedElementRef = React.useRef(null);

  React.useEffect(() => {
    previouslyFocusedElementRef.current = document.activeElement;
    closeButtonRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);

        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusableElements = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];

      if (!firstFocusableElement || !lastFocusableElement) {
        event.preventDefault();

        return;
      }

      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      previouslyFocusedElementRef.current?.focus?.();
    };
  }, [ setMobileMenuOpen ]);

  return (
    <div ref={ dialogRef } className='lg:hidden' role='dialog' aria-modal='true' aria-label='Mobile navigation'>

      <div className='fixed inset-y-0 right-0 z-1000 w-full overflow-y-auto bg-white px-6 py-8 shadow-sm dark:bg-gray-900 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
        <div className='mb-10 flex items-start justify-between gap-4'>
          <div className='w-full'>
            <MenuSearch className='w-full sm:w-full' setOpen={ setLauncherOpen }></MenuSearch>
          </div>
          <Button ref={ closeButtonRef } variant='ghost' tone='gray' size='sm' className='h-10 w-10 shrink-0 p-0' onClick={ () => setMobileMenuOpen(false) }>
            <span className='sr-only'>Close menu</span>
            <Icon name='X' decorative size='md' />
          </Button>
        </div>
        <div className='flow-root'>
          <div className='-my-6 divide-y divide-gray-500/10'>
            <div className='space-y-2 pb-6'>

              <Link href={ `/blog` } onClick={ () => setMobileMenuOpen(false) } className='-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-gray-900 hover:bg-blue-50 dark:text-white dark:hover:text-gray-900'>Blog</Link>
              <div className='-mx-3'>

                <div className='mt-2 space-y-2' id='disclosure-1'>
                  {categories.map((category) => (
                    <Link key={ category.id } href={ `/blog/categories/${category.id}` } onClick={ () => setMobileMenuOpen(false) } className='group capitalize block rounded-lg py-2 pl-6 pr-3 text-sm font-medium leading-7 text-gray-900 hover:bg-blue-50 dark:text-white dark:hover:text-gray-900'>{category.title.replace('-', ' ')}
                      <p className='mt-1 text-gray-600 font-light text-s dark:text-gray-100 dark:group-hover:text-gray-600'>{category.description}</p>
                    </Link>
                  ))}
                </div>

              </div>

              {links.slice(1, links.length).map((link) => (
                <Link key={ link.href } href={ link.href } onClick={ () => setMobileMenuOpen(false) } className='-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-gray-900 hover:bg-blue-50 dark:text-white dark:hover:text-gray-900 whitespace-nowrap'>{link.title}</Link>
              ))}

            </div>

            <div>
              <NewsletterForm />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuMobile;
