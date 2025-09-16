/**
 * LaTeX Text Component
 *
 * @description A component that renders LaTeX text using react-latex-next.
 * Handles mathematical expressions, special characters, and BibTeX formatting.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import Latex from 'react-latex-next';

/**
 * Renders LaTeX text with proper mathematical and special character formatting
 *
 * @param {Object} props - Component props
 * @param {string} props.children - LaTeX text content to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.style] - Inline styles
 *
 * @returns {JSX.Element} Rendered LaTeX content
 *
 * @example
 * // Basic usage with mathematical notation
 * <LatexText>11$^{th}$ International Conference</LatexText>
 *
 * @example
 * // Usage with special characters
 * <LatexText>Eero Hyv\"{o}nen and Michael F\"{a}rber</LatexText>
 */
const LatexText = ({ children, className, style, ...props }) => {

  // Return plain text if no content
  if (!children || typeof children !== 'string')
    return <span className={ className } style={ style } { ...props }>{children}</span>;

  /*
   * Check if the text contains HTML tags or LaTeX patterns
   * More comprehensive regex to catch patterns like Andr{\'e}s, Garc\'{\i}a-Silva, etc.
   */
  const hasHTML = /<[^>]+>/g.test(children);
  const hasLatex = /(\$[^$]*\$|\\[a-zA-Z]+\{[^}]*\}|\{\\[^}]*\}|---?|\\\w+|\{\\['`"^~=.]\w+\})/g.test(children);

  // If it contains HTML tags, render them directly
  if (hasHTML) {
    return (
      <span 
        className={ className } 
        style={ style } 
        { ...props }
        dangerouslySetInnerHTML={{ __html: children }}
      />
    );
  }

  // If no LaTeX, return as plain text
  if (!hasLatex)
    return <span className={ className } style={ style } { ...props }>{children}</span>;

  // Try LaTeX rendering
  try {
    return (
      <Latex
        className={ className }
        style={ style }
        { ...props }
      >
        {children}
      </Latex>
    );
  } catch (error) {

    // Fallback to plain text if LaTeX rendering fails
    console.warn('LaTeX rendering failed:', error);

    return <span className={ className } style={ style } { ...props }>{children}</span>;
  }
};

export default LatexText;
