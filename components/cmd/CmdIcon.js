/**
 * CmdIcon Component
 *
 * @description A unified icon component for the command launcher that provides consistent
 * Heroicon rendering with standardized styling. This component maps icon names to their
 * corresponding Heroicon components and applies consistent sizing and styling.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { ArrowRightOnRectangleIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
  EnvelopeIcon,
  FingerPrintIcon,
  HomeIcon,
  IdentificationIcon,
  NewspaperIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
  TagIcon,
  UserGroupIcon } from '@heroicons/react/24/outline';

const iconMap = {
  'ArrowRightOnRectangleIcon': ArrowRightOnRectangleIcon,
  'BookOpenIcon': BookOpenIcon,
  'ChatBubbleLeftRightIcon': ChatBubbleLeftRightIcon,
  'CodeBracketIcon': CodeBracketIcon,
  'EnvelopeIcon': EnvelopeIcon,
  'FingerPrintIcon': FingerPrintIcon,
  'HomeIcon': HomeIcon,
  'IdentificationIcon': IdentificationIcon,
  'NewspaperIcon': NewspaperIcon,
  'RectangleGroupIcon': RectangleGroupIcon,
  'RectangleStackIcon': RectangleStackIcon,
  'TagIcon': TagIcon,
  'UserGroupIcon': UserGroupIcon
};

/**
 * Renders a Heroicon with consistent styling for command launcher components
 *
 * @description Takes an icon name and renders the corresponding Heroicon component with
 * standardized sizing and styling. Falls back to a default icon if the specified icon
 * is not found in the icon map.
 *
 * @param {Object} props - Component props
 * @param {string} props.name - Name of the Heroicon to render (must match iconMap keys)
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {Object} [props.style] - Additional inline styles
 *
 * @returns {JSX.Element} The rendered Heroicon component
 *
 * @example
 * // Basic usage
 * <CmdIcon name="HomeIcon" />
 *
 * @example
 * // With custom styling
 * <CmdIcon name="BookOpenIcon" className="text-blue-500" />
 */
const CmdIcon = ({ name, className = '', style = {} }) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) return <HomeIcon className={ `h-5 w-5 text-gray-500 ${className}` } style={ style } />;

  return <IconComponent className={ `h-5 w-5 text-gray-600 dark:text-gray-300 ${className}` } style={ style } />;
};

export default CmdIcon;
