import { useEffect, useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ChartCard } from './ChartCard'
import { fetchData } from './fetchData'

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
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
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
            style={{ fontSize: '0.8rem' }}
          />
          <YAxis />
          <Tooltip />
          <Line dot={false} dataKey="locked" name="Locked CNV" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
