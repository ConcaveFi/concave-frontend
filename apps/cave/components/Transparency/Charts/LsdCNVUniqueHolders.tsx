import { Text } from '@concave/ui'
import { ChartCard } from './ChartCard'
import { useFetchData } from './useFetchData'

type LsdCNVHoldersData = {
  aggregate: {
    count: number
  }
}

export function LsdCNVHoldersChart({ width, fontSize }: { width: string; fontSize: string }) {
  const fetchResult = useFetchData<LsdCNVHoldersData>('lsdcnv-unique-holders')
  const dataLoaded = !fetchResult.isLoading
  const data = fetchResult.data
  const error = fetchResult.error

  return (
    <ChartCard
      {...fetchResult}
      chartTitle="lsdCNV holders"
      tooltipDescription="The amount of unique lsdCNV holders."
      width={width}
    >
      {dataLoaded && error && <Text>{`Error to fetch result, we will refetch`}</Text>}
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
