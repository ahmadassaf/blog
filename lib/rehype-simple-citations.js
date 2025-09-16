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

import { visit } from 'unist-util-visit';
import fs from 'fs';
import path from 'path';

/**
 * Parse BibTeX entry to extract citation information
 */
function parseBibTexEntry(entry) {
  const result = {};
  
  // Extract entry type and key
  const entryMatch = entry.match(/@(\w+)\{([^,]+),/);
  if (!entryMatch) return null;
  
  result.type = entryMatch[1].toLowerCase();
  result.key = entryMatch[2];
  
  // Extract fields
  const fieldRegex = /(\w+)\s*=\s*\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g;
  let match;
  
  while ((match = fieldRegex.exec(entry)) !== null) {
    const [, field, value] = match;
    result[field.toLowerCase()] = value.trim();
  }
  
  return result;
}

/**
 * Load citations from multiple BibTeX files
 */
function loadCitations(citationPaths) {
  const citations = {};
  
  // Handle both single path and array of paths
  const paths = Array.isArray(citationPaths) ? citationPaths : [citationPaths];
  
  for (const citationPath of paths) {
    try {
      const fullPath = path.resolve(citationPath);
      const bibContent = fs.readFileSync(fullPath, 'utf8');
      
      // Split into individual entries
      const entries = bibContent.split('@').filter(entry => entry.trim());
      
      for (const entry of entries) {
        const parsed = parseBibTexEntry('@' + entry);
        if (parsed && parsed.key) {
          citations[parsed.key] = parsed;
        }
      }
    } catch (error) {
      console.warn(`Could not load citations from ${citationPath}:`, error.message);
    }
  }
  
  return citations;
}

/**
 * Convert LaTeX characters to Unicode
 */
function convertLatexToUnicode(text) {
  if (!text) return text;
  
  const latexMap = {
    '\\"{a}': 'ä', '\\"{A}': 'Ä',
    '\\"{e}': 'ë', '\\"{E}': 'Ë', 
    '\\"{i}': 'ï', '\\"{I}': 'Ï',
    '\\"{o}': 'ö', '\\"{O}': 'Ö',
    '\\"{u}': 'ü', '\\"{U}': 'Ü',
    '\\"{y}': 'ÿ', '\\"{Y}': 'Ÿ',
    '\\\'{a}': 'á', '\\\'{A}': 'Á',
    '\\\'{e}': 'é', '\\\'{E}': 'É',
    '\\\'{i}': 'í', '\\\'{I}': 'Í',
    '\\\'{o}': 'ó', '\\\'{O}': 'Ó',
    '\\\'{u}': 'ú', '\\\'{U}': 'Ú',
    '\\\'{y}': 'ý', '\\\'{Y}': 'Ý',
    '\\`{a}': 'à', '\\`{A}': 'À',
    '\\`{e}': 'è', '\\`{E}': 'È',
    '\\`{i}': 'ì', '\\`{I}': 'Ì',
    '\\`{o}': 'ò', '\\`{O}': 'Ò',
    '\\`{u}': 'ù', '\\`{U}': 'Ù',
    '\\^{a}': 'â', '\\^{A}': 'Â',
    '\\^{e}': 'ê', '\\^{E}': 'Ê',
    '\\^{i}': 'î', '\\^{I}': 'Î',
    '\\^{o}': 'ô', '\\^{O}': 'Ô',
    '\\^{u}': 'û', '\\^{U}': 'Û',
    '\\~{a}': 'ã', '\\~{A}': 'Ã',
    '\\~{n}': 'ñ', '\\~{N}': 'Ñ',
    '\\~{o}': 'õ', '\\~{O}': 'Õ',
    '\\c{c}': 'ç', '\\c{C}': 'Ç',
    '\\ss': 'ß', '\\SS': 'ß',
    '\\ae': 'æ', '\\AE': 'Æ',
    '\\oe': 'œ', '\\OE': 'Œ',
    '\\aa': 'å', '\\AA': 'Å',
    '\\o': 'ø', '\\O': 'Ø',
    '\\l': 'ł', '\\L': 'Ł',
    '\\_': '_', '\\&': '&', '\\$': '$', '\\%': '%', '\\#': '#',
    '\\ ': ' ', '\\,': ' ', '\\;': ' ', '\\:': ' ',
    '---': '—', '--': '–', '``': '"', "''": '"', '`': ''', "'": '''
  };
  
  let result = text;
  Object.entries(latexMap).forEach(([latex, unicode]) => {
    result = result.replace(new RegExp(latex.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), unicode);
  });
  
  return result;
}

/**
 * Format citation text for display in popover
 */
function formatCitation(citation) {
  if (!citation) return 'Citation not found';
  
  const { author, year, title, journal, booktitle, publisher, url } = citation;
  
  let formatted = '';
  
  // Format author and year
  if (author && year) {
    const cleanAuthor = convertLatexToUnicode(author);
    formatted = `${cleanAuthor} (${year}). `;
  }
  
  // Format title
  if (title) {
    // Clean up title by removing extra curly braces and converting LaTeX
    const cleanTitle = convertLatexToUnicode(title.replace(/\{([^{}]*)\}/g, '$1'));
    formatted += `<strong>${cleanTitle}</strong>. `;
  }
  
  // Format venue (journal, booktitle, or publisher)
  if (journal) {
    formatted += `${convertLatexToUnicode(journal)}.`;
  } else if (booktitle) {
    formatted += `${convertLatexToUnicode(booktitle)}.`;
  } else if (publisher) {
    formatted += `${convertLatexToUnicode(publisher)}.`;
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
  let globalCounter = 1;

  return (tree, file) => {
    // First pass: find all citations and assign numbers
    visit(tree, 'text', (node, index, parent) => {
      if (!node.value) return;
      
      // Match groups of citations like [@key1; @key2; @key3] or individual [@key]
      const citationGroupPattern = /\[([^\]]*@[^\]]*)\]/g;
      const matches = [...node.value.matchAll(citationGroupPattern)];
      
      if (matches.length === 0) return;

      // Split text and replace with citation elements
      const parts = [];
      let lastIndex = 0;
      
      for (const match of matches) {
        const [fullMatch, citationContent] = match;
        const { index: matchIndex } = match;
        
        // Add text before citation
        if (matchIndex > lastIndex) {
          parts.push({
            type: 'text',
            value: node.value.slice(lastIndex, matchIndex)
          });
        }
        
        // Parse individual citation keys from the group (split by ; or ,)
        const citationKeys = citationContent
          .split(/[;,]/)
          .map(key => key.trim().replace(/^@/, ''))
          .filter(key => key.length > 0);
        
        const citationNumbers = [];
        const citationTexts = [];
        
        // Process each citation key
        for (const citationKey of citationKeys) {
          // Get or assign citation number
          if (!citationCounter.has(citationKey)) {
            citationCounter.set(citationKey, globalCounter++);
          }
          
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
        
        if (citationNumbers.length > 0) {
          // Create a single grouped citation element with unique ID for back-linking
          const citationId = `cite-ref-${citationNumbers.join('-')}-${Math.random().toString(36).substr(2, 9)}`;
          parts.push({
            type: 'element',
            tagName: 'sup',
            children: [{
              type: 'element',
              tagName: 'a',
              properties: {
                href: citationKeys.length === 1 ? `#citation-${citationKeys[0]}` : `#citation-group-${citationNumbers.join('-')}`,
                id: citationId,
                className: ['citation-link', 'citation-group'],
                'data-citation-texts': JSON.stringify(citationTexts),
                'data-citation-numbers': JSON.stringify(citationNumbers),
                'data-citation-keys': JSON.stringify(citationKeys),
                'data-citation-popover': 'true'
              },
              children: [{
                type: 'text',
                value: citationNumbers.join(' ')
              }]
            }]
          });
        }
        
        lastIndex = matchIndex + fullMatch.length;
      }
      
      // Add remaining text
      if (lastIndex < node.value.length) {
        parts.push({
          type: 'text',
          value: node.value.slice(lastIndex)
        });
      }
      
      // Replace the text node with our parts
      if (parent && typeof index === 'number' && parts.length > 0) {
        parent.children.splice(index, 1, ...parts);
      }
    });
    
    // Second pass: add citation list at the end (optional)
    if (citationCounter.size > 0 && options.showBibliography !== false) {
      const citationList = {
        type: 'element',
        tagName: 'section',
        properties: {
          className: ['citations-section'],
          id: 'citations'
        },
        children: [
          {
            type: 'element',
            tagName: 'h2',
            children: [{ type: 'text', value: 'References' }]
          },
          {
            type: 'element',
            tagName: 'ol',
            properties: { className: ['citation-list'] },
            children: [...citationCounter.entries()]
              .sort(([,a], [,b]) => a - b)
              .map(([key, number]) => {
                const citation = citations[key];
                const formattedCitation = formatCitation(citation);
                
                return {
                  type: 'element',
                  tagName: 'li',
                  properties: { id: `citation-${key}` },
                  children: [
                    {
                      type: 'element',
                      tagName: 'span',
                      properties: { className: ['citation-entry'] },
                      children: [
                        {
                          type: 'raw',
                          value: formattedCitation
                        },
                        {
                          type: 'text',
                          value: ' '
                        },
                        {
                          type: 'element',
                          tagName: 'a',
                          properties: {
                            href: '#top',
                            className: ['citation-back-link'],
                            title: 'Go back to citation'
                          },
                          children: [{
                            type: 'text',
                            value: '↩'
                          }]
                        }
                      ]
                    }
                  ]
                };
              })
          }
        ]
      };
      
      tree.children.push(citationList);
    }
  };
}