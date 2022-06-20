import { Flex } from '@chakra-ui/react'
import { BondMarketplaceHeader } from 'components/BondsMarketplace/BondMarketplaceHeader'
import { BondMarketplacePosition } from 'components/BondsMarketplace/BondMarketplacePosition'
import { BondVestingModal } from 'components/BondsMarketplace/BondVestingModal'
export default function BondsMarket() {
  return (
    <>
      <Flex width={'full'} direction="column">
        <BondMarketplaceHeader mt={10} />
        <Flex mt={14} width={'778px'} mx="auto" wrap={'wrap'} gap={14} justify="space-between">
          <BondMarketplacePosition variant="primary" />
          <BondMarketplacePosition variant="secondary" />
          <BondMarketplacePosition variant="secondary" />
          <BondMarketplacePosition variant="primary" />
          <BondMarketplacePosition variant="primary" />
          <BondMarketplacePosition variant="secondary" />
        </Flex>
      </Flex>
      <BondVestingModal />
    </>
  )
}
