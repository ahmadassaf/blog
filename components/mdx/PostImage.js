import NextImage from 'next/image';

const PostImage = ({ dark, title, caption, width = 800, height = 800, ...rest }) => {
  if (dark) return (
    <div>
      <NextImage alt={ title } className='dark:hidden mx-auto' width={ 800 } height={ 800 } src={ `/static/images/posts/${title}.svg` }/>
      <NextImage alt={ title } className='hidden dark:block mx-auto' width={ 800 } height={ 800 } src={ `/static/images/posts/${title}-dark.svg` }/>
      { caption && <p className='text-center text-sm text-gray-500 dark:text-gray-400'>{ caption }</p> }
    </div>
  );

  return (<div>
    <NextImage alt={ title } className='dark:hidden mx-auto' width={ 800 } height={ 800 } src={ `/static/images/posts/${title}.svg` }/>
    { caption && <p className='text-center text-sm text-gray-500 dark:text-gray-400'>{ caption }</p> }
  </div>);
};

export default PostImage;
