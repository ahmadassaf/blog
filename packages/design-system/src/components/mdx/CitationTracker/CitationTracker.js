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

const readCitationKeys = (value) => {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const findBackLink = (citationKey) => {
  const backLinks = document.querySelectorAll('a.citation-back-link[data-citation-key]');

  return Array.from(backLinks).find((backLink) => backLink.dataset.citationKey === citationKey) || null;
};

const getStoredCitation = (citationKey) => {
  try {
    return window.localStorage.getItem(`citation-last-${citationKey}`);
  } catch {
    return null;
  }
};

const setStoredCitation = (citationKey, citationId) => {
  try {
    window.localStorage.setItem(`citation-last-${citationKey}`, citationId);
  } catch {

    // Storage can be unavailable in private or restricted browser contexts.
  }
};

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

        const keys = readCitationKeys(citationKeys);

        // Update back-links for all citations that were clicked
        keys.forEach((key) => {
          const backLink = findBackLink(key);

          if (backLink) {

            // Update the href to point to this specific citation instance
            backLink.href = `#${citationId}`;

            // Store the last visited instance in localStorage for persistence
            if (typeof window !== 'undefined')
              setStoredCitation(key, citationId);
          }
        });
      } else if (bibliographyLink && !event.target.closest('.citation-back-link')) {

        /*
         * Navigation from citation to bibliography - don't update tracking
         * This allows users to click citation numbers in popovers without affecting back-links
         */
      }
    };

    const handlePopoverClick = (event) => {
      const citationItem = event.target.closest('[data-citation-popover-item="multiple"]');

      if (!citationItem) return;

      const { citationKey } = citationItem.dataset;

      if (!citationKey) return;

      // Find the most recent citation instance for this key from localStorage
      const lastInstanceId = typeof window === 'undefined' ? null : getStoredCitation(citationKey);

      if (lastInstanceId) {
        const backLink = findBackLink(citationKey);

        if (backLink)
          backLink.href = `#${lastInstanceId}`;
      }
    };

    // Initialize back-links from localStorage on page load
    const initializeBackLinks = () => {
      const backLinks = document.querySelectorAll('a.citation-back-link[data-citation-key]');

      backLinks.forEach((backLink) => {
        const { citationKey } = backLink.dataset;
        const lastInstanceId = typeof window === 'undefined' ? null : getStoredCitation(citationKey);

        if (lastInstanceId && document.getElementById(lastInstanceId))
          backLink.href = `#${lastInstanceId}`;
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
