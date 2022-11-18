import { Flex, Heading, Text, VStack } from '@concave/ui'
import { GraphicGuide } from 'components/LiquidStaking/GraphicGuide'

export const MarketplaceHeader = () => {
  return (
    <VStack>
      <Heading
        as="h1"
        apply="background.text-brightBlue"
        fontWeight={'semibold'}
        mt={4}
        mb={3}
        fontSize="5xl"
      >
        Marketplace
      </Heading>
      <Flex
        direction={{ xl: 'row', base: 'column' }}
        mt={0}
        align="center"
        gap={10}
        width="full"
        justify="center"
        alignItems={'center'}
      >
        <Text
          maxW={540}
          apply="background.text-brightBlue"
          textAlign={{ xl: 'right', base: 'right' }}
        >
          The Concave Marketplace is where you are able to buy and sell your locked staked NFT
          positions. Prices are quoted in terms of CNV.
        </Text>
        <GraphicGuide />
      </Flex>
    </VStack>
  )
}
