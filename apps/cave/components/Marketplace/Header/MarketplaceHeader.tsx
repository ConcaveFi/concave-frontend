import { Flex, Heading, Text } from '@concave/ui'
import { GraphicGuide } from 'components/LiquidStaking/GraphicGuide'

export const MarketplaceHeader = () => {
  return (
    <>
      {' '}
      <Heading as="h1" mt={16} mb={3} fontSize="5xl">
        {'Marketplace'}
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
        <Text maxW={540} textAlign={{ xl: 'right', base: 'right' }}>
          The Concave Marketplace is where you are able to buy and sell your locked staked NFT
          positions. Prices are quoted in terms of CNV.
        </Text>
        <GraphicGuide />
      </Flex>
    </>
  )
}
