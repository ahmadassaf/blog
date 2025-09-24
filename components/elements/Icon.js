/**
 * Social Icon Component
 *
 * @description Renders social media icons with proper accessibility and validation.
 * Supports GitHub, LinkedIn, Mail, Twitter/X, and YouTube with hover effects
 * and email validation for mail links.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { FaLinkedin, FaYoutube } from 'react-icons/fa';
import { RiMailOpenFill, RiTwitterXFill } from 'react-icons/ri';
import { VscGithub } from 'react-icons/vsc';

/**
 * Mapping of icon types to their corresponding React Icon components
 */
const components = {
  'github': VscGithub,
  'linkedin': FaLinkedin,
  'mail': RiMailOpenFill,
  'twitter': RiTwitterXFill,
  'youtube': FaYoutube
};

/**
 * Social media icon component with validation and accessibility
 *
 * @param {Object} props - Component props
 * @param {string} props.kind - Type of social icon (github, linkedin, mail, twitter, youtube)
 * @param {string} props.href - URL or mailto link for the icon
 * @returns {JSX.Element|null} Social icon link or null if invalid
 *
 * @example
 * <Icon kind="github" href="https://github.com/username" />
 * <Icon kind="mail" href="mailto:user@example.com" />
 */
const Icon = ({ kind, href }) => {
  // eslint-disable-next-line prefer-named-capture-group
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href))) return null;

  const SocialSvg = components[kind];

  return (
    <a className='text-sm text-gray-500 transition hover:text-gray-600' target='_blank' rel='noopener noreferrer' href={ href } >
      <span className='sr-only'>{kind}</span>
      <SocialSvg className={ `h-5 w-5 fill-current text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400` }/>
    </a>
  );
};

export default Icon;
