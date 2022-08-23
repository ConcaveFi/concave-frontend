import { Currency } from '@concave/core'
import { Box, Card, Flex, SlideFade } from '@concave/ui'
import { STABLES } from 'components/AMM/constants/routing'
import { motion } from 'framer-motion'
import { ChartInterval, chartIntervals } from 'lib/token.service'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useCandleStickChart } from '../hooks/useCandleStickChart'
import { CandleStickTimeOptions } from './CandleStickTimeOptions'
import { CandleStickTokenOptions } from './CandleStickTokenOptions'


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

  const [interval, setInterval] = useState<ChartInterval>('5m')
  const candleStickChart = useCandleStickChart(from?.symbol, to?.symbol, interval)

  const hasData = candleStickChart.isLoading || candleStickChart.data.length > 0
  return (
    <SlideFade
      layout="position"
      in={hasData}
      delay={0.2}
      style={hasData && { width: '100%', maxWidth: '520px' }}
    >
      {hasData && (
        <Card
          willChange="transform"
          variant="secondary"
          gap={2}
          p={6}
          w="100%"
          maxW="100vw"
          h="min"
        >
          <Flex justifyContent="space-between" w="100%" gap={8}>
            <CandleStickTokenOptions from={from} to={to} />
            <CandleStickTimeOptions
              intervals={chartIntervals}
              defaultValue={interval}
              onChangeInteral={setInterval}
              display={{ base: 'none', md: 'flex' }}
            />
          </Flex>
          <Box as={motion.div} layout mt={5} h={276}>
            <CandleStickChart data={candleStickChart.data} />
          </Box>
          <Flex justifyContent={'center'} display={{ base: 'flex', md: 'none' }}>
            <CandleStickTimeOptions
              intervals={chartIntervals}
              defaultValue={interval}
              onChangeInteral={setInterval}
            />
          </Flex>
        </Card>
      )}
    </SlideFade>
  )
}
