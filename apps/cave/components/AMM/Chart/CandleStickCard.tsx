import { Currency } from '@concave/gemswap-sdk'
import { Box, Card, Flex, SlideFade, Text } from '@concave/ui'
import { STABLES } from 'constants/routing'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import dynamic from 'next/dynamic'
import { CandleStickTimeOptions } from './CandleStickTimeOptions'
import { CandleStickTokenOptions } from './CandleStickTokenOptions'
import { useCandleStickChart } from './useCandleStickChart'

const CandleStickChart = dynamic(() => import('./CandleStickChart'), {
  loading: () => <p>Loading ...</p>,
  ssr: false,
})

export const CandleStickCard = ({ from: _from, to: _to }: { from?: Currency; to?: Currency }) => {
  /*
    if one of the currencies are a stable, we want the chart to always display the other relative to the stable
    (stable is always the `to`)
  */
  const [from, to] = STABLES[_from?.chainId]?.some((s) => s.equals(_from))
    ? [_to, _from]
    : [_from, _to]

  const candleStickChart = useCandleStickChart(from?.symbol, to?.symbol)

  return (
    <SlideFade in={candleStickChart.data.length > 0} offsetX="30px" unmountOnExit delay={0.2}>
      <Card variant="secondary" gap={2} p={6} w="100%" h="min">
        <Flex justifyContent="space-between" w="100%" gap={8}>
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
    </SlideFade>
  )
}
