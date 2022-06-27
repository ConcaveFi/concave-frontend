import { Flex } from '@chakra-ui/react'
import { MarketplacePosition } from './MarketplacePosition'

export const MarketplaceDashboard = () => {
  return (
    <Flex
      width={'640px'}
      height="940px"
      rounded={'2xl'}
      apply="background.metalBrighter"
      shadow={'up'}
      p={5}
    >
      {/* Positions Container */}
      <Flex
        rounded={'inherit'}
        shadow="down"
        h="full"
        w="full"
        maxW="900px"
        overflowY={'scroll'}
        px={1.5}
        direction="column"
        apply="scrollbar.big"
        bg={'linear-gradient(238.35deg, #19394C 9.11%, #0A161F 92.45%)'}
      >
        <MarketplacePosition stakePeriod={0} />
        <MarketplacePosition stakePeriod={1} />
        <MarketplacePosition stakePeriod={2} />
        <MarketplacePosition stakePeriod={3} />
        <MarketplacePosition stakePeriod={0} />
        <MarketplacePosition stakePeriod={1} />
        <MarketplacePosition stakePeriod={2} />
        <MarketplacePosition stakePeriod={3} />
        <MarketplacePosition stakePeriod={0} />
        <MarketplacePosition stakePeriod={1} />
        <MarketplacePosition stakePeriod={2} />
        <MarketplacePosition stakePeriod={3} />
      </Flex>
    </Flex>
  )
}
