import { Flex } from '@concave/ui'
import { MarketplaceActivityCard } from 'components/Marketplace/Activity/MarketplaceActivityCard'
import { MarketplaceHeader } from 'components/Marketplace/Header/MarketplaceHeader'
import { MarketplaceDashboard } from 'components/Marketplace/Main/MarketplaceDashboard'
import { withPageTransition } from 'components/PageTransition'
const Marketplace = () => {
  return (
    <Flex width={{ base: 'full' }} h={'full'} textAlign="center" direction="column">
      <MarketplaceHeader />
      <Flex
        direction={{ xl: 'row', base: 'column-reverse' }}
        gap={4}
        m={2}
        justify="center"
        maxH={'90vh'}
        width="full"
      >
        <MarketplaceDashboard
          width={'full'}
          maxWidth={'850px'}
          rounded={'2xl'}
          mb={'auto'}
          maxH={`90vh`}
          shadow={'up'}
          p={4}
          gap={4}
        />
        <MarketplaceActivityCard />
      </Flex>
    </Flex>
  )
}
Marketplace.Meta = {
  title: 'Concave | NFT Marketplace',
  description: `Trade your Liquid Staking positions and other NFTs in Concave's marketplace.`,
}

export default withPageTransition(Marketplace)
