import { AirdropClaimContract } from '@concave/core'
import { Flex } from '@concave/ui'
import { airdropToken, getAirdropClaimableAmount } from 'components/Airdrop/airdrop'
import { useFilterByRange } from 'components/NftFilters/Filters/hooks/useFilterByRange'
import { useFilterByStakePool } from 'components/NftFilters/Filters/hooks/useFilterByStakePool'
import { usePositionSorter } from 'components/NftFilters/Sorters/hooks/useNftSort'
import { useStakePositions } from 'components/StakingPositions/DashboardBody/DashBoardState'
import { FilterContainer } from 'components/StakingPositions/DashboardBody/FilterContainer'
import { SnapshotCard } from 'components/UserDashboard/SnapshotCard'
import { SnapshotLineChart } from 'components/UserDashboard/SnapshotLineChart'
import { SnapshotText } from 'components/UserDashboard/SnapshotText'
import { SnapshotTextCard } from 'components/UserDashboard/SnapshotTextCard'
import { useStakeSettings } from 'contexts/PositionsFilterProvider'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useQuery } from 'react-query'
import { useAccount } from 'wagmi'
import { UserPositionCard } from '../../../StakingPositions/LockPosition/Card/UserPositionCard'
import { DataTable } from '../../DataTable'
import { DataTableCard } from '../../DataTableCard'
import { stakechartdata } from '../dummyChartData'

export const LiquidStakingSnapshot = () => {
  const { address } = useAccount()
  const stakePosition = useStakePositions()

  const { userNonFungibleTokensInfo, totalLocked, isLoading } = stakePosition
  const networkId = useCurrentSupportedNetworkId()

  const airdropAmount = getAirdropClaimableAmount(address)
  const { data: claimed } = useQuery(['AirdropClaimContract', networkId], async () => {
    const airdrop = new AirdropClaimContract(concaveProvider(networkId))
    return await airdrop.claimed(address)
  })
  const airdropTotal = 510691.11 //TODO
  const airdropShare = (airdropAmount / airdropTotal).toLocaleString(undefined, {
    maximumFractionDigits: 4,
  })
  const positionSorter = usePositionSorter()
  const { initialCNVFilter, stakePoolFilters, tokenIdFilter, sorter } = useStakeSettings()
  const { filterByRange } = useFilterByRange(initialCNVFilter)
  const { filterByStakePool } = useFilterByStakePool(stakePoolFilters)
  const sortFunction = sorter ? positionSorter.data?.[sorter.sort][sorter.order] : () => 0
  return (
    <>
      <SnapshotCard>
        <SnapshotLineChart data={stakechartdata} dataKeys={['Airdrop', 'Locked CNV']} />
        <SnapshotTextCard>
          <SnapshotText
            title={'Total locked'}
            data={totalLocked.toFixed(2, { groupSeparator: ',' }) + ' CNV'}
          />
          <SnapshotText
            title={'Available airdrop'}
            data={`${airdropAmount} ${airdropToken.symbol}`}
          />
          <SnapshotText title={'Airdrop share'} data={airdropShare + '%'} />
          <SnapshotText title={'Airdrop'} data={<SnapshotButton claimed={claimed} />} />
        </SnapshotTextCard>
      </SnapshotCard>

      <DataTableCard
        dataTableLabel={'CNV Positions'}
        route={'/marketplace'}
        buttonLabel={'Marketplace'}
        SortComponent={<SortComponent />}
      >
        <DataTable>
          {userNonFungibleTokensInfo
            .filter(filterByStakePool)
            .filter(filterByRange)
            .filter((position) => {
              if (!tokenIdFilter) return true
              return position.tokenId === tokenIdFilter
            })
            .sort(sortFunction)
            .map((nonFungibleTokenInfo) => (
              <UserPositionCard
                key={+nonFungibleTokenInfo.tokenId.toString()}
                stakingPosition={nonFungibleTokenInfo}
              />
            ))}
        </DataTable>
      </DataTableCard>
    </>
  )
}

const SortComponent = () => <FilterContainer />

export const SnapshotButton = ({ claimed }) => (
  <Flex
    textColor={claimed ? 'text.low' : ''}
    justifyContent={'center'}
    alignItems={'center'}
    alignSelf={'center'}
    height={'40px'}
    width={'145px'}
    shadow={claimed ? 'Down Big' : 'Up Big'}
    _active={{ shadow: 'Down Big' }}
    borderRadius={'3xl'}
    cursor={claimed ? 'default' : 'pointer'}
    userSelect={'none'}
  >
    {claimed ? 'Claimed' : 'Claim'}
  </Flex>
)
