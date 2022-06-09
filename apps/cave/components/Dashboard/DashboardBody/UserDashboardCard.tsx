import {
  Box,
  Button,
  Card,
  Collapse,
  Flex,
  Spinner,
  Text,
  useBreakpoint,
  useBreakpointValue,
} from '@concave/ui'
import { MetalBox } from 'components/MetalBox'
import { NftRangeFilters, useNftFilter } from 'components/NftFilters/hooks/useNftFilter'
import { NftSorters, useNftSort } from 'components/NftFilters/hooks/useNftSort'
import { UseDashBoardState } from 'contracts/DashBoard/DashBoardState'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useConnect } from 'wagmi'
import { UserPositionCard } from '../LockPosition/Card/UserPositionCard'
import FilterContainer from './FilterContainer'
import UserDividendCard from './UserDividendCard'

export const UserDashboardCard = ({ data }: { data: UseDashBoardState }) => {
  const { isConnected } = useConnect()
  const { userNonFungibleTokensInfo, totalLocked, isLoading } = data
  const hasPositions = userNonFungibleTokensInfo.length !== 0

  // filters and sorters
  const [sorters, setSorters] = useState<NftSorters>({})
  const [filters, setFilters] = useState<NftRangeFilters>({})
  const { sorter } = useNftSort(sorters)
  const { filterByRange } = useNftFilter(filters)

  const mobileLayout = useBreakpointValue({ base: true, md: false })

  return (
    <Flex display={{ lg: 'flex', md: 'flex' }}>
      <Flex
        gap={2}
        maxHeight="775px"
        direction={'column'}
        shadow={{ base: '', md: 'down' }}
        maxW={{ lg: '760px', md: '580px', base: '358px' }}
        justify="center"
        rounded={'2xl'}
        bg={{ base: '', md: 'linear-gradient(270deg, #224D67 0%, #182F3E 100%)' }}
      >
        <Box
          bgImage={'assets/textures/metal.png'}
          position="absolute"
          height={'full'}
          width="full"
          bgSize={'10% 20%'}
        />
        <Flex justify="center" px={4} pt={4} position={'relative'}>
          <UserDividendCard isLoading={isLoading} totalLocked={totalLocked} />
        </Flex>
        {/* <FilterContainer
          onAddFilter={(filter, { min, max }) => setFilters({ ...filters, [filter]: { min, max } })}
          onAddSorter={(type, order) => setSorters({ ...sorters, [type]: order })}
          onRemoveSorter={(sorter) => {
            const { [sorter]: removed, ...newSorters } = sorters
            setSorters(newSorters)
          }}
        /> */}
        <Collapse in={hasPositions}>
          <Box
            pos="relative"
            h="100%"
            overflowY={'scroll'}
            overflowX="hidden"
            borderRadius="12px"
            px={{ base: 0, md: '0.5rem' }}
            mx={{ base: 0, md: 4 }}
            py={'0.5rem'}
            shadow={{ base: '', md: 'down' }}
            __css={scrollBar}
          >
            {userNonFungibleTokensInfo
              .filter(filterByRange)
              .sort(sorter)
              .map((nonFungibleTokenInfo, index) => (
                <UserPositionCard key={index} nonFungibleTokenInfo={nonFungibleTokenInfo} />
              ))}
          </Box>
        </Collapse>

        <LoadingPositions in={isLoading} />
<<<<<<< HEAD
        <ItsNotConected in={!isConnected} />
        <HasNoPositions in={!hasPositions && !isLoading && isConnected} />
      </Card>
=======
        <ItsNotConected in={!wallet.connected} />
        <HasNoPositions in={!hasPositions && !isLoading && wallet.connected} />
      </Flex>
>>>>>>> a0824435 (start intregating mobile components)
    </Flex>
  )
}

interface ItsNotConectedProps {
  in?: boolean
}

const ItsNotConected = (props: ItsNotConectedProps) => {
  return (
    <Collapse in={props.in}>
      <Text pb={6} textColor={'gray.300'} fontWeight={'700'} fontSize="3xl">
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
      <Text textColor={'gray.300'} fontWeight={'700'} fontSize="3xl">
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
        <Text textColor={'gray.300'} fontWeight={'700'} fontSize="3xl">
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
          <Flex fontSize={'16px'} fontWeight="700" grow={1} justify="center">
            Stake CNV now!
          </Flex>
        </Button>
      </Flex>
    </Collapse>
  )
}

const scrollBar = {
  '&::-webkit-scrollbar': {
    display: { base: 'none', md: 'flex' },
    width: '15px',
    boxShadow: `-1px 1px 3px rgba(126, 162, 255, 0.26), inset 0px -5px 5px rgba(255, 255, 255, 0.02), inset -9px 12px 24px rgba(13, 17, 23, 0.49)`,
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    // background: 'linear-gradient(239.18deg, #19394C 27.18%, #0A161F 96.11%)',
    background: '#19394C',
    boxShadow:
      '0px 5px 14px rgba(0, 0, 0, 0.47), 4px -7px 15px rgba(174, 177, 255, 0.13), inset -1px 1px 2px rgba(128, 186, 255, 0.24)',
    rounded: 'lg',
  },
}
