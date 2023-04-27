import { Box, Card, Flex, Heading, Image } from '@concave/ui'
import { AirdropClaimCard } from 'components/Airdrop/AirdropClaimCard'
import { ACNVChart } from 'components/Transparency/Charts/ACNVChart'
import { BbtCNVChart } from 'components/Transparency/Charts/BbtCNVChart'
import { RedemACNVCard } from 'components/UserDashboard/redeem/ACNVRedemptionDialog'
import { StakeSettingsProvider } from 'contexts/PositionsFilterProvider'
import { RedemBBTCard } from './redeem/BBTCNVRedemptionDialog'
import { RedeemPCNVCard } from './redeem/PCNVRedemptionDialog'
import { SnapshotOptions } from './SnapshotOptions'
import { BondingSnapshot } from './Summary/Bonding/BondingSnapshot'
import { LiquiditySnapshot } from './Summary/Pools/LiquiditySnapshot'
import { RedeemSnapshot } from './Summary/Redeem/RedeemSnapshot'
import { LiquidStakingSnapshot } from './Summary/Staking/LiquidStakingSnapshot'
import { TxHistory } from './Summary/TxHistory/TxHistory'

export function UserDashboardContent({ view }: { view: SnapshotOptions }) {
  return (
    <Flex w={'full'} h={'full'} maxH={'780px'}>
      {getView(view)}
    </Flex>
  )
}
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
    case SnapshotOptions.Redeem:
      return <RedeemSnapshot />

    case SnapshotOptions.Airdrop:
      return (
        <Card
          variant="primary"
          flex={1}
          borderRadius={'3xl'}
          alignItems={'center'}
          justifyContent={'center'}
          // align={'center'}
          direction={'column'}
        >
          <Image src="./assets/airdrop/airdrops.png" alt="airdrop rain" objectFit={'contain'} />
          <AirdropClaimCard />
        </Card>
      )

    default:
      return (
        <Flex flex={1} justify={'center'} align="center">
          <Heading>Coming soon</Heading>
        </Flex>
      )
  }
}
