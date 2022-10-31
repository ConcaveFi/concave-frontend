import { Text } from '@concave/ui'
import { useEffect, useState } from 'react'
import { numberWithCommas } from 'utils/numbersWithCommas'
import { ChartCard } from './ChartCard'
import { fetchData } from './fetchData'

type AmountCNVLockedData = {
  ratioSupply: number
  ratio: number
  ratioStaked: number
}

export function LockedCNVChart({ width, fontSize }: { width: string; fontSize: string }) {
  const [data, setData] = useState<undefined | AmountCNVLockedData>()
  const [error, setError] = useState<undefined | string>()
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    fetchData('ratio', 'https://cnv-data.concave.lol/api')
      .then((data: AmountCNVLockedData) => setData(data))
      .catch((error: Error) => setError(error.message))
      .finally(() => setDataLoaded(true))
  }, [])

  return (
    <ChartCard
      dataLoaded={dataLoaded}
      chartTitle="CNV in lsdCNV"
      tooltipDescription="Calculated using amountLocked / totalSupply."
      width={width}
      overflow={'visible'}
    >
      {dataLoaded && error && <Text>{error}</Text>}
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
