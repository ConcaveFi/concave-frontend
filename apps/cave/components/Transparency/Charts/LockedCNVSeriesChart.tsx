import { Text, useBreakpointValue } from '@concave/ui'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { compactFormat } from 'utils/numberMask'
import { ChartCard } from './ChartCard'
import { ChartTooltip } from './ChartTooltip'
import { CustomizedAxisTick } from './CustomizedAxisTick'
import { CHART_COLORS } from './style'
import { useFetchData } from './useFetchData'

type lockedCNVDatum = { timestamp: number; locked: number; date: string }

type LockedCNVSeriesData = {
  lockedCNV: lockedCNVDatum[]
  ticks: { ticksObject: { [key: string]: string }; ticksArray: number[] }
}

export const LockedCNVSeriesChart = () => {
  const chartMargin = {
    top: 20,
    right: 30,
    left: 30,
    bottom: 50,
  }

  const isMobile = useBreakpointValue({ base: true, xl: false })
  const lockedCNVSeries = useFetchData<LockedCNVSeriesData>('locked-series')
  const dataLoaded = !lockedCNVSeries.isLoading
  const data = lockedCNVSeries.data
  const error = lockedCNVSeries.error

  return (
    <ChartCard {...lockedCNVSeries} chartTitle="CNV locked over time">
      {dataLoaded && error && (
        <Text>{`Error fetching data, retrying in ${lockedCNVSeries.nextTriggerByError} seconds`}</Text>
      )}
      {dataLoaded && !error && (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart width={500} height={300} data={data.lockedCNV} margin={chartMargin}>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.LightBlue} stopOpacity={0.9} />
                <stop offset="100%" stopColor={CHART_COLORS.LightBlue} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="5" opacity={0.15} />
            <XAxis
              dataKey="timestamp"
              scale="time"
              tickCount={6}
              ticks={data.ticks.ticksArray}
              interval={0}
              tick={(tickData) => {
                const customValue = data.ticks.ticksObject[tickData.payload.value]
                return <CustomizedAxisTick customValue={customValue} isMobile {...tickData} />
              }}
              axisLine={{ stroke: CHART_COLORS.TextLow }}
              tickLine={{ stroke: CHART_COLORS.TextLow }}
              tickMargin={7}
            >
              <Label
                fill={CHART_COLORS.TextLow}
                value={'Date (MM-DD-YY)'}
                style={{
                  textAnchor: 'middle',
                  transform: 'translateY(48px)',
                }}
              />
            </XAxis>
            <YAxis
              axisLine={{ stroke: CHART_COLORS.TextLow }}
              tickLine={{ stroke: CHART_COLORS.TextLow }}
              tickFormatter={(v: number) => (isMobile ? compactFormat(v) : v.toLocaleString())}
              style={{ fill: CHART_COLORS.TextLow, fontSize: '0.8rem' }}
            >
              <Label
                fill={CHART_COLORS.TextLow}
                value={'CNV locked'}
                style={{
                  textAnchor: 'middle',
                  transform: 'translate(-107px, 176px) rotate(-90deg)',
                }}
              />
            </YAxis>
            <Tooltip content={<ChartTooltip accessPayloadKeys payloadKeys={['date']} />} />
            <Area
              dot={false}
              dataKey="locked"
              name="Locked CNV"
              stroke={CHART_COLORS.LightBlue}
              strokeWidth={2.25}
              fill="url(#gradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  )
}
