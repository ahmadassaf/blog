import { FaLinkedin, FaYoutube } from 'react-icons/fa';
import { RiMailOpenFill, RiTwitterXFill } from 'react-icons/ri';
import { VscGithub } from 'react-icons/vsc';

const components = {
  'github': VscGithub,
  'linkedin': FaLinkedin,
  'mail': RiMailOpenFill,
  'twitter': RiTwitterXFill,
  'youtube': FaYoutube
};

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
