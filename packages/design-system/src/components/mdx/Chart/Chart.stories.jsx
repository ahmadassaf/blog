import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';

import { AreaChart,
  BarChart,
  Chart,
  ComposedChart,
  DonutChart,
  LineChart,
  PieChart,
  RadialBarChart,
  ScatterChart } from './Chart';

const trafficData = [
  { label: 'Mon', readTime: 6, subscribers: 8, views: 124 },
  { label: 'Tue', readTime: 8, subscribers: 12, views: 168 },
  { label: 'Wed', readTime: 7, subscribers: 10, views: 141 },
  { label: 'Thu', readTime: 11, subscribers: 16, views: 226 },
  { label: 'Fri', readTime: 9, subscribers: 14, views: 194 },
  { label: 'Sat', readTime: 12, subscribers: 18, views: 248 }
];

const contentMixData = [
  { label: 'Data', value: 42 },
  { label: 'Engineering', value: 28 },
  { label: 'Productivity', value: 18 },
  { label: 'Management', value: 12 }
];

const scatterData = [
  { title: 'Short note', x: 800, y: 4 },
  { title: 'Tutorial', x: 1500, y: 8 },
  { title: 'Deep dive', x: 2600, y: 14 },
  { title: 'Reference', x: 3400, y: 17 },
  { title: 'Series guide', x: 4200, y: 22 }
];

const radialData = [{ label: 'Read completion', value: 78 }];

const componentDocs = getComponentDocs('MDX/Chart');

export default {
  component: Chart,
  parameters: {
    docs: {
      description: {
        component: componentDocs.description
      },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'MDX/Chart'
};

export const Bar = {
  render: () => (
    <BarChart
      ariaLabel='Article views by day'
      data={ trafficData }
      title='Article views'
      description='Use bars for discrete comparisons such as views, counts, or category totals.'
      yKey='views'
    />
  )
};

export const Line = {
  render: () => (
    <LineChart
      ariaLabel='Subscriber trend by day'
      data={ trafficData }
      title='Subscriber trend'
      description='Use lines for trends across a continuous sequence.'
      yKey='subscribers'
    />
  )
};

export const Area = {
  render: () => (
    <AreaChart
      ariaLabel='Article views area chart'
      data={ trafficData }
      title='Reading activity'
      description='Use area charts when the volume under a trend matters.'
      yKey='views'
    />
  )
};

export const Pie = {
  render: () => (
    <PieChart
      ariaLabel='Content mix by category'
      data={ contentMixData }
      title='Content mix'
      description='Use pie charts sparingly for a small number of parts of a whole.'
    />
  )
};

export const Donut = {
  render: () => (
    <DonutChart
      ariaLabel='Content mix by category as donut chart'
      data={ contentMixData }
      title='Content mix'
      description='Donut charts work best for compact proportional summaries.'
    />
  )
};

export const Composed = {
  render: () => (
    <ComposedChart
      ariaLabel='Views and read time by day'
      data={ trafficData }
      title='Views and read time'
      description='Use composed charts when two related measures need to share one timeline.'
    />
  )
};

export const Scatter = {
  render: () => (
    <ScatterChart
      ariaLabel='Post length against read time'
      data={ scatterData }
      title='Post length and read time'
      description='Use scatter charts to show correlation between two numeric dimensions.'
      xKey='x'
      yKey='y'
    />
  )
};

export const Radial = {
  render: () => (
    <RadialBarChart
      ariaLabel='Read completion progress'
      data={ radialData }
      title='Read completion'
      description='Use radial charts for one compact progress-style measure.'
    />
  )
};
