import { Flex } from '@concave/ui'
import { useFilterByRange } from 'components/NftFilters/Filters/hooks/useFilterByRange'
import { useFilterByStakePool } from 'components/NftFilters/Filters/hooks/useFilterByStakePool'
import { usePositionSorter } from 'components/NftFilters/Sorters/hooks/useNftSort'
import { useStakePositions } from 'components/StakingPositions/DashboardBody/DashBoardState'
import { FilterContainer } from 'components/StakingPositions/DashboardBody/FilterContainer'
import { SnapshotLineChart } from 'components/UserDashboard/SnapshotLineChart'
import { SnapshotTextCard } from 'components/UserDashboard/SnapshotTextCard'
import { useStakeSettings } from 'contexts/PositionsFilterProvider'
import { useState } from 'react'
import { UserPositionCard } from '../../../StakingPositions/LockPosition/Card/UserPositionCard'
import { DataTable } from '../../DataTable'
import { DataTableCard } from '../../DataTableCard'
import { SnapshotCard } from '../../SnapshotCard'
import { SnapshotText } from '../../SnapshotText'
import { stakechartdata } from '../dummyChartData'

export const LiquidStakingSnapshot = () => {
  const [isExpanded, setExpand] = useState(false)
  const stakePosition = useStakePositions()
  const positionSorter = usePositionSorter()

  const { userNonFungibleTokensInfo, totalLocked, isLoading } = stakePosition
  const { initialCNVFilter, stakePoolFilters, tokenIdFilter, sorter } = useStakeSettings()
  const { filterByRange } = useFilterByRange(initialCNVFilter)
  const { filterByStakePool } = useFilterByStakePool(stakePoolFilters)
  const sortFunction = sorter ? positionSorter.data?.[sorter.sort][sorter.order] : () => 0
  return (
    <Flex flexDir={'column'} w={'100%'} justifyContent={'space-between'}>
      <SnapshotCard isExpanded={!isExpanded}>
        <SnapshotLineChart data={stakechartdata} dataKeys={['Airdrop', 'Locked CNV']} />
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
          {userNonFungibleTokensInfo
            .filter((position) => {
              if (!tokenIdFilter) return true
              return position.tokenId === tokenIdFilter
            })
            .filter(filterByRange)
            .filter(filterByStakePool)
            .sort(sortFunction)
            .map((nonFungibleTokenInfo) => (
              <UserPositionCard
                key={+nonFungibleTokenInfo.tokenId.toString()}
                stakingPosition={nonFungibleTokenInfo}
              />
            ))}
        </DataTable>
      </DataTableCard>
    </Flex>
  )
}

const SortComponent = () => <FilterContainer />
