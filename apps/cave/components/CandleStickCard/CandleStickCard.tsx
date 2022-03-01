import { HStack, VStack, Stack } from '@chakra-ui/react'
import React from 'react'
import { Card, Text } from '@concave/ui'
import { CandleStickTimeOptions } from 'components/CandleStickCard/CandleStickTimeOptions'
import dynamic from 'next/dynamic'
import { CandleStickTokenOptions } from './CandleStickTokenOptions'
import { useCandleStickChart } from 'hooks/useCandleStickChart'
import { SwapState } from 'hooks/useSwap'

const CandleStickChart = dynamic(() => import('./CandleStickChart'), {
  loading: () => <p>Loading ...</p>,
  ssr: false,
})

export function CandleStickCard({ swap }: { swap: SwapState }) {
  const { selectedInputToken, selectedOutputToken } = swap
  const { data, setSelectInerval, loading } = useCandleStickChart({
    selectedInputToken,
    selectedOutputToken,
  })

  return (
    <VStack id="CandleStick">
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
            <CandleStickTokenOptions
              selectedInputToken={selectedInputToken}
              selectedOutputToken={selectedOutputToken}
            />
            <CandleStickTimeOptions onChangeInteral={setSelectInerval} />
          </HStack>
          {data.length}
          {loading ? <Text pt={8}>Loading Data...</Text> : <CandleStickChart data={data} />}
        </Stack>
      </Card>
    </VStack>
  )
}
