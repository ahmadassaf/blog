/**
 * Unified Command Item Component
 *
 * @description Modern, unified component for rendering all types of command palette items.
 * Supports posts, projects, publications, tags, and navigation items with consistent
 * styling, animations, and accessibility features. Uses a glass morphism design with
 * smooth transitions and proper semantic markup.
 *
 * @author Ahmad Assaf
 * @version 2.0.0
 */

import React from 'react';

import Icon, { getIcon } from '@/components/primitives/Icon';

/**
 * Configuration for different item types with styling and display rules
 */
const itemConfigs = {
  'navigation': {
    'iconColor': 'text-gray-600 dark:text-gray-400'
  },
  'post': {
    'badgeColor': 'bg-green-600 text-white hover:bg-green-700',
    'iconColor': 'text-green-600 dark:text-green-400',
    'showCategory': true
  },
  'project': {
    'badgeColor': 'bg-blue-600 text-white hover:bg-blue-700',
    'iconColor': 'text-blue-600 dark:text-blue-400',
    'showSubtitle': true
  },
  'publication': {
    'badgeColor': 'bg-yellow-600 text-white hover:bg-yellow-700',
    'iconColor': 'text-yellow-600 dark:text-yellow-400',
    'showSubtitle': true
  },
  'tag': {
    'badgeColor': 'bg-blue-600 text-white hover:bg-blue-700',
    'iconColor': 'text-blue-600 dark:text-blue-400',
    'showCount': true
  },
  'thought': {
    'badgeColor': 'bg-indigo-600 text-white hover:bg-indigo-700',
    'iconColor': 'text-indigo-600 dark:text-indigo-400',
    'showSubtitle': true
  }
};

/**
 * Unified command item component for all content types
 *
 * @description Renders different types of command palette items with consistent styling,
 * proper accessibility, and smooth animations. Supports icons, badges, categories,
 * and custom content based on item type.
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Primary title text
 * @param {string} [props.subtitle] - Secondary subtitle text
 * @param {string} [props.category] - Category for posts
 * @param {number} [props.count] - Count for tags
 * @param {string} [props.type] - Item type (post, project, publication, tag, navigation)
 * @param {string} [props.icon] - Icon name from Heroicons
 * @param {string} [props.children] - Fallback content for navigation items
 *
 * @returns {JSX.Element} Styled command item with appropriate content
 *
 * @example
 * <CmdItem
 *   title="React Hooks Guide"
 *   category="web-development"
 *   type="post"
 *   icon="BookOpenIcon"
 * />
 */
const CmdItem = ({ title, subtitle, category, count, type = 'navigation', icon, children }) => {
  const config = itemConfigs[type] || itemConfigs.navigation;
  const IconComponent = icon && getIcon(icon);

  return (
    <div className='flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ease-out hover:bg-gray-50/80 dark:hover:bg-gray-800/50 hover:scale-[1.01] hover:shadow-sm group'>
      {/* Icon */}
      {IconComponent && (
        <div className={ `flex-shrink-0 ${config.iconColor} group-hover:scale-110 transition-transform duration-200` }>
          <Icon name={ icon } size='md' decorative />
        </div>
      )}

      {/* Content */}
      <div className='flex-1 min-w-0'>
        {/* Title */}
        <div className='text-sm font-medium text-gray-900 dark:text-gray-100 truncate'>
          {title || children}
        </div>

        {/* Subtitle for projects/publications */}
        {config.showSubtitle && subtitle && (
          <div className='text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5'>
            {subtitle}
          </div>
        )}
      </div>

      {/* Data indicators */}
      <div className='flex-shrink-0 flex items-center gap-3'>
        {/* Category for posts */}
        {config.showCategory && category && (
          <span className='text-xs text-gray-500 dark:text-gray-400 capitalize'>
            {category.replace(/[-_]/g, ' ')}
          </span>
        )}

        {/* Count for tags */}
        {config.showCount && typeof count !== 'undefined' && (
          <span className='text-xs text-gray-500 dark:text-gray-400'>
            {count} {count === 1 ? 'post' : 'posts'}
          </span>
        )}

        {/* Type indicator for projects/publications */}
        {(type === 'project' || type === 'publication') && (
          <span className='text-xs text-gray-500 dark:text-gray-400 capitalize'>
            {type}
          </span>
        )}
      </div>
    </div>
  );
};

export default CmdItem;
