import { Flex } from '@concave/ui'
import { StakeSettingsProvider } from 'contexts/PositionsFilterProvider'
import { useRouter } from 'next/router'
import { BondingSnapshot } from './Summary/Bonding/BondingSnapshot'
import { MarketplaceSnapshot } from './Summary/Marketplace/MarketplaceSnapshot'
import { LiquidStakingSnapshot } from './Summary/Staking/LiquidStakingSnapshot'
import { SnapshotOption } from './UserDashboardContainer'

export function UserDashboardContent() {
  const router = useRouter()
  const selectedView = getView(SnapshotOption[router.query.view as string])
  return (
    <Flex w={'100%'} flexGrow={1}>
      {selectedView}
    </Flex>
  )
}

function getView(selectedSnapshot: SnapshotOption) {
  switch (selectedSnapshot) {
    case SnapshotOption.AMM:
      return <>AMM</>
    case SnapshotOption.DynamicBonds:
      return <BondingSnapshot />
    case SnapshotOption.LiquidStaking:
      return (
        <StakeSettingsProvider>
          <LiquidStakingSnapshot />
        </StakeSettingsProvider>
      )
    case SnapshotOption.Marketplace:
      return <MarketplaceSnapshot />
    case SnapshotOption.Global:
    default:
      return <>Global Summary</>
  }
}
