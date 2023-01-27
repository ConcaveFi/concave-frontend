import { AirdropClaimContract } from '@concave/core'
import { listUserHistory, stakingPools, StakingV1Contract } from '@concave/marketplace'
import { Button, Flex, Spinner } from '@concave/ui'
import { airdropToken, getAirdropQ4ClaimableAmount } from 'components/Airdrop/Q4/airdrop'
import { getAirdropSpecialClaimableAmount } from 'components/Airdrop/special/airdrop'
import { useFilterByRange } from 'components/NftFilters/Filters/hooks/useFilterByRange'
import { useFilterByStakePool } from 'components/NftFilters/Filters/hooks/useFilterByStakePool'
import { usePositionSorter } from 'components/NftFilters/Sorters/hooks/useNftSort'
import { useStakePositions } from 'components/StakingPositions/DashboardBody/DashBoardState'
import { FilterContainer } from 'components/StakingPositions/DashboardBody/FilterContainer'
import { SnapshotLineChart } from 'components/UserDashboard/SnapshotLineChart'
import { SnapshotTextCard } from 'components/UserDashboard/SnapshotTextCard'
import { useStakeSettings } from 'contexts/PositionsFilterProvider'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { numberMask } from 'utils/numberMask'
import { useAccount, useProvider } from 'wagmi'
import { UserPositionCard } from '../../../StakingPositions/LockPosition/Card/UserPositionCard'
import { DataTable } from '../../DataTable'
import { DataTableCard } from '../../DataTableCard'
import { SnapshotCard } from '../../SnapshotCard'
import { SnapshotText } from '../../SnapshotText'
import { stakechartdata } from '../dummyChartData'

function generateDateArray(startDate: Date, endDate: Date, size: number): Date[] {
  const dateArray: Date[] = [];
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDays = diffTime / (1000 * 3600 * 24);
  const step = diffDays / size;
  
  for (let i = 0; i < size; i++) {
    const newDate = new Date(startDate.getTime() + step * i * (1000 * 3600 * 24));
    dateArray.push(newDate);
  }
  dateArray.push(endDate)
  return dateArray;
}


const calculateMintDate = ({lockedUntil, poolID}:{lockedUntil: number, poolID: number }) => {
  const { days } = stakingPools[poolID]
  return lockedUntil - days * 24 * 60 * 60 
}

const useStakeChart = ( address: string, chainId: number ) => {
  return useQuery(['STAKE_HISTORY', chainId, address], async () => {
    let [input, output] = await Promise.all(listUserHistory({address, chainId}))
    const today = new Date();
    console.log(output)
    const lastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    const dates = generateDateArray(lastYear, today, 12)
    return dates.map((date) => {
      const avaiableLocks = input.data.logStakingV1
            .filter(stake => calculateMintDate(stake) < date.getTime() / 1000 )
            .filter(stake => stake.lockedUntil > date.getTime() / 1000 )
      const totalLocked = avaiableLocks.reduce((prev, current) => prev + (+current.amountLocked), 0)

      return {
        date: `${date.getMonth()+1}/${date.getDate()} `,
        Airdrop: 15,
        'Locked CNV': totalLocked,
      }
    })
  })
}

const useAirdropOverview = (address:string, chainId: number) => {
  const provider = useProvider()
  return useQuery(['AirdropClaimOverview', chainId], async () => {
    const seasons = [{
        claimed: await new AirdropClaimContract(provider, 'special').claimed(address),
        amount: getAirdropSpecialClaimableAmount(address) || 0
      },{
        claimed: await new AirdropClaimContract(provider, 'Q4').claimed(address),
        amount: getAirdropQ4ClaimableAmount(address) || 0
      }
    ]
    const overview = seasons.reduce((prev, current) => {
      const airdropTotal = prev.airdropTotal + current.amount;
      const claimed = prev.claimed + (current.claimed ? current.amount: 0)
      return { airdropTotal, claimed,  }
    }, { airdropTotal: 0, claimed: 0 })

    const airdropShare = (overview.claimed / overview.airdropTotal )*100
    return { seasons, overview: {...overview, airdropShare} }
  }, {
    enabled: !!address
  })
}


export const LiquidStakingSnapshot = () => {
  const [isExpanded, setExpand] = useState(false)
  const { address } = useAccount()
  const stakePosition = useStakePositions()
  const positionSorter = usePositionSorter()
  const { userNonFungibleTokensInfo, totalLocked, isLoading } = stakePosition
  const networkId = useCurrentSupportedNetworkId()
  const airdropOverview = useAirdropOverview(address, networkId)
  const airdropShare = (airdropOverview.data?.overview.airdropShare||0).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })
  const { initialCNVFilter, stakePoolFilters, tokenIdFilter, sorter } = useStakeSettings()
  const { filterByRange } = useFilterByRange(initialCNVFilter)
  const { filterByStakePool } = useFilterByStakePool(stakePoolFilters)
  const sortFunction = sorter ? positionSorter.data?.[sorter.sort][sorter.order] : () => 0
  const stakeInfo = useStakeChart(address, networkId)
  return (
    <Flex flexDir={'column'} w={'100%'} h="100%" gap={6}>
      <Button onClick={() => stakeInfo.refetch() }>Refresh</Button>
      <SnapshotCard isExpanded={!isExpanded}>
        <SnapshotLineChart { ...stakeInfo}  dataKeys={['Airdrop', 'Locked CNV']} />
        <SnapshotTextCard>
          <SnapshotText
            title={'Total locked'}
            data={totalLocked.toFixed(2, { groupSeparator: ',' }) + ' CNV'}
          />
          {airdropOverview.isSuccess ? <>
            <SnapshotText
              title={'Available airdrop'}
              data={`${ numberMask( airdropOverview.data.overview.airdropTotal)} ${airdropToken.symbol}`}
            />
            <SnapshotText title={'Airdrop share'} data={airdropShare + '%'} />
            <SnapshotText title={'Airdrop'} data={<SnapshotButton claimed={airdropOverview.data.overview.claimed} />} />
          </> : <Spinner />}
        </SnapshotTextCard>
      </SnapshotCard>
      <DataTableCard
        dataTableLabel={'CNV Positions'}
        route={'/marketplace'}
        buttonLabel={'Marketplace'}
        setExpand={setExpand}
        isExpanded={isExpanded}
        SortComponent={<SortComponent />}
        isLoading={isLoading}
        hasPositions={userNonFungibleTokensInfo.length}
      >
        <DataTable isExpanded={isExpanded} h="full">
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

const SnapshotButton = ({ claimed }) => (
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
 