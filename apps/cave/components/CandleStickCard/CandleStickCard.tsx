import { HStack, VStack, Stack } from '@chakra-ui/react'
import React from 'react'
import { Card, Text } from '@concave/ui'
import { CandleStickTimeOptions } from 'components/CandleStickCard/CandleStickTimeOptions'
import dynamic from 'next/dynamic'
import { CandleStickTokenOptions } from './CandleStickTokenOptions'
import { useCandleStickChart } from 'hooks/useCandleStickChart'

const CandleStickChart = dynamic(() => import('./CandleStickChart'), {
  loading: () => <p>Loading ...</p>,
  ssr: false,
})

export function CandleStickCard() {
  const { data, setSelectInerval, loading } = useCandleStickChart()
  return (
    <VStack>
      <Card bgImage="/assets/blackboard.png" align="stretch">
        <Stack
          id="candle"
          maxH={'390px'}
          spacing={4}
          px={8}
          py={8}
          borderRadius={'2xl'}
          backdropFilter={'blur(5px)'}
        >
          <HStack mb={2} gap={3}>
            <CandleStickTokenOptions />
            <CandleStickTimeOptions onChangeInteral={setSelectInerval} />
          </HStack>
          {loading ? <Text pt={8}>Loading...</Text> : <CandleStickChart data={data} />}
        </Stack>
      </Card>
    </VStack>
  )
}
