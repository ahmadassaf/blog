function CmdProject({ title, subtitle, showType }) {
  return (
    <div className='flex w-full justify-between items-center'>
      <div>
        <div className='text-md font-medium'>{ title }</div>
        <div className='text-xs text-gray-600 dark:text-white dark:font-light'>{ subtitle }</div>
      </div>
      {showType && (
        <div className='text-xs rounded bg-violet-600 text-white p-2 capitalize h-fit'>Project</div>
      )}
    </div>
  );
}

export default CmdProject;
