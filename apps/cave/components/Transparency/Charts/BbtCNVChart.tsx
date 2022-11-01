import { Flex, Text, useBreakpointValue } from '@concave/ui'
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
import { CHART_COLORS } from './style'
import { useFetchData } from './useFetchData'

type BbtCNVChartData = {
  bbtCNVRedeemable: number
  bbtCNVRedeemed: number
  bbtCNVToVest: number
  TOTAL_BBTCNV: number
}

export function BbtCNVChart() {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const bbtCNVData = useFetchData<BbtCNVChartData>('bbtcnv-redeemed')
  const dataLoaded = !bbtCNVData.isLoading
  const data = bbtCNVData.data
  const error = bbtCNVData.error
  return (
    <ChartCard
      {...bbtCNVData}
      chartTitle="bbtCNV redeem counter"
      tooltipDescription="bbtCNV redeem counter."
      overflow="visible"
    >
      {dataLoaded && error && <Text>{`Error fetching data, retrying`}</Text>}
      {dataLoaded && !error && (
        <>
          <Flex direction={'row'} gap={6} justifyContent={'space-evenly'}>
            <Flex direction={'column'} gap={1}>
              <Text fontSize={isMobile ? 'md' : '2xl'} lineHeight={'100%'}>
                {numberWithCommas(data.bbtCNVRedeemable.toFixed(4))}
              </Text>
              <Text lineHeight={'100%'}>bbtCNV redeemable</Text>
            </Flex>
            <Flex direction={'column'} gap={1}>
              <Text fontSize={isMobile ? 'md' : '2xl'} lineHeight={'100%'}>
                {numberWithCommas(data.bbtCNVRedeemed.toFixed(4))}
              </Text>
              <Text lineHeight={'100%'}>bbtCNV redeemed</Text>
            </Flex>
            <Flex direction={'column'} gap={1}>
              <Text fontSize={isMobile ? 'md' : '2xl'} lineHeight={'100%'}>
                {numberWithCommas(data.bbtCNVToVest.toFixed(4))}
              </Text>
              <Text lineHeight={'100%'}>bbtCNV vesting</Text>
            </Flex>
          </Flex>
          <ResponsiveContainer width="100%" height="50%">
            <BarChart
              layout="vertical"
              width={500}
              height={150}
              data={[data]}
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
                domain={[0, Math.ceil(data.TOTAL_BBTCNV)]}
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
