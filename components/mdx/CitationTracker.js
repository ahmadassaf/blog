/**
 * Citation Tracker Component
 *
 * @description Tracks the last clicked citation and updates back-links dynamically.
 * Ensures that the bibliography back-link (↩) always returns to the most recently
 * visited citation instance.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

import { useEffect } from 'react';

/**
 * Component that tracks citation clicks and updates back-link targets
 */
const CitationTracker = () => {
  useEffect(() => {
    const handleCitationClick = (event) => {

      // Handle both direct citation clicks and navigation to bibliography
      const citationLink = event.target.closest('a[data-citation-popover="true"]');
      const bibliographyLink = event.target.closest('a[href^="#citation-"]');

      if (citationLink) {

        // Direct citation click - update back-links to remember this instance
        const { citationKeys } = citationLink.dataset;
        const citationId = citationLink.id;

        if (!citationKeys || !citationId) return;

        try {
          const keys = JSON.parse(citationKeys);

          // Update back-links for all citations that were clicked
          keys.forEach((key) => {
            const backLink = document.querySelector(`a.citation-back-link[data-citation-key="${key}"]`);

            if (backLink) {

              // Update the href to point to this specific citation instance
              backLink.href = `#${citationId}`;

              // Store the last visited instance in localStorage for persistence
              if (typeof window !== 'undefined') {
                window.localStorage.setItem(`citation-last-${key}`, citationId);
              }
            }
          });
        } catch (error) {
          console.warn('Error parsing citation keys:', error);
        }
      } else if (bibliographyLink && !event.target.closest('.citation-back-link')) {

        /*
         * Navigation from citation to bibliography - don't update tracking
         * This allows users to click citation numbers in popovers without affecting back-links
         */
      }
    };

    const handlePopoverClick = (event) => {
      const citationItem = event.target.closest('.citation-item.citation-multiple');

      if (!citationItem) return;

      const { citationKey } = citationItem.dataset;

      if (!citationKey) return;

      // Find the most recent citation instance for this key from localStorage
      const lastInstanceId = typeof window !== 'undefined'
        ? window.localStorage.getItem(`citation-last-${citationKey}`)
        : null;

      if (lastInstanceId) {
        const backLink = document.querySelector(`a.citation-back-link[data-citation-key="${citationKey}"]`);

        if (backLink) {
          backLink.href = `#${lastInstanceId}`;
        }
      }
    };

    // Initialize back-links from localStorage on page load
    const initializeBackLinks = () => {
      const backLinks = document.querySelectorAll('a.citation-back-link[data-citation-key]');

      backLinks.forEach((backLink) => {
        const { citationKey } = backLink.dataset;
        const lastInstanceId = typeof window !== 'undefined'
          ? window.localStorage.getItem(`citation-last-${citationKey}`)
          : null;

        if (lastInstanceId && document.getElementById(lastInstanceId)) {
          backLink.href = `#${lastInstanceId}`;
        }
      });
    };

    // Add event listeners
    document.addEventListener('click', handleCitationClick, true);
    document.addEventListener('click', handlePopoverClick, true);

    // Initialize on load
    initializeBackLinks();

    return () => {
      document.removeEventListener('click', handleCitationClick, true);
      document.removeEventListener('click', handlePopoverClick, true);
    };
  }, []);

  return null; // This component renders nothing
};

export default CitationTracker;