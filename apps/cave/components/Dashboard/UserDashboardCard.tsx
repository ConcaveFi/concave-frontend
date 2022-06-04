import { SpinIcon } from '@concave/icons'
import { Box, Button, Collapse, Flex, Text, useBreakpointValue } from '@concave/ui'
import { MetalBox } from 'components/MetalBox'
import { spinAnimation } from 'components/Treasury/Mobile/TreasuryManagementMobile'
import { UseDashBoardState } from 'contracts/DashBoard/DashBoardState'
import useNftPositionFilter, {
  NftPositionDaysFilterType,
  NftPositionFilters,
} from 'hooks/useNftPositionFilter'
import useNftPositionSort, { NftPositionSortType } from 'hooks/useNftPositionSort'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useConnect } from 'wagmi'
import DashboardFilterContainer from './DashboardFilterContainer'
import DividendsShareMobile from './Mobile/Components/DividendsShare'
import UserPositionCardMobile from './Mobile/Components/UserPositionCard'
import UserDividendCard from './UserDividendCard'
import UserPositionCard from './UserPositionCard'

const UserDashboardCard = (props: { data: UseDashBoardState }) => {
  const [{ data: wallet }] = useConnect()
  const [sorterType, setSorterType] = useState(NftPositionSortType.NONE)
  const { data } = props
  const { userNonFungibleTokensInfo, totalLocked, isLoading } = data
  const { sorterFunction } = useNftPositionSort(sorterType)
  const [filters, setFilters] = useState<NftPositionFilters>({
    filterByDay: NftPositionDaysFilterType.NONE,
  })

  const { filterByGained, filterByDay, filterByInitial } = useNftPositionFilter(filters)

  const isMobile = useBreakpointValue({ base: true, md: false })
  const hasPositions = userNonFungibleTokensInfo.length !== 0
  const userPositionsComponent = userNonFungibleTokensInfo
    .sort(sorterFunction)
    .filter(filterByGained)
    .filter(filterByInitial)
    .filter(filterByDay)
    .map((nonFungibleTokenInfo, index) =>
      isMobile ? (
        <UserPositionCardMobile key={index} nonFungibleTokenInfo={nonFungibleTokenInfo} />
      ) : (
        <UserPositionCard key={index} nonFungibleTokenInfo={nonFungibleTokenInfo} />
      ),
    )

  return (
    <Box
      shadow={{ base: '', md: 'up' }}
      bg={{ base: '', md: 'stroke.primary' }}
      rounded="2xl"
      p={'1px'}
    >
      <Flex
        rounded={'inherit'}
        width={{ lg: '740px', md: '520px', base: '360px' }}
        // maxH="1220px"
        bg={{ base: '', md: 'linear-gradient(265.73deg, #274C63 0%, #182F3E 100%)' }}
        position="relative"
        direction={'column'}
        gap={{ base: 2, md: 0 }}
      >
        <Box
          display={{ base: 'none', md: 'block' }}
          rounded={'inherit'}
          position={'absolute'}
          bgImage={'assets/textures/metal.png'}
          width={'full'}
          height="full"
          bgSize={'20% 30%'}
        />
        <>
          <UserDividendCard isLoading={isLoading} totalLocked={totalLocked} />
          {/* Will be displayed only on mobile layout */}
          <DividendsShareMobile isLoading={isLoading} totalLocked={totalLocked} />
        </>
        <DashboardFilterContainer
          currentFilters={filters}
          onChangeFilters={(e) => setFilters(e)}
          currentSorter={sorterType}
          onChangeSorter={setSorterType}
        />
        <Collapse in={hasPositions}>
          <MetalBox
            pos="relative"
            overflowY={'auto'}
            overflowX="hidden"
            maxHeight={'600px'}
            borderRadius="12px"
            px={'0.5rem'}
            shadow={{ base: '', md: 'down' }}
            py={'0.5rem'}
            bgVariant="dark"
            __css={scrollBar}
          >
            {userPositionsComponent}
          </MetalBox>
        </Collapse>
        <LoadingPositions in={isLoading} isMobile={isMobile} />
        <ItsNotConected in={!wallet.connected} isMobile={isMobile} />
        <HasNoPositions in={!hasPositions && !isLoading && wallet.connected} isMobile={isMobile} />
      </Flex>
    </Box>
  )
}

interface ItsNotConectedProps {
  in?: boolean
  isMobile?: boolean
}

const ItsNotConected = (props: ItsNotConectedProps) => {
  return (
    <Collapse in={props.in}>
      <MetalBox
        width={'full'}
        height="150px"
        direction={'column'}
        shadow={(props.isMobile && 'up') || 'none'}
        disableMetal={!props.isMobile}
      >
        <Text
          textColor={{ base: 'text.low', md: 'white' }}
          fontWeight={'700'}
          fontSize={{ base: '2xl', md: '3xl' }}
        >
          You are not connected
        </Text>
      </MetalBox>
    </Collapse>
  )
}

interface LoadingPositionsProps {
  in?: boolean
  isMobile?: boolean
}

const LoadingPositions = (props: LoadingPositionsProps) => {
  return (
    <Collapse in={props.in}>
      <MetalBox
        width={'full'}
        height="150px"
        direction={'column'}
        shadow={(props.isMobile && 'up') || 'none'}
        disableMetal={!props.isMobile}
        gap={1}
      >
        <Text
          textColor={{ base: 'text.low', md: 'white' }}
          fontWeight={'700'}
          fontSize={{ base: '2xl', md: '3xl' }}
        >
          Loading your positions
        </Text>
        <SpinIcon animation={spinAnimation(3)} width={{ base: '40px', md: '80px' }} />
      </MetalBox>
    </Collapse>
  )
}

interface HasNoPositionsprops {
  in?: boolean
  isMobile?: boolean
}
const HasNoPositions = (props: HasNoPositionsprops) => {
  const router = useRouter()
  return (
    <Collapse in={props.in}>
      <MetalBox
        height={'150px'}
        width="full"
        shadow={(props.isMobile && 'up') || 'none'}
        disableMetal={!props.isMobile}
        direction={'column'}
        justify="center"
      >
        <Text
          textColor={{ base: 'text.low', md: 'white' }}
          fontWeight={'700'}
          fontSize={{ base: '2xl', md: '3xl' }}
        >
          You do not have any positions
        </Text>
        <Button
          bg={'linear-gradient(90deg, #72639B 0%, #44B9DE 100%)'}
          boxShadow="up"
          height="40px"
          px={4}
          my="4"
          mx={'auto'}
          rounded={'2xl'}
          onClick={() => router.push('liquid-staking')}
          width="165px"
        >
          <Flex fontSize={'16px'} fontWeight="700" grow={1} justify="center">
            Stake CNV now!
          </Flex>
        </Button>
      </MetalBox>
      {/* <Card mt={8} mb={4} direction={'column'} align="center">
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
      </Card> */}
    </Collapse>
  )
}
export default UserDashboardCard

const scrollBar = {
  '&::-webkit-scrollbar': {
    display: { base: 'none', md: 'block' },
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
