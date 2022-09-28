import { Flex, Text, useBreakpointValue } from '@concave/ui'
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
import { ChartTooltip } from './ChartTooltip'
import { fetchData } from './fetchData'
import { CHART_COLORS } from './style'

type BbtCNVChartData = {
  bbtCNVRedeemable: number
  bbtCNVRedeemed: number
  bbtCNVToVest: number
  TOTAL_BBTCNV: number
}

export function BbtCNVChart() {
  const [data, setData] = useState<undefined | BbtCNVChartData[]>()
  const [dataLoaded, setDataLoaded] = useState(false)
  const isMobile = useBreakpointValue({ base: true, md: false })

  useEffect(() => {
    fetchData('bbtcnv-redeemed')
      .then((data: BbtCNVChartData) => setData([data]))
      .then(() => setDataLoaded(true))
  }, [])

  return (
    <ChartCard
      dataLoaded={dataLoaded}
      chartTitle="bbtCNV Redeem Counter"
      tooltipDescription="bbtCNV redeem counter."
    >
      {dataLoaded && (
        <>
          <Flex direction={'row'} gap={6} justifyContent={'space-evenly'}>
            <Flex direction={'column'} gap={1}>
              <Text fontSize={isMobile ? 'md' : '2xl'} lineHeight={'100%'}>
                {data[0].bbtCNVRedeemable.toFixed(4)}
              </Text>
              <Text lineHeight={'100%'}>bbtCNV Redeemable</Text>
            </Flex>
            <Flex direction={'column'} gap={1}>
              <Text fontSize={isMobile ? 'md' : '2xl'} lineHeight={'100%'}>
                {data[0].bbtCNVRedeemed.toFixed(4)}
              </Text>
              <Text lineHeight={'100%'}>bbtCNV Redeemed</Text>
            </Flex>
            <Flex direction={'column'} gap={1}>
              <Text fontSize={isMobile ? 'md' : '2xl'} lineHeight={'100%'}>
                {data[0].bbtCNVToVest.toFixed(4)}
              </Text>
              <Text lineHeight={'100%'}>Vesting bbtCNV</Text>
            </Flex>
          </Flex>
          <ResponsiveContainer width="100%" height="50%">
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
                domain={[0, Math.ceil(data[0].TOTAL_BBTCNV)]}
                tickLine={false}
              />
              <Tooltip cursor={false} content={<ChartTooltip />} />
              <Legend />
              <Bar
                name="Redeemable bbtCNV"
                dataKey="bbtCNVRedeemable"
                stackId="a"
                fill={CHART_COLORS.GreenYellow}
              />
              <Bar
                name="Redeemed bbtCNV"
                dataKey="bbtCNVRedeemed"
                stackId="a"
                fill={CHART_COLORS.LightBlue}
              />
              <Bar
                name="Vesting bbtCNV"
                dataKey="bbtCNVToVest"
                stackId="a"
                fill={CHART_COLORS.Orange}
                opacity={0.5}
              />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </ChartCard>
  )
}
