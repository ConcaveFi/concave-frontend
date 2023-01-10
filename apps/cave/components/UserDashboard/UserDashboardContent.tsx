import { Flex } from '@concave/ui'
import { StakeSettingsProvider } from 'contexts/PositionsFilterProvider'
import { useRouter } from 'next/router'
import { RedeemTokens } from './RedeemTokens'
import { SnapshotOptions } from './SnapshotOptions'
import { BondingSnapshot } from './Summary/Bonding/BondingSnapshot'
import { MarketplaceSnapshot } from './Summary/Marketplace/MarketplaceSnapshot'
import { LiquiditySnapshot } from './Summary/Pools/LiquiditySnapshot'
import { LiquidStakingSnapshot } from './Summary/Staking/LiquidStakingSnapshot'
import { TxHistory } from './Summary/TxHistory/TxHistory'

export function UserDashboardContent() {
  const router = useRouter()
  const selectedView = getView(SnapshotOptions[router.query.view as string])
  return (
    <Flex w={'100%'} flexGrow={1}>
      {selectedView}
    </Flex>
  )
}

function getView(selectedSnapshot: SnapshotOptions) {
  switch (selectedSnapshot) {
    case SnapshotOptions.TxHistory:
      return <TxHistory />
    case SnapshotOptions.AMM:
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
    case SnapshotOptions.Global:

    default:
      return <>Global Summary</>
  }
}
