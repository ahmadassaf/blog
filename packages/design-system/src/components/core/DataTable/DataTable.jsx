import { cn } from '@/components/utilities/cn';

export const DataTable = ({ caption, className, columns = [], rows = [] }) => (
  <div className={ cn('isolate overflow-x-auto rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950', className) }>
    <table className='w-full min-w-[560px] border-collapse bg-white text-left text-sm dark:bg-gray-950'>
      {caption ? <caption className='bg-white px-4 py-3 text-left text-sm font-medium text-gray-500 dark:bg-gray-950'>{caption}</caption> : null}
      <thead className='bg-gray-50 dark:bg-gray-900'>
        <tr>
          {columns.map((column) => <th key={ column.key } scope='col' className='border-b border-gray-200 px-4 py-3 text-xs font-semibold uppercase text-gray-600 dark:border-gray-800 dark:text-gray-300'>{column.header}</th>)}
        </tr>
      </thead>
      <tbody className='bg-white dark:bg-gray-950'>
        {rows.map((row, rowIndex) => (
          <tr key={ row.id || rowIndex } className='border-b border-gray-100 bg-white last:border-b-0 dark:border-gray-800 dark:bg-gray-950'>
            {columns.map((column) => <td key={ column.key } className='px-4 py-3 text-gray-700 dark:text-gray-300'>{column.render ? column.render(row) : row[column.key]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DataTable;
