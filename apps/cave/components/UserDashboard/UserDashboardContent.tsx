import { Flex, Heading, Image } from '@concave/ui'
import { AirdropClaimCard } from 'components/Airdrop/AirdropClaimCard'
import { ACNVChart } from 'components/Transparency/Charts/ACNVChart'
import { BbtCNVChart } from 'components/Transparency/Charts/BbtCNVChart'
import { RedemACNVCard } from 'components/Transparency/VestedTokensDialogs/ACNVRedemptionDialog'
import { RedemBBTCard } from 'components/Transparency/VestedTokensDialogs/BBTCNVRedemptionDialog'
import { RedeemPCNVCard } from 'components/Transparency/VestedTokensDialogs/PCNVRedemptionDialog'
import { StakeSettingsProvider } from 'contexts/PositionsFilterProvider'
import { SnapshotOptions } from './SnapshotOptions'
import { BondingSnapshot } from './Summary/Bonding/BondingSnapshot'
import { MarketplaceSnapshot } from './Summary/Marketplace/MarketplaceSnapshot'
import { LiquiditySnapshot } from './Summary/Pools/LiquiditySnapshot'
import { LiquidStakingSnapshot } from './Summary/Staking/LiquidStakingSnapshot'
import { TxHistory } from './Summary/TxHistory/TxHistory'

export function UserDashboardContent({ view }: { view: SnapshotOptions }) {
  return (
    <Flex w={'100%'} h="full">
      {getView(view)}
    </Flex>
  )
}
const gap = 2
function getView(selectedSnapshot: SnapshotOptions) {
  switch (selectedSnapshot) {
    case SnapshotOptions.History:
      return <TxHistory />
    case SnapshotOptions.Liquidity:
      return <LiquiditySnapshot />
    case SnapshotOptions.DynamicBonds:
      return <BondingSnapshot />
    case SnapshotOptions.LiquidStaking:
      return (
        <StakeSettingsProvider>
          <LiquidStakingSnapshot />
        </StakeSettingsProvider>
      )
    case SnapshotOptions.Marketplace:
      return <MarketplaceSnapshot />
    case SnapshotOptions.Redeem:
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

    case SnapshotOptions.Airdrop:
      return (
        <Flex flex={1} align={'center'} direction={'column'}>
          <Image src="./assets/airdrop/airdrops.png" alt="airdrop rain" objectFit={'contain'} />
          <AirdropClaimCard />
        </Flex>
      )

    default:
      return (
        <Flex flex={1} justify={'center'} align="center">
          <Heading>Coming soon</Heading>
        </Flex>
      )
  }
}
