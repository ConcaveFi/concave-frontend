import { Text } from '@concave/ui'
import { numberWithCommas } from 'utils/numbersWithCommas'
import { ChartCard } from './ChartCard'
import { useFetchData } from './useFetchData'

type AmountCNVLockedData = {
  ConcaveTokenTotalSupply: number
  sumAmountLocked: number
  ratioStaked: number
}

export function LockedCNVChart({ width, fontSize }: { width: string; fontSize: string }) {
  const amountLocked = useFetchData<AmountCNVLockedData>('locked')
  const dataLoaded = !amountLocked.isLoading
  const data = amountLocked.data
  const error = amountLocked.error
  return (
    <ChartCard
      {...amountLocked}
      chartTitle="CNV in lsdCNV"
      tooltipDescription="Calculated using amountLocked / totalSupply."
      width={width}
      overflow={'visible'}
    >
      {dataLoaded && error && <Text>{`Error to fetch result, we will refetch`}</Text>}
      {dataLoaded && !error && (
        <>
          <Text color={'text.low'} lineHeight={'100%'}>
            {numberWithCommas(data.sumAmountLocked.toFixed(4))}
            {' / '}
            {numberWithCommas(data.ConcaveTokenTotalSupply.toFixed(4))} CNV
          </Text>
          <Text lineHeight={'100%'} fontSize={fontSize}>
            {(data.ratioStaked * 100).toFixed(2)}%
          </Text>
          <Text fontSize={'large'}>CNV locked in lsdCNV</Text>
        </>
      )}
    </ChartCard>
  )
}
