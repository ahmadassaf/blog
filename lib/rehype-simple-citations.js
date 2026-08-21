/**
 * Simple Citations Plugin
 *
 * @description A minimal rehype plugin for simple citation handling.
 * Converts [@citation-key] syntax into circular numbered citations with hover popovers.
 * No complex CSL styles - just clean, simple citations that look like footnotes.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import Cite from 'citation-js';
import fs from 'fs';
import path from 'path';
import { visit } from 'unist-util-visit';

/**
 * Load citations from a single BibTeX file using citation-js
 */
function loadSingleCitationFile(citationPath, citations) {
  try {
    const fullPath = path.resolve(citationPath);
    const bibContent = fs.readFileSync(fullPath, 'utf8');

    // Use citation-js to properly parse BibTeX with LaTeX handling
    const cite = new Cite(bibContent);
    const entries = cite.data;

    for (const entry of entries)
      if (entry.id)

        // Citation-js automatically handles LaTeX conversion
        citations[entry.id] = entry;

  } catch (error) {
    console.warn(`Could not load citations from ${citationPath}:`, error.message);
  }
}

/**
 * Load citations from multiple BibTeX files
 */
function loadCitations(citationPaths) {
  const citations = {};

  // Handle both single path and array of paths
  const paths = Array.isArray(citationPaths) ? citationPaths : [ citationPaths ];

  for (const citationPath of paths)
    loadSingleCitationFile(citationPath, citations);

  return citations;
}

/**
 * Clean up superscripts for better display
 */
function convertSuperscripts(text) {
  if (!text) return text;

  const superscriptMap = {
    '$^{nd}$': 'ⁿᵈ',
    '$^{rd}$': 'ʳᵈ',
    '$^{st}$': 'ˢᵗ',
    '$^{th}$': 'ᵗʰ',

    '<sup>nd</sup>': 'ⁿᵈ',

    '<sup>rd</sup>': 'ʳᵈ',

    // Handle HTML sup tags
    '<sup>st</sup>': 'ˢᵗ',
    '<sup>th</sup>': 'ᵗʰ'
  };

  let result = text;

  Object.entries(superscriptMap).forEach(([ latex, unicode ]) => {
    const escapedLatex = latex.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    result = result.replace(new RegExp(escapedLatex, 'g'), unicode);
  });

  return result;
}

/**
 * Parse HTML string into HAST nodes
 */
function parseCitationHTML(htmlString) {
  const children = [];
  const parts = htmlString.split(/<\/?strong>/);

  for (let i = 0; i < parts.length; i++)
    if (i % 2 === 0) {

      // Regular text
      if (parts[i])
        children.push({
          'type': 'text',
          'value': parts[i]
        });

    } else if (parts[i]) {

      // Bold text
      children.push({
        'children': [
          {
            'type': 'text',
            'value': parts[i]
          }
        ],
        'tagName': 'strong',
        'type': 'element'
      });
    }

  return children;
}

/**
 * Format citation text for display in popover using citation-js format
 */
function formatCitation(citation) {
  if (!citation) return 'Citation not found';

  const cleanText = (value) => {
    const text = String(value)
      .replace(/<sup>/g, '')
      .replace(/<\/sup>/g, '')
      .replace(/\{\\text(?:th|st|nd|rd)\}/g, (match) => {
        const ordinal = match.slice(6, -1);

        return { 'nd': 'ⁿᵈ', 'rd': 'ʳᵈ', 'st': 'ˢᵗ', 'th': 'ᵗʰ' }[ordinal] || ordinal;
      });

    return convertSuperscripts(text);
  };
  const year = citation.issued?.['date-parts']?.[0]?.[0];
  const authors = Array.isArray(citation.author) ? citation.author
    .map(({ family = '', given = '', literal = '' }) => literal || `${given} ${family}`.trim())
    .filter(Boolean)
    .join(' and ') : '';
  const venue = citation['container-title'] || citation.publisher;
  const parts = [];

  if (authors) parts.push(year ? `${authors} (${year}).` : `${authors}.`);
  if (citation.title) parts.push(`<strong>${cleanText(citation.title)}</strong>.`);
  if (venue) parts.push(`${cleanText(venue)}.`);

  return parts.join(' ') || 'Citation information incomplete';
}

/**
 * Simple citations rehype plugin
 */
