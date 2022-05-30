import { Flex, HStack, Image, Stack, Text } from '@concave/ui'
import { ChevronRightIcon } from '@concave/icons'
import React from 'react'

function GraphicGuide() {
  return (
    <Stack textColor={'white'} fontSize={{ base: 'sm', sm: 'md' }}>
      <Flex justify={'space-between'}>
        <Flex direction={'column'} align="center" gap={'5'}>
          <Text fontWeight="extrabold">CNV</Text>
          <Image
            width={{ base: '40px', sm: '60px' }}
            height={{ base: '40px', sm: '60px' }}
            alt=""
            src="/assets/liquidstaking/coins-logo.svg"
            mx={'auto'}
          />
        </Flex>
        <ChevronRightIcon boxSize={12} my="auto" />
        <Flex direction={'column'} align="center" gap={'5'}>
          <Text fontWeight="extrabold">Mint NFT</Text>
          <Image
            width={{ base: '40px', sm: '60px' }}
            height={{ base: '40px', sm: '60px' }}
            alt=""
            src="/assets/liquidstaking/nft-logo.svg"
          />
        </Flex>
        <ChevronRightIcon boxSize={12} my="auto" />
        <Flex direction={'column'} align="center" gap={{ base: '3', sm: '3' }}>
          <Text fontWeight="extrabold">NFT Marketplace</Text>
          <Image
            width={{ base: '50px', sm: '70px' }}
            height={{ base: '50px', sm: '70px' }}
            alt=""
            src="/assets/liquidstaking/marketplace-logo.svg"
          />
        </Flex>
      </Flex>
      <HStack pt={6}></HStack>
    </Stack>
  )
}

export default GraphicGuide

{
  /* <Stack textColor={'white'} fontSize={{ base: 'sm', sm: 'md' }}>
      <Flex justify={'space-between'}>
        <Text fontWeight="extrabold">CNV</Text>
        <ChevronRightIcon boxSize={6} />
        <Text fontWeight="extrabold">Mint NFT</Text>
        <ChevronRightIcon boxSize={6} />
        <Text fontWeight="extrabold">NFT Marketplace</Text>
      </Flex>
      <HStack pt={6}></HStack>
    </Stack> */
}
// <Image
//           width={{ base: '40px', sm: '60px' }}
//           height={{ base: '40px', sm: '60px' }}
//           alt=""
//           src="/assets/liquidstaking/coins-logo.svg"
//           mx={'auto'}
//         />
//         <Image
//           width={{ base: '40px', sm: '60px' }}
//           height={{ base: '40px', sm: '60px' }}
//           alt=""
//           src="/assets/liquidstaking/nft-logo.svg"
//         />
//         <Image
//           width={{ base: '40px', sm: '70px' }}
//           height={{ base: '40px', sm: '70px' }}
//           alt=""
//           src="/assets/liquidstaking/marketplace-logo.svg"
//         />
