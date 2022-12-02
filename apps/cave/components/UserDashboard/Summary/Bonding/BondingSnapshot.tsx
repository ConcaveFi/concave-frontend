import { Flex, Text } from '@concave/ui'
import { SortCard } from 'components/NftFilters/Sorters/SortCard'
import { useStakePositions } from 'components/StakingPositions/DashboardBody/DashBoardState'
import { SnapshotLineChart } from 'components/UserDashboard/SnapshotLineChart'
import { SnapshotTextCard } from 'components/UserDashboard/SnapshotTextCard'
import { useState } from 'react'
import { UserPositionCard } from '../../../StakingPositions/LockPosition/Card/UserPositionCard'
import { DataTable } from '../../DataTable'
import { DataTableCard } from '../../DataTableCard'
import { SnapshotCard } from '../../SnapshotCard'
import { SnapshotText } from '../../SnapshotText'
import { bondchartdata } from '../dummyChartData'

export const BondingSnapshot = () => {
  const [isExpanded, setExpand] = useState(false)
  const stakePosition = useStakePositions()
  const { userNonFungibleTokensInfo, totalLocked, isLoading } = stakePosition

  return (
    <Flex flexDir={'column'} w={'100%'} justifyContent={'space-between'}>
      <SnapshotCard isExpanded={!isExpanded}>
        <SnapshotLineChart data={bondchartdata} dataKeys={['CNV Price', 'Bond Price']} />
        <SnapshotTextCard>
          <SnapshotText title={'Current Bond Price'} data={'12.42 USD'} />
          <SnapshotText title={'CNV Market Price'} data={'3.23 USD'} />
          <SnapshotText title={'Current ROI'} data={'12.32%'} />
          <SnapshotText title={'All Claimable'} data={'32.42 CNV'} />
          <Flex
            userSelect={'none'}
            justifyContent={'center'}
            alignItems={'center'}
            alignSelf={'center'}
            height={'50px'}
            width={'145px'}
            shadow={'down'}
            borderRadius={'3xl'}
            cursor={'not-allowed'}
          >
            Redeem All
          </Flex>
        </SnapshotTextCard>
      </SnapshotCard>
      <DataTableCard
        SortComponent={<SortComponent />}
        dataTableLabel={'Bonding Positions'}
        route={'/smart-bonding'}
        buttonLabel={'Dynamic Bonds'}
        setExpand={setExpand}
        isExpanded={isExpanded}
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
  <>
    <Text color={'text.low'}>Sort by:</Text> <SortCard onChangeSort={() => {}} />
  </>
)
