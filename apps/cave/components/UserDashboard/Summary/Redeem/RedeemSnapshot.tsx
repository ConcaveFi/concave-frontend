import { Flex, useBreakpointValue } from '@concave/ui'
import { ACNVChart } from 'components/Transparency/Charts/ACNVChart'
import { BbtCNVChart } from 'components/Transparency/Charts/BbtCNVChart'
import { RedemACNVCard } from 'components/UserDashboard/redeem/ACNVRedemptionDialog'
import { RedemBBTCard } from 'components/UserDashboard/redeem/BBTCNVRedemptionDialog'
import { RedeemPCNVCard } from 'components/UserDashboard/redeem/PCNVRedemptionDialog'

export const RedeemSnapshot = () => {
  const View = useBreakpointValue({ base: RedeemSnapshotMobile, md: RedeemSnapshotDesktop })
  return <View />
}

export const RedeemSnapshotMobile = () => {
  const gap = 2

  return (
    <Flex w={'full'} direction={'column'} overflowX={'scroll'} gap={gap}>
      <RedeemPCNVCard w={'full'} />
      <RedemACNVCard w={'full'} />
      <RedemBBTCard w={'full'} />
    </Flex>
  )
}

export const RedeemSnapshotDesktop = () => {
  const gap = 2

  return (
    <Flex w={'full'} direction={'column'} flexWrap={'wrap'} gap={gap}>
      <Flex direction={{ base: 'column', sm: 'row' }} gap={gap} w={'full'} h={'fit-content'}>
        <ACNVChart fontSize="6xl" w={'full'} />
        <BbtCNVChart w={'full'} />
      </Flex>
      <Flex direction={{ base: 'column', xl: 'row' }} w={'full'} gap={gap}>
        <RedeemPCNVCard w={'full'} />
        <RedemACNVCard w={'full'} />
        <RedemBBTCard w={'full'} />
      </Flex>
    </Flex>
  )
}
