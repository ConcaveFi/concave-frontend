import { Flex, VStack } from '@chakra-ui/react'
import { MarketplaceFilterContainer } from 'components/Marketplace/MarketplaceFilterContainer'
import { useMarketplaceDashbord } from 'components/Marketplace/UseMarkeplaceState'
import { MarketplacePosition } from './MarketplacePosition'

export const MarketplaceDashboard = () => {
  const { isLoading, salePositions, owner, setOwner } = useMarketplaceDashbord()

  const nftPositions = salePositions.map((marketItem) => (
    <MarketplacePosition key={+marketItem.position.tokenId.toString()} marketItem={marketItem} />
  ))
  return (
    <VStack
      width={'640px'}
      height="940px"
      rounded={'2xl'}
      apply="background.metalBrighter"
      shadow={'up'}
      gap={5}
      p={5}
    >
      <MarketplaceFilterContainer address={owner} setAddress={setOwner} />
      {/* Positions Container */}
      <Flex
        rounded={'inherit'}
        shadow="down"
        h="full"
        w="full"
        maxW="900px"
        overflowY={'auto'}
        px={1.5}
        direction="column"
        apply="scrollbar.big"
        bg={'linear-gradient(238.35deg, #19394C 9.11%, #0A161F 92.45%)'}
      >
        {nftPositions}
      </Flex>
    </VStack>
  )
}
