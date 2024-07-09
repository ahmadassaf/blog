import { GoRepoForked, GoStar } from 'react-icons/go';

import GithubColors from '@/data/meta/githubMetaColors';

const GithubMeta = ({ meta }) => (
  <>
    <div className='flex group/meta mt-4'>
      <div className='flex items-center space-x-3 pr-4'>
        <GoStar className='group-hover/meta:stroke-blue-700 dark:outline-white'/>
        <span className='text-xs font-medium text-gray-900 dark:text-gray-100 group-hover/meta:text-blue-700'>{meta.stargazers_count}</span>
      </div>
      <div className='flex items-center space-x-3 pr-4'>
        <GoRepoForked className='group-hover/meta:stroke-blue-700'/>
        <span className='text-xs font-medium text-gray-900 dark:text-gray-100 group-hover/meta:text-blue-700'>{meta.forks_count}</span>
      </div>
      <div className='flex items-center space-x-3 pr-4'>
        <span className={ `rounded inline-block h-3 w-3` } style={{ 'background': `${GithubColors[meta.language]}` }}></span>
        <span className='text-xs font-medium text-gray-90 dark:text-gray-100 group-hover/meta:text-blue-700'>{meta.language}</span>
      </div>
    </div>
  </>

);

export default GithubMeta;
