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

/* eslint-disable sort-keys */

import fs from 'fs';
import path from 'path';
import Cite from 'citation-js';
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

    for (const entry of entries) {
      if (entry.id) {
        // citation-js automatically handles LaTeX conversion
        citations[entry.id] = entry;
      }
    }
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
    '$^{st}$': 'ˢᵗ',
    '$^{nd}$': 'ⁿᵈ', 
    '$^{rd}$': 'ʳᵈ',
    '$^{th}$': 'ᵗʰ',
    // Handle HTML sup tags
    '<sup>st</sup>': 'ˢᵗ',
    '<sup>nd</sup>': 'ⁿᵈ',
    '<sup>rd</sup>': 'ʳᵈ',
    '<sup>th</sup>': 'ᵗʰ'
  };
  
  let result = text;
  Object.entries(superscriptMap).forEach(([latex, unicode]) => {
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

  // citation-js uses different field names - let's check all possible ones
  const author = citation.author;
  
  // Extract year from various possible formats - citation-js uses different field names
  let year = null;
  
  // Try citation-js standard format first
  if (citation.issued && citation.issued['date-parts'] && citation.issued['date-parts'][0] && citation.issued['date-parts'][0][0]) {
    year = citation.issued['date-parts'][0][0];
  } 
  // Try direct year field
  else if (citation.year) {
    year = parseInt(citation.year) || citation.year;
  } else if (citation.date) {
    // Try date field with year extraction
    const dateStr = String(citation.date);
    const yearMatch = dateStr.match(/\d{4}/);
    year = yearMatch ? parseInt(yearMatch[0]) : null;
  } else if (citation['publication-date']) {
    // Try other common date fields
    const pubDate = String(citation['publication-date']);
    const yearMatch = pubDate.match(/\d{4}/);
    year = yearMatch ? parseInt(yearMatch[0]) : citation['publication-date'];
  } else if (citation['date-published']) {
    year = citation['date-published'];
  } else if (citation.created && citation.created['date-parts']) {
    year = citation.created['date-parts'][0][0];
  } else if (citation['date-parts']) {
    year = citation['date-parts'][0][0];
  }
  // Check for raw BibTeX year field that citation-js might preserve
  else if (citation.Year) {
    year = parseInt(citation.Year) || citation.Year;
  } else if (citation._year) {
    // Check for the literal year field from BibTeX
    year = parseInt(citation._year) || citation._year;
  }
  
  // Try to extract year from any field that might contain it
  if (!year) {
    const allFields = Object.entries(citation);
    for (const [fieldName, fieldValue] of allFields) {
      if (fieldName.toLowerCase().includes('year') || fieldName.toLowerCase().includes('date')) {
        const valueStr = String(fieldValue);
        const yearMatch = valueStr.match(/\d{4}/);
        if (yearMatch) {
          year = parseInt(yearMatch[0]);
          break;
        }
      }
    }
  }
  const title = citation.title;
  const journal = citation['container-title'] || citation.journal;
  const booktitle = citation['container-title'] || citation.booktitle;
  const publisher = citation.publisher;

  let formatted = '';

  // Format author (show even without year)
  if (author) {
    // Handle different author formats
    let authorStr = '';
    if (Array.isArray(author)) {
      authorStr = author.map(a => {
        if (typeof a === 'object') {
          // Try different possible field names for citation-js format
          const given = a.given || a.firstname || a.first || '';
          const family = a.family || a.lastname || a.last || a.surname || '';
          const full = `${given} ${family}`.trim();
          
          // If no given/family, try other formats
          if (!full && a.literal) return a.literal;
          if (!full && a.name) return a.name;
          
          return full || String(a);
        }
        return String(a);
      }).filter(name => name).join(' and ');
    } else if (typeof author === 'string') {
      authorStr = author;
    }
    
    if (authorStr) {
      formatted = year ? `${authorStr} (${year}). ` : `${authorStr}. `;
    }
  }

  // Format title  
  if (title) {
    // Clean up HTML tags and convert superscripts
    let cleanTitle = String(title)
      .replace(/<sup>/g, '')
      .replace(/<\/sup>/g, '')
      .replace(/\{\\text(?:th|st|nd|rd)\}/g, (match) => {
        const ordinal = match.slice(6, -1);
        return { 'th': 'ᵗʰ', 'st': 'ˢᵗ', 'nd': 'ⁿᵈ', 'rd': 'ʳᵈ' }[ordinal] || ordinal;
      });
    
    cleanTitle = convertSuperscripts(cleanTitle);
    formatted += `<strong>${cleanTitle}</strong>. `;
  }

  // Format venue
  if (journal) {
    let cleanJournal = String(journal).replace(/<sup>/g, '').replace(/<\/sup>/g, '');
    cleanJournal = convertSuperscripts(cleanJournal);
    formatted += `${cleanJournal}.`;
  } else if (booktitle) {
    let cleanBooktitle = String(booktitle).replace(/<sup>/g, '').replace(/<\/sup>/g, '');
    cleanBooktitle = convertSuperscripts(cleanBooktitle);
    formatted += `${cleanBooktitle}.`;
  } else if (publisher) {
    let cleanPublisher = String(publisher).replace(/<sup>/g, '').replace(/<\/sup>/g, '');
    cleanPublisher = convertSuperscripts(cleanPublisher);
    formatted += `${cleanPublisher}.`;
  }

  return formatted.trim() || 'Citation information incomplete';
}

/**
 * Simple citations rehype plugin
 */
export default function rehypeSimpleCitations(options = {}) {
  const { citationsPaths = 'data/citations.json' } = options;
  const citations = loadCitations(citationsPaths);
  const citationCounter = new Map();
  const citationInstances = new Map(); // Track all instances of each citation
  let globalCounter = 1;

  return (tree, file) => {

    // First pass: find all citations and assign numbers
    visit(tree, 'text', (node, index, parent) => {
      if (!node.value) return;

      // Match groups of citations like [@key1; @key2; @key3] or individual [@key]
      const citationGroupPattern = /\[([^\]]*@[^\]]*)\]/g;
      const matches = [ ...node.value.matchAll(citationGroupPattern) ];

      if (matches.length === 0) return;

      // Split text and replace with citation elements
      const parts = [];
      let lastIndex = 0;

      for (const match of matches) {
        const [ fullMatch, citationContent ] = match;
        const { 'index': matchIndex } = match;

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
          .filter((key) => key.length > 0);

        const citationNumbers = [];
        const citationTexts = [];

        // Generate unique citation instance ID
        const citationId = `cite-ref-${Math.random().toString(36).substr(2, 12)}`;

        // Process each citation key
        for (const citationKey of citationKeys) {

          // Get or assign citation number
          if (!citationCounter.has(citationKey)) {
            citationCounter.set(citationKey, globalCounter++);
            citationInstances.set(citationKey, []);
          }

          // Track this instance
          citationInstances.get(citationKey).push(citationId);

          const citationNumber = citationCounter.get(citationKey);
          const citation = citations[citationKey];

          if (citation) {
            citationNumbers.push(citationNumber);
            citationTexts.push(formatCitation(citation));
          } else {
            citationNumbers.push(`${citationKey}?`);
            citationTexts.push(`Citation ${citationKey} not found`);
          }
        }

        if (citationNumbers.length > 0)

        // Create a single grouped citation element with unique ID for back-linking

          parts.push({
            'children': [
              {
                'children': [
                  {
                    'type': 'text',
                    'value': citationNumbers.join(' ')
                  }
                ],
                'properties': {
                  'className': [ 'citation-link', 'citation-group' ],
                  'data-citation-numbers': JSON.stringify(citationNumbers),
                  'data-citation-keys': JSON.stringify(citationKeys),
                  'href': citationKeys.length === 1 ? `#citation-${citationKeys[0]}` : `#citation-group-${citationNumbers.join('-')}`,
                  'data-citation-popover': 'true',
                  'id': citationId,
                  'data-citation-texts': JSON.stringify(citationTexts)
                },
                'tagName': 'a',
                'type': 'element'
              }
            ],
            'tagName': 'sup',
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
                      'tagName': 'span',
                      'type': 'element',
                      'children': [
                        ...parseCitationHTML(formattedCitation),
                        {
                          'type': 'text',
                          'value': ' '
                        },
                        {
                          'type': 'element',
                          'tagName': 'a',
                          'properties': {
                            'href': `#${mostRecentInstance}`,
                            'className': [ 'citation-back-link' ],
                            'title': 'Go back to citation',
                            'data-citation-key': key,
                            'data-instances': JSON.stringify(instances),
                            'style': 'display: none;' // Hidden by default
                          },
                          'children': [
                            {
                              'type': 'text',
                              'value': 'Go back'
                            }
                          ]
                        }
                      ],
                      'properties': { 'className': [ 'citation-entry' ] }
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
