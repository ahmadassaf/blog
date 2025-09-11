/**
 * Reference Popover Component
 *
 * @description Displays a popover preview of references when hovering over citation numbers.
 * Works with data attributes added by the rehype-citation-popover plugin.
 *
 * @author Ahmad Assaf
 * @version 2.0.0
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

      // Check if hovering over a citation link with popover data
      if (target.dataset?.citationPopover === 'true') {
        event.preventDefault();

        // Clear any existing timeout
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        if (event.type === 'mouseenter') {

          // Get citation data from data attributes
          const { citationText } = target.dataset;
          const citationNumber = target.dataset.citationNumber || target.textContent;

          if (citationText) {

            // Get position of the citation link
            const rect = target.getBoundingClientRect();

            // Show popover with a slight delay
            timeoutRef.current = setTimeout(() => {
              setPopover({
                'citationNumber': citationNumber,
                'content': citationText,
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
