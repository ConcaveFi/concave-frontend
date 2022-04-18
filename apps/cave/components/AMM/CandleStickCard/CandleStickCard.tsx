import { Flex, useMediaQuery, Box, Card, CardProps, Text } from '@concave/ui'
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
  const [isMobile] = useMediaQuery(['(max-width: 768px)'])

  return (
    <Card {...cardProps}>
      <Flex justifyContent="space-between" w="100%">
        <CandleStickTokenOptions from={from} to={to} />
        {!isMobile && (
          <CandleStickTimeOptions
            intervals={candleStickChart.avaliableIntervals}
            defaultValue={candleStickChart.interval}
            onChangeInteral={(interval) => {
              candleStickChart.set({ interval })
            }}
          />
        )}
      </Flex>
      <Box mt={5} h={276}>
        {candleStickChart.loading ? (
          <Text pt={8}>Loading Data...</Text>
        ) : (
          <CandleStickChart data={candleStickChart.data} />
        )}
      </Box>
      {isMobile && (
        <Flex justifyContent={'center'}>
          <CandleStickTimeOptions
            intervals={candleStickChart.avaliableIntervals}
            defaultValue={candleStickChart.interval}
            onChangeInteral={(interval) => {
              candleStickChart.set({ interval })
            }}
          />
        </Flex>
      )}
    </Card>
  )
}
