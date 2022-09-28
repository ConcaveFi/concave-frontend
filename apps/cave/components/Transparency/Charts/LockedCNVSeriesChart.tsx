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
import { fetchData } from './fetchData'
import { CHART_COLORS } from './style'

type LockedCNVSeriesType = {
  timestamp: number
  locked: number
}

export const LockedCNVSeriesChart = () => {
  const [data, setData] = useState<undefined | LockedCNVSeriesType[]>()
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    fetchData('locked-series')
      .then((data) => setData(data.lockedCNV))
      .then(() => setDataLoaded(true))
  }, [])

  return (
    <ChartCard dataLoaded={dataLoaded} chartTitle="CNV Locked over Time">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 40,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="5" style={{ opacity: 0.15 }} />
          <XAxis
            dataKey="timestamp"
            scale="time"
            tickFormatter={(tickData) => {
              const date = new Date(tickData)
              return date.toLocaleString('default', { month: 'short' }) + '/' + date.getDate()
            }}
            style={{ fill: CHART_COLORS.TextLow, fontSize: '0.8rem' }}
          >
            <Label
              fill={CHART_COLORS.TextLow}
              value={'Date'}
              style={{
                textAnchor: 'middle',
                transform: 'translateY(22.5px)',
              }}
            />
          </XAxis>
          <YAxis style={{ fill: CHART_COLORS.TextLow }}>
            <Label
              fill={CHART_COLORS.TextLow}
              value={'CNV Locked'}
              style={{
                textAnchor: 'middle',
                transform: 'translate(-120px, 200px) rotate(-90deg)',
              }}
            />
          </YAxis>
          <Tooltip content={<ChartTooltip />} />
          <Line
            dot={false}
            dataKey="locked"
            name="Locked CNV"
            stroke={CHART_COLORS.LightBlue}
            strokeWidth={2.25}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
