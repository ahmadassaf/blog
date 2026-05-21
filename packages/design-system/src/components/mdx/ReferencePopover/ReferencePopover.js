'use client';

import CitationPopover from '@/components/mdx/CitationPopover';

/**
 * Compatibility export for legacy MDX references.
 *
 * References and citations share the same data-attribute contract:
 * data-citation-popover, data-citation-text(s), data-citation-number(s),
 * and data-citation-key(s). Keep one runtime implementation so hover,
 * keyboard, and back-link behavior cannot drift.
 */
const ReferencePopover = CitationPopover;

export default ReferencePopover;
