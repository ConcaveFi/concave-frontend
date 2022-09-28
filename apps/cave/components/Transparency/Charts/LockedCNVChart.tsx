import { Text } from '@concave/ui'
import { useEffect, useState } from 'react'
import { ChartCard } from './ChartCard'
import { fetchData } from './fetchData'

type LockedCNVType = {
  ConcaveTokenTotalSupply: number
  sumAmountLocked: number
  ratioStaked: number
}

export function LockedCNVChart() {
  const [data, setData] = useState<undefined | LockedCNVType>()
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    fetchData('locked')
      .then((data) => setData(data))
      .then(() => setDataLoaded(true))
  }, [])

  return (
    <ChartCard
      dataLoaded={dataLoaded}
      chartTitle="CNV in lsdCNV"
      tooltipDescription="Calculated using amountLocked / totalSupply."
    >
      <>
        <Text color={'text.low'} lineHeight={'100%'}>
          {data?.sumAmountLocked.toFixed(4)} / {data?.ConcaveTokenTotalSupply.toFixed(4)} CNV
        </Text>
        <Text lineHeight={'100%'} fontSize={'8xl'}>
          {(data?.ratioStaked * 100).toFixed(2)}%
        </Text>
        <Text fontSize={'large'}>CNV locked in lsdCNV</Text>
      </>
    </ChartCard>
  )
}
