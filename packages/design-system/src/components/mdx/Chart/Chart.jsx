'use client';

import * as AreaModule from 'recharts/lib/cartesian/Area.js';
import * as BarModule from 'recharts/lib/cartesian/Bar.js';
import * as CartesianGridModule from 'recharts/lib/cartesian/CartesianGrid.js';
import * as LineModule from 'recharts/lib/cartesian/Line.js';
import * as ScatterModule from 'recharts/lib/cartesian/Scatter.js';
import * as XAxisModule from 'recharts/lib/cartesian/XAxis.js';
import * as YAxisModule from 'recharts/lib/cartesian/YAxis.js';
import * as RechartsAreaChartModule from 'recharts/lib/chart/AreaChart.js';
import * as RechartsBarChartModule from 'recharts/lib/chart/BarChart.js';
import * as RechartsComposedChartModule from 'recharts/lib/chart/ComposedChart.js';
import * as RechartsLineChartModule from 'recharts/lib/chart/LineChart.js';
import * as RechartsPieChartModule from 'recharts/lib/chart/PieChart.js';
import * as RechartsRadialBarChartModule from 'recharts/lib/chart/RadialBarChart.js';
import * as RechartsScatterChartModule from 'recharts/lib/chart/ScatterChart.js';
import * as CellModule from 'recharts/lib/component/Cell.js';
import * as LegendModule from 'recharts/lib/component/Legend.js';
import * as ResponsiveContainerModule from 'recharts/lib/component/ResponsiveContainer.js';
import * as RechartsTooltipModule from 'recharts/lib/component/Tooltip.js';
import * as PieModule from 'recharts/lib/polar/Pie.js';
import * as RadialBarModule from 'recharts/lib/polar/RadialBar.js';

import { cn } from '@/components/utilities/cn';

const resolveRechartsExport = (module, key) => module[key] || module.default?.[key] || module.default;

const Area = resolveRechartsExport(AreaModule, 'Area');
const Bar = resolveRechartsExport(BarModule, 'Bar');
const CartesianGrid = resolveRechartsExport(CartesianGridModule, 'CartesianGrid');
const Cell = resolveRechartsExport(CellModule, 'Cell');
const Legend = resolveRechartsExport(LegendModule, 'Legend');
const Line = resolveRechartsExport(LineModule, 'Line');
const Pie = resolveRechartsExport(PieModule, 'Pie');
const RadialBar = resolveRechartsExport(RadialBarModule, 'RadialBar');
const RechartsAreaChart = resolveRechartsExport(RechartsAreaChartModule, 'AreaChart');
const RechartsBarChart = resolveRechartsExport(RechartsBarChartModule, 'BarChart');
const RechartsComposedChart = resolveRechartsExport(RechartsComposedChartModule, 'ComposedChart');
const RechartsLineChart = resolveRechartsExport(RechartsLineChartModule, 'LineChart');
const RechartsPieChart = resolveRechartsExport(RechartsPieChartModule, 'PieChart');
const RechartsRadialBarChart = resolveRechartsExport(RechartsRadialBarChartModule, 'RadialBarChart');
const RechartsScatterChart = resolveRechartsExport(RechartsScatterChartModule, 'ScatterChart');
const RechartsTooltip = resolveRechartsExport(RechartsTooltipModule, 'Tooltip');
const ResponsiveContainer = resolveRechartsExport(ResponsiveContainerModule, 'ResponsiveContainer');
const Scatter = resolveRechartsExport(ScatterModule, 'Scatter');
const XAxis = resolveRechartsExport(XAxisModule, 'XAxis');
const YAxis = resolveRechartsExport(YAxisModule, 'YAxis');
const isChartRuntimeReady = [
  Area,
  Bar,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  Pie,
  RadialBar,
  RechartsAreaChart,
  RechartsBarChart,
  RechartsComposedChart,
  RechartsLineChart,
  RechartsPieChart,
  RechartsRadialBarChart,
  RechartsScatterChart,
  RechartsTooltip,
  ResponsiveContainer,
  Scatter,
  XAxis,
  YAxis
].every(Boolean);

const chartColors = [ '#2563eb', '#16a34a', '#4f46e5', '#ca8a04', '#dc2626', '#64748b' ];

const axisClassName = 'fill-gray-500 text-[11px] dark:fill-gray-400';

const defaultMargins = { 'bottom': 8, 'left': 8, 'right': 16, 'top': 16 };

const getSeries = ({ series, yKey }) => {
  if (series?.length) return series;
  if (yKey) return [{ 'key': yKey, 'label': yKey }];

  return [{ 'key': 'value', 'label': 'Value' }];
};

