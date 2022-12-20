import { Flex } from '@concave/ui'
import { useMarketplaceDashbord } from 'components/Marketplace/Main/UseMarkeplaceState'
import { useStakePositions } from 'components/StakingPositions/DashboardBody/DashBoardState'
import { useAccount } from 'wagmi'
import { useUserBondState } from './hooks/useUserBondState'
import { NavButton } from './NavButton'
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

  return (
    <Flex
      h="full"
      maxH={'380px'}
      w="30%"
      wrap="wrap"
      align={'center'}
      flexDirection={'column'}
      gap={3}
    >
      <NavButton
        title={'Liquid Staking'}
        isSelected={currentSnapshot === SnapshotOptions.LiquidStaking}
        isLoading={cnvDataIsLoading}
        summaryArray={[
          { label: 'Locked', data: `${totalLocked.toFixed(2, { groupSeparator: ',' })} CNV` },
          { label: 'Positions', data: lsdCNVPositions },
        ]}
        onClick={() => changeSnapshot(SnapshotOptions.LiquidStaking)}
      />
      <NavButton
        title={'Dynamic Bonds'}
        isSelected={currentSnapshot === SnapshotOptions.DynamicBonds}
        isLoading={userBondState.isLoading}
        summaryArray={[
          { label: 'Bonding', data: userBondState.data?.totalPending + ' CNV' },
          { label: 'Claimable', data: userBondState.data?.totalOwed + ' CNV' },
        ]}
        onClick={() => changeSnapshot(SnapshotOptions.DynamicBonds)}
      />
      <NavButton
        title={'Marketplace'}
        isSelected={currentSnapshot === SnapshotOptions.Marketplace}
        isLoading={cnvDataIsLoading && marketplaceIsLoading}
        summaryArray={[
          { label: 'Positions Listed', data: nftPositionCount },
          { label: 'Positions', data: lsdCNVPositions },
        ]}
        onClick={() => changeSnapshot(SnapshotOptions.Marketplace)}
      />
      <NavButton
        title={'AMM'}
        isSelected={currentSnapshot === SnapshotOptions.AMM}
        summaryArray={[
          { label: 'row0', data: 'data row0' },
          { label: 'row1', data: 'data row1' },
        ]}
        onClick={() => changeSnapshot(SnapshotOptions.AMM)}
      />
      <NavButton
        title={'Delta Neutral'}
        isSelected={currentSnapshot === SnapshotOptions.DeltaNeutral}
        summaryArray={[
          { label: 'row0', data: 'data row0' },
          { label: 'row1', data: 'data row1' },
        ]}
        onClick={() => changeSnapshot(SnapshotOptions.DeltaNeutral)}
      />
      <NavButton title={'Coming Soon'} isDisabled />
      <NavButton title={'Coming Soon'} isDisabled />
    </Flex>
  )
}
