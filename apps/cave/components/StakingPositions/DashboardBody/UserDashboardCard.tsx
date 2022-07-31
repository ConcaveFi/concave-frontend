import { Box, Button, Collapse, Flex, Spinner, Text } from '@concave/ui'
import { RangeFilter, useFilterByRange } from 'components/NftFilters/Filters/hooks/useFilterByRange'
import {
  StakePoolFilterEnum,
  useFilterByStakePool,
} from 'components/NftFilters/Filters/hooks/useFilterByStakePool'
import { NftSort, NftSortMethod } from 'components/NftFilters/Sorters/hooks/useNftSort'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { UserPositionCard } from '../LockPosition/Card/UserPositionCard'
import { UseStakePositionsState } from './DashBoardState'
import { FilterContainer } from './FilterContainer'
import { UserDividendCard } from './UserDividendCard'

export const UserDashboardCard = ({ stakePosition }: { stakePosition: UseStakePositionsState }) => {
  const { isConnected } = useAccount()
  const { userNonFungibleTokensInfo, totalLocked, isLoading } = stakePosition
  const hasPositions = userNonFungibleTokensInfo.length !== 0
  // Sorters && filters
  const [stakeFilters, setStakeFilters] = useState([
    StakePoolFilterEnum.FILTER_BY_45_DAYS,
    StakePoolFilterEnum.FILTER_BY_90_DAYS,
    StakePoolFilterEnum.FILTER_BY_180_DAYS,
    StakePoolFilterEnum.FILTER_BY_360_DAYS,
  ])
  const { filterByStakePool } = useFilterByStakePool(stakeFilters)

  const [rangeFilter, setRangeFilter] = useState<RangeFilter>({})
  const { filterByRange } = useFilterByRange(rangeFilter)

  const [sort, setSort] = useState<NftSort>({ sort: 'REDEEM_DATE', order: 'ASC' })
  const sortFunction = sort ? NftSortMethod[sort.sort][sort.order] : () => 0

  return (
    <Flex display={{ lg: 'flex', md: 'flex' }}>
      <Flex
        gap={2}
        direction={'column'}
        shadow={{ base: '', md: 'down' }}
        maxW={{ lg: '760px', md: '580px', base: '358px' }}
        justify="center"
        rounded={'2xl'}
        apply={{ base: '', md: 'background.metalBrighter' }}
      >
        <Flex justify="center" px={4} pt={4} position={'relative'}>
          <UserDividendCard isLoading={isLoading} totalLocked={totalLocked} />
        </Flex>
        <FilterContainer
          onResetStakeFilters={setStakeFilters}
          stakePoolFilters={stakeFilters}
          currentInitalCNVFilter={rangeFilter}
          onApplyInitalCNVFilter={setRangeFilter}
          onResetInitialCNVFilter={() => setRangeFilter({})}
          onChangeSort={(sort) => setSort(sort)}
          onEnableStakeFilter={(filter) => setStakeFilters([...stakeFilters, filter])}
          onDisableStakeFilter={(disabledFilter) =>
            setStakeFilters(stakeFilters.filter((stakeFilter) => stakeFilter !== disabledFilter))
          }
        />
        <Collapse in={hasPositions}>
          <Box
            pos="relative"
            maxH={{ lg: '675px', md: '740px', base: '800px' }}
            overflowY={'auto'}
            overflowX="hidden"
            borderRadius="xl"
            px={{ base: 0, md: '0.5rem' }}
            mx={{ base: 0, md: 4 }}
            shadow={{ base: '', md: 'down' }}
            apply="scrollbar.big"
            mb={3}
          >
            {userNonFungibleTokensInfo
              .filter(filterByStakePool)
              .filter(filterByRange)
              .sort(sortFunction)
              .map((nonFungibleTokenInfo) => (
                <UserPositionCard
                  key={+nonFungibleTokenInfo.tokenId.toString()}
                  stakingPosition={nonFungibleTokenInfo}
                />
              ))}
          </Box>
        </Collapse>

        <LoadingPositions in={isLoading} />
        <ItsNotConected in={!isConnected} />
        <HasNoPositions in={!hasPositions && !isLoading && isConnected} />
      </Flex>
    </Flex>
  )
}

interface ItsNotConectedProps {
  in?: boolean
}

const ItsNotConected = (props: ItsNotConectedProps) => {
  return (
    <Collapse in={props.in}>
      <Text pb={6} textColor={'gray.300'} fontWeight="bold" fontSize="3xl">
        You are not connected
      </Text>
    </Collapse>
  )
}

interface LoadingPositionsProps {
  in?: boolean
}

const LoadingPositions = (props: LoadingPositionsProps) => {
  return (
    <Collapse in={props.in}>
      <Text textColor={'gray.300'} fontWeight="bold" fontSize="3xl">
        Loading your positions
      </Text>
      <Spinner height={'30px'} width={'30px'} />
    </Collapse>
  )
}

interface HasNoPositionsprops {
  in?: boolean
}
const HasNoPositions = (props: HasNoPositionsprops) => {
  const router = useRouter()
  return (
    <Collapse in={props.in}>
      <Flex direction={'column'} align="center">
        <Text textColor={'gray.300'} fontWeight="bold" fontSize="3xl">
          You do not have any positions
        </Text>
        <Button
          bg={'linear-gradient(90deg, #72639B 0%, #44B9DE 100%)'}
          boxShadow="up"
          height="40px"
          px={4}
          my="4"
          rounded={'2xl'}
          onClick={() => router.push('liquid-staking')}
        >
          <Flex fontSize={'md'} fontWeight="bold" grow={1} justify="center">
            Stake CNV now!
          </Flex>
        </Button>
      </Flex>
    </Collapse>
  )
}
