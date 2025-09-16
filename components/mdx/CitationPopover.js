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
 * Parse citation content for popover display
 */
const parseCitationContent = (citationTexts, citationNumbers, citationKeys, citationText) => {
  if (!citationTexts || !citationNumbers || !citationKeys)
    return citationText || 'Citation not found';

  try {
    const texts = JSON.parse(citationTexts);
    const numbers = JSON.parse(citationNumbers);
    const keys = JSON.parse(citationKeys);

    if (texts.length === 1)
      return `<div class="citation-item citation-single">${texts[0]}</div>`;

    return texts.map((text, index) => `<div class="citation-item citation-multiple" data-citation-key="${keys[index]}">
         <div class="citation-number">${numbers[index]}</div>
         <div class="citation-content">${text}</div>
       </div>`).join('');
  } catch {
    return citationText || 'Citation parsing error';
  }
};

/**
 * Calculate popover position
 */
const calculatePosition = (mouseX, mouseY, popoverWidth, popoverHeight) => {
  const offset = 5; // Reduced offset to position closer to citation
  let left = mouseX + offset;
  let top = mouseY - offset; // Position slightly above cursor

  if (left + popoverWidth > window.innerWidth)
    left = mouseX - popoverWidth - offset;

  if (top + popoverHeight > window.innerHeight)
    top = mouseY - popoverHeight - offset;

  // Ensure minimum distance from edges
  return {
    'left': Math.max(8, Math.min(left, window.innerWidth - popoverWidth - 8)),
    'top': Math.max(8, Math.min(top, window.innerHeight - popoverHeight - 8))
  };
};

/**
 * Update back-link for a citation
 */
const updateCitationBackLink = (citationKey, originCitationId) => {
  const backLink = document.querySelector(`a.citation-back-link[data-citation-key="${citationKey}"]`);

  if (backLink) {
    backLink.href = `#${originCitationId}`;

    // Store in localStorage for persistence
    if (typeof window !== 'undefined')
      window.localStorage.setItem(`citation-last-${citationKey}`, originCitationId);
  }
};

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

      if (target.dataset?.citationPopover !== 'true')
        return;

      event.preventDefault();

      if (timeoutRef.current)
        clearTimeout(timeoutRef.current);

      if (event.type === 'mouseenter') {
        const { citationText, citationTexts, citationNumbers, citationKeys } = target.dataset;
        const displayNumber = target.textContent;
        const content = parseCitationContent(citationTexts, citationNumbers, citationKeys, citationText);

        if (!content)
          return;

        timeoutRef.current = setTimeout(() => {
          setIsReady(false);

          // Use element-based positioning for better accuracy
          const rect = target.getBoundingClientRect();
          const popoverWidth = 400;
          const popoverHeight = citationTexts ? 200 : 120;
          const position = calculatePosition(
            rect.right + 5, rect.top, popoverWidth, popoverHeight
          );

          setPopover({
            content,
            'left': Math.round(position.left),
            'number': displayNumber,
            'originCitationId': target.id,
            'top': Math.round(position.top)
          });

          setTimeout(() => setIsReady(true), 50);
        }, 200);
      } else if (event.type === 'mouseleave') {
        timeoutRef.current = setTimeout(() => {
          setPopover(null);
          setIsReady(false);
        }, 300);
      }
    };

    const handleScroll = () => {
      setPopover(null);
      setIsReady(false);
      if (timeoutRef.current)
        clearTimeout(timeoutRef.current);

    };

    const handleCitationClick = (event) => {
      const citationItem = event.target.closest('.citation-item.citation-multiple');

      if (!citationItem) return;

      const { citationKey } = citationItem.dataset;

      if (citationKey) {
        event.preventDefault();

        // Update the back-link to point to the citation that opened this popover
        if (popover?.originCitationId)
          updateCitationBackLink(citationKey, popover.originCitationId);

        // Navigate to the bibliography entry
        const targetElement = document.getElementById(`citation-${citationKey}`);

        if (targetElement) {
          targetElement.scrollIntoView({ 'block': 'center' });

          // Hide the popover
          setPopover(null);
          setIsReady(false);
        }
      }
    };

    document.addEventListener('mouseenter', handleCitationHover, true);
    document.addEventListener('mouseleave', handleCitationHover, true);
    document.addEventListener('click', handleCitationClick, true);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      document.removeEventListener('mouseenter', handleCitationHover, true);
      document.removeEventListener('mouseleave', handleCitationHover, true);
      document.removeEventListener('click', handleCitationClick, true);
      window.removeEventListener('scroll', handleScroll, true);
      if (timeoutRef.current)
        clearTimeout(timeoutRef.current);

    };
  }, []);

  if (!popover)
    return null;

  return (
    <div
      ref={ popoverRef }
      className={ `citation-popover fixed z-[9999] ${isReady ? 'ready' : ''}` }
      style={{
        'left': `${popover.left}px`,
        'top': `${popover.top}px`
      }}
      onMouseEnter={ () => {
        if (timeoutRef.current)
          clearTimeout(timeoutRef.current);

      } }
      onMouseLeave={ () => {
        timeoutRef.current = setTimeout(() => {
          setPopover(null);
          setIsReady(false);
        }, 150);
      } }
    >
      <div className='citation-popover-content'>
        <div
          className='citation-popover-body'
          dangerouslySetInnerHTML={{ '__html': popover.content }}
        />
      </div>
    </div>
  );
};

export default CitationPopover;
