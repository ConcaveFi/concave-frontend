import { SpinIcon, SpinnerIcon } from '@concave/icons'
import { Card, Flex, keyframes, ScaleFade, Text } from '@concave/ui'
import { withPageTransition } from 'components/PageTransition'
import { BondOfferHeader } from 'components/PermissionalisBonding/BondOfferHeader'
import { BondTypeCard } from 'components/PermissionalisBonding/BondTypeCard'

import TreasuryManagementMobile, {
  spinAnimation,
} from 'components/Treasury/Mobile/TreasuryManagementMobile'

export function BondOffer() {
  return (
    <Flex align={'center'} justify="start" direction={'column'} width={'full'} textAlign="center">
      <BondOfferHeader />
      <BondTypeCard />
      <Flex justify={'center'} position="relative"></Flex>
    </Flex>
  )
}

BondOffer.Meta = {
  title: 'Concave | Treasury',
  description: `Concave has treasury strategies to take advantage of yield opportunities. It is broken down into Investment Research, Delta Neutral, and Stable Farm strategies.`,
}

export default withPageTransition(BondOffer)
