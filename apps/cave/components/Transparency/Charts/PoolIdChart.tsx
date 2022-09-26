import { useLiquidValues } from 'components/LiquidStaking/hooks/useLiquidValues'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartCard } from './ChartCard'

type PoolIdCountDataType = {
  poolId: number
  percentStaked: number
  percentNotStaked: number
  isLoading: boolean
  currentlyStaked: number
  stakingCap: number
}

const PoolIdMap = { 0: '360 Day', 1: '180 Day', 2: '90 Day', 3: '45 Day' }

function getPoolData(poolId: number): PoolIdCountDataType {
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
  const pool0 = getPoolData(0)
  const pool1 = getPoolData(1)
  const pool2 = getPoolData(2)
  const pool3 = getPoolData(3)

  useEffect(() => {
    if (!dataLoaded && pool0 !== null && pool1 !== null && pool2 !== null && pool3 !== null) {
      setData([pool0, pool1, pool2, pool3])
      setDataLoaded(true)
    }
  }, [pool0, pool1, pool2, pool3])

  return (
    <ChartCard dataLoaded={dataLoaded} chartTitle="CNV Locked by Pool">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
          <CartesianGrid strokeDasharray="5" style={{ opacity: 0.25 }} />
          <XAxis dataKey="poolId" tickFormatter={(v) => PoolIdMap[v]} />
          <YAxis scale="sqrt" />
          <Tooltip cursor={false} />
          <Bar dataKey="percentStaked" stackId="a" fill="#8884d8" />
          <Bar dataKey="percentNotStaked" stackId="a" fill="#505050" opacity={0.5} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
