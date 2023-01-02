import { Flex, useBreakpointValue } from '@concave/ui'
import { useMarketplaceDashbord } from 'components/Marketplace/Main/UseMarkeplaceState'
import { useStakePositions } from 'components/StakingPositions/DashboardBody/DashBoardState'
import { useAccount } from 'wagmi'
import { DashboardNavButtons } from './DashboardNavButtons'
import { DashboardNavMenu } from './DashboardNavMenu'
import { useUserBondState } from './hooks/useUserBondState'
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
      // h="full"
      maxH={{ base: '260px', sm: '240px', lg: '190px', '2xl': '384px' }}
      minW={{ base: 'full', sm: 'full', md: 'full', lg: '750px', '2xl': '350px' }}
      mx="auto"
      wrap="wrap"
      align={'center'}
      flexDirection={'column'}
      gap={{ base: 1, sm: 3 }}
      overflow="visible"
      position={'relative'}
    >
      {!isMobile && <DashboardNavButtons {...buttonOptions} />}
      {isMobile && (
        <DashboardNavMenu changeSnapshot={changeSnapshot} currentSnapshot={currentSnapshot} />
      )}
    </Flex>
  )
}
