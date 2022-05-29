import { SpinIcon } from '@concave/icons'
import { Box, Collapse, Flex, keyframes, Text, VStack, Button } from '@concave/ui'
import { UseDashBoardState } from 'contracts/DashBoard/DashBoardState'
import { useConnect } from 'wagmi'
import DividendsShareMobile from './Components/DividendsShare'
import UserPositionCardMobile from './Components/UserPositionCard'
import { useRouter } from 'next/router'
const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

const DashboardMobile = (props: { data: UseDashBoardState }) => {
  const { data } = props
  const { isLoading, userNonFungibleTokensInfo, totalLocked } = data
  const [{ data: wallet }] = useConnect()

  const userPosComps = userNonFungibleTokensInfo.map((nonFungibleTokenInfo, index) => (
    <UserPositionCardMobile key={index} nonFungibleTokenInfo={nonFungibleTokenInfo} />
  ))
  const hasPositions = userNonFungibleTokensInfo.length !== 0
  return (
    <Flex direction={'column'} align="center" display={{ lg: 'none', md: 'none', sm: 'flex' }}>
      <DividendsShareMobile isLoading={isLoading} totalLocked={totalLocked} />
      <Box
        maxHeight={'660px'}
        overflowY="auto"
        overflowX={'hidden'}
        position="relative"
        css={scrollBar}
        mt={3}
        // borderBottom={!isLoading && '4px solid skyblue'}
        // borderTop={! && '4px solid skyblue'}
          rounded={!isLoading && '2xl'}

        gap={4}
      >
        <Collapse in={!isLoading}>
          <VStack>{userPosComps}</VStack>
        </Collapse>
        <LoadingPositions in={isLoading} />
        <NotConnected in={!wallet.connected} />
        <HasNoPositions in={!hasPositions && !isLoading && wallet.connected} />
      </Box>
    </Flex>
  )
}

export default DashboardMobile

const scrollBar = {
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  '&::-webkit-scrollbar-track': {
    padding: '2px',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '10px',
    background: ' #0A161F ',
    margin: '2px',
  },
}

interface LoadingPositionsProps {
  in: boolean
}
const LoadingPositions = (props: LoadingPositionsProps) => {
  const spinnerStyles = { animation: `${spin} 2s linear infinite`, size: 'sm' }

  return (
    <Collapse in={props.in}>
      <Box
        height={'140px'}
        width="360px"
        rounded="2xl"
        bg="linear-gradient(239.18deg, #19394C 27.18%, #0A161F 96.11%)"
        boxShadow={'Up Small'}
      >
        <Flex
          height={'full'}
          width="full"
          bgSize={'40%'}
          bgImage={'/assets/textures/metal.png'}
          justify="center"
          align={'center'}
          direction="column"
        >
          <Text fontSize={'22px'} fontWeight="700" textColor={'gray.400'}>
            Loading your positions
          </Text>
          <SpinIcon __css={spinnerStyles} width={'8'} height={'8'} mt={2} />
        </Flex>
      </Box>
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
        <Box
        height={'140px'}
        width="360px"
        rounded="2xl"
       bg="linear-gradient(239.18deg, #19394C 27.18%, #0A161F 96.11%)"
        boxShadow={'Up Small'}
      >
      <Flex direction={'column'}  justifyContent='center' align="center" height={'full'} width="full"   bgImage={'/assets/textures/metal.png'} bgSize={'40%'}>
        <Text textColor={'gray.400'} fontWeight={'700'} fontSize={'22px'}>
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
      </Box>
    </Collapse>
  )
}
interface NotConnectedProps {
  in: boolean
}
const NotConnected = (props: NotConnectedProps) => {
  return (
    <Collapse in={props.in}>
      <Box
        height={'140px'}
        width="360px"
        rounded="2xl"
        bg="linear-gradient(239.18deg, #19394C 27.18%, #0A161F 96.11%)"
        boxShadow={'Up Small'}
      >
        <Flex
          height={'full'}
          width="full"
          bgSize={'40%'}
          bgImage={'/assets/textures/metal.png'}
          justify="center"
          align={'center'}
          direction="column"
        >
          <Text fontSize={'22px'} fontWeight="700" textColor={'gray.400'}>
            You are not connected
          </Text>
        </Flex>
      </Box>
    </Collapse>
  )
}
