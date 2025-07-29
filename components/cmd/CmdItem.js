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
import { ArrowRightOnRectangleIcon,
  BookOpenIcon,
  FingerPrintIcon,
  HomeIcon,
  IdentificationIcon,
  NewspaperIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
  TagIcon } from '@heroicons/react/24/outline';

// Icon mapping for different item types
const iconMap = {
  ArrowRightOnRectangleIcon,
  BookOpenIcon,
  FingerPrintIcon,
  HomeIcon,
  IdentificationIcon,
  NewspaperIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
  TagIcon
};

/**
 * Configuration for different item types with styling and display rules
 */
const itemConfigs = {
  'navigation': {
    'iconColor': 'text-gray-600 dark:text-gray-400'
  },
  'post': {
    'badgeColor': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    'iconColor': 'text-emerald-600 dark:text-emerald-400',
    'showCategory': true
  },
  'project': {
    'badgeColor': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    'iconColor': 'text-blue-600 dark:text-blue-400',
    'showSubtitle': true
  },
  'publication': {
    'badgeColor': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    'iconColor': 'text-purple-600 dark:text-purple-400',
    'showSubtitle': true
  },
  'tag': {
    'badgeColor': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    'iconColor': 'text-amber-600 dark:text-amber-400',
    'showCount': true
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
  const IconComponent = icon && iconMap[icon];

  return (
    <div className='flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ease-out hover:bg-gray-50/80 dark:hover:bg-gray-800/50 hover:scale-[1.01] hover:shadow-sm group'>
      {/* Icon */}
      {IconComponent && (
        <div className={ `flex-shrink-0 ${config.iconColor} group-hover:scale-110 transition-transform duration-200` }>
          <IconComponent className='w-5 h-5' />
        </div>
      )}

      {/* Content */}
      <div className='flex-1 min-w-0'>
        {/* Title */}
        <div className='font-medium text-gray-900 dark:text-gray-100 truncate'>
          {title || children}
        </div>

        {/* Subtitle for projects/publications */}
        {config.showSubtitle && subtitle && (
          <div className='text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5'>
            {subtitle}
          </div>
        )}
      </div>

      {/* Badges and indicators */}
      <div className='flex-shrink-0 flex items-center gap-2'>
        {/* Category badge for posts */}
        {config.showCategory && category && (
          <span className={ `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.badgeColor} transition-colors duration-200` }>
            {category.replace(/[-_]/g, ' ')}
          </span>
        )}

        {/* Count badge for tags */}
        {config.showCount && typeof count !== 'undefined' && (
          <span className={ `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.badgeColor} transition-colors duration-200` }>
            {count}
          </span>
        )}

        {/* Type indicator for projects/publications */}
        {(type === 'project' || type === 'publication') && (
          <span className={ `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.badgeColor} capitalize transition-colors duration-200` }>
            {type}
          </span>
        )}
      </div>
    </div>
  );
};

export default CmdItem;
