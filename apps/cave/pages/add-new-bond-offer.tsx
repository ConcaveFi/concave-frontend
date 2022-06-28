import { SpinIcon, SpinnerIcon } from '@concave/icons'
import { Card, Flex, HStack, keyframes, ScaleFade, Text } from '@concave/ui'
import { AppearancedCard } from 'components/BondsMarketplace/add new bond position/AppearanceCard'
import { BondableAssetCard } from 'components/BondsMarketplace/add new bond position/BondableAsset'
import { BondChartSimulation } from 'components/BondsMarketplace/offer-bond/bondchart'
import { BondOfferHeader } from 'components/BondsMarketplace/offer-bond/BondOfferHeader'
import { BondTypeCard } from 'components/BondsMarketplace/offer-bond/BondTypeCard'
import { withPageTransition } from 'components/PageTransition'

import TreasuryManagementMobile, {
  spinAnimation,
} from 'components/Treasury/Mobile/TreasuryManagementMobile'
import { Bond } from './smart-bonding'

export function AddBondOffer() {
  return (
    <Flex align={'start'} direction={'column'} width={'full'} height={'full'} textAlign="center">
      <Flex align={'center'} direction={'column'} width={'full'} height={'full'} textAlign="center">
        <BondOfferHeader />
        <Flex flexDirection={'column'} justify="center" mt={8} mb={10} width={'70%'}>
          <AppearancedCard />
          <BondTypeCard></BondTypeCard>
        </Flex>
      </Flex>
      <Flex>
        <BondTypeCard></BondTypeCard>
      </Flex>
    </Flex>
  )
}

AddBondOffer.Meta = {
  title: 'Concave | Treasury',
  description: `Concave has treasury strategies to take advantage of yield opportunities. It is broken down into Investment Research, Delta Neutral, and Stable Farm strategies.`,
}

export default withPageTransition(AddBondOffer)
