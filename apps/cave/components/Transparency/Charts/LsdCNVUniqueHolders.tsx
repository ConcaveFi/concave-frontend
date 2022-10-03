import { Text } from '@concave/ui'
import { useEffect, useState } from 'react'
import { ChartCard } from './ChartCard'
import { fetchData } from './fetchData'

type LsdCNVHoldersData = {
  aggregate: {
    count: number
  }
}

export function LsdCNVHoldersChart() {
  const [data, setData] = useState<undefined | LsdCNVHoldersData>()
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    fetchData('lsdcnv-unique-holders')
      .then((data: LsdCNVHoldersData) => setData(data))
      .then(() => setDataLoaded(true))
  }, [])

  return (
    <ChartCard
      dataLoaded={dataLoaded}
      chartTitle="lsdCNV holders"
      tooltipDescription="The amount of unique lsdCNV holders."
      width={'50%'}
    >
      {dataLoaded && (
        <>
          <Text lineHeight={'100%'} fontSize={'8xl'}>
            {data.aggregate.count}
          </Text>
          <Text fontSize={'large'}>lsdCNV holders</Text>
        </>
      )}
    </ChartCard>
  )
}