export default function rehypeSimpleCitations(options = {}) {
  const { citationsPaths = 'data/citations.json' } = options;
  const citations = loadCitations(citationsPaths);

  return (tree) => {
    const citationCounter = new Map();
    const citationInstances = new Map();
    let citationReferenceCounter = 1;
    let globalCounter = 1;

    // First pass: find all citations and assign numbers
    visit(tree, 'text', (node, index, parent) => {
      if (!node.value) return;

      // Match groups of citations like [@key1; @key2; @key3] or individual [@key]
      const citationGroupPattern = /\[(?<citations>[^\]]*@[^\]]*)\]/g;
      const matches = [ ...node.value.matchAll(citationGroupPattern) ];

      if (matches.length === 0) return;

      // Split text and replace with citation elements
      const parts = [];
      let lastIndex = 0;

      for (const match of matches) {
        const fullMatch = match[0];
        const citationContent = match.groups.citations;
        const matchIndex = match.index;

        // Add text before citation
        if (matchIndex > lastIndex)
          parts.push({
            'type': 'text',
            'value': node.value.slice(lastIndex, matchIndex)
          });

        // Parse individual citation keys from the group (split by ; or ,)
        const citationKeys = citationContent
          .split(/[;,]/)
          .map((key) => key.trim().replace(/^@/, ''))
          .filter(Boolean);

        const citationId = `cite-ref-${citationReferenceCounter++}`;
        const citationEntries = [];

        for (let citationKeyIndex = 0; citationKeyIndex < citationKeys.length; citationKeyIndex++) {
          const citationKey = citationKeys[citationKeyIndex];

          // Get or assign citation number
          if (!citationCounter.has(citationKey)) {
            citationCounter.set(citationKey, globalCounter++);
            citationInstances.set(citationKey, []);
          }

          const citationNumber = citationCounter.get(citationKey);
          const citation = citations[citationKey];
          const citationText = citation ? formatCitation(citation) : `Citation ${citationKey} not found`;
          const referenceId = citationKeys.length === 1 ? citationId : `${citationId}-${citationKeyIndex + 1}`;

          citationInstances.get(citationKey).push(referenceId);

          citationEntries.push({
            'key': citationKey,
            'number': citation ? citationNumber : `${citationKey}?`,
            'referenceId': referenceId,
            'text': citationText
          });
        }

        if (citationEntries.length > 0)
          parts.push({
            'children': citationEntries.map((entry) => {
              return {
                'children': [
                  {
                    'children': [
                      {
                        'type': 'text',
                        'value': String(entry.number)
                      }
                    ],
                    'properties': {
                      'ariaLabel': `Reference ${entry.number}`,
                      'className': [ 'citation-link' ],
                      'data-citation-keys': JSON.stringify([ entry.key ]),
                      'data-citation-numbers': JSON.stringify([ entry.number ]),
                      'data-citation-popover': 'true',
                      'data-citation-texts': JSON.stringify([ entry.text ]),
                      'href': `#citation-${entry.key}`,
                      'id': entry.referenceId,
                      'title': 'View reference'
                    },
                    'tagName': 'a',
                    'type': 'element'
                  }
                ],
                'tagName': 'sup',
                'type': 'element'
              };
            }),
            'properties': {
              'ariaLabel': citationEntries.length === 1 ? undefined : `References ${citationEntries.map((entry) => entry.number).join(', ')}`,
              'className': [ 'citation-cluster' ]
            },
            'tagName': 'span',
            'type': 'element'
          });

        lastIndex = matchIndex + fullMatch.length;
      }

      // Add remaining text
      if (lastIndex < node.value.length)
        parts.push({
          'type': 'text',
          'value': node.value.slice(lastIndex)
        });

      // Replace the text node with our parts
      if (parent && typeof index === 'number' && parts.length > 0)
        parent.children.splice(index, 1, ...parts);

    });

    // Second pass: add citation list at the end (optional)
    if (citationCounter.size > 0 && options.showBibliography !== false) {
      const citationList = {
        'children': [
          {
            'children': [{ 'type': 'text', 'value': 'References' }],
            'properties': {
              'className': [ 'references-title' ]
            },
            'tagName': 'h2',
            'type': 'element'
          },
          {
            'children': [ ...citationCounter.entries() ]
              .sort(([ , a ], [ , b ]) => a - b)
              .map(([ key ]) => {
                const citation = citations[key];
                const formattedCitation = formatCitation(citation);
                const instances = citationInstances.get(key) || [];
                const mostRecentInstance = instances[instances.length - 1];

                return {
                  'children': [
                    {
                      'children': [
                        ...parseCitationHTML(formattedCitation),
                        {
                          'type': 'text',
                          'value': ' '
                        },
                        {
                          'children': [
                            {
                              'type': 'text',
                              'value': 'Go back'
                            }
                          ],
                          'properties': {
                            'className': [ 'citation-back-link' ],
                            'data-citation-key': key,
                            'data-instances': JSON.stringify(instances),
                            'href': `#${mostRecentInstance}`,
                            'style': 'display: none;',
                            'title': 'Go back to citation' // Hidden by default
                          },
                          'tagName': 'a',
                          'type': 'element'
                        }
                      ],
                      'properties': { 'className': [ 'citation-entry' ] },
                      'tagName': 'span',
                      'type': 'element'
                    }
                  ],
                  'properties': { 'id': `citation-${key}` },
                  'tagName': 'li',
                  'type': 'element'
                };
              }),
            'properties': { 'className': [ 'citation-list' ] },
            'tagName': 'ol',
            'type': 'element'
          }
        ],
        'properties': {
          'className': [ 'citations-section' ],
          'id': 'citations'
        },
        'tagName': 'section',
        'type': 'element'
      };

      tree.children.push(citationList);
    }
  };
}
