import { Flex } from '@concave/ui'
import { useStakePositions } from 'components/StakingPositions/DashboardBody/DashBoardState'
import { FilterContainer } from 'components/StakingPositions/DashboardBody/FilterContainer'
import { SnapshotTextCard } from 'components/UserDashboard/SnapshotTextCard'
import { useState } from 'react'
import { UserPositionCard } from '../../../StakingPositions/LockPosition/Card/UserPositionCard'
import { DataTable } from '../../DataTable'
import { DataTableCard } from '../../DataTableCard'
import { SnapshotCard } from '../../SnapshotCard'
import { SnapshotText } from '../../SnapshotText'
import { stakechartdata } from '../dummyChartData'
import { LiquidStakingSnapshotChart } from './LiquidStakingSnapshotChart'

export const LiquidStakingSnapshot = () => {
  const [isExpanded, setExpand] = useState(false)
  const stakePosition = useStakePositions()
  const { userNonFungibleTokensInfo, totalLocked, isLoading } = stakePosition

  return (
    <Flex flexDir={'column'} w={'100%'} justifyContent={'space-between'}>
      <SnapshotCard isExpanded={!isExpanded}>
        <LiquidStakingSnapshotChart data={stakechartdata} />
        <SnapshotTextCard>
          <SnapshotText title={'Total locked'} data={'6,132.42 CNV'} />
          <SnapshotText title={'Airdrop'} data={'435.53 CNV'} />
          <SnapshotText title={'Airdrop share'} data={'0.0032%'} />
          <SnapshotText title={'Available airdrop'} data={'0.0'} />
        </SnapshotTextCard>
      </SnapshotCard>
      <DataTableCard
        dataTableLabel={'CNV Positions'}
        route={'/marketplace'}
        buttonLabel={'Marketplace'}
        setExpand={setExpand}
        isExpanded={isExpanded}
        SortComponent={<SortComponent />}
      >
        <DataTable>
          {userNonFungibleTokensInfo.map((nonFungibleTokenInfo) => (
            <>
              <UserPositionCard
                key={+nonFungibleTokenInfo.tokenId.toString()}
                stakingPosition={nonFungibleTokenInfo}
              />
            </>
          ))}
        </DataTable>
      </DataTableCard>
    </Flex>
  )
}

const SortComponent = () => (
  <FilterContainer
    onChangeTokenIdFilter={() => {}}
    onResetStakeFilters={() => {}}
    stakePoolFilters={[0]}
    tokenIdFilter={null}
    currentInitalCNVFilter={{}}
    onChangeInitialCNVFilter={() => {}}
    onChangeSort={() => {}}
    onToggleStakeFilter={() => {}}
  />
)
