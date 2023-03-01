import { Currency, CurrencyAmount } from '@concave/core'
import { compactFormat } from 'utils/bigNumberMask'
import { UseUserBondState } from './hooks/useUserBondState'
import { NavButton } from './NavButton'
import { SnapshotOptions } from './SnapshotOptions'

interface NavButtonProps {
  currentSnapshot: SnapshotOptions
  cnvDataIsLoading: boolean
  totalLocked: CurrencyAmount<Currency>
  lsdCNVPositions: number
  changeSnapshot: (snapshotSelected: SnapshotOptions) => void
  marketplaceIsLoading: boolean
  nftPositionCount: number
  totalPools: number
  userBondState: UseUserBondState
}

export function DashboardNavButtons(props: NavButtonProps) {
  const { userBondState } = props

  return (
    <>
      <NavButton
        title={'Liquid Staking'}
        isSelected={props.currentSnapshot === SnapshotOptions.LiquidStaking}
        isLoading={props.cnvDataIsLoading}
        summaryArray={[
          {
            label: 'Locked: ' + `${props.totalLocked.toFixed(2, { groupSeparator: ',' })} CNV`,
          },
          { label: 'Positions: ' + props.lsdCNVPositions },
        ]}
        onClick={() => props.changeSnapshot(SnapshotOptions.LiquidStaking)}
      />
      <NavButton
        title={'Dynamic Bonds'}
        isSelected={props.currentSnapshot === SnapshotOptions.DynamicBonds}
        isLoading={userBondState.isLoading}
        summaryArray={[
          { label: 'Bonding: ' + compactFormat(userBondState.data?.bonding || 0) + ' CNV' },
          { label: 'Claimable: ' + compactFormat(userBondState.data?.claimable || 0) + ' CNV' },
        ]}
        onClick={() => props.changeSnapshot(SnapshotOptions.DynamicBonds)}
      />
      <NavButton
        title={'Liquidity Pools'}
        isSelected={props.currentSnapshot === SnapshotOptions.Liquidity}
        onClick={() => props.changeSnapshot(SnapshotOptions.Liquidity)}
        summaryArray={[{ label: 'Total pools: ' + props.totalPools }]}
      />

      <NavButton
        title={'Airdrop'}
        onClick={() => props.changeSnapshot(SnapshotOptions.Airdrop)}
        isSelected={props.currentSnapshot === SnapshotOptions.Airdrop}
      />
      <NavButton
        title={'Redeem'}
        onClick={() => props.changeSnapshot(SnapshotOptions.Redeem)}
        isSelected={props.currentSnapshot === SnapshotOptions.Redeem}
      />
      <NavButton
        title={'History'}
        onClick={() => props.changeSnapshot(SnapshotOptions.History)}
        isSelected={props.currentSnapshot === SnapshotOptions.History}
      />
      <NavButton title={'Coming Soon'} isDisabled />
    </>
  )
}
