import { Text } from '@concave/ui'
import { ChartCard } from './ChartCard'
import { useFetchData } from './useFetchData'

type LsdCNVHoldersData = {
  aggregate: {
    count: number
  }
}

export function LsdCNVHoldersChart({ width, fontSize }: { width: string; fontSize: string }) {
  const lsdCNVHolders = useFetchData<LsdCNVHoldersData>('lsdcnv-unique-holders')
  const dataLoaded = !lsdCNVHolders.isLoading
  const data = lsdCNVHolders.data
  const error = lsdCNVHolders.error

  return (
    <ChartCard
      {...lsdCNVHolders}
      chartTitle="lsdCNV holders"
      tooltipDescription="The amount of unique lsdCNV holders."
      width={width}
    >
      {dataLoaded && error && (
        <Text>{`Error fetching data, retrying in ${lsdCNVHolders.nextTriggerByError} seconds`}</Text>
      )}
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
