import { Text } from '@concave/ui'
import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartCard } from './ChartCard'
import { ChartTooltip } from './ChartTooltip'
import { fetchData } from './fetchData'
import { CHART_COLORS } from './style'

type ACNVChartData = {
  aCNVRedeemed: number
  aCNVRedeemedPercent: number
  TOTAL_ACNV: number
}

export function ACNVChart() {
  const [data, setData] = useState<undefined | ACNVChartData[]>()
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    fetchData('acnv-redeemed')
      .then((data: ACNVChartData) => setData([data]))
      .then(() => setDataLoaded(true))
  }, [])

  return (
    <ChartCard dataLoaded={dataLoaded} chartTitle="aCNV Redeem Counter">
      {dataLoaded && (
        <>
          <Text color={'text.low'} lineHeight={'100%'}>
            {Math.ceil(data[0].aCNVRedeemed)} / {Math.ceil(data[0].TOTAL_ACNV)} aCNV redeemed
          </Text>
          <Text lineHeight={'100%'} fontSize={'8xl'} display={'flex'} justifyContent={'center'}>
            {data[0].aCNVRedeemedPercent.toFixed(2)}%
          </Text>
          <Text fontSize={'large'}>aCNV redeemed</Text>
          <ResponsiveContainer width="100%" height="30%">
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
              <CartesianGrid strokeDasharray="5" opacity={0.2} />
              <YAxis type="category" domain={[0]} tick={false} axisLine={false} width={0} />
              <XAxis
                type="number"
                dataKey="TOTAL_ACNV"
                tickCount={4}
                domain={[0, Math.ceil(data[0].TOTAL_ACNV)]}
              />
              <Tooltip cursor={false} content={<ChartTooltip />} />
              <Bar
                name="Redeemed aCNV"
                dataKey="aCNVRedeemed"
                fill={CHART_COLORS.LightBlue}
                background={{ fill: CHART_COLORS.Blue, opacity: 0.35 }}
              />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </ChartCard>
  )
}
