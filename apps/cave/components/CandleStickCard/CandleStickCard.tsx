import { HStack, VStack, Stack } from '@chakra-ui/react'
import React from 'react'
import { Card, CardProps, Text } from '@concave/ui'
import { CandleStickTimeOptions } from 'components/CandleStickCard/CandleStickTimeOptions'
import dynamic from 'next/dynamic'
import { useCandleStickChart } from 'components/CandleStickCard/useCandleStickChart'
import { CandleStickTokenOptions } from './CandleStickTokenOptions'

const CandleStickChart = dynamic(() => import('./CandleStickChart'), {
  loading: () => <p>Loading ...</p>,
  ssr: false,
})

const checkEquals = (prev: unknown, next: unknown) => {
  return JSON.stringify(prev) === JSON.stringify(next)
}

export const CandleStickCard = ({ from, to }: { from: string; to: string } & CardProps) => {
  const candleStickChart = useCandleStickChart(from, to)
  return (
    <VStack>
      <Card bgImage="/assets/blackboard.png" align="stretch">
        <Stack
          h={390}
          w={568}
          spacing={4}
          px={8}
          py={8}
          borderRadius={'2xl'}
          backdropFilter={'blur(5px)'}
        >
          <HStack mb={2} gap={2} justifyContent={'space-between'}>
            <CandleStickTokenOptions from={from} to={to} />
            <CandleStickTimeOptions
              intervals={candleStickChart.avaliableIntervals}
              defaultValue={candleStickChart.interval}
              onChangeInteral={(interval) => {
                candleStickChart.set({
                  interval,
                })
              }}
            />
          </HStack>
          {candleStickChart.loading ? (
            <Text pt={8}>Loading Data...</Text>
          ) : (
            <CandleStickChart data={candleStickChart.data} />
          )}
        </Stack>
      </Card>
    </VStack>
  )
}

export const CandleStickCardMemo = React.memo(CandleStickCard, checkEquals)
