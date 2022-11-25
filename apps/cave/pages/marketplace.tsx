import { Flex, HStack } from '@concave/ui'
import { MarketplaceActivityCard } from 'components/Marketplace/Activity/MarketplaceActivityCard'
import { MarketplaceHeader } from 'components/Marketplace/Header/MarketplaceHeader'
import { MarketplaceDashboard } from 'components/Marketplace/Main/MarketplaceDashboard'
import { withPageTransition } from 'components/PageTransition'
const Marketplace = () => {
  return (
    <Flex width={`full`} h={'full'} gap={2} direction="column">
      <MarketplaceHeader />
      <HStack align={'start'} justify={'center'} flexWrap={'nowrap'}>
        <MarketplaceDashboard />
        <MarketplaceActivityCard />
      </HStack>
    </Flex>
  )
}
Marketplace.Meta = {
  title: 'Concave | NFT Marketplace',
  description: `Trade your Liquid Staking positions and other NFTs in Concave's marketplace.`,
}

export default withPageTransition(Marketplace)
