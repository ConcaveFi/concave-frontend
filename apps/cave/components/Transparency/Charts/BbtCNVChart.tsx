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

export function BbtCNVChart() {
  const [data, setData] = useState<undefined | any>()
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    fetchData('bbtcnv-redeemed')
      .then((data) => setData([data]))
      .then(() => setDataLoaded(true))
  }, [])

  return (
    <ChartCard
      dataLoaded={dataLoaded}
      chartTitle="bbtCNV Redeem Tracker"
      tooltipDescription="Track bbtCNV redeems."
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          width={500}
          height={150}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3" />
          <YAxis type="category" domain={[0]} axisLine={false} width={0} />
          <XAxis
            type="number"
            dataKey="TOTAL_BBTCNV"
            domain={[0, Math.ceil(dataLoaded && data[0].TOTAL_BBTCNV)]}
            tickLine={false}
          />
          <Tooltip cursor={false} />
          <Legend />
          <Bar name="Redeemable bbtCNV" dataKey="bbtCNVRedeemable" stackId="a" fill="#8884d8" />
          <Bar name="Redeemed bbtCNV" dataKey="bbtCNVRedeemed" stackId="a" fill="#82ca9d" />
          <Bar name="Vesting bbtCNV" dataKey="bbtCNVToVest" stackId="a" fill="grey" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
