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

import LatexText from './LatexText';

/**
 * Parse citation content for popover display
 */
const parseCitationContent = (citationTexts, citationNumbers, citationKeys, citationText) => {
  if (!citationTexts || !citationNumbers || !citationKeys)
    return { 'content': citationText || 'Citation not found', 'type': 'text' };

  try {
    const texts = JSON.parse(citationTexts);
    const numbers = JSON.parse(citationNumbers);
    const keys = JSON.parse(citationKeys);

    if (texts.length === 1)
      return { 'content': texts[0], 'type': 'single' };

    return {
      'items': texts.map((text, index) => {
        return {
          'key': keys[index],
          'number': numbers[index],
          text
        };
      }),
      'type': 'multiple'
    };
  } catch {
    return { 'content': citationText || 'Citation parsing error', 'type': 'text' };
  }
};

/**
 * Calculate popover position based on citation element, avoiding cursor overlap
 */
const calculatePosition = (targetRect, popoverWidth, popoverHeight) => {
  const offset = 12; // Increased offset to ensure no overlap with cursor
  const centerY = targetRect.top + (targetRect.height / 2);
  
  // Default to positioning to the right side of the citation
  let left = targetRect.right + offset;
  let top = centerY - (popoverHeight / 2);
  
  // If no space to the right, position to the left
  if (left + popoverWidth > window.innerWidth - 8) {
    left = targetRect.left - popoverWidth - offset;
  }
  
  // If still no space (narrow screen), try above
  if (left < 8) {
    left = targetRect.left + (targetRect.width / 2) - (popoverWidth / 2);
    top = targetRect.top - popoverHeight - offset;
  }
  
  // If no space above, position below
  if (top < 8) {
    left = targetRect.left + (targetRect.width / 2) - (popoverWidth / 2);
    top = targetRect.bottom + offset;
  }
  
  // Final bounds check - ensure popover stays within viewport
  left = Math.max(8, Math.min(left, window.innerWidth - popoverWidth - 8));
  top = Math.max(8, Math.min(top, window.innerHeight - popoverHeight - 8));

  return { left, top };
};

/**
 * Update back-link for a citation and make it visible
 */
const updateCitationBackLink = (citationKey, originCitationId) => {
  const backLink = document.querySelector(`a.citation-back-link[data-citation-key="${citationKey}"]`);

  if (backLink) {
    // Update href to point to the specific clicked instance
    backLink.href = `#${originCitationId}`;
    
    // Show the back-link (it's hidden by default)
    backLink.style.display = 'inline-block';
    
    // Add a visual indicator that this citation was recently accessed
    backLink.setAttribute('data-recently-clicked', 'true');

    // Store in localStorage for persistence
    if (typeof window !== 'undefined')
      window.localStorage.setItem(`citation-last-${citationKey}`, originCitationId);
  }
};

/**
 * Hide back-link after it's been used
 */
const hideBackLink = (citationKey) => {
  const backLink = document.querySelector(`a.citation-back-link[data-citation-key="${citationKey}"]`);
  
  if (backLink) {
    backLink.style.display = 'none';
    backLink.removeAttribute('data-recently-clicked');
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
    // Handle back-link clicks to hide them after use
    const handleBackLinkClick = (event) => {
      const backLink = event.target.closest('a.citation-back-link');
      if (!backLink) return;

      const citationKey = backLink.getAttribute('data-citation-key');
      if (citationKey) {
        // Small delay to allow navigation to complete, then hide the back-link
        setTimeout(() => {
          hideBackLink(citationKey);
        }, 100);
      }
    };

    // Handle direct citation link clicks (when user clicks citation number)
    const handleCitationLinkClick = (event) => {
      const citationLink = event.target.closest('a.citation-link');
      if (!citationLink) return;

      // Extract citation key from href or data attributes
      const href = citationLink.getAttribute('href');
      const citationKeys = citationLink.getAttribute('data-citation-keys');
      
      if (href && href.startsWith('#citation-')) {
        const citationKey = href.replace('#citation-', '').replace(/^group-\d+-/, '');
        const originId = citationLink.id || citationLink.getAttribute('id');
        
        if (citationKey && originId) {
          // Update back-link to point to this specific clicked instance
          updateCitationBackLink(citationKey, originId);
        }
      } else if (citationKeys) {
        // Handle grouped citations
        try {
          const keys = JSON.parse(citationKeys);
          const originId = citationLink.id || citationLink.getAttribute('id');
          
          if (keys && originId) {
            keys.forEach(key => updateCitationBackLink(key, originId));
          }
        } catch (e) {
          console.warn('Failed to parse citation keys:', e);
        }
      }
    };

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
        const parsedContent = parseCitationContent(citationTexts, citationNumbers, citationKeys, citationText);

        if (!parsedContent)
          return;

        timeoutRef.current = setTimeout(() => {
          setIsReady(false);

          // Use element-based positioning for better accuracy
          const rect = target.getBoundingClientRect();
          const popoverWidth = 280; // Matching the max-width from CSS
          const popoverHeight = citationTexts ? 160 : 100;
          const position = calculatePosition(rect, popoverWidth, popoverHeight);


          setPopover({
            'content': parsedContent,
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

        // Update the back-link ONLY for the specific citation that was clicked
        if (popover?.originCitationId) {
          updateCitationBackLink(citationKey, popover.originCitationId);
        }

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
    document.addEventListener('click', handleCitationLinkClick, true);
    document.addEventListener('click', handleBackLinkClick, true);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      document.removeEventListener('mouseenter', handleCitationHover, true);
      document.removeEventListener('mouseleave', handleCitationHover, true);
      document.removeEventListener('click', handleCitationClick, true);
      document.removeEventListener('click', handleCitationLinkClick, true);
      document.removeEventListener('click', handleBackLinkClick, true);
      window.removeEventListener('scroll', handleScroll, true);
      if (timeoutRef.current)
        clearTimeout(timeoutRef.current);

    };
  }, [popover]);

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
        <div className='citation-popover-body'>
          {popover.content.type === 'single' && (
            <div className='citation-item citation-single'>
              <LatexText>{popover.content.content}</LatexText>
            </div>
          )}

          {popover.content.type === 'multiple' && (
            popover.content.items.map((item, index) => (
              <div key={ index } className='citation-item citation-multiple' data-citation-key={ item.key }>
                <div className='citation-number'>{item.number}</div>
                <div className='citation-content'>
                  <LatexText>{item.text}</LatexText>
                </div>
              </div>
            ))
          )}

          {popover.content.type === 'text' && (
            <LatexText>{popover.content.content}</LatexText>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitationPopover;