const getColor = (colors, index) => colors?.[index] || chartColors[index % chartColors.length];

const normalizeAxisData = (data, xKey, yKey) => data.map((item, index) => {
  if (typeof item === 'number')
    return { [xKey]: String(index + 1), [yKey]: item };

  return item;
});

const normalizePieData = (data, nameKey, valueKey) => data.map((item, index) => {
  if (typeof item === 'number')
    return { [nameKey]: String(index + 1), [valueKey]: item };

  return item;
});

const normalizeScatterData = (data, xKey, yKey) => data.map((item, index) => {
  if (typeof item === 'number')
    return { [xKey]: index + 1, [yKey]: item };

  return item;
});

const ChartFrame = ({
  ariaLabel,
  children,
  className,
  description,
  height = 320,
  title
}) => (
  <figure
    aria-label={ ariaLabel || title || 'Chart' }
    className={ cn('not-prose my-8 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950', className) }
    role='img'
  >
    {title || description ? (
      <figcaption className='mb-4 space-y-1'>
        {title ? <h3 className='text-base font-semibold leading-6 text-gray-950 dark:text-white'>{title}</h3> : null}
        {description ? <p className='text-sm leading-6 text-gray-600 dark:text-gray-400'>{description}</p> : null}
      </figcaption>
    ) : null}
    <div className='min-w-0 w-full' style={{ height, 'minHeight': height, 'width': '100%' }}>
      {children}
    </div>
  </figure>
);

const ChartRuntimeFallback = ({ ariaLabel, className, description, height, title }) => (
  <ChartFrame ariaLabel={ ariaLabel } className={ className } description={ description } height={ height } title={ title }>
    <div className='flex h-full min-h-40 items-center justify-center rounded-lg border border-dashed border-red-200 bg-red-50 px-4 text-center text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300'>
      Chart renderer unavailable. Recharts did not load correctly.
    </div>
  </ChartFrame>
);

