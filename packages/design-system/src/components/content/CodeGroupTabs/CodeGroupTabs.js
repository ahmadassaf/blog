/**
 * Code Group Tabs Component
 *
 * @description Client-side React component to handle code group tab functionality.
 * Replaces the static JavaScript approach with proper React lifecycle management
 * for Next.js client-side routing compatibility.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

import { useEffect, useState } from 'react';

import styles from './CodeGroupTabs.module.css';

/**
 * Initializes code group tab functionality for all code groups on the page
 *
 * @description This component runs on every page load and navigation to ensure
 * code group tabs work correctly with Next.js client-side routing. It finds all
 * rehype-code-group elements and attaches click handlers for tab switching.
 *
 * @returns {null} This component doesn't render anything
 *
 * @example
 * // Include in layout or page components
 * <CodeGroupTabs />
 */
const CodeGroupTabs = () => {
  const [ isClient, setIsClient ] = useState(false);

  // Ensure this only runs on the client after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const initializeCodeGroups = () => {
      const codeGroups = document.querySelectorAll('.rehype-code-group');

      codeGroups.forEach((group) => {

        // Skip if already initialized
        if (group.hasAttribute('data-tabs-initialized')) return;

        group.classList.add(styles.root);

        const tabs = group.querySelectorAll('.rcg-tab');
        const blocks = group.querySelectorAll('.rcg-block');
        let activeTab = group.querySelector('.rcg-tab.active');
        let activeBlock = group.querySelector('.rcg-block.active');

        // Create click handler for this group
        const handleTabClick = (event) => {
          const tab = event.target.closest('.rcg-tab');

          if (!tab) return;

          const index = Array.from(tabs).indexOf(tab);

          if (index === -1) return;

          // Remove active states
          if (activeTab) {
            activeTab.classList.remove('active');
            activeTab.setAttribute('aria-selected', 'false');
          }
          if (activeBlock) {
            activeBlock.classList.remove('active');
            activeBlock.setAttribute('hidden', 'true');
          }

          // Add active states
          tab.classList.add('active');
          tab.setAttribute('aria-selected', 'true');
          blocks[index].classList.add('active');
          blocks[index].removeAttribute('hidden');

          // Update references
          activeTab = tab;
          activeBlock = blocks[index];
        };

        // Attach event listener
        group.addEventListener('click', handleTabClick);

        // Mark as initialized
        group.setAttribute('data-tabs-initialized', 'true');

        // Store cleanup function for later use
        group._tabsCleanup = () => {
          group.removeEventListener('click', handleTabClick);
          group.removeAttribute('data-tabs-initialized');
          group.classList.remove(styles.root);
          delete group._tabsCleanup;
        };
      });
    };

    // Initialize on DOM ready and with multiple fallbacks
    const initialize = () => {
      initializeCodeGroups();
    };

    // Initialize immediately
    initialize();

    // Initialize after DOM content loads
    if (document.readyState === 'loading')
      document.addEventListener('DOMContentLoaded', initialize);

    // Initialize after a small delay to catch any dynamically loaded content
    const timeoutId = setTimeout(initialize, 100);

    // Initialize after page fully loads
    const longerTimeoutId = setTimeout(initialize, 1000);

    // Watch for new content being added (for dynamic loading)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          const hasCodeGroups = Array.from(mutation.addedNodes).some((node) => node.nodeType === 1 && (
            node.classList?.contains('rehype-code-group') ||
              node.querySelector?.('.rehype-code-group')
          ));

          if (hasCodeGroups)
            setTimeout(initialize, 10);

        }
      });
    });

    observer.observe(document.body, {
      'childList': true,
      'subtree': true
    });

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(longerTimeoutId);
      document.removeEventListener('DOMContentLoaded', initialize);
      observer.disconnect();

      // Clean up all initialized code groups
      const codeGroups = document.querySelectorAll('.rehype-code-group[data-tabs-initialized]');

      codeGroups.forEach((group) => {
        if (group._tabsCleanup) group._tabsCleanup();
      });
    };
  }, [ isClient ]); // Run when client state changes

  return null; // This component only attaches behavior and scoped classes to generated code groups
};

export default CodeGroupTabs;
