'use client';

import { useLayoutEffect, useRef } from 'react';

const contentSelector = 'h2, h3, h4, h5, h6, [data-slot="table-container"], [data-slot="code-block-viewport"]';

export default function HandbookBody({ children, className }) {
  const body = useRef(null);

  useLayoutEffect(() => {

    // Gaudi supplies the scroll regions. Name them after their surrounding handbook headings.
    let heading = '';
    const counts = new Map();

    for (const element of body.current.querySelectorAll(contentSelector)) {
      if (element.matches('h2, h3, h4, h5, h6')) {
        heading = element.textContent.trim();
        continue;
      }

      if (!heading || element.getAttribute('role') !== 'region') continue;

      const kind = element.dataset.slot === 'table-container' ? 'Table' : 'Code block';
      const name = `${kind}: ${heading}`;
      const count = (counts.get(name) || 0) + 1;

      counts.set(name, count);
      element.setAttribute('aria-label', count > 1 ? `${name} (${count})` : name);
    }
  }, []);

  return <div ref={ body } className={ className }>{children}</div>;
}
