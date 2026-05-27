import { BarChart, Sparkline } from './Chart';

const data = [
  { label: 'Mon', value: 12 },
  { label: 'Tue', value: 18 },
  { label: 'Wed', value: 9 },
  { label: 'Thu', value: 24 },
  { label: 'Fri', value: 16 }
];

export default { component: BarChart, tags: [ 'autodocs' ], title: 'Charting/Chart' };

export const Bars = {
  render: () => <div className='max-w-xl p-6'><BarChart data={ data } ariaLabel='Article views by day' /></div>
};

export const Line = {
  render: () => <div className='max-w-xl p-6'><Sparkline data={ data } ariaLabel='Article views trend' /></div>
};
