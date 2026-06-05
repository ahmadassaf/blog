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

import LatexText from '@/components/mdx/LatexText';

import styles from './CitationPopover.module.css';

const readJsonArray = (value) => {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const getBackLink = (citationKey) => {
  const backLinks = document.querySelectorAll('a.citation-back-link[data-citation-key]');

  return Array.from(backLinks).find((backLink) => backLink.dataset.citationKey === citationKey) || null;
};

const setStoredCitation = (citationKey, originCitationId) => {
  try {
    window.localStorage.setItem(`citation-last-${citationKey}`, originCitationId);
  } catch {

    // Storage can be unavailable in private or restricted browser contexts.
  }
};

const normalizeCitationGroupMarkers = () => {
  const citationGroups = document.querySelectorAll('a.citation-link.citation-group[data-citation-popover="true"]');

  citationGroups.forEach((citationGroup) => {
    if (citationGroup.querySelector('[data-citation-marker-number]')) return;

    const numbers = readJsonArray(citationGroup.dataset.citationNumbers);

    if (!numbers.length) return;

    citationGroup.textContent = '';
    numbers.forEach((number) => {
      const marker = document.createElement('span');

      marker.dataset.citationMarkerNumber = 'true';
      marker.textContent = String(number);
      citationGroup.appendChild(marker);
    });
  });
};

/**
 * Parse citation content for popover display
 */
const parseCitationContent = (citationTexts, citationNumbers, citationKeys, citationText) => {
  if (!citationTexts || !citationNumbers || !citationKeys)
    return { 'content': citationText || 'Citation not found', 'type': 'text' };

  try {
    const texts = readJsonArray(citationTexts);
    const numbers = readJsonArray(citationNumbers);
    const keys = readJsonArray(citationKeys);

    if (texts.length === 0)
      return { 'content': citationText || 'Citation not found', 'type': 'text' };

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

const calculatePosition = (targetRect, popoverWidth, popoverHeight) => {
  const margin = 12;
  const offset = 8;
  const centerX = targetRect.left + (targetRect.width / 2);
  const below = targetRect.bottom + offset;
  const above = targetRect.top - popoverHeight - offset;

  let left = centerX - (popoverWidth / 2);
  let top = below;

  if (below + popoverHeight > window.innerHeight - margin && above > margin)
    top = above;

  left = Math.max(margin, Math.min(left, window.innerWidth - popoverWidth - margin));
  top = Math.max(margin, Math.min(top, window.innerHeight - popoverHeight - margin));

  return { left, top };
};

/**
 * Update back-link for a citation and make it visible
 */
const updateCitationBackLink = (citationKey, originCitationId) => {
  const backLink = getBackLink(citationKey);

  if (backLink) {

    // Update href to point to the specific clicked instance
    backLink.href = `#${originCitationId}`;

    // Show the back-link (it's hidden by default)
    backLink.style.display = 'inline-block';

    // Add a visual indicator that this citation was recently accessed
    backLink.setAttribute('data-recently-clicked', 'true');

    // Store in localStorage for persistence
    if (typeof window !== 'undefined')
      setStoredCitation(citationKey, originCitationId);
  }
};

/**
 * Hide back-link after it's been used
 */
const hideBackLink = (citationKey) => {
  const backLink = getBackLink(citationKey);

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
  const popoverRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    normalizeCitationGroupMarkers();

    // Handle back-link clicks to hide them after use
    const handleBackLinkClick = (event) => {
      const backLink = event.target.closest('a.citation-back-link');

      if (!backLink) return;

      const citationKey = backLink.getAttribute('data-citation-key');

      if (citationKey)

        // Small delay to allow navigation to complete, then hide the back-link
        setTimeout(() => {
          hideBackLink(citationKey);
        }, 100);

    };

    // Handle direct citation link clicks (when user clicks citation number)
    const handleCitationLinkClick = (event) => {
      const citationLink = event.target.closest('a.citation-link');

      if (!citationLink) return;

      // Extract citation key from href or data attributes
      const href = citationLink.getAttribute('href');
      const citationKeys = citationLink.getAttribute('data-citation-keys');

      if (citationKeys) {
        const keys = readJsonArray(citationKeys);
        const originId = citationLink.id || citationLink.getAttribute('id');

        if (keys.length > 0 && originId) {
          keys.forEach((key) => updateCitationBackLink(key, originId));

          if (href?.startsWith('#citation-group-')) {
            event.preventDefault();
            document.getElementById(`citation-${keys[0]}`)?.scrollIntoView({ 'block': 'center' });
          }
        }
      } else if (href && href.startsWith('#citation-')) {
        const citationKey = href.replace('#citation-', '').replace(/^group-\d+-/, '');
        const originId = citationLink.id || citationLink.getAttribute('id');

        if (citationKey && originId)

          // Update back-link to point to this specific clicked instance
          updateCitationBackLink(citationKey, originId);
      }
    };

    const handleCitationHover = (event) => {
      let target = event.target.closest?.('[data-citation-popover="true"]');

      if (event.currentTarget?.matches?.('[data-citation-popover="true"]'))
        target = event.currentTarget;

      if (!target)
        return;

      event.preventDefault();

      if (timeoutRef.current)
        clearTimeout(timeoutRef.current);

      if (event.type === 'pointerenter' || event.type === 'pointermove' || event.type === 'mouseenter' || event.type === 'mousemove' || event.type === 'mouseover' || event.type === 'focus') {
        const { citationText, citationTexts, citationNumbers, citationKeys } = target.dataset;
        const displayNumber = target.textContent;
        const parsedContent = parseCitationContent(citationTexts, citationNumbers, citationKeys, citationText);

        if (!parsedContent)
          return;

        // Use element-based positioning for better accuracy
        const rect = target.getBoundingClientRect();
        const itemCount = readJsonArray(citationNumbers).length || 1;
        const popoverWidth = itemCount > 1 ? 420 : 360;
        const popoverHeight = itemCount > 1 ? Math.min(320, 96 + (itemCount * 86)) : 150;
        const position = calculatePosition(rect, popoverWidth, popoverHeight);

        setPopover({
          'content': parsedContent,
          'left': Math.round(position.left),
          'number': displayNumber,
          'originCitationId': target.id,
          'top': Math.round(position.top)
        });
      } else if (event.type === 'blur') {
        timeoutRef.current = setTimeout(() => {
          setPopover(null);
        }, 300);
      } else if (event.type === 'pointerleave' || event.type === 'mouseleave' || event.type === 'mouseout') {
        if (event.relatedTarget && target.contains(event.relatedTarget))
          return;

        timeoutRef.current = setTimeout(() => {
          setPopover(null);
        }, 300);
      }
    };

    const handleScroll = () => {
      setPopover(null);
      if (timeoutRef.current)
        clearTimeout(timeoutRef.current);

    };

    const handleCitationClick = (event) => {
      const citationItem = event.target.closest('[data-citation-popover-item="multiple"]');

      if (!citationItem) return;

      const { citationKey } = citationItem.dataset;

      if (citationKey) {
        event.preventDefault();

        // Update the back-link ONLY for the specific citation that was clicked
        if (popover?.originCitationId)
          updateCitationBackLink(citationKey, popover.originCitationId);

        // Navigate to the bibliography entry
        const targetElement = document.getElementById(`citation-${citationKey}`);

        if (targetElement) {
          targetElement.scrollIntoView({ 'block': 'center' });

          // Hide the popover
          setPopover(null);
        }
      }
    };

    const citationLinks = new Set();
    const bindCitationLink = (citationLink) => {
      if (citationLinks.has(citationLink)) return;

      citationLinks.add(citationLink);
      citationLink.dataset.citationPopoverBound = 'true';
      citationLink.onmouseover = handleCitationHover;
      citationLink.onmousemove = handleCitationHover;
      citationLink.onmouseout = handleCitationHover;
      citationLink.onmouseenter = handleCitationHover;
      citationLink.onmouseleave = handleCitationHover;
      citationLink.onfocus = handleCitationHover;
      citationLink.onblur = handleCitationHover;
      citationLink.addEventListener('mouseover', handleCitationHover);
      citationLink.addEventListener('mousemove', handleCitationHover);
      citationLink.addEventListener('mouseout', handleCitationHover);
      citationLink.addEventListener('pointerenter', handleCitationHover);
      citationLink.addEventListener('pointermove', handleCitationHover);
      citationLink.addEventListener('pointerleave', handleCitationHover);
      citationLink.addEventListener('focus', handleCitationHover);
      citationLink.addEventListener('blur', handleCitationHover);
    };

    const bindCitationLinks = () => {
      normalizeCitationGroupMarkers();
      document.querySelectorAll('[data-citation-popover="true"]').forEach(bindCitationLink);
    };

    bindCitationLinks();

    const bindTimer = window.setTimeout(bindCitationLinks, 0);
    const observer = new MutationObserver(bindCitationLinks);

    if (document.body)
      observer.observe(document.body, { 'childList': true, 'subtree': true });

    document.addEventListener('mouseover', handleCitationHover, true);
    document.addEventListener('mousemove', handleCitationHover, true);
    document.addEventListener('mouseout', handleCitationHover, true);
    document.addEventListener('pointermove', handleCitationHover, true);
    document.addEventListener('click', handleCitationClick, true);
    document.addEventListener('click', handleCitationLinkClick, true);
    document.addEventListener('click', handleBackLinkClick, true);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.clearTimeout(bindTimer);
      observer.disconnect();

      citationLinks.forEach((citationLink) => {
        citationLink.removeEventListener('mouseover', handleCitationHover);
        citationLink.removeEventListener('mousemove', handleCitationHover);
        citationLink.removeEventListener('mouseout', handleCitationHover);
        citationLink.removeEventListener('pointerenter', handleCitationHover);
        citationLink.removeEventListener('pointermove', handleCitationHover);
        citationLink.removeEventListener('pointerleave', handleCitationHover);
        citationLink.removeEventListener('focus', handleCitationHover);
        citationLink.removeEventListener('blur', handleCitationHover);
        citationLink.onmouseover = null;
        citationLink.onmousemove = null;
        citationLink.onmouseout = null;
        citationLink.onmouseenter = null;
        citationLink.onmouseleave = null;
        citationLink.onfocus = null;
        citationLink.onblur = null;
        delete citationLink.dataset.citationPopoverBound;
      });

      document.removeEventListener('mouseover', handleCitationHover, true);
      document.removeEventListener('mousemove', handleCitationHover, true);
      document.removeEventListener('mouseout', handleCitationHover, true);
      document.removeEventListener('pointermove', handleCitationHover, true);
      document.removeEventListener('click', handleCitationClick, true);
      document.removeEventListener('click', handleCitationLinkClick, true);
      document.removeEventListener('click', handleBackLinkClick, true);
      window.removeEventListener('scroll', handleScroll, true);
      if (timeoutRef.current)
        clearTimeout(timeoutRef.current);

    };
  }, [ popover ]);

  return (
    <div data-gaudi-citation-popover-root='true'>
      {popover ? (
        <div
          ref={ popoverRef }
          className={ `${styles.popover} ${styles.ready}` }
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
            }, 150);
          } }
        >
          <div className={ styles.content }>
            <div className={ styles.body }>
              {popover.content.type === 'single' && (
                <div className={ styles.item }>
                  <LatexText>{popover.content.content}</LatexText>
                </div>
              )}

              {popover.content.type === 'multiple' && (
                popover.content.items.map((item, index) => (
                  <div
                    key={ index }
                    className={ `${styles.item} ${styles.multiple}` }
                    data-citation-key={ item.key }
                    data-citation-popover-item='multiple'
                    role='link'
                    tabIndex={ 0 }
                    onKeyDown={ (event) => {
                      if (event.key === 'Enter' || event.key === ' ') event.currentTarget.click();
                    } }
                  >
                    <div className={ styles.number }>{item.number}</div>
                    <div className={ styles.citationContent }>
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
      ) : null}
    </div>
  );
};

export default CitationPopover;
