import { Flex, Heading, Image } from '@concave/ui'
import { AirdropClaimCard } from 'components/Airdrop/AirdropClaimCard'
import { StakeSettingsProvider } from 'contexts/PositionsFilterProvider'
import { useRouter } from 'next/router'
import { RedeemTokens } from './redeem/RedeemTokens'
import { SnapshotOptions } from './SnapshotOptions'
import { BondingSnapshot } from './Summary/Bonding/BondingSnapshot'
import { MarketplaceSnapshot } from './Summary/Marketplace/MarketplaceSnapshot'
import { LiquiditySnapshot } from './Summary/Pools/LiquiditySnapshot'
import { LiquidStakingSnapshot } from './Summary/Staking/LiquidStakingSnapshot'
import { TxHistory } from './Summary/TxHistory/TxHistory'

export function UserDashboardContent() {
  const router = useRouter()
  const selectedView = getView(router.query.view as SnapshotOptions)
  console.log(router.query.view as string, SnapshotOptions.LiquidStaking)

  return (
    <Flex w={'100%'} h="full">
      {selectedView}
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
    case SnapshotOptions.Marketplace:
      return <MarketplaceSnapshot />
    case SnapshotOptions.Redeem:
      return <RedeemTokens />

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
