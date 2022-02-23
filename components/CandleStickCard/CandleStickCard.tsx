import { HStack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Card } from 'components/Card'
import { CandleStickTimeOptions } from 'components/CandleStickCard/CandleStickTimeOptions'
import { XmrIcon } from 'components/icons/xmr'
import dynamic from 'next/dynamic'

const CandleStickChart = dynamic(() => import('./CandleStickChart'), {
  loading: () => <p>Loading ...</p>,
  ssr: false,
})

export function CandleStickCard() {
  const [selectInterval, setSelectInerval] = useState(300)
  return (
    <Card spacing={4} px={8} py={8} bgImage="/assets/blackboard.png" align="stretch">
      <HStack gap={3}>
        <HStack
          py={1}
          px={2}
          borderRadius="3xl"
          boxShadow="-1px 1px 3px rgba(126, 162, 255, 0.26), inset 0px -5px 5px rgba(255, 255, 255, 0.02), inset -9px 12px 24px rgba(13, 17, 23, 0.49)"
        >
          <Text marginRight={1} marginLeft={1}>
            <XmrIcon /> gCNV / <XmrIcon /> XMR
          </Text>
        </HStack>
        <CandleStickTimeOptions onChangeInteral={setSelectInerval} />
      </HStack>
      <CandleStickChart selectInterval={selectInterval} />
    </Card>
  )
}
