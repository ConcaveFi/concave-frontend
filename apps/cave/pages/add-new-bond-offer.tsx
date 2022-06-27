import { SpinIcon, SpinnerIcon } from '@concave/icons'
import { Card, Flex, HStack, keyframes, ScaleFade, Text } from '@concave/ui'
import { withPageTransition } from 'components/PageTransition'

import TreasuryManagementMobile, {
  spinAnimation,
} from 'components/Treasury/Mobile/TreasuryManagementMobile'
import { AppearancedCard } from 'components/BondPositions/add new bond position/AppearanceCard'
import { BondOfferHeader } from 'components/BondPositions/offer-bond/BondOfferHeader'
import { BondableAssets } from 'components/BondPositions/offer-bond/bondableAssetsCard'
import { BondChartSimulation } from 'components/BondPositions/offer-bond/bondchart'
import { BondableAssetCard } from 'components/BondPositions/add new bond position/BondableAsset'

export function AddBondOffer() {
  return (
    <Flex align={'center'} direction={'column'} width={'full'} height={'full'} textAlign="center">
      <BondOfferHeader />
      <Flex flexDirection={'row'} justify="center" mt={8} mb={10} width={'70%'}>
        <Flex flexDirection={'column'} height="100%" width="100%" gap={20}>
          <AppearancedCard />
          <BondableAssetCard></BondableAssetCard>
        </Flex>
        <BondChartSimulation></BondChartSimulation>
      </Flex>
    </Flex>
  )
}

AddBondOffer.Meta = {
  title: 'Concave | Treasury',
  description: `Concave has treasury strategies to take advantage of yield opportunities. It is broken down into Investment Research, Delta Neutral, and Stable Farm strategies.`,
}

export default withPageTransition(AddBondOffer)
