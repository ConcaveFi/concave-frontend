import { Text } from '@concave/ui'
import { useEffect, useState } from 'react'
import { numberWithCommas } from 'utils/numbersWithCommas'
import { ChartCard } from './ChartCard'
import { fetchData } from './fetchData'

type LockedCNVData = {
  ConcaveTokenTotalSupply: number
  sumAmountLocked: number
  ratioStaked: number
}

export function LockedCNVChart() {
  const [data, setData] = useState<undefined | LockedCNVData>()
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    fetchData('locked')
      .then((data: LockedCNVData) => setData(data))
      .then(() => setDataLoaded(true))
  }, [])

  return (
    <ChartCard
      dataLoaded={dataLoaded}
      chartTitle="CNV in lsdCNV"
      tooltipDescription="Calculated using amountLocked / totalSupply."
    >
      {dataLoaded && (
        <>
          <Text color={'text.low'} lineHeight={'100%'}>
            {numberWithCommas(data.sumAmountLocked.toFixed(4))}
            {' / '}
            {numberWithCommas(data.ConcaveTokenTotalSupply.toFixed(4))} CNV
          </Text>
          <Text lineHeight={'100%'} fontSize={'8xl'}>
            {(data.ratioStaked * 100).toFixed(2)}%
          </Text>
          <Text fontSize={'large'}>CNV locked in lsdCNV</Text>
        </>
      )}
    </ChartCard>
  )
}
