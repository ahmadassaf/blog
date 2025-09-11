/**
 * Footnote Popover Component
 *
 * @description Displays a popover preview of footnotes when hovering over footnote numbers.
 * Works with data attributes added by the rehype-footnote-popover plugin.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Component that adds popover functionality to footnote references
 */
const FootnotePopover = () => {
  const [ popover, setPopover ] = useState(null);
  const [ isReady, setIsReady ] = useState(false);
  const popoverRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleFootnoteHover = (event) => {
      const { target } = event;

      // Check if hovering over a footnote link with popover data
      if (target.dataset?.footnotePopover === 'true') {
        event.preventDefault();

        // Clear any existing timeout
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        if (event.type === 'mouseenter') {

          // Get footnote data from data attributes
          const { footnoteContent } = target.dataset;
          const footnoteNumber = target.dataset.footnoteNumber || target.textContent;

          if (footnoteContent) {

            // Get position of the footnote link
            const rect = target.getBoundingClientRect();

            // Show popover with a slight delay
            timeoutRef.current = setTimeout(() => {
              setIsReady(false);

              // Calculate position, ensuring popover stays on screen
              const viewportWidth = window.innerWidth;
              const popoverWidth = 300; // Approximate width
              let xPos = rect.right + 10;

              // If popover would go off the right edge, position it to the left
              if (xPos + popoverWidth > viewportWidth - 20) xPos = rect.left - popoverWidth - 10;

              setPopover({
                'content': footnoteContent,
                'footnoteNumber': footnoteNumber,
                'x': xPos,
                'y': rect.top + rect.height / 2 // Center vertically
              });

              // Small delay to ensure positioning is applied before showing
              window.requestAnimationFrame(() => {
                setIsReady(true);
              });
            }, 300);
          }
        } else if (event.type === 'mouseleave') {

          // Hide popover with a slight delay to allow moving to popover
          timeoutRef.current = setTimeout(() => {
            setIsReady(false);
            setPopover(null);
          }, 200);
        }
      }
    };

    // Add listeners to the document body for all footnote links
    document.body.addEventListener('mouseenter', handleFootnoteHover, true);
    document.body.addEventListener('mouseleave', handleFootnoteHover, true);

    return () => {
      document.body.removeEventListener('mouseenter', handleFootnoteHover, true);
      document.body.removeEventListener('mouseleave', handleFootnoteHover, true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Handle popover hover to keep it visible
  const handlePopoverEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handlePopoverLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsReady(false);
      setPopover(null);
    }, 200);
  };

  if (!popover) return null;

  return (
    <div
      ref={ popoverRef }
      className={ `footnote-popover ${isReady ? 'ready' : ''}` }
      style={{
        'left': `${popover.x}px`,
        'position': 'fixed',
        'top': `${popover.y}px`,
        'transform': 'translateY(-50%)',
        'zIndex': 9999
      }}
      onMouseEnter={ handlePopoverEnter }
      onMouseLeave={ handlePopoverLeave }
    >
      <div className='footnote-popover-content'>
        <div className='footnote-popover-body' dangerouslySetInnerHTML={{ '__html': popover.content }} />
      </div>
    </div>
  );
};

export default FootnotePopover;
