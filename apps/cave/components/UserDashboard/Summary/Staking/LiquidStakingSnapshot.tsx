import { AirdropClaimContract } from '@concave/core'
import { ChevronRightIcon } from '@concave/icons'
import { SellIcon } from '@concave/icons'
import { listUserHistory, stakingPools } from '@concave/marketplace'
import { Button, Flex, Spinner } from '@concave/ui'
import { airdropToken, getAirdropQ4ClaimableAmount } from 'components/Airdrop/Q4/airdrop'
import { getAirdropSpecialClaimableAmount } from 'components/Airdrop/special/airdrop'
import { ComingSoom } from 'components/ComingSoon'
import { useFilterByRange } from 'components/NftFilters/Filters/hooks/useFilterByRange'
import { filterStakePool } from 'components/NftFilters/Filters/hooks/useFilterByStakePool'
import { StakePoolFilterCard } from 'components/NftFilters/Filters/StakePoolFilter'
import { usePositionSorter } from 'components/NftFilters/Sorters/hooks/useNftSort'
import { SortButton } from 'components/NftFilters/Sorters/SortCard'
import { ToggleContentButton } from 'components/ToggleContentButton'
import { useStakePositions } from 'components/StakingPositions/DashboardBody/DashBoardState'
import { SnapshotLineChart } from 'components/UserDashboard/SnapshotLineChart'
import { SnapshotTextCard } from 'components/UserDashboard/SnapshotTextCard'
import { useStakeSettings } from 'contexts/PositionsFilterProvider'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { numberMask } from 'utils/numberMask'
import { useAccount, useProvider } from 'wagmi'
import { UserPositionCardMemo } from '../../../StakingPositions/LockPosition/Card/UserPositionCard'
import { DataTable } from '../../DataTable'
import { DataTableCard } from '../../DataTableCard'
import { SnapshotCard } from '../../SnapshotCard'
import { SnapshotText } from '../../SnapshotText'

function generateDateArray(startDate: Date, endDate: Date, size: number): Date[] {
  const dateArray: Date[] = []
  const diffTime = endDate.getTime() - startDate.getTime()
  const diffDays = diffTime / (1000 * 3600 * 24)
  const step = diffDays / size

  for (let i = 0; i < size; i++) {
    const newDate = new Date(startDate.getTime() + step * i * (1000 * 3600 * 24))
    dateArray.push(newDate)
  }
  dateArray.push(endDate)
  return dateArray
}

const calculateMintDate = ({ lockedUntil, poolID }: { lockedUntil: number; poolID: number }) => {
  const { days } = stakingPools[poolID]
  return lockedUntil - days * 24 * 60 * 60
}

const useStakeChart = (address: string, chainId: number) => {
  return useQuery(['STAKE_CHART', chainId, address], async () => {
    let [input, output] = await Promise.all(listUserHistory({ address, chainId }))
    const today = new Date()
    const lastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
    const dates = generateDateArray(lastYear, today, 12)
    return dates.map((date) => {
      const avaiableLocks = input.data.logStakingV1
        .filter((stake) => calculateMintDate(stake) < date.getTime() / 1000)
        .filter((stake) => stake.lockedUntil > date.getTime() / 1000)
      const totalLocked = avaiableLocks.reduce((prev, current) => prev + +current.amountLocked, 0)
      return {
        date: `${date.getMonth() + 1}/${date.getDate()} `,
        Airdrop: 15,
        'Locked CNV': totalLocked,
      }
    })
  })
}

const useAirdropOverview = (address: string, chainId: number) => {
  const provider = useProvider()
  return useQuery(
    ['AIRDROP_OVERVIEW', chainId],
    async () => {
      const claimedSpecial = new AirdropClaimContract(provider, 'special').claimed(address)
      const claimedQ4 = new AirdropClaimContract(provider, 'Q4').claimed(address)
      const seasons = [
        {
          claimed: await claimedSpecial,
          amount: getAirdropSpecialClaimableAmount(address) || 0,
        },
        {
          claimed: await claimedQ4,
          amount: getAirdropQ4ClaimableAmount(address) || 0,
        },
      ]
      const overview = seasons.reduce(
        (prev, current) => {
          const airdropTotal = prev.airdropTotal + current.amount
          const claimed = prev.claimed + (current.claimed ? current.amount : 0)
          return { airdropTotal, claimed }
        },
        { airdropTotal: 0, claimed: 0 },
      )

      const airdropShare = (overview.claimed / overview.airdropTotal) * 100
      return { seasons, overview: { ...overview, airdropShare } }
    },
    {
      enabled: !!address,
    },
  )
}

export const LiquidStakingSnapshot = () => {
  const [isExpanded, setExpand] = useState(false)
  const { address } = useAccount()
  const stakePosition = useStakePositions()
  const positionSorter = usePositionSorter()
  const { userNonFungibleTokensInfo, totalLocked, isLoading } = stakePosition
  const networkId = useCurrentSupportedNetworkId()
  const airdropOverview = useAirdropOverview(address, networkId)
  const airdropShare = (airdropOverview.data?.overview.airdropShare || 0).toLocaleString(
    undefined,
    {
      maximumFractionDigits: 2,
    },
  )
  const { initialCNVFilter, stakePoolFilters, tokenIdFilter, sorter } = useStakeSettings()
  const { filterByRange } = useFilterByRange(initialCNVFilter)
  const { filterByStakePool } = filterStakePool([...stakePoolFilters.values()])
  const sortFunction = sorter ? positionSorter.data?.[sorter.sort][sorter.order] : () => 0
  const stakeInfo = useStakeChart(address, networkId)
  const router = useRouter()
  return (
    <Flex flexDir={'column'} w={'100%'} h="100%" gap={4}>
      <SnapshotCard show={!isExpanded}>
        <ComingSoom>
          <SnapshotLineChart {...stakeInfo} dataKeys={['Airdrop', 'Locked CNV']} />
        </ComingSoom>
        <SnapshotTextCard>
          <SnapshotText
            title={'Total locked'}
            data={totalLocked.toFixed(2, { groupSeparator: ',' }) + ' CNV'}
          />
          {airdropOverview.isSuccess ? (
            <>
              <SnapshotText
                title={'Available airdrop'}
                data={`${numberMask(airdropOverview.data.overview.airdropTotal)} ${
                  airdropToken.symbol
                }`}
              />
              <SnapshotText title={'Airdrop share'} data={airdropShare + '%'} />
            </>
          ) : (
            <Spinner />
          )}
        </SnapshotTextCard>
      </SnapshotCard>
      <DataTableCard
        isLoading={isLoading}
        dataTableOptions={
          <Flex gap={{ base: 2, sm: 4 }} w={'full'}>
            <ToggleContentButton handle={setExpand} isExpanded={isExpanded} />
            <SortButton />
            <StakePoolFilterCard />
            <Button
              ml={'auto'}
              size={'md'}
              boxShadow={'Up Big'}
              onClick={() => router.push('/liquid-staking')}
              justifyContent={'space-between'}
              rightIcon={<ChevronRightIcon />}
            >
              Stake
            </Button>
          </Flex>
        }
        hasPositions={userNonFungibleTokensInfo.length}
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
              <UserPositionCardMemo
                key={+nonFungibleTokenInfo.tokenId.toString() + i}
                stakingPosition={nonFungibleTokenInfo}
              />
            ))}
        </DataTable>
      </DataTableCard>
    </Flex>
  )
}
