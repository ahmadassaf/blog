function CmdPost({ title, category }) {

  return (
    <div className='contents w-full'>
      <div className='text-md w-[100%]'>{ title }</div>
      <span className='text-xs rounded-sm bg-green-600 text-white p-2 capitalize'>{ category.replace('-', ' ') }</span>
    </div>
  );
}

export default CmdPost;
