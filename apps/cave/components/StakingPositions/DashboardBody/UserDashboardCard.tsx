import { ChevronLeftIcon } from '@concave/icons'
import { Box, Button, Collapse, Flex, gradientBorder, Spinner, Text } from '@concave/ui'
import { useFilterByRange } from 'components/NftFilters/Filters/hooks/useFilterByRange'
import { useFilterByStakePool } from 'components/NftFilters/Filters/hooks/useFilterByStakePool'
import { usePositionSorter } from 'components/NftFilters/Sorters/hooks/useNftSort'
import { useStakeSettings } from 'contexts/PositionsFilterProvider'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import { UserPositionCard } from '../LockPosition/Card/UserPositionCard'
import { UseStakePositionsState } from './DashBoardState'
import { FilterContainer } from './FilterContainer'
import { UserDividendCard } from './UserDividendCard'

export const UserDashboardCard = ({ stakePosition }: { stakePosition: UseStakePositionsState }) => {
  const router = useRouter()
  const { isConnected } = useAccount()
  const { userNonFungibleTokensInfo, totalLocked, isLoading } = stakePosition
  const hasPositions = userNonFungibleTokensInfo.length !== 0
  const positionSorter = usePositionSorter()

  const { initialCNVFilter, stakePoolFilters, tokenIdFilter, sorter } = useStakeSettings()
  const { filterByRange } = useFilterByRange(initialCNVFilter)
  const { filterByStakePool } = useFilterByStakePool(stakePoolFilters)
  const sortFunction = sorter ? positionSorter.data?.[sorter.sort][sorter.order] : () => 0
  if (!positionSorter.data) {
    //create a loading
    return null
  }
  return (
    <Flex w="900px">
      <Flex
        gap={2}
        direction={'column'}
        w="full"
        justify="center"
        rounded={'2xl'}
        apply={'background.metal'}
        bg="bg.primary"
      >
        <Flex direction={'column'} shadow="up" rounded={'2xl'} pb={2}>
          <Flex direction={'column'} align="center" px={4} pt={4} position={'relative'}>
            <Button
              color="text.low"
              shadow={'up'}
              px={4}
              py={2}
              rounded="2xl"
              sx={{ ...gradientBorder({ variant: 'secondary' }) }}
              onClick={() => router.push('/marketplace')}
              mb={-10}
              alignSelf={{ base: 'end', md: 'end' }}
            >
              <ChevronLeftIcon boxSize={{ base: '20px', md: '30px' }} />
              <Text variant={'ParagraphBold'} fontSize={{ base: 'sm', md: 'lg' }}>
                Marketplace
              </Text>
            </Button>
            <UserDividendCard isLoading={isLoading} totalLocked={totalLocked} />
          </Flex>
          <FilterContainer />
        </Flex>
        <Collapse in={hasPositions}>
          <Box
            maxH={{ lg: '675px', md: '740px', base: '800px' }}
            overflowY={'scroll'}
            overflowX="hidden"
            borderRadius="xl"
            px={'0.5rem'}
            mx={4}
            shadow={'down'}
            apply="scrollbar.big"
            mb={3}
          >
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
