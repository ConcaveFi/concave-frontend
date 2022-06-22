import { SpinIcon, SpinnerIcon } from '@concave/icons'
import { Card, Flex, HStack, keyframes, ScaleFade, Text } from '@concave/ui'
import { withPageTransition } from 'components/PageTransition'
import { BondChartSimulation } from 'components/PermissionalisBonding/bondchart'
import { BondOfferHeader } from 'components/PermissionalisBonding/BondOfferHeader'
import { BondTypeCard } from 'components/PermissionalisBonding/BondTypeCard'
import { BondableAssets } from 'components/PermissionalisBonding/bondableAssetsCard'

import TreasuryManagementMobile, {
  spinAnimation,
} from 'components/Treasury/Mobile/TreasuryManagementMobile'

export function BondOffer() {
  return (
    <Flex align={'center'} direction={'column'} width={'full'} height={'full'} textAlign="center">
      <BondOfferHeader />
      <Flex flexDirection={'row'} justify="center" mt={8} width={'full'} gap={8}>
        <BondTypeCard />
        <BondChartSimulation></BondChartSimulation>
      </Flex>
      <Flex mt={8} width={'full'} gap={8}>
        <BondableAssets></BondableAssets>
      </Flex>
    </Flex>
  )
}

BondOffer.Meta = {
  title: 'Concave | Treasury',
  description: `Concave has treasury strategies to take advantage of yield opportunities. It is broken down into Investment Research, Delta Neutral, and Stable Farm strategies.`,
}

export default withPageTransition(BondOffer)
