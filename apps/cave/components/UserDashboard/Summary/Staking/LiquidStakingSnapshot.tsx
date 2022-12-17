import { AirdropClaimContract } from '@concave/core'
import { Flex } from '@concave/ui'
import { getAirdropClaimableAmount } from 'components/Airdrop/airdrop'
import { useFilterByRange } from 'components/NftFilters/Filters/hooks/useFilterByRange'
import { useFilterByStakePool } from 'components/NftFilters/Filters/hooks/useFilterByStakePool'
import { usePositionSorter } from 'components/NftFilters/Sorters/hooks/useNftSort'
import { useStakePositions } from 'components/StakingPositions/DashboardBody/DashBoardState'
import { FilterContainer } from 'components/StakingPositions/DashboardBody/FilterContainer'
import { useStakeSettings } from 'contexts/PositionsFilterProvider'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useAccount } from 'wagmi'
import { UserPositionCard } from '../../../StakingPositions/LockPosition/Card/UserPositionCard'
import { DataTable } from '../../DataTable'
import { DataTableCard } from '../../DataTableCard'

export const LiquidStakingSnapshot = () => {
  const [isExpanded, setExpand] = useState(false)
  const { address } = useAccount()
  const stakePosition = useStakePositions()
  const positionSorter = usePositionSorter()

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
  const { initialCNVFilter, stakePoolFilters, tokenIdFilter, sorter } = useStakeSettings()
  const { filterByRange } = useFilterByRange(initialCNVFilter)
  const { filterByStakePool } = useFilterByStakePool(stakePoolFilters)
  const sortFunction = sorter ? positionSorter.data?.[sorter.sort][sorter.order] : () => 0
  return (
    <Flex flexDir={'column'} w={'100%'} justifyContent={'space-between'}>
      {/* <SnapshotCard isExpanded={!isExpanded}>
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
      </SnapshotCard> */}
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
            .map((nonFungibleTokenInfo, i) => (
              <UserPositionCard
                key={+nonFungibleTokenInfo.tokenId.toString() + i}
                stakingPosition={nonFungibleTokenInfo}
              />
            ))}
        </DataTable>
      </DataTableCard>
    </Flex>
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
