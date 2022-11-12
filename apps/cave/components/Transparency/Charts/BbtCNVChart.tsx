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
  bbtCNVRedeemedV1: number
  bbtCNVRedeemedV2: number
  bbtCNVVesting: number
  totalBbtCNVRedeemed: number
  currentBbtCNVRedeemable: number
  TOTAL_BBTCNV: number
  vPCT: number
}

export function BbtCNVChart() {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const bbtCNVData = useFetchData<BbtCNVChartData>(
    'bbtcnv-redeemed',
    'https://devcnv-charts.vercel.app/api',
  )
  const dataLoaded = !bbtCNVData.isLoading
  const data = bbtCNVData.data
  const error = bbtCNVData.error
  return (
    <ChartCard
      {...bbtCNVData}
      chartTitle="BBT redeem counter"
      tooltipDescription="bbtCNV redeem counter."
      overflow="visible"
    >
      {dataLoaded && error && (
        <Text>{`Error fetching data, retrying in ${bbtCNVData.nextTriggerByError} seconds`}</Text>
      )}
      {dataLoaded && !error && (
        <>
          <Flex direction={'row'} gap={6} justifyContent={'space-evenly'} flexWrap={'wrap'}>
            <Flex direction={'column'} gap={1}>
              <Text fontSize={isMobile ? 'md' : '1.25rem'} lineHeight={'100%'}>
                {numberWithCommas(data.totalBbtCNVRedeemed.toFixed(0))}
              </Text>
              <Text fontSize={'sm'} lineHeight={'100%'}>
                CNV redeemed
              </Text>
            </Flex>
            <Flex direction={'column'} gap={1}>
              <Text fontSize={isMobile ? 'md' : '1.25rem'} lineHeight={'100%'}>
                {numberWithCommas(data.currentBbtCNVRedeemable.toFixed(0))}
              </Text>
              <Text fontSize={'sm'} lineHeight={'100%'}>
                CNV redeemable
              </Text>
            </Flex>
            <Flex direction={'column'} gap={1}>
              <Text fontSize={isMobile ? 'md' : '1.25rem'} lineHeight={'100%'}>
                {numberWithCommas(data.bbtCNVVesting.toFixed(0))}
              </Text>
              <Text fontSize={'sm'} lineHeight={'100%'}>
                CNV vesting
              </Text>
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
                name="Redeemed"
                dataKey="totalBbtCNVRedeemed"
                stackId="a"
                fill={CHART_COLORS.LightBlue}
              />
              <Bar
                name="Redeemable"
                dataKey="currentBbtCNVRedeemable"
                stackId="a"
                fill={CHART_COLORS.GreenYellow}
              />
              <Bar
                name="Vesting"
                dataKey="bbtCNVVesting"
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
