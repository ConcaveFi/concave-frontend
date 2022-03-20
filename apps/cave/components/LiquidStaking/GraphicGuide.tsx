import { HStack, Stack, Text } from '@concave/ui'
import { ChevronRightIcon } from '@concave/icons'
import React from 'react'

function GraphicGuide() {
  return (
    <Stack>
      <HStack>
        <Text>CNV</Text>
        <ChevronRightIcon />
        <Text>Mint NFT</Text>
        <ChevronRightIcon />
        <Text>NFT Marketplace</Text>
      </HStack>
      <HStack></HStack>
    </Stack>
  )
}

export default GraphicGuide
