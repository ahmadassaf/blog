const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const tokenPattern = /(?<string>'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`[\s\S]*?`)|(?<tag><\/?[A-Za-z][^>]*?>)|\b(?<keyword>import|export|from|const|let|var|return|if|else|null|true|false|default|function|process|env)\b|\b(?<component>[A-Z][A-Za-z0-9_]*)\b|\b(?<number>\d+)\b/g;

const tokenClass = (groups) => {
  if (groups.string) return 'text-green-300';
  if (groups.tag) return 'text-sky-300';
  if (groups.keyword) return 'text-purple-300';
  if (groups.component) return 'text-blue-300';
  if (groups.number) return 'text-yellow-300';

  return '';
};

const highlightCode = (code) => {
  let html = '';
  let lastIndex = 0;

  for (const match of code.matchAll(tokenPattern)) {
    const token = match[0];
    const index = match.index || 0;
    const className = tokenClass(match.groups || {});

    html += escapeHtml(code.slice(lastIndex, index));
    html += className ? `<span class="${className}">${escapeHtml(token)}</span>` : escapeHtml(token);
    lastIndex = index + token.length;
  }

  html += escapeHtml(code.slice(lastIndex));

  return html;
};

const languageLabels = {
  'js': 'JavaScript',
  'jsx': 'JSX',
  'mdx': 'MDX',
  'ts': 'TypeScript',
  'tsx': 'TSX'
};

export const HighlightedCode = ({ code, language = 'jsx' }) => (
  <div className='overflow-hidden rounded-lg border border-gray-800 bg-gray-950 shadow-sm'>
    <div className='border-b border-gray-800 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400'>
      {languageLabels[language] || language}
    </div>
    <pre className='overflow-auto whitespace-pre-wrap break-words p-4 text-left text-xs leading-6 text-gray-100'>
      <code dangerouslySetInnerHTML={{ '__html': highlightCode(code) }} />
    </pre>
  </div>
);
