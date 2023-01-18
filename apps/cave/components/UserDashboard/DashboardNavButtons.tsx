import { Currency, CurrencyAmount } from '@concave/core'
import { UseQueryResult } from 'react-query'
import { BondPosition } from './hooks/useUserBondState'
import { NavButton } from './NavButton'
import { SnapshotOptions } from './SnapshotOptions'

export interface NavButtonProps {
  currentSnapshot: SnapshotOptions
  cnvDataIsLoading: boolean
  totalLocked: CurrencyAmount<Currency>
  lsdCNVPositions: number
  changeSnapshot: (snapshotSelected: SnapshotOptions) => void
  marketplaceIsLoading: boolean
  nftPositionCount: number
  totalPools: number
  userBondState: UseQueryResult<
    {
      totalPending: string
      totalOwed: string
      positions: BondPosition[]
    },
    unknown
  >
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
          { label: 'Locked', data: `${props.totalLocked.toFixed(2, { groupSeparator: ',' })} CNV` },
          { label: 'Positions', data: props.lsdCNVPositions },
        ]}
        onClick={() => props.changeSnapshot(SnapshotOptions.LiquidStaking)}
      />
      <NavButton
        title={'Dynamic Bonds'}
        isSelected={props.currentSnapshot === SnapshotOptions.DynamicBonds}
        isLoading={userBondState.isLoading}
        summaryArray={[
          { label: 'Bonding', data: userBondState.data?.totalPending + ' CNV' },
          { label: 'Claimable', data: userBondState.data?.totalOwed + ' CNV' },
        ]}
        onClick={() => props.changeSnapshot(SnapshotOptions.DynamicBonds)}
      />
      <NavButton
        title={'Marketplace'}
        isSelected={props.currentSnapshot === SnapshotOptions.Marketplace}
        isLoading={props.cnvDataIsLoading && props.marketplaceIsLoading}
        summaryArray={[
          { label: 'Positions Listed', data: props.nftPositionCount },
          { label: 'Positions', data: props.lsdCNVPositions },
        ]}
        onClick={() => props.changeSnapshot(SnapshotOptions.Marketplace)}
      />
      <NavButton
        title={'Liquidity Pools'}
        isSelected={props.currentSnapshot === SnapshotOptions.Liquidity}
        onClick={() => props.changeSnapshot(SnapshotOptions.Liquidity)}
        summaryArray={[{ label: 'Total pools', data: props.totalPools }]}
      />

      <NavButton title={'Coming Soon'} isDisabled />
      <NavButton title={'Coming Soon'} isDisabled />
      <NavButton title={'Coming Soon'} isDisabled />
    </>
  )
}
