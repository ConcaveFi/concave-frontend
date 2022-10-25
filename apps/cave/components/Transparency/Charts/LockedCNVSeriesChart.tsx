import { Text } from '@concave/ui'
import { useEffect, useState } from 'react'
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ChartCard } from './ChartCard'
import { ChartTooltip } from './ChartTooltip'
import { CustomizedAxisTick } from './CustomizedAxisTick'
import { fetchData } from './fetchData'
import { CHART_COLORS } from './style'

type lockedCNVDatum = { timestamp: number; locked: number; date: string }

type LockedCNVSeriesData = {
  lockedCNV: lockedCNVDatum[]
  ticks: { ticksObject: { [key: string]: string }; ticksArray: number[] }
}

export const LockedCNVSeriesChart = () => {
  const [data, setData] = useState<undefined | LockedCNVSeriesData>()
  const [error, setError] = useState<undefined | string>()
  const [dataLoaded, setDataLoaded] = useState(false)

  const chartMargin = {
    top: 20,
    right: 30,
    left: 30,
    bottom: 50,
  }
  const xLabelPos = { y: '47.5px' }
  const yLabelPos = { x: '-105px', y: '180px' }

  useEffect(() => {
    fetchData('locked-series')
      .then((data: LockedCNVSeriesData) => setData(data))
      .catch((error: Error) => setError(error.message))
      .finally(() => setDataLoaded(true))
  }, [])

  return (
    <ChartCard dataLoaded={dataLoaded} chartTitle="CNV locked over time">
      {dataLoaded && error && <Text>{error}</Text>}
      {dataLoaded && !error && (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={300} data={data.lockedCNV} margin={chartMargin}>
            <CartesianGrid strokeDasharray="5" opacity={0.15} />
            <XAxis
              dataKey="timestamp"
              scale="time"
              tickCount={6}
              ticks={data.ticks.ticksArray}
              interval={0}
              tick={(tickData) => {
                const customValue = data.ticks.ticksObject[tickData.payload.value]
                return <CustomizedAxisTick customValue={customValue} {...tickData} />
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
                  transform: `translateY(${xLabelPos.y})`,
                }}
              />
            </XAxis>
            <YAxis
              axisLine={{ stroke: CHART_COLORS.TextLow }}
              tickLine={{ stroke: CHART_COLORS.TextLow }}
              tickFormatter={(v) => v.toLocaleString()}
              style={{ fill: CHART_COLORS.TextLow, fontSize: '0.8rem' }}
            >
              <Label
                fill={CHART_COLORS.TextLow}
                value={'CNV locked'}
                style={{
                  textAnchor: 'middle',
                  transform: `translate(${yLabelPos.x}, ${yLabelPos.y}) rotate(-90deg)`,
                }}
              />
            </YAxis>
            <Tooltip content={<ChartTooltip accessPayloadKeys payloadKeys={['date']} />} />
            <Line
              dot={false}
              dataKey="locked"
              name="Locked CNV"
              stroke={CHART_COLORS.LightBlue}
              strokeWidth={2.25}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  )
}
