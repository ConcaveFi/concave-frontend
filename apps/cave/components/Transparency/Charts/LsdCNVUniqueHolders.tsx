import { Text } from '@concave/ui'
import { useEffect, useState } from 'react'
import { ChartCard } from './ChartCard'
import { fetchData } from './fetchData'

type LsdCNVHoldersData = {
  aggregate: {
    count: number
  }
}

export function LsdCNVHoldersChart({ width, fontSize }: { width: string; fontSize: string }) {
  const [data, setData] = useState<undefined | LsdCNVHoldersData>()
  const [error, setError] = useState<undefined | string>()
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    fetchData('lsdcnv-unique-holders')
      .then((data: LsdCNVHoldersData) => setData(data))
      .catch((error: Error) => setError(error.message))
      .finally(() => setDataLoaded(true))
  }, [])

  return (
    <ChartCard
      dataLoaded={dataLoaded}
      chartTitle="lsdCNV holders"
      tooltipDescription="The amount of unique lsdCNV holders."
      width={width}
    >
      {dataLoaded && error && <Text>{error}</Text>}
      {dataLoaded && !error && (
        <>
          <Text lineHeight={'100%'} fontSize={fontSize}>
            {data.aggregate.count}
          </Text>
          <Text fontSize={'large'}>lsdCNV holders</Text>
        </>
      )}
    </ChartCard>
  )
}
