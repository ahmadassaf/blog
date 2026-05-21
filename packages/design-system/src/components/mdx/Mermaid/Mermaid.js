/**
 * Mermaid Diagram Component
 *
 * @description Renders Mermaid diagrams in MDX content with proper styling and error handling.
 * Supports client-side rendering with proper hydration handling.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

import { useEffect, useRef, useState } from 'react';

// Lazy load mermaid only when component is used
const loadMermaid = async() => {
  const { 'default': mermaid } = await import('mermaid');

  return mermaid;
};

/**
 * Renders a Mermaid diagram from provided chart definition
 *
 * @param {Object} props - Component props
 * @param {string} props.chart - The mermaid chart definition
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.id] - Custom ID for the diagram
 * @returns {JSX.Element} Rendered Mermaid diagram
 *
 * @example
 * <Mermaid chart="graph TD; A-->B; B-->C;" />
 */
const Mermaid = ({ chart, className = '', id }) => {
  const elementRef = useRef(null);
  const [ svg, setSvg ] = useState('');
  const [ error, setError ] = useState('');
  const [ isClient, setIsClient ] = useState(false);

  // Only run on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !chart) return;

    const renderDiagram = async() => {
      try {

        // Lazy load mermaid
        const mermaid = await loadMermaid();

        // Initialize mermaid with configuration
        mermaid.initialize({
          'flowchart': {
            'curve': 'basis',
            'htmlLabels': true
          },
          'securityLevel': 'loose',
          'startOnLoad': false,
          'theme': 'default',
          'themeVariables': {
            'altSectionBkgColor': '#ffffff',
            'gridColor': '#e5e7eb',
            'lineColor': '#6b7280',
            'primaryBorderColor': '#d1d5db',
            'primaryColor': '#3b82f6',
            'primaryTextColor': '#1f2937',
            'secondaryColor': '#e5e7eb',
            'sectionBkgColor': '#f9fafb',
            'tertiaryColor': '#f3f4f6'
          }
        });

        const diagramId = id || `mermaid-${Math.random().toString(36).substr(2, 9)}`;

        // Validate and render the diagram
        const { 'svg': renderedSvg } = await mermaid.render(diagramId, chart);

        setSvg(renderedSvg);
        setError('');
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError('Failed to render diagram');
        setSvg('');
      }
    };

    renderDiagram();
  }, [ chart, id, isClient ]);

  if (!isClient)
    return (
      <div className={ `mermaid-placeholder bg-gray-100 dark:bg-gray-800 rounded-lg p-6 my-4 ${className}` }>
        <div className='animate-pulse flex space-x-4'>
          <div className='flex-1 space-y-2 py-1'>
            <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4'></div>
            <div className='space-y-2'>
              <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded'></div>
              <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6'></div>
            </div>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className={ `mermaid-error bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 my-4 ${className}` }>
        <div className='flex items-center'>
          <svg className='h-5 w-5 text-red-500 mr-2' fill='currentColor' viewBox='0 0 20 20'>
            <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z' clipRule='evenodd' />
          </svg>
          <span className='text-red-700 dark:text-red-300 text-sm font-medium'>
            Mermaid Diagram Error: {error}
          </span>
        </div>
        <pre className='mt-2 text-xs text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/40 p-2 rounded overflow-x-auto'>
          {chart}
        </pre>
      </div>
    );

  if (!svg)
    return (
      <div className={ `mermaid-loading bg-gray-100 dark:bg-gray-800 rounded-lg p-6 my-4 ${className}` }>
        <div className='animate-pulse flex space-x-4'>
          <div className='flex-1 space-y-2 py-1'>
            <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4'></div>
            <div className='space-y-2'>
              <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded'></div>
              <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6'></div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div
      ref={ elementRef }
      className={ `mermaid-diagram bg-white dark:bg-gray-900 rounded-lg p-4 my-6 border border-gray-200 dark:border-gray-700 overflow-x-auto ${className}` }
      dangerouslySetInnerHTML={{ '__html': svg }}
    />
  );
};

export default Mermaid;
