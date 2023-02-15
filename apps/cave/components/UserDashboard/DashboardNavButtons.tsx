import { AirdropClaimContract, Currency, CurrencyAmount } from '@concave/core'
import { useAirdropSeason } from 'hooks/useAirdropSeason'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useQuery, UseQueryResult } from 'react-query'
import { useAccount } from 'wagmi'
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
          { label: 'Bonding: ' + userBondState.data?.totalPending + ' CNV' },
          { label: 'Claimable: ' + userBondState.data?.totalOwed + ' CNV' },
        ]}
        onClick={() => props.changeSnapshot(SnapshotOptions.DynamicBonds)}
      />
      <NavButton
        title={'Marketplace'}
        isSelected={props.currentSnapshot === SnapshotOptions.Marketplace}
        isLoading={props.cnvDataIsLoading && props.marketplaceIsLoading}
        summaryArray={[
          { label: 'Positions Listed: ' + props.nftPositionCount },
          { label: 'Positions: ' + props.lsdCNVPositions },
        ]}
        onClick={() => props.changeSnapshot(SnapshotOptions.Marketplace)}
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
      <NavButton title={'Coming Soon'} isDisabled />
    </>
  )
}
