import { Flex, Text, VStack } from '@chakra-ui/react'
import { Loading } from 'components/Loading'
import { MarketplaceFilterContainer } from 'components/Marketplace/MarketplaceFilterContainer'
import { useMarketplaceDashbord } from 'components/Marketplace/UseMarkeplaceState'
import { MarketplacePosition } from './MarketplacePosition'

export const MarketplaceDashboard = () => {
  const { isFetching, salePositions, owner, setOwner } = useMarketplaceDashbord()
  const nftPositions = salePositions.map((marketItem) => (
    <MarketplacePosition key={+marketItem.position.tokenId.toString()} marketItem={marketItem} />
  ))

  return (
    <VStack
      width={'640px'}
      maxHeight="940px"
      rounded={'2xl'}
      apply="background.metalBrighter"
      shadow={'up'}
      gap={5}
      p={5}
    >
      <MarketplaceFilterContainer address={owner} setAddress={setOwner} />
      {/* Positions Container */}
      <Flex
        as={Loading}
        size="md"
        isLoading={isFetching}
        rLabel=""
        rounded={'inherit'}
        shadow="down"
        w="full"
        maxW="900px"
        m={4}
        p={4}
        overflowY={'auto'}
        direction="column"
        apply="scrollbar.big"
        bg={'linear-gradient(238.35deg, #19394C 9.11%, #0A161F 92.45%)'}
      >
        {!!nftPositions.length && nftPositions}
        {!nftPositions.length && (
          <>
            <Text size={'lg'} fontWeight={'bold'}>
              Not found results
            </Text>
            <Text>Check your filters</Text>
          </>
        )}
      </Flex>
    </VStack>
  )
}
