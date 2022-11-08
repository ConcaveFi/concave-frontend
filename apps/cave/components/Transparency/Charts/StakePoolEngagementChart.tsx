import { liquidityValues } from 'components/LiquidStaking/hooks/useLiquidValues'
import { ethers } from 'ethers'
import { useQuery } from 'react-query'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ChartCard } from './ChartCard'
import { ChartTooltip } from './ChartTooltip'
import { CHART_COLORS } from './style'

type PoolIdCountDataType = {
  poolId: number
  percentStaked: number
  percentNotStaked: number
  currentlyStaked: number
  stakingCap: number
}

const PoolIdMap = { 0: '360 day', 1: '180 day', 2: '90 day', 3: '45 day' }

async function getPoolData(poolId: number): Promise<PoolIdCountDataType> {
  const { stakingV1Pools, stakingV1Cap } = await liquidityValues(1, poolId)
  if (!stakingV1Pools?.balance) return null
  const currentlyStaked = +ethers.utils.formatEther(stakingV1Pools?.balance)
  const stakingCap = +ethers.utils.formatEther(stakingV1Pools?.balance?.add(stakingV1Cap))
  const percentStaked = (currentlyStaked / stakingCap) * 100
  return {
    poolId,
    percentStaked,
    percentNotStaked: 100 - percentStaked,
    currentlyStaked,
    stakingCap,
  }
}

const usePoolData = (pools: number[]) => {
  return useQuery(['usePoolData'], () => {
    return Promise.all(pools.map(getPoolData))
  })
}

export const StakePoolEngagementChart = () => {
  const poolResult = usePoolData([0, 1, 2, 3])

  return (
    <ChartCard
      {...poolResult}
      chartTitle="CNV stake pool engagement"
      tooltipDescription="This chart visualizes the amount of CNV staked in each pool relative to the pool's staking cap."
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={poolResult.data}
          margin={{
            top: 20,
            right: 30,
            left: 30,
            bottom: 50,
          }}
        >
          <CartesianGrid strokeDasharray="5" opacity={0.15} />
          <XAxis
            dataKey="poolId"
            interval={0}
            tickFormatter={(v) => PoolIdMap[v]}
            tickLine={{ stroke: CHART_COLORS.TextLow }}
            axisLine={{ stroke: CHART_COLORS.TextLow }}
            style={{ fill: CHART_COLORS.TextLow, fontSize: '0.9rem' }}
          >
            <Label
              fill={CHART_COLORS.TextLow}
              value={'Stake pool'}
              style={{
                textAnchor: 'middle',
                transform: 'translateY(35px)',
              }}
            />
          </XAxis>
          <YAxis
            style={{ fill: CHART_COLORS.TextLow }}
            tickLine={{ stroke: CHART_COLORS.TextLow }}
            axisLine={{ stroke: CHART_COLORS.TextLow }}
          >
            <Label
              fill={CHART_COLORS.TextLow}
              value={'Percentage of pool occupied'}
              style={{
                textAnchor: 'middle',
                transform: 'translate(-90px, 178px) rotate(-90deg)',
              }}
            />
          </YAxis>
          <Tooltip cursor={false} content={<ChartTooltip decimalPlaces={2} postfix={'%'} />} />
          <Bar name="Staked" dataKey="percentStaked" stackId="a" fill={CHART_COLORS.LightBlue} />
          <Bar
            name="Unstaked"
            dataKey="percentNotStaked"
            stackId="a"
            fill={CHART_COLORS.Blue}
            opacity={0.15}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
