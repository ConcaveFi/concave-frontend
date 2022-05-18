import { SpinIcon } from '@concave/icons'
import { Box, Collapse, Flex, keyframes, Text, VStack } from '@concave/ui'
import { UseDashBoardState } from 'contracts/DashBoard/DashBoardState'
import DividendsShareMobile from './Components/DividendsShare'
import UserPositionCardMobile from './Components/UserPositionCard'

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

const DashboardMobile = (props: { data: UseDashBoardState }) => {
  const { data } = props
  const { status, userNonFungibleTokensInfo, totalLocked } = data
  const { isLoading, notConnected } = status

  const userPosComps = userNonFungibleTokensInfo.map((nonFungibleTokenInfo, index) => (
    <UserPositionCardMobile key={index} nonFungibleTokenInfo={nonFungibleTokenInfo} />
  ))

  return (
    <Flex direction={'column'} align="center" display={{ lg: 'none', md: 'none', sm: 'flex' }}>
      <DividendsShareMobile status={status} totalLocked={totalLocked} />
      <Box
        maxHeight={'660px'}
        overflowY="auto"
        overflowX={'hidden'}
        position="relative"
        css={scrollBar}
        mt={3}
        borderBottom={!isLoading && '4px solid skyblue'}
        borderTop={!isLoading && '4px solid skyblue'}
        rounded={!isLoading && '3xl'}
        gap={4}
      >
        <Collapse in={!isLoading}>
          <VStack>{userPosComps}</VStack>
        </Collapse>
        <LoadingPositions in={isLoading} />
        <NotConnected in={notConnected} />
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