const ChartTooltip = ({ active, label, payload }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className='rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs shadow-lg dark:border-gray-800 dark:bg-gray-950'>
      {label ? <div className='mb-1 font-semibold text-gray-950 dark:text-white'>{label}</div> : null}
      <div className='space-y-1'>
        {payload.map((item) => (
          <div key={ item.dataKey || item.name } className='flex items-center justify-between gap-5 text-gray-600 dark:text-gray-300'>
            <span>{item.name || item.dataKey}</span>
            <span className='font-mono font-semibold text-gray-950 dark:text-white'>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SharedAxes = ({ showGrid, xKey }) => (
  <>
    {showGrid ? <CartesianGrid strokeDasharray='3 3' stroke='rgba(148, 163, 184, 0.35)' vertical={ false } /> : null}
    <XAxis axisLine={ false } className={ axisClassName } dataKey={ xKey } tickLine={ false } />
    <YAxis axisLine={ false } className={ axisClassName } tickLine={ false } width={ 38 } />
  </>
);

const SharedChartChrome = ({ showLegend, showTooltip }) => (
  <>
    {showTooltip ? <RechartsTooltip content={ <ChartTooltip /> } cursor={{ 'fill': 'rgba(37, 99, 235, 0.08)' }} /> : null}
    {showLegend ? <Legend iconType='circle' wrapperStyle={{ 'fontSize': 12, 'paddingTop': 12 }} /> : null}
  </>
);

export const BarChart = ({
  ariaLabel,
  barRadius = 6,
  className,
  colors,
  data = [],
  description,
  height,
  series,
  showGrid = true,
  showLegend = false,
  showTooltip = true,
  title,
  xKey = 'label',
  yKey = 'value'
}) => {
  if (!isChartRuntimeReady) return <ChartRuntimeFallback ariaLabel={ ariaLabel } className={ className } description={ description } height={ height } title={ title } />;

  const resolvedSeries = getSeries({ series, yKey });
  const chartData = normalizeAxisData(data, xKey, yKey);

  return (
    <ChartFrame ariaLabel={ ariaLabel } className={ className } description={ description } height={ height } title={ title }>
      <ResponsiveContainer height='100%' minWidth={ 0 } width='100%'>
        <RechartsBarChart data={ chartData } margin={ defaultMargins }>
          <SharedAxes showGrid={ showGrid } xKey={ xKey } />
          <SharedChartChrome showLegend={ showLegend } showTooltip={ showTooltip } />
          {resolvedSeries.map((item, index) => (
            <Bar
              key={ item.key }
              dataKey={ item.key }
              fill={ getColor(colors, index) }
              isAnimationActive={ false }
              name={ item.label || item.key }
              radius={ [ barRadius, barRadius, 0, 0 ] }
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
};

export const LineChart = ({
  ariaLabel,
  className,
  colors,
  data = [],
  description,
  height,
  series,
  showGrid = true,
  showLegend = false,
  showTooltip = true,
  title,
  xKey = 'label',
  yKey = 'value'
}) => {
  if (!isChartRuntimeReady) return <ChartRuntimeFallback ariaLabel={ ariaLabel } className={ className } description={ description } height={ height } title={ title } />;

  const resolvedSeries = getSeries({ series, yKey });
  const chartData = normalizeAxisData(data, xKey, yKey);

  return (
    <ChartFrame ariaLabel={ ariaLabel } className={ className } description={ description } height={ height } title={ title }>
      <ResponsiveContainer height='100%' minWidth={ 0 } width='100%'>
        <RechartsLineChart data={ chartData } margin={ defaultMargins }>
          <SharedAxes showGrid={ showGrid } xKey={ xKey } />
          <SharedChartChrome showLegend={ showLegend } showTooltip={ showTooltip } />
          {resolvedSeries.map((item, index) => (
            <Line
              key={ item.key }
              dataKey={ item.key }
              dot={{ 'r': 3 }}
              isAnimationActive={ false }
              name={ item.label || item.key }
              stroke={ getColor(colors, index) }
              strokeWidth={ 2.5 }
              type='monotone'
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
};

export const AreaChart = ({
  ariaLabel,
  className,
  colors,
  data = [],
  description,
  height,
  series,
  showGrid = true,
  showLegend = false,
  showTooltip = true,
  title,
  xKey = 'label',
  yKey = 'value'
}) => {
  if (!isChartRuntimeReady) return <ChartRuntimeFallback ariaLabel={ ariaLabel } className={ className } description={ description } height={ height } title={ title } />;

  const resolvedSeries = getSeries({ series, yKey });
  const chartData = normalizeAxisData(data, xKey, yKey);

  return (
    <ChartFrame ariaLabel={ ariaLabel } className={ className } description={ description } height={ height } title={ title }>
      <ResponsiveContainer height='100%' minWidth={ 0 } width='100%'>
        <RechartsAreaChart data={ chartData } margin={ defaultMargins }>
          <defs>
            {resolvedSeries.map((item, index) => (
              <linearGradient key={ item.key } id={ `gaudi-chart-${item.key}` } x1='0' x2='0' y1='0' y2='1'>
                <stop offset='5%' stopColor={ getColor(colors, index) } stopOpacity={ 0.28 } />
                <stop offset='95%' stopColor={ getColor(colors, index) } stopOpacity={ 0 } />
              </linearGradient>
            ))}
          </defs>
          <SharedAxes showGrid={ showGrid } xKey={ xKey } />
          <SharedChartChrome showLegend={ showLegend } showTooltip={ showTooltip } />
          {resolvedSeries.map((item, index) => (
            <Area
              key={ item.key }
              dataKey={ item.key }
              fill={ `url(#gaudi-chart-${item.key})` }
              isAnimationActive={ false }
              name={ item.label || item.key }
              stroke={ getColor(colors, index) }
              strokeWidth={ 2.5 }
              type='monotone'
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
};

export const PieChart = ({
  ariaLabel,
  className,
  colors,
  data = [],
  description,
  height = 320,
  innerRadius = 0,
  nameKey = 'label',
  showLegend = true,
  showTooltip = true,
  title,
  valueKey = 'value'
}) => {
  if (!isChartRuntimeReady) return <ChartRuntimeFallback ariaLabel={ ariaLabel } className={ className } description={ description } height={ height } title={ title } />;

  const chartData = normalizePieData(data, nameKey, valueKey);

  return (
    <ChartFrame ariaLabel={ ariaLabel } className={ className } description={ description } height={ height } title={ title }>
      <ResponsiveContainer height='100%' minWidth={ 0 } width='100%'>
        <RechartsPieChart>
          {showTooltip ? <RechartsTooltip content={ <ChartTooltip /> } /> : null}
          {showLegend ? <Legend iconType='circle' wrapperStyle={{ 'fontSize': 12, 'paddingTop': 12 }} /> : null}
          <Pie
            cx='50%'
            cy='48%'
            data={ chartData }
            dataKey={ valueKey }
            innerRadius={ innerRadius }
            isAnimationActive={ false }
            nameKey={ nameKey }
            outerRadius='78%'
            paddingAngle={ 2 }
          >
            {chartData.map((entry, index) => (
              <Cell key={ entry[nameKey] || index } fill={ getColor(colors, index) } />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
};

export const DonutChart = (props) => <PieChart innerRadius='52%' { ...props } />;

export const ComposedChart = ({
  ariaLabel,
  barKey = 'views',
  className,
  colors,
  data = [],
  description,
  height,
  lineKey = 'readTime',
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  title,
  xKey = 'label'
}) => (
  isChartRuntimeReady ? (
    <ChartFrame ariaLabel={ ariaLabel } className={ className } description={ description } height={ height } title={ title }>
      <ResponsiveContainer height='100%' minWidth={ 0 } width='100%'>
        <RechartsComposedChart data={ normalizeAxisData(data, xKey, barKey) } margin={ defaultMargins }>
          <SharedAxes showGrid={ showGrid } xKey={ xKey } />
          <SharedChartChrome showLegend={ showLegend } showTooltip={ showTooltip } />
          <Bar dataKey={ barKey } fill={ getColor(colors, 0) } isAnimationActive={ false } name='Views' radius={ [ 6, 6, 0, 0 ] } />
          <Line dataKey={ lineKey } dot={{ 'r': 3 }} isAnimationActive={ false } name='Read time' stroke={ getColor(colors, 1) } strokeWidth={ 2.5 } type='monotone' />
        </RechartsComposedChart>
      </ResponsiveContainer>
    </ChartFrame>
  ) : <ChartRuntimeFallback ariaLabel={ ariaLabel } className={ className } description={ description } height={ height } title={ title } />
);

export const ScatterChart = ({
  ariaLabel,
  className,
  color,
  data = [],
  description,
  height,
  showGrid = true,
  showTooltip = true,
  title,
  xKey = 'x',
  yKey = 'y'
}) => (
  isChartRuntimeReady ? (
    <ChartFrame ariaLabel={ ariaLabel } className={ className } description={ description } height={ height } title={ title }>
      <ResponsiveContainer height='100%' minWidth={ 0 } width='100%'>
        <RechartsScatterChart margin={ defaultMargins }>
          {showGrid ? <CartesianGrid strokeDasharray='3 3' stroke='rgba(148, 163, 184, 0.35)' /> : null}
          <XAxis axisLine={ false } className={ axisClassName } dataKey={ xKey } name={ xKey } tickLine={ false } type='number' />
          <YAxis axisLine={ false } className={ axisClassName } dataKey={ yKey } name={ yKey } tickLine={ false } type='number' width={ 38 } />
          {showTooltip ? <RechartsTooltip content={ <ChartTooltip /> } cursor={{ 'strokeDasharray': '3 3' }} /> : null}
          <Scatter data={ normalizeScatterData(data, xKey, yKey) } fill={ color || chartColors[0] } isAnimationActive={ false } name='Posts' />
        </RechartsScatterChart>
      </ResponsiveContainer>
    </ChartFrame>
  ) : <ChartRuntimeFallback ariaLabel={ ariaLabel } className={ className } description={ description } height={ height } title={ title } />
);

export const RadialBarChart = ({
  ariaLabel,
  className,
  color,
  data = [],
  description,
  height = 300,
  nameKey = 'label',
  title,
  valueKey = 'value'
}) => (
  isChartRuntimeReady ? (
    <ChartFrame ariaLabel={ ariaLabel } className={ className } description={ description } height={ height } title={ title }>
      <ResponsiveContainer height='100%' minWidth={ 0 } width='100%'>
        <RechartsRadialBarChart barSize={ 18 } cx='50%' cy='50%' data={ normalizePieData(data, nameKey, valueKey) } endAngle={ -270 } innerRadius='42%' outerRadius='88%' startAngle={ 90 }>
          <RadialBar background cornerRadius={ 16 } dataKey={ valueKey } fill={ color || chartColors[0] } isAnimationActive={ false } nameKey={ nameKey } />
          <RechartsTooltip content={ <ChartTooltip /> } />
        </RechartsRadialBarChart>
      </ResponsiveContainer>
    </ChartFrame>
  ) : <ChartRuntimeFallback ariaLabel={ ariaLabel } className={ className } description={ description } height={ height } title={ title } />
);

export const Chart = ({ type = 'bar', ...props }) => {
  switch (type) {
  case 'area':
    return <AreaChart { ...props } />;
  case 'composed':
    return <ComposedChart { ...props } />;
  case 'donut':
    return <DonutChart { ...props } />;
  case 'line':
    return <LineChart { ...props } />;
  case 'pie':
    return <PieChart { ...props } />;
  case 'radial':
    return <RadialBarChart { ...props } />;
  case 'scatter':
    return <ScatterChart { ...props } />;
  case 'bar':
  default:
    return <BarChart { ...props } />;
  }
};

export default Chart;
