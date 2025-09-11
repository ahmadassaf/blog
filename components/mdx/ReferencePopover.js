/**
 * Reference Popover Component
 *
 * @description Displays a popover preview of references when hovering over citation numbers.
 * Automatically extracts reference content from the page and shows it in a tooltip.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Component that adds popover functionality to reference citations
 */
const ReferencePopover = () => {
  const [ popover, setPopover ] = useState(null);
  const popoverRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleCitationHover = (event) => {
      const { target } = event;

      // Check if hovering over a citation link (bibliography references)
      if (target.tagName === 'A' && target.href && target.href.includes('#bib-')) {
        event.preventDefault();

        // Clear any existing timeout
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        if (event.type === 'mouseenter') {

          // Extract citation ID from href
          const citationId = target.href.split('#')[1];
          const referenceElement = document.getElementById(citationId);

          if (referenceElement) {

            // Get the reference text from the csl-right-inline element
            const textElement = referenceElement.querySelector('.csl-right-inline');
            let referenceText = textElement ? textElement.textContent : referenceElement.textContent;

            // Get the citation number from csl-left-margin
            const numberElement = referenceElement.querySelector('.csl-left-margin');
            const citationNumber = numberElement ? numberElement.textContent.replace(/[[\]]/g, '') : target.textContent;

            // Clean up the text (remove extra whitespace)
            referenceText = (referenceText || '')
              .replace(/\s+/g, ' ')
              .trim();

            // Get position of the citation link
            const rect = target.getBoundingClientRect();

            // Show popover with a slight delay
            timeoutRef.current = setTimeout(() => {
              setPopover({
                'citationNumber': citationNumber,
                'content': referenceText,
                'x': rect.left + rect.width / 2,
                'y': rect.top
              });
            }, 300);
          }
        } else if (event.type === 'mouseleave') {

          // Hide popover with a slight delay to allow moving to popover
          timeoutRef.current = setTimeout(() => {
            setPopover(null);
          }, 200);
        }
      }
    };

    // Add listeners to the document body for all citation links
    document.body.addEventListener('mouseenter', handleCitationHover, true);
    document.body.addEventListener('mouseleave', handleCitationHover, true);

    return () => {
      document.body.removeEventListener('mouseenter', handleCitationHover, true);
      document.body.removeEventListener('mouseleave', handleCitationHover, true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

    };
  }, []);

  // Handle popover hover to keep it visible
  const handlePopoverEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

  };

  const handlePopoverLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setPopover(null);
    }, 200);
  };

  if (!popover) return null;

  return (
    <div
      ref={ popoverRef }
      className='reference-popover'
      style={{
        'left': `${popover.x}px`,
        'position': 'fixed',
        'top': `${popover.y - 10}px`,
        'transform': 'translate(-50%, -100%)',
        'zIndex': 9999
      }}
      onMouseEnter={ handlePopoverEnter }
      onMouseLeave={ handlePopoverLeave }
    >
      <div className='reference-popover-content'>
        <div className='reference-popover-arrow' />
        <div className='reference-popover-header'>
          Reference {popover.citationNumber}
        </div>
        <div className='reference-popover-body'>
          {popover.content}
        </div>
      </div>
    </div>
  );
};

export default ReferencePopover;
