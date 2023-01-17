import { Flex, useBreakpointValue } from '@concave/ui'
import { useMarketplaceDashbord } from 'components/Marketplace/Main/UseMarkeplaceState'
import { useStakePositions } from 'components/StakingPositions/DashboardBody/DashBoardState'
import { useAccount } from 'wagmi'
import { DashboardNavButtons } from './DashboardNavButtons'
import { DashboardNavMenu } from './DashboardNavMenu'
import { useUserBondState } from './hooks/useUserBondState'
import { useUserTxHistoryState } from './hooks/useUserTxHistoryState'
import { SnapshotOptions } from './SnapshotOptions'

export const UserDashboardNav = ({
  currentSnapshot,
  changeSnapshot,
}: {
  currentSnapshot: SnapshotOptions
  changeSnapshot: (snapshotSelected: SnapshotOptions) => void
}) => {
  // Staking
  const stakePosition = useStakePositions()
  const { userNonFungibleTokensInfo, totalLocked, isLoading: cnvDataIsLoading } = stakePosition
  const lsdCNVPositions = userNonFungibleTokensInfo.length

  const { address } = useAccount()
  const { isFetching: marketplaceIsLoading, nftPositions } = useMarketplaceDashbord()
  const nftPositionCount = nftPositions.filter((stakingPosition) => {
    if (stakingPosition.market?.seller.toUpperCase() === address?.toUpperCase())
      return stakingPosition
  }).length

  // Bonding
  const userBondState = useUserBondState()

  // Tx History
  const { isLoading: txHistoryIsLoading } = useUserTxHistoryState()
  const isMobile = useBreakpointValue({ base: true, lg: false })
  const buttonOptions = {
    userBondState,
    changeSnapshot,
    cnvDataIsLoading,
    currentSnapshot,
    lsdCNVPositions,
    totalLocked,
    marketplaceIsLoading,
    nftPositionCount,
  }
  return (
    <Flex
      w={{ base: 'full', lg: '25%' }}
      flexGrow={0}
      flexDirection={'column'}
      borderRadius={'3xl'}
      p={{ base: 0, lg: 3 }}
      shadow={{ base: 'none', lg: 'down' }}
      gap={3}
    >
      {!isMobile && <DashboardNavButtons {...buttonOptions} />}
      {isMobile && (
        <DashboardNavMenu changeSnapshot={changeSnapshot} currentSnapshot={currentSnapshot} />
      )}
    </Flex>
  )
}
