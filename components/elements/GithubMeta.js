import Link from '@/components/elements/Link';
import GithubColors from '@/data/meta/githubMetaColors';
import IconGitFork from '@/static/icons/git/fork.svg';
import IconGitStar from '@/static/icons/git/star.svg';

const GithubMeta = ({ meta }) => (
  <Link href={ meta.html_url }>
    <div className='flex pb-2 pl-2 group/meta'>
      <div className='flex items-center space-x-3 px-4'>
        <IconGitStar className='group-hover/meta:stroke-blue-700 dark:fill-white'/>
        <span className='text-xs font-medium text-gray-900 dark:text-gray-100 group-hover/meta:text-blue-700'>{meta.stargazers_count}</span>
      </div>
      <div className='flex items-center space-x-3 pr-4'>
        <IconGitFork className='group-hover/meta:stroke-blue-700'/>
        <span className='text-xs font-medium text-gray-900 dark:text-gray-100 group-hover/meta:text-blue-700'>{meta.forks_count}</span>
      </div>
      <div className='flex items-center space-x-3 pr-4'>
        <span className={ `rounded inline-block h-3 w-3` } style={{ 'background': `${GithubColors[meta.language]}` }}></span>
        <span className='text-xs font-medium text-gray-90 dark:text-gray-100 group-hover/meta:text-blue-700'>{meta.language}</span>
      </div>
    </div>
  </Link>

);

export default GithubMeta;
