import { Flex, Box, Card, CardProps, Text } from '@concave/ui'
import { Currency } from 'gemswap-sdk'
import dynamic from 'next/dynamic'
import { CandleStickTokenOptions } from './CandleStickTokenOptions'
import { CandleStickTimeOptions } from './CandleStickTimeOptions'
import { useCandleStickChart } from './useCandleStickChart'

const CandleStickChart = dynamic(() => import('./CandleStickChart'), {
  loading: () => <p>Loading ...</p>,
  ssr: false,
})

export const CandleStickCard = ({
  from,
  to,
  ...cardProps
}: { from?: Currency; to?: Currency } & CardProps) => {
  const candleStickChart = useCandleStickChart(from?.symbol, to?.symbol)

  return (
    <Card {...cardProps}>
      <Flex justifyContent="space-between" w="100%">
        <CandleStickTokenOptions from={from} to={to} />
        <CandleStickTimeOptions
          intervals={candleStickChart.avaliableIntervals}
          defaultValue={candleStickChart.interval}
          onChangeInteral={(interval) => {
            candleStickChart.set({ interval })
          }}
          display={{ base: 'none', md: 'flex' }}
        />
      </Flex>
      <Box mt={5} h={276}>
        {candleStickChart.loading ? (
          <Text pt={8}>Loading Data...</Text>
        ) : (
          <CandleStickChart data={candleStickChart.data} />
        )}
      </Box>
      <Flex justifyContent={'center'} display={{ base: 'flex', md: 'none' }}>
        <CandleStickTimeOptions
          intervals={candleStickChart.avaliableIntervals}
          defaultValue={candleStickChart.interval}
          onChangeInteral={(interval) => {
            candleStickChart.set({ interval })
          }}
        />
      </Flex>
    </Card>
  )
}
