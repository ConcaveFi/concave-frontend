import { HStack, VStack, Stack } from '@concave/ui'
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

export const CandleStickCard = ({
  from,
  to,
  ...cardProps
}: { from: string; to: string } & CardProps) => {
  const candleStickChart = useCandleStickChart(from, to)
  return (
    <Card {...cardProps}>
      <HStack justifyContent={'space-between'}>
        <CandleStickTokenOptions from={from} to={to} />
        <CandleStickTimeOptions
          intervals={candleStickChart.avaliableIntervals}
          defaultValue={candleStickChart.interval}
          onChangeInteral={(interval) => {
            candleStickChart.set({ interval })
          }}
        />
      </HStack>
      {candleStickChart.loading ? (
        <Text pt={8}>Loading Data...</Text>
      ) : (
        <CandleStickChart data={candleStickChart.data} />
      )}
    </Card>
  )
}

export const CandleStickCardMemo = React.memo(CandleStickCard, checkEquals)
