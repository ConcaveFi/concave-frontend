import { Text } from '@concave/ui'
import { numberWithCommas } from 'utils/numbersWithCommas'
import { ChartCard } from './ChartCard'
import { useFetchData } from './useFetchData'

type AmountCNVLockedData = {
  ratioSupply: number
  ratio: number
  ratioStaked: number
}
export function LockedCNVChart({ width, fontSize }: { width: string; fontSize: string }) {
  const amountLocked = useFetchData<AmountCNVLockedData>(
    'ratio',
    'https://cnv-data.concave.lol/api',
  )
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
      {dataLoaded && error && (
        <Text>{`Error fetching data, retrying in ${amountLocked.nextTriggerByError} seconds`}</Text>
      )}
      {dataLoaded && !error && (
        <>
          <Text color={'text.low'} lineHeight={'100%'}>
            {numberWithCommas(data.ratioStaked.toFixed(4))}
            {' / '}
            {numberWithCommas(data.ratioSupply.toFixed(4))} CNV
          </Text>
          <Text lineHeight={'100%'} fontSize={fontSize}>
            {(data.ratio * 100).toFixed(2)}%
          </Text>
          <Text fontSize={'large'}>CNV locked in lsdCNV</Text>
        </>
      )}
    </ChartCard>
  )
}
