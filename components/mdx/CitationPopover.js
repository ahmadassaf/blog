/**
 * Citation Popover Component
 *
 * @description Displays a popover preview of citations when hovering over citation numbers.
 * Works with data attributes added by the rehype-simple-citations plugin.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Component that adds popover functionality to citation references
 */
const CitationPopover = () => {
  const [ popover, setPopover ] = useState(null);
  const [ isReady, setIsReady ] = useState(false);
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
          const { citationText, citationTexts, citationNumbers } = target.dataset;
          const displayNumber = target.textContent;

          // Handle both single citations and grouped citations
          let content = '';
          
          if (citationTexts && citationNumbers) {
            // Multiple citations - parse JSON arrays
            try {
              const texts = JSON.parse(citationTexts);
              const numbers = JSON.parse(citationNumbers);
              
              if (texts.length === 1) {
                // Single citation in group - don't show number
                content = `<div class="citation-item citation-single">${texts[0]}</div>`;
              } else {
                // Multiple citations - show numbers with better styling
                content = texts.map((text, index) => 
                  `<div class="citation-item citation-multiple">
                     <div class="citation-number">${numbers[index]}</div>
                     <div class="citation-content">${text}</div>
                   </div>`
                ).join('');
              }
            } catch (e) {
              content = citationText || 'Citation parsing error';
            }
          } else {
            // Single citation - don't show number
            content = citationText || 'Citation not found';
          }

          if (content) {

            // Show popover with a slight delay
            timeoutRef.current = setTimeout(() => {
              setIsReady(false);

              // Get cursor position from the event
              const mouseX = event.clientX;
              const mouseY = event.clientY;
              
              // Calculate position near cursor
              const popoverWidth = 400; // Increased for grouped citations
              const popoverHeight = citationTexts ? 200 : 120; // Dynamic height
              const offset = 10;
              
              let left = mouseX + offset;
              let top = mouseY + offset;
              
              // Adjust if card would go off screen
              if (left + popoverWidth > window.innerWidth) {
                left = mouseX - popoverWidth - offset;
              }
              
              if (top + popoverHeight > window.innerHeight) {
                top = mouseY - popoverHeight - offset;
              }
              
              // Ensure card stays within viewport
              left = Math.max(8, Math.min(left, window.innerWidth - popoverWidth - 8));
              top = Math.max(8, Math.min(top, window.innerHeight - popoverHeight - 8));

              setPopover({
                'content': content,
                'left': Math.round(left),
                'number': displayNumber,
                'top': Math.round(top)
              });

              // Add ready class for animation after a brief delay
              setTimeout(() => setIsReady(true), 50);
            }, 200);
          }
        } else if (event.type === 'mouseleave') {

          // Hide popover with a slight delay to allow moving to popover
          timeoutRef.current = setTimeout(() => {
            setPopover(null);
            setIsReady(false);
          }, 100);
        }
      }
    };

    const handlePopoverHover = (event) => {
      if (event.type === 'mouseenter') {

        // Clear timeout if hovering over popover
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      } else if (event.type === 'mouseleave') {

        // Hide popover when leaving
        setPopover(null);
        setIsReady(false);
      }
    };

    const handleScroll = () => {
      // Hide popover on scroll
      setPopover(null);
      setIsReady(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    // Attach event listeners
    document.addEventListener('mouseenter', handleCitationHover, true);
    document.addEventListener('mouseleave', handleCitationHover, true);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      document.removeEventListener('mouseenter', handleCitationHover, true);
      document.removeEventListener('mouseleave', handleCitationHover, true);
      window.removeEventListener('scroll', handleScroll, true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Render popover if active
  if (!popover) return null;

  return (
    <div
      ref={ popoverRef }
      className={ `citation-popover fixed z-[9999] ${isReady ? 'ready' : ''}` }
      style={{
        'left': `${popover.left}px`,
        'top': `${popover.top}px`
      }}
      onMouseEnter={ (e) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }}
      onMouseLeave={ () => {
        setPopover(null);
        setIsReady(false);
      }}
    >
      <div className='citation-popover-content'>
        <div 
          className='citation-popover-body'
          dangerouslySetInnerHTML={{ __html: popover.content }}
        />
      </div>
    </div>
  );
};

export default CitationPopover;