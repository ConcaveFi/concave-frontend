import { Flex } from '@concave/ui'
import { useMarketplaceDashbord } from 'components/Marketplace/Main/UseMarkeplaceState'
import { useStakePositions } from 'components/StakingPositions/DashboardBody/DashBoardState'
import { useAccount } from 'wagmi'
import { NavButton } from './NavButton'
import { SnapshotOption } from './UserDashboardContainer'

export const UserDashboardNav = ({
  currentSnapshot,
  changeSnapshot,
}: {
  currentSnapshot: SnapshotOption
  changeSnapshot: (snapshotSelected: SnapshotOption) => void
}) => {
  // Staking
  const stakePosition = useStakePositions()
  const { userNonFungibleTokensInfo, totalLocked, isLoading: cnvDataIsLoading } = stakePosition
  const lsdCNVPositions = userNonFungibleTokensInfo.length

  const { address } = useAccount()
  const { isFetching: marketplaceIsLoading, nftPositions } = useMarketplaceDashbord()
  const nftPositionCount = nftPositions.filter((stakingPosition) => {
    if (stakingPosition.market?.seller.toUpperCase() === address.toUpperCase())
      return stakingPosition
  }).length

  return (
    <Flex
      w={'25%'}
      flexGrow={0}
      flexDirection={'column'}
      borderRadius={'3xl'}
      p={3}
      shadow={'down'}
      gap={3}
    >
      <NavButton
        title={'Liquid Staking'}
        isSelected={currentSnapshot === SnapshotOption.LiquidStaking}
        isLoading={cnvDataIsLoading}
        summaryArray={[
          { label: 'Locked', data: `${totalLocked.toFixed(2, { groupSeparator: ',' })} CNV` },
          { label: 'Positions', data: lsdCNVPositions },
        ]}
        onClick={() => changeSnapshot(SnapshotOption.LiquidStaking)}
      />
      <NavButton
        title={'Dynamic Bonds'}
        isSelected={currentSnapshot === SnapshotOption.DynamicBonds}
        summaryArray={[
          { label: 'Bonded', data: '12,345 CNV' },
          { label: 'Pending', data: '1,000 CNV' },
        ]}
        onClick={() => changeSnapshot(SnapshotOption.DynamicBonds)}
      />
      <NavButton
        title={'Marketplace'}
        isSelected={currentSnapshot === SnapshotOption.Marketplace}
        isLoading={cnvDataIsLoading && marketplaceIsLoading}
        summaryArray={[
          { label: 'Positions', data: lsdCNVPositions },
          { label: 'Positions Listed', data: nftPositionCount },
        ]}
        onClick={() => changeSnapshot(SnapshotOption.Marketplace)}
      />
      <NavButton
        title={'AMM'}
        isSelected={currentSnapshot === SnapshotOption.AMM}
        summaryArray={[
          { label: 'row0', data: 'data row0' },
          { label: 'row1', data: 'data row1' },
        ]}
        onClick={() => changeSnapshot(SnapshotOption.AMM)}
      />
      <NavButton
        title={'Delta Neutral'}
        isSelected={currentSnapshot === SnapshotOption.DeltaNeutral}
        summaryArray={[
          { label: 'row0', data: 'data row0' },
          { label: 'row1', data: 'data row1' },
        ]}
        onClick={() => changeSnapshot(SnapshotOption.DeltaNeutral)}
      />
      <NavButton title={'Coming Soon'} isDisabled />
      <NavButton title={'Coming Soon'} isDisabled />
    </Flex>
  )
}
