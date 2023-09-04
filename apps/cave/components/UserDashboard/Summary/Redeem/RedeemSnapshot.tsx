import { Flex, Text, useBreakpointValue } from '@concave/ui'
import { ACNVChart } from 'components/Transparency/Charts/ACNVChart'
import { BbtCNVChart } from 'components/Transparency/Charts/BbtCNVChart'
import { RedemACNVCard } from 'components/UserDashboard/redeem/ACNVRedemptionDialog'
import { RedemBBTCard } from 'components/UserDashboard/redeem/BBTCNVRedemptionDialog'
import { RedemCNVCard } from 'components/UserDashboard/redeem/CNVRedemptionCard'
import { RedeemCard } from 'components/UserDashboard/redeem/RedeemCard'
import { useRedeemACNVCard } from 'components/UserDashboard/redeem/useRedeemACNVCard'
import { useRedeemBBTCNVCard } from 'components/UserDashboard/redeem/useRedeemBBTCNVCard'

export const RedeemSnapshot = () => {
  const View = useBreakpointValue({ base: RedeemSnapshotMobile, md: RedeemSnapshotDesktop })
  return <View />
}

export const RedeemSnapshotMobile = () => {
  const redeemACNVProps = useRedeemACNVCard()
  const redeemBBTCNVProps = useRedeemBBTCNVCard()
  if (
    redeemACNVProps.redeemStatus?.redeemable.equalTo(0) &&
    redeemBBTCNVProps.redeemStatus?.redeemable.equalTo(0)
  ) {
    return (
      <Flex
        w={'full'}
        direction={'column'}
        justifyContent={'space-around'}
        overflowX={'scroll'}
        shadow={'Down Big'}
        borderRadius={'3xl'}
        gap={2}
        p={2}
      >
        <Text>{"Your wallet don't have aCNV, bbtCNV to redeem"} </Text>
      </Flex>
    )
  }
  return (
    <Flex w={'full'} direction={'column'} overflowX={'scroll'} gap={2}>
      <RedeemCard {...redeemACNVProps} w={'full'} />
      <RedeemCard {...redeemBBTCNVProps} w={'full'} />
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
        <RedemACNVCard w={'full'} />
        <RedemBBTCard w={'full'} />
        <RedemCNVCard w={'full'} />
      </Flex>
    </Flex>
  )
}
