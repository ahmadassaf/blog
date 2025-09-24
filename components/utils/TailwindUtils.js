/**
 * TailwindUtils Component
 *
 * @description Tailwind CSS utility functions for combining and merging CSS classes.
 * Provides the `cn` function that combines clsx for conditional class application
 * with tailwind-merge for intelligent Tailwind class deduplication and conflict resolution.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines and merges CSS classes with intelligent Tailwind conflict resolution
 *
 * @description Utility function that combines clsx for conditional class names with
 * tailwind-merge for proper Tailwind CSS class deduplication. This prevents class
 * conflicts and ensures the last specified class takes precedence for conflicting utilities.
 *
 * @param {...(string|Object|Array)} inputs - Class names, objects, or arrays to combine
 * @returns {string} Merged and deduplicated class string
 *
 * @example
 * // Basic class combination
 * cn('px-4', 'py-2', 'bg-blue-500')
 * // Returns: 'px-4 py-2 bg-blue-500'
 *
 * @example
 * // Conditional classes with conflict resolution
 * cn('px-4 py-2', isActive && 'bg-blue-500', 'px-6')
 * // Returns: 'py-2 bg-blue-500 px-6' (px-6 overrides px-4)
 *
 * @example
 * // With objects and arrays
 * cn('base-class', { 'active': isActive, 'disabled': isDisabled }, ['extra', 'classes'])
 * // Applies conditional classes and combines all inputs
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
