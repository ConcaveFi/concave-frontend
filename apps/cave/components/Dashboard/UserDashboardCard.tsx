import { Box, Button, Card, Collapse, Flex, Spinner, Text } from '@concave/ui'
import UserPositionCard from './UserPositionCard'
import UserDividendCard from './UserDividendCard'
import { ButtonLink } from 'components/ButtonLink'
import { useDashBoardState } from 'contracts/DashBoard/DashBoardState'
import { useRouter } from 'next/router'

const UserDashboardCard = () => {
  const { userContracts, totalLocked, statusData } = useDashBoardState()
  const { isLoading, success, notConnected } = statusData

  const userPosComps =
    userContracts &&
    userContracts.map((contract, index) => <UserPositionCard key={index} contract={contract} />)

  const hasPositions = userContracts !== null
  return (
    <Card
      p={3}
      gap={2}
      variant="primary"
      maxHeight="945px"
      shadow="down"
      maxW={{ lg: '780px', md: '680px' }}
      justify="center"
    >
      <Flex justify="center">
        <Box
          pos="relative"
          h="fit-content"
          w="fit-content"
          px={4}
          pb="4"
          pt="1"
          overflowY={'auto'}
          maxHeight={'500px'}
        >
          <Flex direction="row" gap={4} position="relative" mt={1}>
            <UserDividendCard statusData={statusData} totalLocked={totalLocked} />
          </Flex>
        </Box>
      </Flex>

{/* commit */}
      <Collapse in={userContracts !== null}>
        <Box
          pos="relative"
          h="100%"
          overflowY={'scroll'}
          overflowX="hidden"
          maxHeight={'100%'}
          borderRadius="12px"
          px={'0.5rem'}
          py={'0.5rem'}
          shadow="down"
          __css={scrollBar}
        >
          {userPosComps}
        </Box>
      </Collapse>

      <LoadingPositions in={isLoading} />
      <ItsNotConected in={notConnected} />
      <HasNoPositions in={!hasPositions && !isLoading && !notConnected} />
    </Card>
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
          onClick={() => router.push('liquidstaking')}
        >
          <Flex fontSize={'16px'} fontWeight="700" grow={1} justify="center">
            Lets buy some!
          </Flex>
        </Button>
      </Flex>
    </Collapse>
  )
}
export default UserDashboardCard

const scrollBar = {
  '&::-webkit-scrollbar': {
    width: '20px',
    boxShadow: `-1px 1px 3px rgba(126, 162, 255, 0.26), inset 0px -5px 5px rgba(255, 255, 255, 0.02), inset -9px 12px 24px rgba(13, 17, 23, 0.49)`,
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'linear-gradient(239.18deg, #19394C 27.18%, #0A161F 96.11%)',
    boxShadow:
      '0px 5px 14px rgba(0, 0, 0, 0.47), 4px -7px 15px rgba(174, 177, 255, 0.13), inset -1px 1px 2px rgba(128, 186, 255, 0.24)',
    rounded: 'lg',
  },
}
