import { useLiquidValues } from 'components/LiquidStaking/hooks/useLiquidValues'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
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
  isLoading: boolean
  currentlyStaked: number
  stakingCap: number
}

const PoolIdMap = { 0: '360 Day', 1: '180 Day', 2: '90 Day', 3: '45 Day' }

function GetPoolData(poolId: number): PoolIdCountDataType {
  const { data, isLoading } = useLiquidValues(1, poolId)
  const { stakingV1Pools, stakingV1Cap } = data || {}
  if (!stakingV1Pools?.balance) return null
  const currentlyStaked = +ethers.utils.formatEther(stakingV1Pools?.balance)
  const stakingCap = +ethers.utils.formatEther(stakingV1Pools?.balance?.add(stakingV1Cap))
  const percentStaked = (currentlyStaked / stakingCap) * 100
  return {
    poolId,
    percentStaked,
    percentNotStaked: 100 - percentStaked,
    isLoading,
    currentlyStaked,
    stakingCap,
  }
}

export const PoolIdChart = () => {
  const [data, setData] = useState<undefined | PoolIdCountDataType[]>()
  const [dataLoaded, setDataLoaded] = useState(false)
  const pool0 = GetPoolData(0)
  const pool1 = GetPoolData(1)
  const pool2 = GetPoolData(2)
  const pool3 = GetPoolData(3)

  useEffect(() => {
    if (!dataLoaded && pool0 !== null && pool1 !== null && pool2 !== null && pool3 !== null) {
      setData([pool0, pool1, pool2, pool3])
      setDataLoaded(true)
    }
  }, [pool0, pool1, pool2, pool3])

  return (
    <ChartCard
      dataLoaded={dataLoaded}
      chartTitle="CNV stake pool engagement"
      tooltipDescription="This chart visualizes the amount of CNV staked in each pool relative to the pool's staking cap."
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 10,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="5" opacity={0.15} />
          <XAxis
            dataKey="poolId"
            tickFormatter={(v) => PoolIdMap[v]}
            style={{ fill: CHART_COLORS.TextLow, fontSize: '0.9rem' }}
          >
            <Label
              fill={CHART_COLORS.TextLow}
              value={'Pool'}
              style={{
                textAnchor: 'middle',
                transform: 'translateY(22.5px)',
              }}
            />
          </XAxis>
          <YAxis style={{ fill: CHART_COLORS.TextLow }}>
            <Label
              fill={CHART_COLORS.TextLow}
              value={'Percentage of pool occupied'}
              style={{
                textAnchor: 'middle',
                transform: 'translate(-120px, 165px) rotate(-90deg)',
              }}
            />
          </YAxis>
          <Tooltip cursor={false} content={<ChartTooltip />} />
          <Bar
            name="Percent staked"
            dataKey="percentStaked"
            stackId="a"
            fill={CHART_COLORS.LightBlue}
          />
          <Bar
            name="Percent not staked"
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
