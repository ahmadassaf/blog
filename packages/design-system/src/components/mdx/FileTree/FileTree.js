/**
 * File Tree Component
 *
 * @description Displays a beautiful file and folder structure with icons and proper indentation.
 * Perfect for showing directory structures in documentation and blog posts.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import Icon from '@/components/primitives/Icon';

/**
 * Get the appropriate icon for a file based on its extension or name
 * @param {string} name - The file or folder name
 * @param {boolean} isFolder - Whether this is a folder
 * @param {boolean} isOpen - Whether the folder is open (only applies to folders)
 * @returns {JSX.Element} The appropriate icon component
 */
const getFileIcon = (name, isFolder = false, isOpen = false) => {
  if (isFolder)
    return isOpen ? <Icon name='folder-open' decorative className='text-blue-500' /> : <Icon name='folder' decorative className='text-blue-400' />;

  // Get file extension
  const ext = name.toLowerCase().split('.').pop();
  const filename = name.toLowerCase();

  // Special files
  if ([ 'package.json', 'package-lock.json' ].includes(filename))
    return <Icon name='node' decorative className='text-green-600' />;

  if ([ 'dockerfile', '.dockerignore' ].includes(filename))
    return <Icon name='docker' decorative className='text-blue-600' />;

  if ([ '.gitignore', '.gitattributes' ].includes(filename))
    return <Icon name='git' decorative className='text-red-600' />;

  if ([ 'readme.md', 'changelog.md' ].includes(filename))
    return <Icon name='markdown' decorative className='text-blue-700' />;

  // By extension
  switch (ext) {
  case 'js':
  case 'mjs':
  case 'cjs':
    return <Icon name='javascript' decorative className='text-yellow-500' />;
  case 'ts':
  case 'tsx':
    return <Icon name='typescript' decorative className='text-blue-600' />;
  case 'jsx':
    return <Icon name='react' decorative className='text-blue-500' />;
  case 'py':
    return <Icon name='python' decorative className='text-yellow-600' />;
  case 'json':
    return <Icon name='json' decorative className='text-yellow-600' />;
  case 'css':
    return <Icon name='css' decorative className='text-blue-500' />;
  case 'html':
    return <Icon name='html' decorative className='text-red-500' />;
  case 'md':
  case 'mdx':
    return <Icon name='markdown' decorative className='text-gray-600 dark:text-gray-400' />;
  default:
    return <Icon name='file' decorative className='text-gray-500' />;
  }
};

/**
 * File Tree Item Component
 * @param {Object} props
 * @param {string} props.name - Name of the file/folder
 * @param {boolean} props.isFolder - Whether this is a folder
 * @param {number} props.level - Indentation level
 * @param {boolean} props.isLast - Whether this is the last item in its level
 * @param {Array} props.childrenProp - Child items (for folders)
 * @param {boolean} props.isOpen - Whether the folder is open
 * @returns {JSX.Element}
 */
const FileTreeItem = ({ name, isFolder = false, level = 0, isLast = false, childrenProp = [], isOpen = true }) => {
  const indent = level * 20;
  const icon = getFileIcon(name, isFolder, isOpen && isFolder);

  return (
    <div>
      <div
        className='flex items-center py-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors'
        style={{ 'paddingLeft': `${indent + 8}px` }}
      >
        <span className='mr-2 flex-shrink-0 w-4 h-4 flex items-center justify-center'>
          {icon}
        </span>
        <span className={ `${isFolder ? 'font-medium text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'}` }>
          {name}
        </span>
      </div>

      {isFolder && isOpen && childrenProp.length > 0 && (
        <div>
          {childrenProp.map((child, index) => (
            <FileTreeItem
              key={ `${child.name}-${index}` }
              name={ child.name }
              isFolder={ child.isFolder }
              level={ level + 1 }
              isLast={ index === childrenProp.length - 1 }
              childrenProp={ child.childrenProp || [] }
              isOpen={ child.isOpen !== false }
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Main File Tree Component
 * @param {Object} props
 * @param {Array} props.data - Tree structure data
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
const FileTree = ({ data = [], className = '' }) => (
  <div className={ `bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 font-mono text-sm max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 ${className}` }>
    <div className='space-y-0'>
      {data.map((item, index) => (
        <FileTreeItem
          key={ `${item.name}-${index}` }
          name={ item.name }
          isFolder={ item.isFolder }
          level={ 0 }
          isLast={ index === data.length - 1 }
          childrenProp={ item.childrenProp || [] }
          isOpen={ item.isOpen !== false }
        />
      ))}
    </div>
  </div>
);

export default FileTree;
