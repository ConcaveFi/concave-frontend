import { HStack, Image, Stack, Text } from '@concave/ui'
import { ChevronRightIcon } from '@concave/icons'
import React from 'react'

function GraphicGuide() {
  return (
    <Stack>
      <HStack spacing={6}>
        <Text fontWeight="extrabold">CNV</Text>
        <ChevronRightIcon boxSize={6} />
        <Text fontWeight="extrabold">Mint NFT</Text>
        <ChevronRightIcon boxSize={6} />
        <Text fontWeight="extrabold">NFT Marketplace</Text>
      </HStack>
      <HStack spacing={16} pt={6}>
        <Image alt="" src="/assets/liquidstaking/coins-logo.svg" />
        <Image alt="" src="/assets/liquidstaking/nft-logo.svg" />
        <Image alt="" src="/assets/liquidstaking/marketplace-logo.svg" pl={8} />
      </HStack>
    </Stack>
  )
}

export default GraphicGuide
