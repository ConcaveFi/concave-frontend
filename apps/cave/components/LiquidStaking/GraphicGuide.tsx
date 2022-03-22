import { Box, HStack, Image, Stack, Text } from '@concave/ui'
import { ChevronRightIcon } from '@concave/icons'
import React from 'react'

function GraphicGuide() {
  return (
    <Stack>
      <HStack spacing={6}>
        <Text>CNV</Text>
        <ChevronRightIcon boxSize={6} />
        <Text>Mint NFT</Text>
        <ChevronRightIcon boxSize={6} />
        <Text>NFT Marketplace</Text>
      </HStack>
      <HStack spacing={16} pt={6}>
        <Image src="/assets/liquidstaking/coins-logo.svg" />
        <Image src="/assets/liquidstaking/nft-logo.svg" />
        <Image src="/assets/liquidstaking/marketplace-logo.svg" pl={8} />
      </HStack>
    </Stack>
  )
}

export default GraphicGuide
