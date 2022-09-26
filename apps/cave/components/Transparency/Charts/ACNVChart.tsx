import { Text } from '@concave/ui'
import { useEffect, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ChartCard } from './ChartCard'
import { fetchData } from './fetchData'

export function ACNVChart() {
  const [data, setData] = useState<undefined | any>()
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    fetchData('acnv-redeemed')
      .then((data) => setData([data]))
      .then(() => setDataLoaded(true))
  }, [])

  return (
    <ChartCard dataLoaded={dataLoaded} chartTitle="aCNV Redeem Tracker">
      <>
        <Text lineHeight={'100%'} fontSize={'8xl'}>
          {dataLoaded && data[0].aCNVRedeemedPercent.toFixed(2)}%
        </Text>
        <Text fontSize={'large'}>aCNV Redeemed</Text>
        <ResponsiveContainer width="100%" height="35%">
          <BarChart
            layout="vertical"
            data={data}
            width={500}
            height={150}
            margin={{
              top: 20,
              right: 30,
              left: 30,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3" />
            <YAxis type="category" domain={[0]} tick={false} axisLine={false} width={0} />
            <XAxis
              type="number"
              dataKey="TOTAL_ACNV"
              tickCount={4}
              domain={[0, Math.ceil(dataLoaded && data[0].TOTAL_ACNV)]}
            />
            <Tooltip cursor={false} />
            <Legend />
            <Bar name="Redeemed aCNV" dataKey="aCNVRedeemed" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </>
    </ChartCard>
  )
}
