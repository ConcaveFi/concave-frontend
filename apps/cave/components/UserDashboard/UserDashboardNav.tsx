import { Flex } from '@concave/ui'
import { NavButton } from './NavButton'
import { SnapshotOption } from './UserDashboardContainer'

export const UserDashboardNav = ({
  currentSnapshot,
  changeSnapshot,
  snapshotData,
}: {
  currentSnapshot: SnapshotOption
  changeSnapshot: (snapshotSelected: SnapshotOption) => void
  snapshotData: any
}) => {
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
        summaryArray={[
          { label: 'Locked', data: '12,345 CNV' },
          { label: 'Positions', data: '100' },
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
        summaryArray={[{ label: 'Positions Listed', data: '100' }]}
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
