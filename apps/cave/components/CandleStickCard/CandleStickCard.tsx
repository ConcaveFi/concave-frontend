import { Flex, HStack, useMediaQuery } from '@chakra-ui/react'
import { Card, CardProps, Text } from '@concave/ui'
import { CandleStickTimeOptions } from 'components/CandleStickCard/CandleStickTimeOptions'
import { useCandleStickChart } from 'components/CandleStickCard/useCandleStickChart'
import dynamic from 'next/dynamic'
import React from 'react'
import { CandleStickTokenOptions } from './CandleStickTokenOptions'

const CandleStickChart = dynamic(() => import('./CandleStickChart'), {
  loading: () => <p>Loading ...</p>,
  ssr: false,
})

const checkEquals = (prev: unknown, next: unknown) => {
  return JSON.stringify(prev) === JSON.stringify(next)
}

export const CandleStickCard = ({
  from,
  to,
  ...cardProps
}: { from: string; to: string } & CardProps) => {
  const candleStickChart = useCandleStickChart(from, to)
  const [isMobile] = useMediaQuery(['(max-width: 768px)'])
  return (
    <Card {...cardProps}>
      <Flex justifyContent={isMobile ? 'center' : 'space-between'} minW={'100%'}>
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
      {candleStickChart.loading ? (
        <Text pt={8}>Loading Data...</Text>
      ) : (
        <CandleStickChart data={candleStickChart.data} />
      )}
      {isMobile && (
        <HStack justifyContent={'center'}>
          <CandleStickTimeOptions
            intervals={candleStickChart.avaliableIntervals}
            defaultValue={candleStickChart.interval}
            onChangeInteral={(interval) => {
              candleStickChart.set({ interval })
            }}
          />{' '}
        </HStack>
      )}
    </Card>
  )
}

export const CandleStickCardMemo = React.memo(CandleStickCard, checkEquals)
