import { Box, Button, Collapse, Flex, Spinner, Text, useBreakpointValue } from '@concave/ui'
import { useRouter } from 'next/router'
import { useConnect } from 'wagmi'
import { UserPositionCard } from '../LockPosition/Card/UserPositionCard'
import { UseStakePositionsState } from './DashBoardState'
import { FilterContainer } from './FilterContainer'
import { UserDividendCard } from './UserDividendCard'

export const UserDashboardCard = ({ stakePosition }: { stakePosition: UseStakePositionsState }) => {
  const { isConnected } = useConnect()
  const { userNonFungibleTokensInfo, totalLocked, isLoading } = stakePosition
  const hasPositions = userNonFungibleTokensInfo.length !== 0
  const mobileLayout = useBreakpointValue({ base: true, md: false })

  return (
    <Flex display={{ lg: 'flex', md: 'flex' }}>
      <Flex
        gap={2}
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
        <FilterContainer />
        <Collapse in={hasPositions}>
          <Box
            pos="relative"
            maxH={{ lg: '675px', md: '740px', base: '800px' }}
            overflowY={'scroll'}
            overflowX="hidden"
            borderRadius="xl"
            px={{ base: 0, md: '0.5rem' }}
            mx={{ base: 0, md: 4 }}
            py={'0.5rem'}
            shadow={{ base: '', md: 'down' }}
            apply="scrollbar.big"
            mb={3}
          >
            {userNonFungibleTokensInfo.map((nonFungibleTokenInfo) => (
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
