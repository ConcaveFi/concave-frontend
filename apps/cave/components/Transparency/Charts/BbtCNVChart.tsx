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
import { numberWithCommas } from 'utils/numbersWithCommas'
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
  const [error, setError] = useState<undefined | string>()
  const [dataLoaded, setDataLoaded] = useState(false)
  const isMobile = useBreakpointValue({ base: true, md: false })

  useEffect(() => {
    fetchData('bbtcnv-redeemed')
      .then((data: BbtCNVChartData) => setData([data]))
      .catch((error: Error) => setError(error.message))
      .finally(() => setDataLoaded(true))
  }, [])

  return (
    <ChartCard
      dataLoaded={dataLoaded}
      chartTitle="bbtCNV redeem counter"
      tooltipDescription="bbtCNV redeem counter."
      overflow="visible"
    >
      {dataLoaded && error && <Text>{error}</Text>}
      {dataLoaded && !error && (
        <>
          <Flex direction={'row'} gap={6} justifyContent={'space-evenly'}>
            <Flex direction={'column'} gap={1}>
              <Text fontSize={isMobile ? 'md' : '1.25rem'} lineHeight={'100%'}>
                {numberWithCommas(data[0].bbtCNVRedeemable.toFixed(4))}
              </Text>
              <Text fontSize={'sm'} lineHeight={'100%'}>
                bbtCNV redeemable
              </Text>
            </Flex>
            <Flex direction={'column'} gap={1}>
              <Text fontSize={isMobile ? 'md' : '1.25rem'} lineHeight={'100%'}>
                {numberWithCommas(data[0].bbtCNVRedeemed.toFixed(4))}
              </Text>
              <Text fontSize={'sm'} lineHeight={'100%'}>
                bbtCNV redeemed
              </Text>
            </Flex>
            <Flex direction={'column'} gap={1}>
              <Text fontSize={isMobile ? 'md' : '1.25rem'} lineHeight={'100%'}>
                {numberWithCommas(data[0].bbtCNVToVest.toFixed(4))}
              </Text>
              <Text fontSize={'sm'} lineHeight={'100%'}>
                bbtCNV vesting
              </Text>
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
              <CartesianGrid strokeDasharray="5" opacity={0.2} />
              <YAxis type="category" domain={[0]} axisLine={false} width={0} />
              <XAxis
                type="number"
                dataKey="TOTAL_BBTCNV"
                domain={[0, Math.ceil(data[0].TOTAL_BBTCNV)]}
                tickFormatter={(v) => v.toLocaleString()}
                tickLine={{ stroke: CHART_COLORS.TextLow }}
                axisLine={{ stroke: CHART_COLORS.TextLow }}
                style={{ fill: CHART_COLORS.TextLow }}
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
