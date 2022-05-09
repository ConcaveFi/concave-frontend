import { SpinIcon, SpinnerIcon } from '@concave/icons'
import { Box, Card, Collapse, Flex, FlexProps, keyframes, Spinner, Text, VStack } from '@concave/ui'
import { useState } from 'react'
import DividendsShareMobile from './Components/DividendsShare'
import { NftPositionViewer } from './Components/UserCard/NftPositionViewer'
import UserPositionCardMobile from './Components/UserPositionCard'

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

interface DashboardMobileProps extends FlexProps {
  usercontract: any
  totallocked: any
  statusdata: {
    isLoading: boolean
    notConnected: boolean
    success: boolean
  }
}

const DashboardMobile: React.FC<DashboardMobileProps> = ({ ...props }) => {
  const { usercontract, totallocked, statusdata } = props
  const { isLoading, notConnected, success } = statusdata
  const [isAnimating, setIsAnimating] = useState(false)

  const userPosComps =
    usercontract &&
    usercontract.map((contract, index) => (
      <UserPositionCardMobile key={index} contract={contract} />
    ))

  console.log(success)

  return (
    <Flex direction={'column'} align="center" {...props}>
      <DividendsShareMobile statusData={statusdata} totalLocked={totallocked} />
      <Box
        maxHeight={'660px'}
        overflowY="auto"
        overflowX={'hidden'}
        position="relative"
        css={scrollBar}
        mt={3}
        borderBottom={success && '4px solid skyblue'}
        borderTop={success && '4px solid skyblue'}
        rounded={success && '3xl'}
        gap={4}
      >
        <Collapse in={success && !isAnimating}>
          <VStack>{userPosComps}</VStack>
        </Collapse>
        <LoadingPositions
          in={isLoading && !isAnimating}
          onStart={() => setIsAnimating(true)}
          onComplete={() => setIsAnimating(false)}
        />
        <NotConnected
          in={notConnected && !isAnimating}
          onStart={() => setIsAnimating(true)}
          onComplete={() => setIsAnimating(false)}
        />
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
  onStart: () => void
  onComplete: () => void
}
const LoadingPositions = (props: LoadingPositionsProps) => {
  const spinnerStyles = { animation: `${spin} 2s linear infinite`, size: 'sm' }

  return (
    <Collapse
      in={props.in}
      onAnimationStart={() => props.onStart()}
      onAnimationComplete={() => props.onComplete()}
    >
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
  onStart: () => void
  onComplete: () => void
}
const NotConnected = (props: NotConnectedProps) => {
  return (
    <Collapse
      in={props.in}
      onAnimationStart={() => props.onStart()}
      onAnimationComplete={() => props.onComplete()}
    >
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
